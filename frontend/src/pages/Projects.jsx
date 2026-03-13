import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../services/api';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects().then(res => setProjects(res.data)).catch(err => console.error(err));
    }, []);

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
            <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
                    <div className="max-w-2xl">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-primary-600 dark:text-primary-400 font-black uppercase tracking-[0.4em] text-sm mb-4 block"
                        >
                            Showcase
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter leading-none"
                        >
                            WORK <span className="text-primary-600 italic">&</span> ARCHIVE
                        </motion.h1>
                    </div>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {projects.map((project) => (
                        <motion.div 
                            key={project.id}
                            variants={itemVariants}
                            className="bento-card group flex flex-col md:flex-row gap-8 overflow-hidden items-center"
                        >
                            <div className="md:w-1/2 aspect-video rounded-[1.5rem] overflow-hidden border border-white/10 relative shadow-2xl">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover transform transition-all duration-1000 group-hover:scale-110" />
                            </div>
                            <div className="md:w-1/2 flex flex-col justify-between py-2">
                                <div>
                                    <div className="flex gap-4 mb-4">
                                        {project.github_link && (
                                            <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-xl text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                                <Github size={18} />
                                            </a>
                                        )}
                                        {project.live_link && (
                                            <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-xl text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                                <ExternalLink size={18} />
                                            </a>
                                        )}
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter group-hover:text-primary-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
                                        {project.description}
                                    </p>
                                </div>
                                <Link to={`/projects/${project.id}`} className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest text-primary-600 hover:text-indigo-600 transition-colors bg-primary-50 dark:bg-primary-900/20 px-6 py-4 rounded-xl w-fit">
                                    CASE STUDY <ArrowUpRight size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Projects;
