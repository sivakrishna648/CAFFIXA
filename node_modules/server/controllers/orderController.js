import Order from '../models/Order.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const { items, shippingAddress, totalAmount, paymentMethod } = req.body;

        // Validation
        if (!items || items.length === 0) {
            return res.status(400).json({ status: 'fail', message: 'Please add items to cart' });
        }
        if (!shippingAddress) {
            return res.status(400).json({ status: 'fail', message: 'Please provide shipping address' });
        }
        if (!shippingAddress.email) {
            return res.status(400).json({ status: 'fail', message: 'Please provide email address' });
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: 'inr',
                    product_data: { name: `Coffee Product - ${item.productId}` },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL || 'http://localhost:5176'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5176'}/checkout`,
        });

        // Create order record
        const order = await Order.create({
            email: shippingAddress.email,
            items: items.map(item => ({
                productId: String(item.productId),
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: totalAmount || items.reduce((total, item) => total + (item.price * item.quantity), 0),
            shippingAddress: {
                fullName: shippingAddress.fullName,
                email: shippingAddress.email,
                address: shippingAddress.address,
                city: shippingAddress.city,
                zipCode: shippingAddress.zipCode,
                country: 'India'
            },
            paymentMethod,
            stripePaymentId: session.id,
            paymentStatus: 'pending',
            orderStatus: 'processing'
        });

        res.status(200).json({ 
            status: 'success', 
            message: 'Checkout session created',
            clientSecret: session.client_secret,
            sessionUrl: session.url, 
            orderId: order._id,
            redirectUrl: session.url
        });
    } catch (err) {
        console.error('Checkout error:', err);
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json({ status: 'success', results: orders.length, data: { orders } });
    } catch (err) {
        res.status(404).json({ status: 'fail', message: err.message });
    }
};
