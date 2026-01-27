import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Coffee } from 'lucide-react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/forgot-password', {
                email
            });

            if (response.data.status === 'success') {
                setSuccess('Password reset link has been sent to your email. Check your inbox!');
                setEmail('');
                // In production, you'd redirect to login after a delay
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6 py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-coffee-900/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-coffee-600/10 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full glass rounded-3xl p-10 border border-white/10 relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-block p-4 bg-coffee-600 rounded-2xl mb-4">
                        <Coffee className="text-white" size={32} />
                    </div>
                    <h1 className="text-4xl font-premium mb-2">Forgot Password?</h1>
                    <p className="text-gray-400">Enter your email to reset your password</p>
                </div>

                {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">{error}</div>}
                {success && <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-sm">{success}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-coffee-500 transition-colors outline-none"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full btn-primary py-4 disabled:opacity-50">
                        {loading ? 'SENDING...' : 'SEND RESET LINK'}
                    </button>
                </form>

                <p className="mt-10 text-center text-gray-400">
                    Remember your password? <Link to="/login" className="text-coffee-500 font-semibold hover:text-coffee-400 transition-colors">Sign in</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
