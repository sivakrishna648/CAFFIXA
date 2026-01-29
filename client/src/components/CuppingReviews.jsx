import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Quote, Coffee, CheckCircle2 } from 'lucide-react';

const reviews = [
    {
        id: 1,
        user: "Arjun Mehta",
        role: "Certified Q-Grader",
        text: "The Espresso Classic here has a remarkably balanced profile. The brightness of the Ethiopian beans shines through without being overpowering.",
        rating: 5,
        tags: ["Balanced", "Bright", "Floral"],
        date: "2 days ago"
    },
    {
        id: 2,
        user: "Sarah Jenkins",
        role: "Home Barista",
        text: "Finally found a Cold Brew that doesn't taste like charcoal. The caramel notes are genuine, not synthetic. Best breakfast fuel.",
        rating: 4.8,
        tags: ["Caramel", "Smooth"],
        date: "1 week ago"
    },
    {
        id: 3,
        user: "Liam Chen",
        role: "Verified Sipper",
        text: "The Artisan Latte is a work of art. Not just the foam, but the texture of the milk is exactly where it needs to be. Highly recommended.",
        rating: 5,
        tags: ["Creamy", "Silky"],
        date: "3 days ago"
    }
];

const CuppingReviews = () => {
    return (
        <section className="py-24 bg-[#050505] overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-premium mb-4">Community <span className="text-coffee-500">Cupping</span></h2>
                        <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Real notes from real enthusiasts</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-4 bg-white/5 p-6 rounded-3xl border border-white/10"
                    >
                        <div className="text-center">
                            <p className="text-4xl font-bold text-white">4.9</p>
                            <div className="flex text-coffee-500 mt-1">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                            </div>
                        </div>
                        <div className="h-12 w-[1px] bg-white/10 mx-2" />
                        <p className="text-xs text-gray-400 font-medium leading-relaxed">
                            Based on <span className="text-white font-bold">1,240+</span> <br /> Verified Tasting Sessions
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="glass p-10 rounded-[40px] border border-white/5 hover:border-coffee-500/20 transition-all group relative"
                        >
                            <Quote className="absolute top-10 right-10 text-white/5 group-hover:text-coffee-500/10 transition-colors" size={80} />

                            <div className="flex gap-1 mb-8">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={i < Math.floor(review.rating) ? "text-coffee-500" : "text-gray-800"}
                                        fill={i < Math.floor(review.rating) ? "currentColor" : "none"}
                                    />
                                ))}
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">
                                "{review.text}"
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10">
                                {review.tags.map(tag => (
                                    <span key={tag} className="text-[10px] uppercase tracking-widest font-bold py-1.5 px-3 rounded-full bg-coffee-500/10 text-coffee-400 border border-coffee-500/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-coffee-600 to-coffee-900 flex items-center justify-center text-white font-bold text-xl">
                                    {review.user.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-white font-bold uppercase tracking-tighter">{review.user}</h4>
                                        <CheckCircle2 size={14} className="text-coffee-500" />
                                    </div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{review.role} • {review.date}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 text-center"
                >
                    <button className="group flex items-center gap-3 mx-auto text-coffee-500 font-bold uppercase tracking-[0.3em] text-xs hover:text-white transition-colors">
                        <MessageSquare size={18} />
                        Share Your Tasting Notes
                        <div className="w-8 h-[1px] bg-coffee-500 group-hover:w-16 transition-all" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default CuppingReviews;
