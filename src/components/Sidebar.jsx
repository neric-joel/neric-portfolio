import React from 'react';
import { Home, User, Code, Briefcase, BookOpen, Mail, FileText } from 'lucide-react';

const Sidebar = ({ toggleResume, showResume }) => {
    const scrollToSection = (id) => {
        if (showResume) {
            toggleResume();
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navItems = [
        { id: 'hero', icon: Home, label: 'Home' },
        { id: 'about', icon: User, label: 'About' },
        { id: 'skills', icon: Code, label: 'Skills' },
        { id: 'projects', icon: Briefcase, label: 'Projects' },
        { id: 'publications', icon: BookOpen, label: 'Publications' },
        { id: 'contact', icon: Mail, label: 'Contact' },
    ];

    return (
        <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => item.id === 'hero' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : scrollToSection(item.id)}
                    className="group relative w-12 h-12 flex items-center justify-center rounded-2xl bg-glass-bg backdrop-blur-md border border-white/10 hover:border-electric-blue hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300"
                    aria-label={item.label}
                >
                    <item.icon size={20} className="text-gray-400 group-hover:text-electric-blue transition-colors" />
                    <span className="absolute left-full ml-4 px-3 py-1 bg-glass-bg backdrop-blur-md border border-white/10 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {item.label}
                    </span>
                </button>
            ))}

            <div className="w-8 h-px bg-white/10 mx-auto my-2"></div>

            <button
                onClick={toggleResume}
                className="group relative w-12 h-12 flex items-center justify-center rounded-2xl bg-glass-bg backdrop-blur-md border border-white/10 hover:border-neon-green hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300"
                aria-label="Resume"
            >
                <FileText size={20} className="text-neon-green" />
                <span className="absolute left-full ml-4 px-3 py-1 bg-glass-bg backdrop-blur-md border border-white/10 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {showResume ? 'Portfolio' : 'Resume'}
                </span>
            </button>
        </nav>
    );
};

export default Sidebar;
