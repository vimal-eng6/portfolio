import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowUpRight, Cpu, Globe, Zap, Send, Code, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    const [profile, setProfile] = React.useState({
        name: "Vimal",
        role: "Full Stack Developer",
        github_link: "https://github.com/vimal-eng6",
        linkedin_link: "https://www.linkedin.com/in/vimal-a-b5b358320",
        email: "arumugamvimal1@gmail.com"
    });
    const [email, setEmail] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        import('../services/api').then(({ fetchProfile }) => {
            fetchProfile().then(res => {
                const data = res.data;
                setProfile(Array.isArray(data) ? data[0] : data);
            });
        });
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Projects', path: '/projects' },
        { name: 'Skills', path: '/skills' },
        
        { name: 'Contact', path: '/contact' },
    ];

    const techStack = [
        { name: 'React', icon: <Code size={16} /> },
        { name: 'Django', icon: <Layers size={16} /> },
        { name: 'Tailwind', icon: <Zap size={16} /> },
        { name: 'PostgreSQL', icon: <Globe size={16} /> },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <footer className="relative bg-slate-50 dark:bg-slate-950 pt-32 pb-12 overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Ready to <span className="text-primary-600 dark:text-primary-400">elevate</span><br />
                            your digital presence?
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <button 
                            onClick={() => navigate('/contact')}
                            className="group relative px-8 py-4 bg-primary-600 dark:bg-primary-500 text-white font-bold rounded-2xl overflow-hidden transition-all hover:pr-12 cursor-pointer shadow-xl shadow-primary-500/20"
                        >
                            <span className="relative z-10">Start a Project</span>
                            <ArrowUpRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300" size={20} />
                        </button>
                    </motion.div>
                </div>

                {/* Bento Grid Layout */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20"
                >
                    {/* Bio Card */}
                    <motion.div variants={itemVariants} className="md:col-span-2 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group">
                        <div>
                            <div className="mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                                    <Cpu size={20} />
                                </div>
                                <span className="text-sm font-bold tracking-widest uppercase text-slate-400">About Me</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {profile?.name || "Frontend Developer"}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                {profile?.role || "Full-stack enthusiast"} crafting high-performance, visually stunning web applications with precision and modern best practices.
                            </p>
                        </div>
                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex gap-4">
                            {[
                                { icon: <Github size={20} />, link: profile?.github_link, label: 'GitHub' },
                                { icon: <Linkedin size={20} />, link: profile?.linkedin_link, label: 'LinkedIn' },
                                { icon: <Mail size={20} />, link: profile?.email ? `mailto:${profile.email}` : '#', label: 'Email' },
                            ].map((social, i) => (
                                <a key={i} href={social.link || "#"} target="_blank" rel="noopener noreferrer" 
                                   className="text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links Card */}
                    <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                        <span className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-6">Navigation</span>
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="group flex items-center justify-between text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
                                        {link.name}
                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter/Status Card */}
                    <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-primary-600 dark:bg-primary-500 text-white shadow-xl shadow-primary-500/20 flex flex-col justify-between overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                            <Send size={120} />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-2xl font-bold mb-4">Stay updated</h4>
                            <p className="text-primary-100/80 text-sm mb-6">Get my latest project updates and tech insights delivered.</p>
                            <div className="relative">
                                <input 
                                    type="email" 
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/30 transition-all text-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className="absolute right-1 top-1 bottom-1 px-3 bg-white text-primary-600 rounded-lg font-bold text-xs hover:bg-slate-50 transition-colors">
                                    Join
                                </button>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/20 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest text-primary-50">Available for Work</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tech Stack Card */}
                    <motion.div variants={itemVariants} className="md:col-span-3 p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-primary-400">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white">Core Tech Stack</h4>
                                <p className="text-slate-500 text-sm">Building with modern tools for scale.</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {techStack.map((tech) => (
                                <div key={tech.name} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:border-primary-500/50 hover:text-white transition-all duration-300 cursor-default">
                                    {tech.icon}
                                    <span className="text-xs font-bold">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Fun Mini Card */}
                    <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-indigo-600 dark:bg-indigo-500 text-white flex flex-col items-center justify-center text-center group cursor-pointer overflow-hidden relative">
                         <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                         <span className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Vibe</span>
                         <span className="text-3xl font-black italic tracking-tighter">100% DIY</span>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                            &copy; {new Date().getFullYear()} {profile?.name || "Portfolio"}. All rights reserved.
                        </p>
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 dark:text-slate-600">Built with Framer Motion & Tailwind</span>
                    </div>
                    <div className="flex items-center gap-8">
                        <Link to="/privacy" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary-600 transition-colors">Privacy</Link>
                        <Link to="/terms" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary-600 transition-colors">Terms</Link>
                        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                             <span className="w-1.5 h-1.5 rounded-full bg-current" />
                             <span className="text-[10px] font-black uppercase tracking-widest">Version 2.0.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
