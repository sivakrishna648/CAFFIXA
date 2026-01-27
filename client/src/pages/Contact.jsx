import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import axios from 'axios';
import Footer from '../components/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Validation
        if (!formData.name.trim()) {
            setError('Please enter your name');
            setLoading(false);
            return;
        }
        if (!formData.email.trim()) {
            setError('Please enter your email');
            setLoading(false);
            return;
        }
        if (!formData.subject.trim()) {
            setError('Please enter a subject');
            setLoading(false);
            return;
        }
        if (!formData.message.trim()) {
            setError('Please enter your message');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/v1/contact/send-message', {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message
            });

            if (response.data.status === 'success') {
                setSuccess('Thank you for your message! We\'ll get back to you soon.');
                setFormData({ name: '', email: '', subject: '', message: '' });

                // Clear success message after 4 seconds
                setTimeout(() => setSuccess(''), 4000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: Phone,
            title: 'Phone',
            details: '+1 (555) 123-4567',
            link: 'tel:+15551234567'
        },
        {
            icon: Mail,
            title: 'Email',
            details: 'hello@caffixa.com',
            link: 'mailto:hello@caffixa.com'
        },
        {
            icon: MapPin,
            title: 'Address',
            details: 'JNTU Hyderabad, Kukatpally,\nHyderabad, Telangana 500085',
            link: 'https://maps.app.goo.gl/yM9v8Lz1X1Yq1Z7v9'
        },
        {
            icon: Clock,
            title: 'Business Hours',
            details: 'Mon - Fri: 7:00 AM - 8:00 PM\nSat - Sun: 8:00 AM - 6:00 PM',
            link: '#'
        }
    ];

    return (
        <main className="bg-black text-cream">
            {/* Hero Section */}
            <section className="pt-32 pb-16 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-6xl font-premium mb-6">Get In Touch</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Have questions about our premium coffee? We'd love to hear from you.
                        Reach out and let's brew something amazing together!
                    </p>
                </motion.div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {contactInfo.map((info, index) => {
                        const Icon = info.icon;
                        return (
                            <motion.a
                                key={index}
                                href={info.link}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass rounded-2xl p-8 border border-white/10 hover:border-coffee-500/50 transition-all duration-300 group"
                            >
                                <div className="bg-coffee-600/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-coffee-600/40 transition-colors">
                                    <Icon className="text-coffee-500" size={24} />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                                <p className="text-gray-400 text-sm whitespace-pre-line">{info.details}</p>
                            </motion.a>
                        );
                    })}
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-24 container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-premium mb-4 text-center">Send us a Message</h2>
                        <p className="text-center text-gray-400 mb-12">
                            Fill out the form below and we'll respond within 24 hours.
                        </p>

                        <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 border border-white/10">
                            {error && (
                                <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-400 text-sm">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-xl text-green-400 text-sm">
                                    {success}
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-3">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-coffee-500 focus:outline-none transition-colors"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-3">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-coffee-500 focus:outline-none transition-colors"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-400 mb-3">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-coffee-500 focus:outline-none transition-colors"
                                    placeholder="What is this about?"
                                    required
                                />
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-400 mb-3">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-coffee-500 focus:outline-none transition-colors resize-none"
                                    placeholder="Your message here..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary py-4 disabled:opacity-50 transition-all"
                            >
                                {loading ? 'SENDING...' : 'SEND MESSAGE'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="glass rounded-3xl overflow-hidden border border-white/10 h-96 relative group"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.25997!2d78.3908!3d17.4933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91f3f660a0fb%3A0x675ef79288006b02!2sJNTU%20Hyderabad!5e0!3m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(1.2) opacity(0.7)' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="group-hover:opacity-100 transition-opacity duration-700"
                    ></iframe>
                    <div className="absolute inset-0 pointer-events-none border-t border-white/5 bg-gradient-to-b from-black/20 to-transparent"></div>
                </motion.div>
            </section>
            <Footer />
        </main>
    );
};

export default Contact;
