import express from 'express';
import * as orderController from '../controllers/orderController.js';
// import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.use(protect);

router.post('/checkout', orderController.createCheckoutSession);
router.get('/my-orders', orderController.getMyOrders);

export default router;
