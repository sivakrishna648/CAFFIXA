import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Coffee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signup, fetchUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
            localStorage.setItem('token', token);
            fetchUser().then(() => {
                const redirect = params.get('redirect') || '/';
                navigate(redirect);
            });
        }
    }, [location, navigate, fetchUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await signup(name, email, password);
        if (result.success) {
            const params = new URLSearchParams(location.search);
            const redirect = params.get('redirect') || '/';
            navigate(redirect);
        } else {
            setError(result.message);
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        const params = new URLSearchParams(location.search);
        const redirect = params.get('redirect');
        const googleAuthUrl = `${import.meta.env.VITE_API_URL}/auth/google`;
        window.location.href = redirect ? `${googleAuthUrl}?redirect=${redirect}` : googleAuthUrl;
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6 py-24 relative overflow-hidden">
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
                    <h1 className="text-4xl font-premium mb-2">Create Account</h1>
                    <p className="text-gray-400">Join the elite world of CAFFIXA</p>
                </div>

                {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-coffee-500 transition-colors outline-none"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>

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

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-coffee-500 transition-colors outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full btn-primary py-4 disabled:opacity-50">
                        {loading ? 'CREATING ACCOUNT...' : 'GET STARTED'}
                    </button>
                </form>

                <div className="mt-8 flex items-center gap-4">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-gray-500 uppercase tracking-widest">or sign up with</span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full mt-6 py-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 transition-colors"
                >
                    <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" width="20" alt="Google" />
                    <span className="font-semibold text-white">Google Signup</span>
                </button>

                <p className="mt-10 text-center text-gray-400">
                    Already have an account? <Link to="/login" className="text-coffee-500 font-semibold hover:text-coffee-400 transition-colors">Sign in</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
