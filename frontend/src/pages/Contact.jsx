import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle2, Sparkles } from 'lucide-react';
import { sendContactMessage } from '../services/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
            <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary-600 dark:text-primary-400 font-black uppercase tracking-[0.4em] text-sm mb-4 block"
                    >
                        Inquiry
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter"
                    >
                        GET IN <span className="text-primary-600 italic">TOUCH</span>
                    </motion.h1>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                    {/* Info Cards */}
                    <div className="lg:col-span-4 space-y-8">
                        {[
                            { icon: <Mail size={24} />, title: 'EMAIL', value: 'arumugamvimal1@gmail.com', color: 'bg-primary-500' },
                            { icon: <Phone size={24} />, title: 'PHONE', value: '9751608678', color: 'bg-indigo-500' },
                            { icon: <MapPin size={24} />, title: 'LOCATION', value: 'Hosur, Tamil Nadu', color: 'bg-primary-600' }
                        ].map((item, i) => (
                            <motion.div key={i} variants={itemVariants} className="bento-card group flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-xs font-black text-slate-400 tracking-widest uppercase mb-1">{item.title}</h3>
                                    <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                        {item.value}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Form Card */}
                    <motion.div variants={itemVariants} className="lg:col-span-8 bento-card relative overflow-hidden">
                        {status === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-8 shadow-2xl">
                                    <CheckCircle2 size={40} />
                                </motion.div>
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">MESSAGE RECEIVED</h2>
                                <p className="text-slate-500 font-medium mb-8">Thank you. I'll get back to you within 24 hours.</p>
                                <button onClick={() => setStatus('idle')} className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black rounded-2xl hover:scale-105 transition-all">
                                    SEND ANOTHER
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-500 tracking-widest uppercase ml-1">Your Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:border-primary-500 dark:focus:border-primary-500 outline-none transition-all font-bold text-slate-900 dark:text-white"
                                            placeholder="ADAM J."
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-500 tracking-widest uppercase ml-1">Your Email</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:border-primary-500 dark:focus:border-primary-500 outline-none transition-all font-bold text-slate-900 dark:text-white"
                                            placeholder="HEYYO@EXAMPLE.COM"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-500 tracking-widest uppercase ml-1">Subject</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:border-primary-500 dark:focus:border-primary-500 outline-none transition-all font-bold text-slate-900 dark:text-white"
                                        placeholder="PROJECT INQUIRY"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-500 tracking-widest uppercase ml-1">Message</label>
                                    <textarea
                                        required
                                        rows="6"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:border-primary-500 dark:focus:border-primary-500 outline-none transition-all font-bold text-slate-900 dark:text-white resize-none"
                                        placeholder="LET'S BUILD SOMETHING TRULY ICONIC TOGETHER..."
                                    ></textarea>
                                </div>
                                <button
                                    disabled={status === 'sending'}
                                    type="submit"
                                    className="group w-full md:w-auto px-12 py-5 bg-primary-600 text-white font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary-500/20 disabled:opacity-50"
                                >
                                    {status === 'sending' ? 'TRANSMITTING...' : 'INITIATE CONTACT'}
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        )}
                        <Sparkles className="absolute -bottom-10 -right-10 text-primary-500/10" size={200} />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
