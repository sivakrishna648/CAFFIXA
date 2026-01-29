import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const { user } = useAuth();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-[#0c0c0c] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-coffee-500" />
                                <h2 className="text-2xl font-premium uppercase tracking-wider">Your Cart</h2>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <ShoppingBag size={64} className="text-white/10 mb-4" />
                                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                                    <Link
                                        to="/shop"
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-6 text-coffee-500 font-semibold hover:text-coffee-400 transition-colors"
                                    >
                                        CONTINUE SHOPPING
                                    </Link>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={item.id}
                                        className="flex gap-4 group"
                                    >
                                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <h3 className="font-semibold text-white">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-500 hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-3 uppercase tracking-tighter">₹{item.price}</p>

                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-2 hover:bg-white/5 text-gray-400"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-2 hover:bg-white/5 text-gray-400"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <span className="text-coffee-300 font-semibold ml-auto">₹{item.price * item.quantity}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-8 bg-[#111111] border-t border-white/10 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Shipping</span>
                                        <span className="text-green-500">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/5">
                                        <span>Total</span>
                                        <span>₹{cartTotal}</span>
                                    </div>
                                </div>

                                <Link
                                    to={user ? "/checkout" : "/login?redirect=checkout"}
                                    onClick={() => setIsCartOpen(false)}
                                    className="w-full py-4 bg-coffee-600 hover:bg-coffee-700 text-white rounded-xl font-bold shadow-lg shadow-coffee-900/20 transition-all active:scale-95 group flex items-center justify-center gap-3"
                                >
                                    {user ? "PROCEED TO CHECKOUT" : "LOGIN TO CHECKOUT"}
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
