import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
    Coffee,
    Zap,
    Star,
    Clock,
    Package,
    ChevronRight,
    ShieldCheck,
    Flame,
    Award
} from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();

    // Mock data for the "Unique" feel
    const flavorProfile = [
        { label: 'Roast', value: 85 },
        { label: 'Acidity', value: 45 },
        { label: 'Sweetness', value: 70 },
        { label: 'Body', value: 90 },
        { label: 'Aroma', value: 75 },
    ];

    const orders = [
        { id: '#CF-8921', date: 'Oct 24, 2025', status: 'Delivered', amount: '₹1,249', items: 'Espresso Classic x2, Mocha x1' },
        { id: '#CF-8845', date: 'Oct 12, 2025', status: 'In Transit', amount: '₹598', items: 'Cold Brew Velvet x2' },
    ];

    const stats = [
        { icon: Coffee, label: 'Brews Enjoyed', value: '42', color: 'text-coffee-400' },
        { icon: Award, label: 'Barista Level', value: 'Master', color: 'text-amber-400' },
        { icon: Flame, label: 'Order Streak', value: '5 Days', color: 'text-orange-500' },
    ];

    return (
        <div className="pt-32 pb-24 bg-black min-h-screen text-cream overflow-hidden">
            <div className="container mx-auto px-6 relative">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coffee-900/10 rounded-full blur-[120px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-coffee-900/10 rounded-full blur-[120px] -z-10" />

                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-premium mb-2">Welcome back, <span className="text-coffee-500">{user?.name.split(' ')[0]}</span></h1>
                        <p className="text-gray-500 tracking-widest uppercase text-xs font-bold">Your Barista Lounge • Member ID: #CXA-{user?._id?.slice(-5) || '8839'}</p>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Stats Grid */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((stat, idx) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="glass p-8 rounded-3xl border border-white/5 group hover:border-coffee-500/30 transition-all"
                                    >
                                        <div className={`p-4 rounded-2xl bg-white/5 w-fit mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                                            <Icon size={24} />
                                        </div>
                                        <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">{stat.label}</p>
                                        <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Recent Activity / Experience Journal */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass p-8 rounded-3xl border border-white/5"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-premium">Sipping <span className="text-coffee-500">History</span></h2>
                                <button className="text-xs uppercase tracking-widest text-coffee-600 font-bold hover:text-coffee-400">View Protocol</button>
                            </div>
                            <div className="space-y-4">
                                {orders.map((order, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-xl bg-coffee-950 flex items-center justify-center border border-coffee-900">
                                                <Package className="text-coffee-500" size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold">{order.id}</h4>
                                                <p className="text-xs text-gray-500 uppercase tracking-tighter mt-1">{order.items}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-bold">{order.amount}</p>
                                            <div className="flex items-center gap-2 justify-end mt-1">
                                                <span className={`w-2 h-2 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-amber-500'}`} />
                                                <span className="text-[10px] uppercase font-bold text-gray-400">{order.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    </div>

                    {/* Flavor Palette Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden group"
                        >
                            <h2 className="text-xl font-premium mb-8 uppercase tracking-widest">Flavor <span className="text-coffee-500">Palette</span></h2>

                            <div className="space-y-6 mb-8">
                                {flavorProfile.map((point, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between text-xs uppercase tracking-widest mb-2 font-bold">
                                            <span className="text-gray-400">{point.label}</span>
                                            <span className="text-coffee-400">{point.value}%</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${point.value}%` }}
                                                transition={{ duration: 1, delay: 0.8 + (idx * 0.1) }}
                                                className="h-full bg-gradient-to-r from-coffee-800 to-coffee-400"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 rounded-2xl bg-coffee-500/10 border border-coffee-500/20">
                                <p className="text-xs text-coffee-300 leading-relaxed">
                                    <Zap size={12} className="inline mr-2" />
                                    Your preference leans towards **Bold & Aromatic** blends with high body. We recommend trying our **Dark Roast Ethiopia**.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden group bg-gradient-to-br from-coffee-950/40 to-black"
                        >
                            <Star className="absolute -top-4 -right-4 text-coffee-900/50" size={120} />
                            <h3 className="text-xl font-premium mb-4">Elite <span className="text-coffee-500">Rewards</span></h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="w-[65%] h-full bg-coffee-600" />
                                </div>
                                <span className="text-xs text-gray-400 font-bold uppercase">450 / 600 BP</span>
                            </div>
                            <p className="text-sm text-gray-400 mb-6 font-medium">150 more Barista Points for a free **Artisan Pour-Over** session.</p>
                            <button className="w-full py-4 rounded-xl bg-coffee-600 text-white font-bold uppercase tracking-widest text-xs hover:bg-coffee-500 transition-colors">
                                COLLECT POINTS
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
