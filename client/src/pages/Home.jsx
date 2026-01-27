import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <main className="bg-black text-cream">
            <Hero />

            <section className="py-24 container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="md:w-1/2"
                    >
                        <h2 className="text-5xl font-premium mb-6">The Art of <span className="text-coffee-500">Perfect Brewing</span></h2>
                        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                            At CAFFIXA, we believe coffee is more than just a drink—it's a journey.
                            From the high-altitude plantations to your ceramic cup, every bean is treated with the reverence it deserves.
                        </p>
                        <Link to="/about" className="inline-block btn-secondary">EXPLORE OUR STORY</Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="md:w-1/2 relative"
                    >
                        <div className="aspect-square bg-coffee-900/20 rounded-2xl overflow-hidden border border-white/5">
                            <img src="/assets/products/espresso.png" alt="Espresso" className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" />
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default Home;
