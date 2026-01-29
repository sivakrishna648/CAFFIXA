import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, ChevronDown, Search, LayoutDashboard } from 'lucide-react';
import PulseSearch from './PulseSearch';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { cartCount, setIsCartOpen } = useCart();
    const { user, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Our Story', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-lg py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="text-3xl font-premium font-bold tracking-widest text-white">
                    CAFFI<span className="text-coffee-500">XA</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium tracking-widest hover:text-coffee-400 transition-colors ${location.pathname === link.path ? 'text-coffee-500' : 'text-cream'}`}
                        >
                            {link.name.toUpperCase()}
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="hidden md:flex items-center space-x-6 text-cream">
                    {/* Search Trigger */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="hover:text-coffee-400 transition-colors"
                    >
                        <Search size={20} />
                    </button>

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-2 hover:text-coffee-400 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-coffee-600 flex items-center justify-center text-white text-xs font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-xs uppercase tracking-tighter hidden lg:block">{user.name.split(' ')[0]}</span>
                                <ChevronDown size={14} className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-4 w-64 glass border border-white/10 rounded-2xl p-6 shadow-2xl"
                                    >
                                        <div className="mb-4 pb-4 border-b border-white/10">
                                            <p className="text-sm font-premium text-white">{user.name}</p>
                                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Link
                                                to="/dashboard"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="w-full flex items-center space-x-3 text-sm text-gray-300 hover:text-coffee-400 transition-colors py-2"
                                            >
                                                <LayoutDashboard size={16} />
                                                <span>Barista Lounge</span>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsProfileOpen(false);
                                                }}
                                                className="w-full flex items-center space-x-3 text-sm text-red-400 hover:text-red-300 transition-colors py-2"
                                            >
                                                <LogOut size={16} />
                                                <span>Log Out</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link to="/login" className="hover:text-coffee-400 transition-colors">
                            <User size={20} />
                        </Link>
                    )}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative hover:text-coffee-400 transition-colors"
                    >
                        <ShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-coffee-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>

                <PulseSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

                {/* Mobile Toggle */}
                <button className="md:hidden text-cream" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl py-8 flex flex-col items-center space-y-6 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-lg font-medium tracking-widest ${location.pathname === link.path ? 'text-coffee-500' : 'text-cream'}`}
                            >
                                {link.name.toUpperCase()}
                            </Link>
                        ))}
                        <div className="flex flex-col items-center space-y-4 pt-4 w-full px-6">
                            {user ? (
                                <div className="w-full space-y-4">
                                    <div className="flex items-center space-x-4 p-4 glass rounded-2xl">
                                        <div className="w-12 h-12 rounded-full bg-coffee-600 flex items-center justify-center text-white text-lg font-bold">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-white font-premium">{user.name}</p>
                                            <p className="text-xs text-gray-400">{user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full flex items-center justify-center space-x-3 text-red-400 py-4 glass rounded-2xl"
                                    >
                                        <LogOut size={20} />
                                        <span>Log Out</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex space-x-8">
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <User size={24} className="text-cream" />
                                    </Link>
                                    <div className="relative" onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}>
                                        <ShoppingCart size={24} className="text-cream" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-coffee-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
