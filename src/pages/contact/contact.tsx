
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    MessageSquare,
    Facebook,
    Instagram,
    Linkedin,
    Send,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    message?: string;
}

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        subject: 'General Query',
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut'
            }
        }
    };

    const formVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: 'easeOut'
            }
        }
    };

    const successVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut'
            }
        },
        exit: {
            scale: 0.8,
            opacity: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitted(true);
        setIsSubmitting(false);

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                subject: 'General Query',
                message: ''
            });
        }, 3000);
    };

    const contactInfo = [
        {
            icon: MapPin,
            label: 'Address',
            value: '123 Business District, Mumbai, Maharashtra 400001',
            color: 'text-blue-600'
        },
        {
            icon: Phone,
            label: 'Phone',
            value: '+91 98765-43210',
            color: 'text-green-600'
        },
        {
            icon: Mail,
            label: 'Email',
            value: 'support@travelagency.com',
            color: 'text-purple-600'
        },
        {
            icon: Clock,
            label: 'Timings',
            value: 'Mon-Sat: 9:00 AM - 7:00 PM',
            color: 'text-orange-600'
        }
    ];

    const socialLinks = [
        { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
        { icon: Instagram, href: '#', color: 'hover:text-pink-600' },
        { icon: MessageSquare, href: 'https://wa.me/919876543210', color: 'hover:text-green-600' },
        { icon: Linkedin, href: '#', color: 'hover:text-blue-800' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <motion.div
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-40"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <div className="container mx-auto px-6 text-center">
                    <motion.h1
                        className="text-5xl font-bold mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        We'd Love to Hear From You
                    </motion.h1>
                    <motion.p
                        className="text-xl opacity-90 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Have questions? Need help planning your trip? Contact our expert team today and let's make your travel dreams come true.
                    </motion.p>
                </div>
            </motion.div>

            <div className="container mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Information */}
                    <motion.div
                        className="space-y-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants}>
                            <h2 className="text-3xl font-bold text-gray-800 mb-8">Get In Touch</h2>
                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                                        variants={itemVariants}
                                        whileHover={{
                                            y: -5,
                                            transition: { duration: 0.2 }
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <motion.div
                                            className={`p-3 rounded-full bg-gray-50 ${item.color}`}
                                            whileHover={{ rotate: 10, scale: 1.1 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <item.icon size={24} />
                                        </motion.div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-1">{item.label}</h3>
                                            <p className="text-gray-600">{item.value}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Google Maps Embed */}
                        <motion.div
                            className="bg-white rounded-xl shadow-md overflow-hidden"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                <div className="text-center text-gray-600">
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    >
                                        <MapPin size={48} className="mx-auto mb-4 text-blue-600" />
                                    </motion.div>
                                    <p className="font-medium">Interactive Map</p>
                                    <p className="text-sm">Google Maps integration available</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Social Media */}
                        <motion.div
                            className="bg-white rounded-xl shadow-md p-6"
                            variants={itemVariants}
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        className={`p-3 bg-gray-50 rounded-full text-gray-600 ${social.color} transition-colors duration-300`}
                                        whileHover={{
                                            scale: 1.2,
                                            rotate: 10,
                                            boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <social.icon size={24} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="bg-white rounded-2xl shadow-xl p-8"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h2
                            className="text-3xl font-bold text-gray-800 mb-8"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Send us a Message
                        </motion.h2>

                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    className="text-center py-12"
                                    variants={successVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    key="success"
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
                                    <p className="text-gray-600">Thanks for reaching out! We'll get back to you within 24 hours.</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="space-y-6"
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Full Name */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <motion.input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                                                }`}
                                            placeholder="Enter your full name"
                                            whileFocus={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                        <AnimatePresence>
                                            {errors.fullName && (
                                                <motion.div
                                                    className="flex items-center mt-2 text-red-600 text-sm"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <AlertCircle size={16} className="mr-1" />
                                                    {errors.fullName}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Email */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <motion.input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                                                }`}
                                            placeholder="Enter your email address"
                                            whileFocus={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                        <AnimatePresence>
                                            {errors.email && (
                                                <motion.div
                                                    className="flex items-center mt-2 text-red-600 text-sm"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <AlertCircle size={16} className="mr-1" />
                                                    {errors.email}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Phone */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <motion.input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter your phone number"
                                            whileFocus={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    </motion.div>

                                    {/* Subject */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    >
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject / Query Type
                                        </label>
                                        <motion.select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            whileFocus={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <option value="Booking">Booking</option>
                                            <option value="Custom Trip">Custom Trip</option>
                                            <option value="General Query">General Query</option>
                                            <option value="Feedback">Feedback</option>
                                        </motion.select>
                                    </motion.div>

                                    {/* Message */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                    >
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <motion.textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={5}
                                            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                                                }`}
                                            placeholder="Tell us about your travel plans or questions..."
                                            whileFocus={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                        <AnimatePresence>
                                            {errors.message && (
                                                <motion.div
                                                    className="flex items-center mt-2 text-red-600 text-sm"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <AlertCircle size={16} className="mr-1" />
                                                    {errors.message}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <motion.div
                                                    className="rounded-full h-5 w-5 border-b-2 border-white"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                ></motion.div>
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                <span>Send Message</span>
                                            </>
                                        )}
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Urgent Help CTA */}
                <motion.div
                    className="mt-16 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl p-8 text-center shadow-xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <motion.h3
                        className="text-2xl font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        Need Urgent Help?
                    </motion.h3>
                    <motion.p
                        className="text-lg mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        Call our 24/7 Helpline for immediate assistance
                    </motion.p>
                    <motion.a
                        href="tel:+919876543210"
                        className="inline-flex items-center space-x-2 bg-white text-red-600 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 10px 30px rgba(255,255,255,0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                        >
                            <Phone size={20} />
                        </motion.div>
                        <span>+91 98765-43210</span>
                    </motion.a>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;