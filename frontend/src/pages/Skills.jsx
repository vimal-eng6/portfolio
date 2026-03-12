import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchSkills } from '../services/api';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSkills()
            .then(res => {
                setSkills(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const categories = ['frontend', 'frontend Framework', 'backend', 'backend Framework', 'testing', 'tools'];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">My Skills</h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    I've developed a diverse set of technical skills across the full software development lifecycle.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {categories.map((cat) => (
                    <motion.div
                        key={cat}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800"
                    >
                        <h2 className="text-2xl font-bold mb-6 capitalize text-primary-600 dark:text-primary-400">{cat}</h2>
                        <div className="space-y-6">
                            {skills.filter(s => s.category === cat).map((skill) => (
                                <div key={skill.id}>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium text-slate-700 dark:text-slate-200">{skill.name}</span>
                                        <span className="text-sm text-slate-500">{skill.proficiency_level}%</span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.proficiency_level}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="bg-primary-500 h-full rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                            {skills.filter(s => s.category === cat).length === 0 && !loading && (
                                <p className="text-slate-400 text-sm italic">No skills added yet.</p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
