import React, { useState } from 'react';
import { Home, User, Code, Briefcase, BookOpen, Mail, FileText, Award } from 'lucide-react';

const Sidebar = ({ toggleResume, showResume }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleNavigation = (id) => {
        if (showResume) {
            toggleResume();
            setTimeout(() => {
                if (id === 'hero') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const element = document.getElementById(id);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            if (id === 'hero') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const navItems = [
        { id: 'hero', icon: Home, label: 'Home' },
        { id: 'about', icon: User, label: 'About' },
        { id: 'experience', icon: Award, label: 'Experience' },
        { id: 'skills', icon: Code, label: 'Skills' },
        { id: 'projects', icon: Briefcase, label: 'Projects' },
        { id: 'achievements', icon: Award, label: 'Achievements' },
        { id: 'publications', icon: BookOpen, label: 'Publications' },
        { id: 'contact', icon: Mail, label: 'Contact' },
    ];

    // Show only first 4 items if not hovered, otherwise show all
    const visibleItems = isHovered ? navItems : navItems.slice(0, 4);

    return (
        <nav
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`fixed left-4 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col gap-3 p-2 rounded-2xl bg-[var(--card-bg)]/80 backdrop-blur-2xl border border-white/10 transition-all duration-500 overflow-hidden group shadow-[0_0_30px_rgba(0,0,0,0.5)] ${isHovered ? 'w-48' : 'w-14'}`}
        >
            {visibleItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className="flex items-center gap-3 p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-white/10 transition-all whitespace-nowrap"
                >
                    <div className="min-w-[20px] flex justify-center">
                        <item.icon size={20} />
                    </div>
                    <span className={`transition-opacity duration-300 text-xs font-medium tracking-wide ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        {item.label}
                    </span>
                </button>
            ))}

            {isHovered && (
                <>
                    <div className="w-full h-px bg-white/10 my-1 animate-fade-up"></div>

                    <button
                        onClick={toggleResume}
                        className="flex items-center gap-3 p-2 rounded-lg text-[var(--accent-color)] hover:bg-white/10 transition-all whitespace-nowrap animate-fade-up"
                    >
                        <div className="min-w-[20px] flex justify-center">
                            <FileText size={20} />
                        </div>
                        <span className="text-xs font-medium tracking-wide">
                            {showResume ? 'Back' : 'Resume'}
                        </span>
                    </button>
                </>
            )}
        </nav>
    );
};

export default Sidebar;
