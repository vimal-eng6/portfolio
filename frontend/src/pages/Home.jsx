import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Star, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchProfile, fetchProjects } from '../services/api';

import profileImage from '../assets/profile.jpg';

const Home = () => {
    const [profile, setProfile] = useState(null);
    const [featuredProjects, setFeaturedProjects] = useState([]);

    useEffect(() => {
        fetchProfile().then(res => {
            const data = res.data;
            setProfile(Array.isArray(data) ? data[0] : data);
        }).catch(err => console.error(err));
        fetchProjects().then(res => setFeaturedProjects(res.data.slice(0, 3))).catch(err => console.error(err));
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen pt-32 pb-24 overflow-hidden relative">
            {/* Background Ambient Elements */}
            <div className="absolute top-0 left-[-10%] w-[60%] h-[60%] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Hero Section */}
                <motion.section 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32 items-center"
                >
                    <div className="lg:col-span-8 flex flex-col justify-center">
                        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 w-fit">
                            <Sparkles size={16} className="animate-pulse" />
                            <span className="text-xs font-black uppercase tracking-widest">Available for Hire</span>
                        </motion.div>
                        
                        <motion.h1 variants={itemVariants} className="text-6xl md:text-9xl font-black tracking-tight text-slate-900 dark:text-white mb-8 leading-[0.9]">
                            CRAFTING <span className="bg-gradient-to-r from-primary-600 to-indigo-500 bg-clip-text text-transparent italic">DIGITAL</span><br />
                            EXCELLENCE.
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl font-medium leading-relaxed">
                            Hi, I'm <span className="text-slate-900 dark:text-white font-bold">{profile?.name || 'Vimal'}</span>, {profile?.role || 'Full Stack Architect'}.
                            Turning complex ideas into pixel-perfect realities.
                        </motion.p>
                        
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                            <Link to="/projects" className="group px-8 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black rounded-3xl hover:scale-105 transition-all flex items-center gap-3 shadow-2xl shadow-slate-900/20">
                                EXPLORE WORK
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </Link>
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-8 py-5 glass dark:bg-slate-900 font-black rounded-3xl hover:scale-105 transition-all flex items-center gap-3">
                                RESUME
                                <Download size={20} />
                            </a>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="lg:col-span-4 relative">
                        <div className="relative group mx-auto max-w-[280px]">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-primary-500 to-indigo-500 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                            <div className="relative glass rounded-[3.5rem] overflow-hidden rotate-2 group-hover:rotate-0 transition-transform duration-700 shadow-2xl animate-float">
                               <div className="aspect-[4/5] relative overflow-hidden">
                                   <img 
                                        src={profileImage} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover object-top grayscale-0 hover:scale-110 transition-all duration-1000"
                                    />
                               </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>

                {/* Featured Projects - Bento Preview */}
                <section className="mb-32">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16"
                    >
                        <div>
                            <span className="text-sm font-black uppercase tracking-[0.3em] text-primary-500 mb-2 block">Portfolio</span>
                            <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">FEATURED WORK</h2>
                        </div>
                        <Link to="/projects" className="group flex items-center gap-3 text-lg font-bold text-slate-500 hover:text-primary-600 transition-colors">
                            ALL PROJECTS
                            <TrendingUp className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={24} />
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bento-card group h-full flex flex-col"
                            >
                                <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 border border-white/10 shadow-inner">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <Link to={`/projects/${project.id}`} className="px-6 py-3 bg-white text-slate-950 font-bold rounded-xl text-sm">
                                            VIEW CASE STUDY
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors uppercase">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100 dark:border-slate-800">
                                    {(project.technologies_used || '').split(',').slice(0, 4).map(tech => (
                                        <span key={tech} className="px-3 py-1 text-[10px] font-black bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 uppercase tracking-widest">
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Quality Badge */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center p-20 rounded-[4rem] bg-gradient-to-br from-primary-600 to-indigo-600 text-white text-center shadow-3xl shadow-primary-500/20 overflow-hidden relative"
                >
                    <Star className="absolute top-10 right-10 opacity-20" size={120} />
                    <Sparkles className="absolute bottom-10 left-10 opacity-20" size={120} />
                    <h3 className="text-4xl md:text-6xl font-black mb-6 italic tracking-tight">LET'S CO-CREATE</h3>
                    <p className="text-primary-100 text-xl max-w-xl mb-10 font-bold">Currently seeking high-impact opportunities with ambitious teams.</p>
                    <Link to="/contact" className="px-10 py-5 bg-white text-primary-600 font-black rounded-3xl hover:scale-105 transition-all shadow-xl">
                        GET IN TOUCH
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
