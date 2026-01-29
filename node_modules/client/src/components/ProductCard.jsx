import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Plus, Info, ExternalLink } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, index }) => {
    const { addToCart } = useCart();

    // Magnetic / Tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative bg-[#0a0a0a] rounded-[40px] overflow-hidden border border-white/5 hover:border-coffee-500/30 transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(111,78,55,0.15)]"
        >
            {/* Image Container with Parallax Internal Element */}
            <div className="relative aspect-[4/5] overflow-hidden m-2 rounded-[32px]">
                <motion.img
                    src={product.image}
                    alt={product.name}
                    style={{ transform: "translateZ(50px)" }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Floating Badge (Unique Element) */}
                <div className="absolute top-6 left-6 z-10">
                    <span className="bg-black/60 backdrop-blur-md text-[10px] text-coffee-400 font-bold tracking-widest uppercase py-2 px-4 rounded-full border border-white/10">
                        {product.origin}
                    </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                {/* Perspective Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-[4px]" style={{ transform: "translateZ(70px)" }}>
                    <button
                        onClick={() => addToCart(product)}
                        className="p-5 bg-coffee-600 text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-xl"
                    >
                        <Plus size={28} />
                    </button>
                    <button className="p-5 bg-white/10 text-white border border-white/10 rounded-full hover:bg-white/20 transition-all duration-300">
                        <Info size={28} />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8" style={{ transform: "translateZ(30px)" }}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-premium text-white">{product.name}</h3>
                    <div className="h-[1px] flex-1 mx-4 bg-white/5" />
                    <span className="text-xl font-bold text-coffee-400">₹{product.price}</span>
                </div>

                <p className="text-gray-500 text-sm line-clamp-2 mb-8 uppercase tracking-tighter leading-relaxed">
                    {product.description}
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={() => addToCart(product)}
                        className="flex-1 py-4 bg-white text-black rounded-2xl font-bold hover:bg-coffee-500 hover:text-white transition-all duration-300 uppercase tracking-widest text-[10px]"
                    >
                        Quick Add
                    </button>
                    <button className="p-4 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-white/10 transition-colors">
                        <ExternalLink size={18} />
                    </button>
                </div>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none bg-gradient-to-tr from-white/0 via-white/10 to-white/0 transition-opacity duration-1000 rotate-45 translate-x-full group-hover:-translate-x-full" />
        </motion.div>
    );
};

export default ProductCard;
