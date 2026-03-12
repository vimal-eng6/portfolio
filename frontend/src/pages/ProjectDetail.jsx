import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Code2, Rocket, Target } from 'lucide-react';
import { fetchProject } from '../services/api';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link to="/projects" className="inline-flex items-center text-slate-500 hover:text-primary-600 transition-colors mb-8">
                <ArrowLeft size={20} className="mr-2" /> Back to Projects
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
            >
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">{project.title}</h1>
                    <div className="flex flex-wrap gap-3">
                        {(project.technologies_used || '').split(',').map(tech => (
                            <span key={tech} className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold uppercase tracking-wider">
                                {tech.trim()}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Target className="text-primary-500" /> Project Overview
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                {project.description}
                            </p>
                        </section>

                        {project.case_study && (
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <Rocket className="text-primary-500" /> The Challenge & Solution
                                </h2>
                                <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                                    {project.case_study.split('\n').map((para, i) => (
                                        <p key={i} className="mb-4 whitespace-pre-line">{para}</p>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="space-y-8">
                        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
                            <h3 className="font-bold flex items-center gap-2">
                                <Code2 className="text-primary-500" /> Links
                            </h3>
                            <div className="space-y-3">
                                {project.github_url && (
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl hover:border-primary-500 border border-transparent transition-all shadow-sm">
                                        <span className="flex items-center gap-2 font-medium"><Github size={18} /> Source Code</span>
                                        <ArrowLeft className="rotate-180" size={14} />
                                    </a>
                                )}
                                {project.live_demo_url && (
                                    <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-lg">
                                        <span className="flex items-center gap-2 font-medium"><ExternalLink size={18} /> Live Demo</span>
                                        <ArrowLeft className="rotate-180" size={14} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProjectDetail;
