import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, Github, ExternalLink, Code2, Rocket, 
    Target, Share2, Calendar, User, Layout, Eye,
    Sparkles, ArrowUpRight, Zap, Globe
} from 'lucide-react';
import { fetchProject } from '../services/api';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProject(id)
            .then(res => {
                setProject(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setProject(null);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mb-4"
            />
            <span className="text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">Loading Innovation</span>
        </div>
    );

    if (!project) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-center p-6">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">PROJECT ARCHIVED</h2>
            <p className="text-slate-500 mb-8 max-w-md">The project you are looking for might have been moved or removed from our current active archive.</p>
            <Link to="/projects" className="px-8 py-4 glass-pill text-primary-600 font-bold hover:bg-primary-600 hover:text-white transition-all">
                Return to Archive
            </Link>
        </div>
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    return (
        <div className="min-h-screen pt-32 pb-32 relative overflow-hidden bg-white dark:bg-slate-950">
            {/* Background Accents */}
            <div className="absolute top-0 left-[-10%] w-[60%] h-[60%] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Header Navigation */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between mb-16"
                >
                    <button 
                        onClick={() => navigate('/projects')}
                        className="group flex items-center gap-3 px-6 py-3 glass-pill hover:bg-primary-600 hover:text-white transition-all duration-500"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold uppercase tracking-widest">Back to Archive</span>
                    </button>

                    <div className="flex gap-4">
                        {project.github_link && (
                            <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-xl text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">
                                <Github size={20} />
                            </a>
                        )}
                        <button className="p-3 glass rounded-xl text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">
                            <Share2 size={20} />
                        </button>
                    </div>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* Title Section */}
                    <motion.div variants={itemVariants} className="max-w-4xl">
                        <span className="text-primary-600 font-black uppercase tracking-[0.4em] text-sm mb-4 block">Case Study</span>
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tighter leading-none">
                            {project.title.split(' ').map((word, i) => (
                                <span key={i} className={i % 2 !== 0 ? 'text-primary-600 italic' : ''}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h1>
                        
                        <div className="flex flex-wrap gap-3 mb-12">
                            {(project.technologies_used || '').split(',').map(tech => (
                                <span key={tech} className="px-5 py-2 glass rounded-full text-[10px] font-black uppercase tracking-widest text-primary-600 dark:text-primary-400">
                                    {tech.trim()}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Hero Image Section */}
                    <motion.div variants={itemVariants} className="relative group rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 aspect-[21/9]">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transform transition-all duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                            {project.live_link && (
                                <a 
                                    href={project.live_link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl hover:bg-primary-500 transition-all"
                                >
                                    Launch Project <ExternalLink size={16} />
                                </a>
                            )}
                        </div>
                    </motion.div>

                    {/* Bento Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Description */}
                        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
                            <div className="bento-card p-12 space-y-6">
                                <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400">
                                    <Target size={24} />
                                    <h2 className="text-2xl font-black uppercase tracking-tighter">Project Overview</h2>
                                </div>
                                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                    {project.description}
                                </p>
                            </div>

                            {project.case_study && (
                                <div className="bento-card p-12 space-y-8">
                                    <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400">
                                        <Rocket size={24} />
                                        <h2 className="text-2xl font-black uppercase tracking-tighter">The Implementation</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {project.case_study.split('\n\n').map((chunk, i) => (
                                            <div key={i} className="space-y-4">
                                                <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 font-bold text-sm">
                                                    0{i + 1}
                                                </div>
                                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                                    {chunk}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Sidebar Info */}
                        <motion.div variants={itemVariants} className="space-y-8">
                            {/* Stats Card */}
                            <div className="bento-card p-8 bg-primary-600 text-white shadow-xl shadow-primary-500/20">
                                <h3 className="text-lg font-black uppercase tracking-tighter mb-6">Discovery Details</h3>
                                <ul className="space-y-6">
                                    <li className="flex items-center gap-4">
                                        <div className="p-2 bg-white/20 rounded-lg"><Calendar size={18} /></div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Year</p>
                                            <p className="font-black">2024</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="p-2 bg-white/20 rounded-lg"><Layout size={18} /></div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Category</p>
                                            <p className="font-black">Full-Stack Development</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="p-2 bg-white/20 rounded-lg"><Zap size={18} /></div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Stack</p>
                                            <p className="font-black">Modern Frameworks</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* CTA Card */}
                            <div className="bento-card p-8 bg-slate-900 text-white flex flex-col justify-between group overflow-hidden relative">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-600/20 rounded-full blur-3xl" />
                                <div className="relative z-10">
                                    <Sparkles className="text-primary-400 mb-6" size={32} />
                                    <h4 className="text-2xl font-black uppercase tracking-tighter mb-4">Want to build something similar?</h4>
                                    <p className="text-slate-400 text-sm mb-8">Let's discuss how we can leverage these patterns for your next project.</p>
                                </div>
                                <Link to="/contact" className="relative z-10 w-full py-4 bg-white text-slate-900 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 group-hover:bg-primary-500 group-hover:text-white transition-all">
                                    Get in touch <ArrowUpRight size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetail;
