import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Coffee, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const products = [
    { id: 1, name: 'Espresso Classic', price: 199, origin: 'Ethiopia', flavor: 'Intense, Dark Chocolate', image: '/assets/products/espresso.png' },
    { id: 2, name: 'Cappuccino Supreme', price: 249, origin: 'Colombia', flavor: 'Silky, Cocoa', image: '/assets/products/cappuccino.png' },
    { id: 3, name: 'Mocha Delight', price: 299, origin: 'Brazil', flavor: 'Rich Chocolate', image: '/assets/products/mocha.png' },
    { id: 4, name: 'Cold Brew Velvet', price: 349, origin: 'Guatemala', flavor: 'Caramel, Smooth', image: '/assets/products/cold_brew.png' },
    { id: 5, name: 'Artisan Latte', price: 279, origin: 'Ethiopia', flavor: 'Light, Creamy', image: '/assets/products/latte_art.png' },
    { id: 6, name: 'Caramel Macchiato', price: 329, origin: 'Peru', flavor: 'Sweet Caramel', image: '/assets/products/macchiato.png' },
];

const PulseSearch = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (query.trim().length > 0) {
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.origin.toLowerCase().includes(query.toLowerCase()) ||
                p.flavor.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [query]);

    const handleResultClick = (id) => {
        onClose();
        navigate(`/shop#product-${id}`);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex flex-col p-6 md:p-24"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={32} />
                    </button>

                    {/* Search Input Area */}
                    <div className="max-w-4xl mx-auto w-full">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="relative mb-16"
                        >
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-coffee-500" size={48} />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="TYPE YOUR CRAVING..."
                                className="w-full bg-transparent border-b-2 border-white/10 py-8 pl-16 text-4xl md:text-6xl font-premium text-white outline-none focus:border-coffee-500 transition-colors placeholder:text-white/10 uppercase"
                            />
                        </motion.div>

                        {/* Search Results */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <AnimatePresence mode="popLayout">
                                {results.map((product, idx) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => handleResultClick(product.id)}
                                        className="group glass p-6 rounded-3xl border border-white/5 hover:border-coffee-500/50 cursor-pointer transition-all duration-500 flex items-center gap-6"
                                    >
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/5 flex-shrink-0">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-premium text-white group-hover:text-coffee-400 transition-colors uppercase">{product.name}</h3>
                                            <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">{product.origin} • {product.flavor}</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-coffee-600 transition-colors">
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Suggestions / No Results */}
                        {query.length > 0 && results.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20"
                            >
                                <Coffee size={64} className="mx-auto text-coffee-900 mb-6 animate-pulse" />
                                <p className="text-2xl text-gray-500 font-premium">No beans match that description...</p>
                                <button
                                    onClick={() => setQuery('')}
                                    className="mt-6 text-coffee-500 underline underline-offset-8 uppercase tracking-widest text-sm"
                                >
                                    Try something else
                                </button>
                            </motion.div>
                        )}

                        {/* Default Suggestions */}
                        {query.length === 0 && (
                            <div className="space-y-4">
                                <p className="text-xs uppercase tracking-widest text-coffee-500 font-bold mb-4">Trending Selection</p>
                                <div className="flex flex-wrap gap-3">
                                    {['Ethiopian Dark', 'Cold Brew', 'Caramel', 'Velvet Latte'].map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => setQuery(tag)}
                                            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-coffee-500 transition-all uppercase tracking-tighter"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PulseSearch;
