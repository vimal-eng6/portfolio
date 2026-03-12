import React from 'react';
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
        <footer className="glass border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex justify-center space-x-6 mb-4">
                    <a href={profile?.github_link || "#"} className="text-slate-500 hover:text-primary-500 transition-colors">
                        <Github size={24} />
                    </a>
                    <a href={profile?.linkedin_link || "#"} className="text-slate-500 hover:text-primary-500 transition-colors">
                        <Linkedin size={24} />
                    </a>
                    <a href={profile?.email ? `mailto:${profile.email}` : "#"} className="text-slate-500 hover:text-primary-500 transition-colors">
                        <Mail size={24} />
                    </a>
                </div>
                <p className="text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} Portfolio. Built with React & Django.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
