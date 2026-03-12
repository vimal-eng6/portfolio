import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const TimelineItem = ({ item, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group gap-8 mb-12`}
        >
            {/* Timeline Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 text-white shadow-lg z-10 shrink-0 md:order-1">
                <Briefcase size={20} />
            </div>

            {/* Content Card */}
            <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 group-hover:border-primary-500/50 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.role}</h3>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${item.is_current ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                        {item.is_current ? 'Present' : 'Completed'}
                    </span>
                </div>
                
                <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary-600 dark:text-primary-400">{item.company}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{item.location}</span>
                        </div>
                    </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    {item.description}
                </p>
            </div>
        </motion.div>
    );
};

const Timeline = ({ items }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
            {items.map((item, index) => (
                <TimelineItem key={item.id} item={item} index={index} />
            ))}
        </div>
    );
};

export default Timeline;
