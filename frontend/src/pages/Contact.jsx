import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { sendContactMessage } from '../services/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await sendContactMessage(formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Have a project in mind or just want to say hi? Feel free to reach out using the form below.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-xl">
                            <Mail />
                        </div>
                        <div>
                            <h3 className="font-bold mb-1 font-lg">Email</h3>
                            <p className="text-slate-500 text-sm">arumugamvimal1@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-xl">
                            <Phone />
                        </div>
                        <div>
                            <h3 className="font-bold mb-1 font-lg">Phone</h3>
                            <p className="text-slate-500 text-sm">9751608678</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-xl">
                            <MapPin />
                        </div>
                        <div>
                            <h3 className="font-bold mb-1 font-lg">Location</h3>
                            <p className="text-slate-500 text-sm">Hosur,Tamil Nadu</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {status === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-8 rounded-2xl flex flex-col items-center text-center space-y-4"
                        >
                            <CheckCircle2 size={48} />
                            <h2 className="text-2xl font-bold">Message Sent!</h2>
                            <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="text-sm font-bold underline"
                            >
                                Send another message
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                    placeholder="Inquiry about project..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                                <textarea
                                    required
                                    rows="5"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none"
                                    placeholder="How can I help you?"
                                ></textarea>
                            </div>
                            <button
                                disabled={status === 'sending'}
                                type="submit"
                                className="w-full md:w-auto px-12 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {status === 'sending' ? 'Sending...' : 'Send Message'}
                                <Send size={18} />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
