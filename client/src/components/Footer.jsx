import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-white/10 mt-24">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div>
                        <h3 className="text-2xl font-premium font-bold mb-4">
                            CAFFI<span className="text-coffee-500">XA</span>
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Premium coffee sourced from the world's finest plantations, roasted to perfection for your daily ritual.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-coffee-500 transition-colors text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop" className="text-gray-400 hover:text-coffee-500 transition-colors text-sm">
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-coffee-500 transition-colors text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-coffee-500 transition-colors text-sm">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
                        <div className="space-y-3">
                            <a
                                href="tel:+15551234567"
                                className="flex items-center space-x-2 text-gray-400 hover:text-coffee-500 transition-colors text-sm"
                            >
                                <Phone size={16} />
                                <span>+1 (555) 123-4567</span>
                            </a>
                            <a
                                href="mailto:hello@caffixa.com"
                                className="flex items-center space-x-2 text-gray-400 hover:text-coffee-500 transition-colors text-sm"
                            >
                                <Mail size={16} />
                                <span>hello@caffixa.com</span>
                            </a>
                            <div className="flex items-start space-x-2 text-gray-400 text-sm">
                                <MapPin size={16} className="flex-shrink-0 mt-1" />
                                <span>123 Coffee Street, Brew City, BC 12345</span>
                            </div>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Business Hours</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p>
                                <span className="font-medium text-white">Mon - Fri:</span><br />
                                7:00 AM - 8:00 PM
                            </p>
                            <p>
                                <span className="font-medium text-white">Sat - Sun:</span><br />
                                8:00 AM - 6:00 PM
                            </p>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="border-t border-white/10 pt-8 mb-8">
                    <div className="flex justify-center space-x-6 mb-8">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-coffee-500 transition-colors"
                            aria-label="Facebook"
                        >
                            <Facebook size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-coffee-500 transition-colors"
                            aria-label="Twitter"
                        >
                            <Twitter size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-coffee-500 transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-coffee-500 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="border-t border-white/10 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {currentYear} CAFFIXA. All rights reserved. |
                        <Link to="#" className="hover:text-coffee-500 transition-colors"> Privacy Policy</Link> |
                        <Link to="#" className="hover:text-coffee-500 transition-colors"> Terms of Service</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
