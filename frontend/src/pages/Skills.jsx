import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Cpu, Globe, Database, Layout, Smartphone, Cloud, 
    Terminal, Shield, Code, Layers, Zap, 
    GitBranch, Monitor, Figma, Server
} from 'lucide-react';
import { fetchSkills } from '../services/api';

const Skills = () => {
    const [skills, setSkills] = useState([
        { id: 'f1', name: 'React', category: 'Frontend', proficiency_level: 90 },
        { id: 'f2', name: 'Tailwind CSS', category: 'Frontend', proficiency_level: 85 },
        { id: 'b1', name: 'Django', category: 'Backend', proficiency_level: 85 },
        { id: 'b2', name: 'Python', category: 'Backend', proficiency_level: 90 },
        { id: 'd1', name: 'PostgreSQL', category: 'Database', proficiency_level: 80 }
    ]);

    useEffect(() => {
        fetchSkills().then(res => setSkills(res.data)).catch(err => console.error(err));
    }, []);

    const getIcon = (category, name) => {
        const cat = (category || '').toUpperCase();
        const skillName = (name || '').toUpperCase();
        
        if (cat.includes('FRONTEND')) return <Layout size={20} />;
        if (cat.includes('BACKEND')) return <Server size={20} />;
        if (cat.includes('DATABASE') || skillName.includes('SQL')) return <Database size={20} />;
        if (cat.includes('DEV') || cat.includes('CLOUD')) return <Cloud size={20} />;
        if (cat.includes('MOBILE')) return <Smartphone size={20} />;
        if (cat.includes('SECURITY')) return <Shield size={20} />;
        if (cat.includes('TOOL') || cat.includes('GIT')) return <Terminal size={20} />;
        if (cat.includes('UI') || cat.includes('UX') || skillName.includes('FIGMA')) return <Figma size={20} />;
        if (cat.includes('FRAMEWORK')) return <Layers size={20} />;
        if (cat.includes('TESTING')) return <Shield size={20} />;
        
        return <Cpu size={20} />;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
    };

    return (
        <div className="min-h-screen pt-32 pb-32 relative overflow-hidden bg-white dark:bg-slate-950">
            {/* Soft Ambient Background */}
            <div className="absolute top-0 right-[-10%] w-[60%] h-[60%] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary-600 dark:text-primary-400 font-black uppercase tracking-[0.4em] text-sm mb-4 block"
                    >
                        Expertise
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter leading-none"
                    >
                        TECHNICAL <span className="text-primary-600 italic">ARSENAL</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-xl font-medium"
                    >
                        A comprehensive toolkit for multi-platform development and modern enterprise architecture.
                    </motion.p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {skills.map((skill) => (
                        <motion.div 
                            key={skill.id}
                            variants={itemVariants}
                            className="group bento-card p-8 flex flex-col justify-between hover:border-primary-500/30 transition-all cursor-default"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <div className="p-3 glass rounded-xl text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                    {getIcon(skill.category, skill.name)}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    {skill.category || 'GENERAL'}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4 group-hover:text-primary-600 transition-colors">
                                    {skill.name}
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Proficiency</span>
                                        <span className="text-xs font-black text-primary-600 dark:text-primary-400">{skill.proficiency_level}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.proficiency_level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.3 }}
                                            className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Skills;
