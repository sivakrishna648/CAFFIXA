import express from "express";
import passport from "passport";
import * as authController from "../controllers/authController.js";
import jwt from "jsonwebtoken";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Email/Password Authentication
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", protect, authController.getMe);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// Google OAuth
router.get("/google", (req, res, next) => {
    const { redirect } = req.query;
    const state = redirect ? Buffer.from(JSON.stringify({ redirect })).toString('base64') : undefined;
    passport.authenticate("google", {
        scope: ["profile", "email"],
        state: state
    })(req, res, next);
});

router.get("/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        let redirectPath = '/';
        const { state } = req.query;
        if (state) {
            try {
                const decodedState = JSON.parse(Buffer.from(state, 'base64').toString());
                if (decodedState.redirect) {
                    redirectPath = decodedState.redirect;
                }
            } catch (e) {
                console.error('Error parsing state:', e);
            }
        }

        const redirectUrl = new URL(`${process.env.CLIENT_URL || "http://localhost:5173"}/login`);
        redirectUrl.searchParams.set('token', token);
        if (redirectPath !== '/') {
            redirectUrl.searchParams.set('redirect', redirectPath);
        }

        res.redirect(redirectUrl.toString());
    }
);

export default router;
