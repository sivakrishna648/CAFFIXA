import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ status: 'fail', message: 'Please provide name, email and password' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'fail', message: 'Email already exists' });
        }

        const user = await User.create({ name, email, password });

        const token = signToken(user._id);
        res.status(201).json({ status: 'success', token, data: { user } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
        }

        // Find user and explicitly select password field
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            console.log(`Login failed: User not found with email ${email}`);
            return res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
        }

        // Compare passwords
        const isPasswordCorrect = await user.comparePassword(password, user.password);

        if (!isPasswordCorrect) {
            console.log(`Login failed: Wrong password for user ${email}`);
            return res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
        }

        const token = signToken(user._id);
        res.status(200).json({ status: 'success', token, data: { user } });
    } catch (err) {
        res.status(401).json({ status: 'fail', message: err.message });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ status: 'fail', message: 'Please provide email address' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Set reset token and expiry (10 minutes)
        user.resetToken = resetTokenHash;
        user.resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);

        // Save user document
        const savedUser = await user.save({ validateBeforeSave: false });

        // TODO: Send email with reset link
        // For now, return the token (in production, send via email)
        const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        console.log(`Password reset link: ${resetLink}`);

        res.status(200).json({
            status: 'success',
            message: 'Password reset link sent to email',
            resetLink // Remove in production - only for testing
        });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;

        if (!token || !newPassword || !confirmPassword) {
            return res.status(400).json({ status: 'fail', message: 'Please provide token and passwords' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ status: 'fail', message: 'Passwords do not match' });
        }

        // Hash the token to find user
        const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

        // Find user with valid reset token
        const user = await User.findOne({
            resetToken: resetTokenHash,
            resetTokenExpiry: { $gt: new Date() }
        });

        if (!user) {
            return res.status(400).json({ status: 'fail', message: 'Invalid or expired reset token' });
        }

        // Update password
        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        // Sign new token and login user
        const loginToken = signToken(user._id);
        res.status(200).json({
            status: 'success',
            message: 'Password reset successful',
            token: loginToken,
            data: { user }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ status: 'success', data: { user } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
