import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isDark, setIsDark] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Skills', path: '/skills' },
        { name: 'Projects', path: '/projects' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <div className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'top-2' : 'top-6'} left-0 px-4 flex justify-center`}>
            <nav className={`glass-pill px-6 py-3 transition-all duration-500 ${scrolled ? 'max-w-3xl py-2 opacity-95 scale-95 shadow-xl' : 'max-w-4xl shadow-2xl'}`}>
                <div className="flex justify-between items-center gap-8">
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-semibold transition-all hover:text-primary-500 relative group ${location.pathname === link.path ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'
                                    }`}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                                    />
                                )}
                                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full group-hover:left-0 rounded-full" />
                            </Link>
                        ))}
                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>

                    <div className="md:hidden flex items-center w-full justify-between">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="pt-4 pb-2 space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-4 py-2 rounded-xl text-base font-medium transition-colors ${location.pathname === link.path
                                            ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
};

export default Navbar;
