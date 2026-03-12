import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    const [profile, setProfile] = React.useState(null);

    React.useEffect(() => {
        import('../services/api').then(({ fetchProfile }) => {
            fetchProfile().then(res => {
                const data = res.data;
                setProfile(Array.isArray(data) ? data[0] : data);
            });
        });
    }, []);

    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="md:col-span-1 space-y-4">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                            {profile?.name || "Portfolio"}
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            {profile?.role || "Full Stack Developer"} building high-performance, beautiful web applications with modern tech stacks.
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Available for new opportunities</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Navigation</h3>
                        <ul className="space-y-2">
                            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-slate-500 hover:text-primary-500 transition-colors text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services/Tech */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Expertise</h3>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li>Frontend Engineering</li>
                            <li>Backend Systems</li>
                            <li>REST API Development</li>
                            <li>Cloud Infrastructure</li>
                            <li>UI/UX Strategy</li>
                        </ul>
                    </div>

                    {/* Connect Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Connect</h3>
                        <div className="flex gap-4">
                            <a href={profile?.github_link || "#"} className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
                                <Github size={20} />
                            </a>
                            <a href={profile?.linkedin_link || "#"} className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
                                <Linkedin size={20} />
                            </a>
                            <a href={profile?.email ? `mailto:${profile.email}` : "#"} className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
                                <Mail size={20} />
                            </a>
                        </div>
                        <div className="pt-4">
                            <Link to="/contact" className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline">
                                START A PROJECT &rarr;
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-xs">
                        &copy; {new Date().getFullYear()} {profile?.name || "Portfolio"}. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-slate-400">
                        <span>Made with React & Django</span>
                        <span>v1.0.0</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
