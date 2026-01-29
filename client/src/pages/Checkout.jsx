import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { CreditCard, Wallet, Smartphone, ShieldCheck, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cartItems, cartTotal } = useCart();
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [selectedMethod, setSelectedMethod] = useState('card');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zipCode: ''
    });

    // Redirect to login if not authenticated
    React.useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login?redirect=checkout');
        }
    }, [user, authLoading, navigate]);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-coffee-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) return null;

    const paymentMethods = [
        { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
        { id: 'upi', name: 'UPI / PhonePe / GooglePay', icon: Smartphone },
        { id: 'wallet', name: 'Wallets (Paytm / Amazon)', icon: Wallet },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.fullName.trim()) {
            setError('Please enter your full name');
            return false;
        }
        if (!formData.email.trim()) {
            setError('Please enter your email address');
            return false;
        }
        if (!formData.address.trim()) {
            setError('Please enter your address');
            return false;
        }
        if (!formData.city.trim()) {
            setError('Please enter your city');
            return false;
        }
        if (!formData.zipCode.trim()) {
            setError('Please enter your zip code');
            return false;
        }
        if (cartItems.length === 0) {
            setError('Your cart is empty');
            return false;
        }
        return true;
    };

    const handleCompletePurchase = async () => {
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Create checkout session
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders/checkout`, {
                items: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                shippingAddress: {
                    fullName: formData.fullName,
                    email: formData.email,
                    address: formData.address,
                    city: formData.city,
                    zipCode: formData.zipCode
                },
                paymentMethod: selectedMethod,
                totalAmount: cartTotal
            });

            if (response.data.status === 'success') {
                setSuccess('Order placed successfully! Redirecting to payment...');
                setFormData({
                    fullName: '',
                    email: '',
                    address: '',
                    city: '',
                    zipCode: ''
                });

                // Redirect to Stripe checkout after 1 second
                setTimeout(() => {
                    if (response.data.sessionUrl) {
                        window.location.href = response.data.sessionUrl;
                    }
                }, 1000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to process order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-24 bg-black min-h-screen text-cream">
            <div className="container mx-auto px-6 max-w-6xl">
                <h1 className="text-4xl md:text-5xl font-premium mb-12">Finalize <span className="text-coffee-500">Selection</span></h1>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-4 bg-red-500/20 border border-red-500 rounded-xl flex items-center gap-3 text-red-400"
                    >
                        <AlertCircle size={20} />
                        {error}
                    </motion.div>
                )}

                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-4 bg-green-500/20 border border-green-500 rounded-xl flex items-center gap-3 text-green-400"
                    >
                        <CheckCircle size={20} />
                        {success}
                    </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Checkout Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Shipping section - simplified for visual */}
                        <section className="glass rounded-3xl p-8 border border-white/10">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-coffee-600 flex items-center justify-center text-sm">1</span>
                                Shipping Address
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-coffee-500"
                                    placeholder="Full Name"
                                />
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-coffee-500"
                                    placeholder="Email Address"
                                />
                                <input
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-coffee-500 md:col-span-2"
                                    placeholder="Street Address"
                                />
                                <input
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-coffee-500"
                                    placeholder="City"
                                />
                                <input
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-coffee-500"
                                    placeholder="Zip Code"
                                />
                            </div>
                        </section>

                        {/* Payment Method section */}
                        <section className="glass rounded-3xl p-8 border border-white/10">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-coffee-600 flex items-center justify-center text-sm">2</span>
                                Payment Method
                            </h2>
                            <div className="space-y-4">
                                {paymentMethods.map((method) => {
                                    const Icon = method.icon;
                                    return (
                                        <div
                                            key={method.id}
                                            onClick={() => setSelectedMethod(method.id)}
                                            className={`flex items-center justify-between p-6 rounded-2xl border cursor-pointer transition-all ${selectedMethod === method.id
                                                ? 'border-coffee-500 bg-coffee-500/10'
                                                : 'border-white/10 bg-white/5 hover:border-white/20'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-xl ${selectedMethod === method.id ? 'bg-coffee-600' : 'bg-white/5'}`}>
                                                    <Icon size={24} />
                                                </div>
                                                <span className="font-semibold">{method.name}</span>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.id ? 'border-coffee-500' : 'border-gray-600'}`}>
                                                {selectedMethod === method.id && <div className="w-3 h-3 rounded-full bg-coffee-500" />}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-6">
                            <div className="glass rounded-3xl p-8 border border-white/10">
                                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                                <div className="space-y-6 max-h-[300px] overflow-y-auto mb-6 pr-2">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-white/5" />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm truncate">{item.name}</p>
                                                <p className="text-xs text-coffee-400">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="text-sm font-semibold">₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-white/10 pt-6 space-y-4">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Shipping</span>
                                        <span className="text-green-500">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-2xl font-bold text-white pt-4">
                                        <span>Total</span>
                                        <span>₹{cartTotal}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCompletePurchase}
                                    disabled={loading}
                                    className="w-full btn-primary py-4 mt-8 group flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'PROCESSING...' : 'COMPLETE PURCHASE'}
                                    {!loading && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                                </button>

                                <div className="flex items-center justify-center gap-2 mt-6 text-gray-500 text-xs">
                                    <ShieldCheck size={14} />
                                    Secure payment powered by Stripe
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
