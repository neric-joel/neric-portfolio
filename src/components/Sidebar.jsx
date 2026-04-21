import React, { useState } from 'react';
import { Home, User, Code, Briefcase, BookOpen, Mail, FileText, Award, Menu, X } from 'lucide-react';

const navItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'projects', icon: Award, label: 'Projects' },
    { id: 'publications', icon: BookOpen, label: 'Publications' },
    { id: 'contact', icon: Mail, label: 'Contact' },
];

const Sidebar = ({ toggleResume, showResume }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleNavigation = (id) => {
        setMobileOpen(false);
        if (showResume) {
            toggleResume();
            setTimeout(() => {
                if (id === 'hero') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            if (id === 'hero') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <nav
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`fixed left-4 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col gap-2 p-2 rounded-2xl backdrop-blur-2xl border transition-all duration-400 overflow-hidden ${isHovered ? 'w-44' : 'w-14'}`}
            style={{
                background: 'rgba(4,4,12,0.72)',
                borderColor: 'rgba(255,255,255,0.08)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
            }}
            >
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleNavigation(item.id)}
                        className="flex items-center gap-3 p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-white/10 transition-all whitespace-nowrap"
                        aria-label={item.label}
                    >
                        <div className="min-w-[20px] flex justify-center">
                            <item.icon size={18} />
                        </div>
                        <span className={`transition-opacity duration-300 text-xs font-medium tracking-wide ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            {item.label}
                        </span>
                    </button>
                ))}

                {isHovered && (
                    <>
                        <div className="w-full h-px bg-white/10 my-1" />
                        <button
                            onClick={toggleResume}
                            className="flex items-center gap-3 p-2 rounded-lg text-[var(--accent-color)] hover:bg-white/10 transition-all whitespace-nowrap"
                            aria-label="Resume"
                        >
                            <div className="min-w-[20px] flex justify-center">
                                <FileText size={18} />
                            </div>
                            <span className="text-xs font-medium tracking-wide">
                                {showResume ? 'Back' : 'Resume'}
                            </span>
                        </button>
                    </>
                )}
            </nav>

            {/* Mobile Nav Toggle */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="fixed top-4 right-4 z-[70] md:hidden p-2.5 rounded-xl bg-[var(--card-bg)]/90 backdrop-blur-xl border border-white/10 text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors shadow-lg"
                aria-label="Toggle navigation"
            >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="fixed inset-0 z-[65] md:hidden">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                    <nav className="absolute top-16 right-4 bg-[var(--card-bg)] border border-white/10 rounded-2xl p-3 shadow-2xl min-w-[160px]">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item.id)}
                                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-white/10 transition-all text-sm font-medium"
                            >
                                <item.icon size={16} />
                                {item.label}
                            </button>
                        ))}
                        <div className="w-full h-px bg-white/10 my-2" />
                        <button
                            onClick={() => { setMobileOpen(false); toggleResume(); }}
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[var(--accent-color)] hover:bg-white/10 transition-all text-sm font-medium"
                        >
                            <FileText size={16} />
                            {showResume ? 'Back' : 'Resume'}
                        </button>
                    </nav>
                </div>
            )}
        </>
    );
};

export default Sidebar;
