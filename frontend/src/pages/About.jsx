import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
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

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-square max-w-lg mx-auto group animate-float"
                >
                    <div className="absolute inset-0 bg-primary-500 rounded-full rotate-6 -z-10 opacity-20 blur-2xl animate-pulse"></div>
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 dark:border-slate-800/20 shadow-2xl animate-glow">
                        <img
                            src={profile?.profile_image || 'https://via.placeholder.com/600'}
                            alt="About Me"
                            className="w-full h-full object-cover object-top transform transition-all duration-1000 group-hover:scale-110"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-4xl font-bold mb-6">About Me</h1>
                    <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                        <p>
                            I am a passionate developer with a strong focus on building high-performance web applications.
                            My journey in tech has been driven by a constant curiosity and a desire to solve complex problems
                            with elegant code.
                        </p>
                        <p>
                            With expertise in React and Django, I bridge the gap between frontend aesthetics and backend
                            stability. I believe in writing clean, maintainable code and always put the user experience first.
                        </p>
                    </div>

                    <div className="mt-8 flex gap-6">
                        <a href={profile?.github_link} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:text-primary-600 transition-colors">
                            <Github />
                        </a>
                        <a href={profile?.linkedin_link} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:text-primary-600 transition-colors">
                            <Linkedin />
                        </a>
                        <a href={`mailto:${profile?.email}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:text-primary-600 transition-colors">
                            <Mail />
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Experience Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-32"
            >
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Journey</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        A timeline of my professional experience, education, and significant milestones in tech.
                    </p>
                </div>
                
                <Timeline items={experience} />
            </motion.div>
        </div>
    );
};

export default About;
