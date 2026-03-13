import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

const TimelineItem = ({ item, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-12 pb-16 last:pb-0 group"
        >
            <div className="absolute left-0 top-0 h-full w-0.5 bg-slate-200 dark:bg-slate-800 group-last:h-12 transition-colors group-hover:bg-primary-500/30" />
            
            <motion.div 
                whileHover={{ scale: 1.1 }}
                className="absolute left-[-11px] top-0 flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 z-10 group-hover:border-primary-500 transition-colors duration-300"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-primary-500 transition-colors" />
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 w-full md:w-48 pt-0.5">
                    <span className="text-sm font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                        {new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} — {item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'PRESENT'}
                    </span>
                    <div className="mt-2 flex items-center gap-2">
                        <MapPin size={12} className="text-slate-300 dark:text-slate-600" />
                        <span className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider font-bold">{item.location}</span>
                    </div>
                </div>

                <motion.div 
                    whileHover={{ y: -5 }}
                    className="flex-grow bento-card p-10 !rounded-[2rem]"
                >
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                        <div>
                            <h3 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 uppercase group-hover:text-primary-600 transition-colors">
                                {item.role}
                            </h3>
                            <p className="text-xl font-black italic tracking-tight text-primary-600 dark:text-primary-400">
                                {item.company}
                            </p>
                        </div>
                        {item.is_current && (
                            <span className="flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full w-fit">
                                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary-600 dark:text-primary-400">ACTIVE ROLE</span>
                            </span>
                        )}
                    </div>

                    <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
                        {item.description}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

const Timeline = ({ items }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="max-w-5xl mx-auto py-12">
            <div className="relative">
                {items.map((item, index) => (
                    <TimelineItem key={item.id} item={item} index={index} />
                ))}
            </div>
        </div>
    );
};

export default Timeline;
