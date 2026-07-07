import React, { useState, useEffect } from 'react';
import { Home, User, Code, Briefcase, BookOpen, Mail, FileText, Award, Menu, X } from 'lucide-react';
import { scrollToId } from '../utils/scrollTo';

const navItems = [
    { id: 'hero',         icon: Home,      label: 'Home'         },
    { id: 'about',        icon: User,      label: 'About'        },
    { id: 'experience',   icon: Briefcase, label: 'Experience'   },
    { id: 'skills',       icon: Code,      label: 'Skills'       },
    { id: 'projects',     icon: Award,     label: 'Projects'     },
    { id: 'publications', icon: BookOpen,  label: 'Publications' },
    { id: 'contact',      icon: Mail,      label: 'Contact'      },
];

const NavButton = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
        className={`flex w-full min-h-11 cursor-pointer items-center gap-2.5 rounded-md border-l-2 px-3 py-2 text-left text-xs font-medium tracking-wide transition-colors duration-150 ${
            isActive
                ? 'border-accent bg-accent-soft text-accent'
                : 'border-transparent text-muted hover:bg-white/[0.04] hover:text-text'
        }`}
    >
        <Icon size={14} className="shrink-0" aria-hidden="true" />
        <span>{label}</span>
    </button>
);

const Sidebar = ({ toggleResume, showResume }) => {
    const [activeId, setActiveId]     = useState('hero');
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const observers = navItems.map(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const io = new IntersectionObserver(
                ([e]) => { if (e.isIntersecting) setActiveId(id); },
                { threshold: 0.35 }
            );
            io.observe(el);
            return io;
        });
        return () => observers.forEach(io => io?.disconnect());
    }, []);

    const handleNav = (id) => {
        setMobileOpen(false);
        if (showResume) {
            toggleResume();
            setTimeout(() => scrollToId(id), 100);
        } else {
            scrollToId(id);
        }
    };

    return (
        <>
            {/* ── Desktop nav ── */}
            <nav
                className="fixed top-0 bottom-0 left-0 z-60 hidden w-40 flex-col justify-center pr-2 pl-4 md:flex"
                aria-label="Site navigation"
            >
                <div className="flex flex-col gap-0.5">
                    {navItems.map(({ id, icon, label }) => (
                        <NavButton
                            key={id}
                            icon={icon}
                            label={label}
                            isActive={activeId === id}
                            onClick={() => handleNav(id)}
                        />
                    ))}

                    <div className="mx-3 my-1.5 h-px bg-line" />

                    <button
                        onClick={toggleResume}
                        className="flex w-full min-h-11 cursor-pointer items-center gap-2.5 rounded-md border-l-2 border-transparent px-3 py-2 text-left text-xs font-medium tracking-wide text-accent transition-colors duration-150 hover:bg-accent-soft"
                    >
                        <FileText size={14} className="shrink-0" aria-hidden="true" />
                        <span>{showResume ? 'Back' : 'Resume'}</span>
                    </button>
                </div>
            </nav>

            {/* ── Mobile toggle ── */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="card fixed top-4 right-4 z-70 flex h-11 w-11 cursor-pointer items-center justify-center text-muted md:hidden"
                aria-label="Toggle navigation"
                aria-expanded={mobileOpen}
            >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* ── Mobile menu ── */}
            {mobileOpen && (
                    <div className="fixed inset-0 z-65 md:hidden">
                        <div
                            className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
                            onClick={() => setMobileOpen(false)}
                        />
                        <nav
                            className="card absolute top-18 right-4 min-w-45 p-2"
                            aria-label="Mobile navigation"
                        >
                            {navItems.map(({ id, icon, label }) => (
                                <NavButton
                                    key={id}
                                    icon={icon}
                                    label={label}
                                    isActive={activeId === id}
                                    onClick={() => handleNav(id)}
                                />
                            ))}
                            <div className="mx-3 my-1.5 h-px bg-line" />
                            <button
                                onClick={() => { setMobileOpen(false); toggleResume(); }}
                                className="flex w-full min-h-11 cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-left text-xs font-medium tracking-wide text-accent transition-colors duration-150 hover:bg-accent-soft"
                            >
                                <FileText size={14} className="shrink-0" aria-hidden="true" />
                                <span>{showResume ? 'Back' : 'Resume'}</span>
                            </button>
                        </nav>
                    </div>
                )}
        </>
    );
};

export default Sidebar;
