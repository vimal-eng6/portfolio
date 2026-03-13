import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Award, Coffee, BookOpen } from 'lucide-react';
import { fetchProfile, fetchExperience } from '../services/api';
import Timeline from '../components/Timeline';

const About = () => {
    const [profile, setProfile] = useState(null);
    const [experience, setExperience] = useState([]);

    useEffect(() => {
        fetchProfile().then(res => {
            const data = res.data;
            setProfile(Array.isArray(data) ? data[0] : data);
        }).catch(err => console.error(err));

        fetchExperience().then(res => {
            setExperience(res.data);
        }).catch(err => console.error(err));
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
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32"
                >
                    {/* Hero Text Card */}
                    <motion.div variants={itemVariants} className="lg:col-span-8 bento-card flex flex-col justify-center">
                        <span className="text-primary-600 dark:text-primary-400 font-black uppercase tracking-[0.4em] text-sm mb-6 block">
                            Background
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">
                            ENGINEERING <span className="text-primary-600 italic">PURPOSEFUL</span> DIGITAL EXPERIENCES.
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                            Hi, I'm Vimal. I bridge the gap between complex engineering and intuitive design. My philosophy is simple: write clean code, build scalable systems, and never stop learning.
                        </p>
                    </motion.div>

                    {/* Image Card */}
                    <motion.div variants={itemVariants} className="lg:col-span-4 bento-card p-4">
                        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden grayscale-0 hover:grayscale transition-all duration-1000 border-2 border-white/10 shadow-2xl animate-float">
                            <img 
                                src={profile?.profile_image || 'https://via.placeholder.com/800'} 
                                alt="Profile" 
                                className="w-full h-full object-cover object-top scale-100 hover:scale-105 transition-transform duration-700" 
                            />
                        </div>
                    </motion.div>

                    {/* Stats/Quick Info Grid */}
                    <motion.div variants={itemVariants} className="lg:col-span-4 bento-card flex flex-col items-center justify-center text-center">
                        <Award className="text-primary-600 mb-4" size={48} />
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">3+ Years</h3>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Experience</p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="lg:col-span-4 bento-card flex flex-col items-center justify-center text-center">
                        <Coffee className="text-indigo-600 mb-4" size={48} />
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">50+</h3>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Projects</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="lg:col-span-4 bento-card flex flex-col items-center justify-center text-center">
                        <BookOpen className="text-primary-500 mb-4" size={48} />
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">Continuous</h3>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Learning</p>
                    </motion.div>

                    {/* Socials Card */}
                    <motion.div variants={itemVariants} className="lg:col-span-12 bento-card flex flex-wrap justify-center items-center gap-8">
                        {[
                            { icon: <Github size={24} />, link: profile?.github_link, label: 'GITHUB' },
                            { icon: <Linkedin size={24} />, link: profile?.linkedin_link, label: 'LINKEDIN' },
                            { icon: <Mail size={24} />, link: `mailto:${profile?.email}`, label: 'EMAIL' },
                        ].map((social, i) => (
                            <a key={i} href={social.link || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-500 hover:text-primary-600 transition-colors font-black text-sm tracking-widest group">
                                <span className="p-3 glass rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-all">
                                    {social.icon}
                                </span>
                                {social.label}
                            </a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Experience/Timeline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32"
                >
                    <div className="text-center mb-24">
                        <span className="text-primary-600 dark:text-primary-400 font-black uppercase tracking-[0.4em] text-sm mb-4 block">Archive</span>
                        <h2 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
                            EXPERIENCE <span className="text-primary-600 italic">LOG</span>
                        </h2>
                    </div>
                    <Timeline items={experience} />
                </motion.div>
            </div>
        </div>
    );
};

export default About;
