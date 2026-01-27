import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: { type: String, required: true },
    items: [{
        product: { type: String }, // Store product ID as string for flexibility
        productId: { type: String }, // Alternative field name
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
        fullName: String,
        email: String,
        address: String,
        city: String,
        zipCode: String,
        country: { type: String, default: 'India' }
    },
    paymentMethod: { type: String },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    stripePaymentId: String,
    orderStatus: { type: String, enum: ['processing', 'shipped', 'delivered', 'cancelled'], default: 'processing' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
