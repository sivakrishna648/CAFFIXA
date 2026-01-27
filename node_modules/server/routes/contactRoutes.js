import express from 'express';
import * as contactController from '../controllers/contactController.js';

const router = express.Router();

router.post('/send-message', contactController.sendContactMessage);

export default router;
