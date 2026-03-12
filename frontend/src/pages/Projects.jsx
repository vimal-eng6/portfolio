import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, Search, ArrowLeft } from 'lucide-react';
import { fetchProjects } from '../services/api';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects()
            .then(res => {
                setProjects(res.data);
                setFilteredProjects(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const results = projects.filter(project =>
            project.title.toLowerCase().includes(search.toLowerCase()) ||
            (project.technologies_used || '').toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProjects(results);
    }, [search, projects]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                <div>
                    <h1 className="text-4xl font-bold mb-4">My Projects</h1>
                    <p className="text-slate-600 dark:text-slate-400">A collection of my recent work and open-source contributions.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search projects or tech..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ y: -10 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 group"
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    {project.github_url && (
                                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full text-slate-900 hover:bg-primary-500 hover:text-white transition-colors">
                                            <Github size={20} />
                                        </a>
                                    )}
                                    {project.live_demo_url && (
                                        <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full text-slate-900 hover:bg-primary-500 hover:text-white transition-colors">
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {(project.technologies_used || '').split(',').map(tech => tech.trim()).filter(tech => tech).map(tech => (
                                        <span key={tech} className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider bg-slate-100 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <Link to={`/projects/${project.id}`} className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:gap-2 transition-all">
                                    View Details <ArrowLeft size={16} className="rotate-180 ml-1" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {!loading && filteredProjects.length === 0 && (
                <div className="text-center py-24">
                    <p className="text-slate-500 text-lg">No projects found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default Projects;
