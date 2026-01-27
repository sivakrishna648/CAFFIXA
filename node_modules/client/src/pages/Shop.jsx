import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

const products = [
    {
        id: 1,
        name: 'Espresso Classic',
        description: 'Rich, intense, and perfectly extracted. A true classic with notes of dark chocolate and roasted nuts.',
        price: 199,
        image: '/assets/products/espresso.png',
        origin: 'Ethiopia',
        roast: 'Dark'
    },
    {
        id: 2,
        name: 'Cappuccino Supreme',
        description: 'Silky smooth steamed milk poured over a double shot of our signature espresso. Topped with fine cocoa.',
        price: 249,
        image: '/assets/products/cappuccino.png',
        origin: 'Colombia',
        roast: 'Medium'
    },
    {
        id: 3,
        name: 'Mocha Delight',
        description: 'A luxurious blend of rich chocolate and espresso, finished with a velvet-soft whipped cream topping.',
        price: 299,
        image: '/assets/products/mocha.png',
        origin: 'Brazil',
        roast: 'Medium-Dark'
    },
    {
        id: 4,
        name: 'Cold Brew Velvet',
        description: '24-hour slow-steeped cold brew, served over ice for a smooth, low-acid experience with caramel undertones.',
        price: 349,
        image: '/assets/products/cold_brew.png',
        origin: 'Guatemala',
        roast: 'Medium'
    },
    {
        id: 5,
        name: 'Artisan Latte',
        description: 'Creamy micro-foam poured over a double shot of espresso, featuring intricate latte art by our master baristas.',
        price: 279,
        image: '/assets/products/latte_art.png',
        origin: 'Ethiopia',
        roast: 'Light-Medium'
    },
    {
        id: 6,
        name: 'Caramel Macchiato',
        description: 'Espresso marked with a dollop of frothy milk and a drizzle of artisanal caramel sauce.',
        price: 329,
        image: '/assets/products/macchiato.png',
        origin: 'Peru',
        roast: 'Medium'
    },
    {
        id: 7,
        name: 'Velvet Flat White',
        description: 'A concentrated double shot of espresso topped with a thin layer of velvety micro-foam.',
        price: 289,
        image: '/assets/products/flat_white.png',
        origin: 'New Zealand Style',
        roast: 'Medium'
    },
    {
        id: 8,
        name: 'Single Origin Pour Over',
        description: 'Precision-brewed single-origin beans, highlighting clear, nuanced flavor profiles and delicate acidity.',
        price: 399,
        image: '/assets/products/pour_over.png',
        origin: 'Kenya',
        roast: 'Light'
    },
    {
        id: 9,
        name: 'Traditional Turkish',
        description: 'Finely ground coffee boiled in a cezve, served unfiltered with a rich foam and aromatic spices.',
        price: 259,
        image: '/assets/products/turkish_coffee.png',
        origin: 'Turkey',
        roast: 'Dark'
    },
    {
        id: 10,
        name: 'Iced Americano Gold',
        description: 'Pure espresso shots topped with chilled water and ice, delivering a crisp and refreshing caffeine kick.',
        price: 229,
        image: '/assets/products/iced_americano.png',
        origin: 'Blend',
        roast: 'Medium-Dark'
    },
    {
        id: 11,
        name: 'Royal Irish Coffee',
        description: 'A warming blend of hot coffee, premium Irish cream, and a cloud of velvet-soft whipped cream.',
        price: 449,
        image: '/assets/products/irish_coffee.png',
        origin: 'Ireland Inspired',
        roast: 'Dark'
    },
    {
        id: 12,
        name: 'Pure Ristretto',
        description: 'A "restricted" espresso shot, pulled with less water for a more concentrated, sweeter, and intense flavor.',
        price: 189,
        image: '/assets/products/ristretto.png',
        origin: 'Italy',
        roast: 'Medium-Dark'
    }
];

const Shop = () => {
    return (
        <div className="pt-32 pb-24 bg-black min-h-screen text-cream">
            <div className="container mx-auto px-6">
                <header className="mb-16 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-premium mb-4"
                    >
                        The <span className="text-coffee-500">Menu</span>
                    </motion.h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Discover our curated selection of premium coffee, ethically sourced and roasted to perfection for the ultimate sensory experience.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
