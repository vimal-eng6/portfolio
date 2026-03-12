import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { fetchBlogPosts } from '../services/api';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogPosts()
            .then(res => {
                setPosts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Blog</h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Insights, tutorials, and thoughts on software development and technology.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {posts.map((post, index) => (
                    <motion.article
                        key={post.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row gap-6 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 group"
                    >
                        <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="md:w-1/2 p-6 flex flex-col justify-center">
                            <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} /> {new Date(post.created_at).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                    <User size={14} /> Admin
                                </span>
                            </div>
                            <h2 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-3">
                                {post.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                            </p>
                            <button className="text-primary-600 dark:text-primary-400 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                                Read Article <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.article>
                ))}
            </div>

            {!loading && posts.length === 0 && (
                <div className="text-center py-24">
                    <p className="text-slate-500 text-lg">No blog posts yet. Stay tuned!</p>
                </div>
            )}
        </div>
    );
};

export default Blog;
