import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, index }) => {
    const { addToCart } = useCart();
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-[#111111] rounded-3xl overflow-hidden border border-white/5 hover:border-coffee-500/30 transition-all duration-500"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                {/* Hover Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-[2px]">
                    <button
                        onClick={() => addToCart(product)}
                        className="p-4 bg-white text-black rounded-full hover:bg-coffee-500 hover:text-white transition-colors duration-300"
                    >
                        <Plus size={24} />
                    </button>
                    <button className="p-4 bg-white/10 text-white border border-white/20 rounded-full hover:bg-white/20 transition-colors duration-300">
                        <Info size={24} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-premium mb-1">{product.name}</h3>
                        <span className="text-xs tracking-widest text-coffee-400 uppercase font-semibold">{product.origin} • {product.roast}</span>
                    </div>
                    <span className="text-xl font-bold text-coffee-300">₹{product.price}</span>
                </div>

                <p className="text-gray-400 text-sm line-clamp-2 mb-6">
                    {product.description}
                </p>

                <button
                    onClick={() => addToCart(product)}
                    className="w-full py-4 bg-transparent border border-coffee-800 text-coffee-400 rounded-xl font-semibold hover:bg-coffee-600 hover:text-white hover:border-coffee-600 transition-all duration-300 uppercase tracking-tighter text-sm"
                >
                    Add To Cart
                </button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
