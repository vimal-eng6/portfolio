import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchProfile, fetchProjects } from '../services/api';

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

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 mb-24">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 text-center md:text-left"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Hi, I'm <span className="text-primary-600 dark:text-primary-400">{profile?.name || 'Developer'}</span>
                    </h1>
                    <h2 className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-6">
                        {profile?.role || 'Full Stack Developer'}
                    </h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-2xl">
                        {profile?.bio || 'Building modern, scalable, and user-centric web applications with React and Django.'}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <Link to="/contact" className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center">
                            Get in Touch <ArrowRight className="ml-2" size={18} />
                        </Link>
                        <a href={profile?.resume_file} download className="px-8 py-3 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center">
                            Download Resume <Download className="ml-2" size={18} />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative flex items-center justify-center lg:justify-end"
                >
                    <div className="relative group animate-float">
                        {/* Decorative Background Blobs */}
                        <div className="absolute -inset-6 bg-gradient-to-tr from-primary-500 to-cyan-500 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-1000 animate-pulse" />

                        {/* Main Image Container */}
                        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full p-2 bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden animate-glow">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-primary-500/30">
                                <img
                                    src={profile?.profile_image || 'https://via.placeholder.com/400'}
                                    alt="Profile"
                                    className="w-full h-full object-cover object-top transform transition-all duration-1000 group-hover:scale-110"
                                />
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="absolute -bottom-4 -right-4 glass px-6 py-3 rounded-2xl text-sm font-bold shadow-lg border-2 border-primary-500/20 z-10"
                        >
                            🚀 Available for Hire
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Featured Projects Preview */}
            <section className="mb-24">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
                        <p className="text-slate-500">Some of my recent work</p>
                    </div>
                    <Link to="/projects" className="text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center">
                        View All <ArrowRight className="ml-1" size={16} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            whileHover={{ y: -10 }}
                            className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800"
                        >
                            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {(project.technologies_used || '').split(',').map(tech => tech.trim()).filter(tech => tech).map(tech => (
                                        <span key={tech} className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <Link to={`/projects/${project.id}`} className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                                    Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
