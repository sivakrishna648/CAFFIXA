import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="pt-32 bg-black text-cream min-h-screen">
            <div className="container mx-auto px-6">
                <header className="mb-24 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-premium mb-8"
                    >
                        Our <span className="text-coffee-500">Story</span>
                    </motion.h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Born from a passion for the perfect roast, CAFFIXA is a tribute to the craftsmen and the connoisseurs who believe coffee is the ultimate art form.
                    </p>
                </header>

                <section className="grid md:grid-cols-2 gap-24 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl font-premium">The <span className="text-coffee-500">Origin</span> of Excellence</h2>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            We travel the world to find the most exceptional beans, working directly with small-scale farmers who share our commitment to sustainability and quality. Every bean tells a story of the soil, the altitude, and the hands that nurtured it.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-6">
                            <div>
                                <span className="text-4xl font-bold text-coffee-500 tracking-tighter">100%</span>
                                <p className="text-sm text-gray-500 uppercase tracking-widest mt-2">Ethically Sourced</p>
                            </div>
                            <div>
                                <span className="text-4xl font-bold text-coffee-500 tracking-tighter">48h</span>
                                <p className="text-sm text-gray-500 uppercase tracking-widest mt-2">Roast to Order</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] bg-coffee-900/20 rounded-3xl overflow-hidden border border-white/10 p-4">
                            <img src="/assets/hero.png" alt="Coffee Brewing" className="w-full h-full object-cover rounded-2xl" />
                        </div>
                    </motion.div>
                </section>

                <section className="py-24 border-t border-white/10 text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-4xl font-premium mb-12"
                    >
                        Experience the <span className="text-coffee-500">CAFFIXA Difference</span>
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: 'Artisan Roasting', desc: 'Small-batch roasting ensures extreme precision and flavor development.' },
                            { title: 'Global Sourcing', desc: 'Direct-trade relationships with the world\'s finest coffee estates.' },
                            { title: 'Expert Curation', desc: 'Every blend is tested and refined by our master tasters.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-coffee-500/30 transition-all"
                            >
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-gray-500">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
