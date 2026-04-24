import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code, Briefcase, BookOpen, Mail, FileText, Award, Menu, X } from 'lucide-react';

const UI = 'Plus Jakarta Sans, Inter, sans-serif';

const navItems = [
    { id: 'hero',         icon: Home,     label: 'Home'         },
    { id: 'about',        icon: User,     label: 'About'        },
    { id: 'experience',   icon: Briefcase,label: 'Experience'   },
    { id: 'skills',       icon: Code,     label: 'Skills'       },
    { id: 'projects',     icon: Award,    label: 'Projects'     },
    { id: 'publications', icon: BookOpen, label: 'Publications' },
    { id: 'contact',      icon: Mail,     label: 'Contact'      },
];

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
            setTimeout(() => {
                id === 'hero'
                    ? window.scrollTo({ top: 0, behavior: 'smooth' })
                    : document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            id === 'hero'
                ? window.scrollTo({ top: 0, behavior: 'smooth' })
                : document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* ── Desktop: always-labeled vertical nav ── */}
            <nav
                className="fixed left-0 top-0 bottom-0 z-[60] hidden md:flex flex-col justify-center w-40 pl-4 pr-2"
                aria-label="Site navigation"
            >
                <div className="flex flex-col gap-0.5">
                    {navItems.map(({ id, icon: Icon, label }) => {
                        const isActive = activeId === id;
                        return (
                            <button
                                key={id}
                                onClick={() => handleNav(id)}
                                aria-label={label}
                                aria-current={isActive ? 'page' : undefined}
                                className="group flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors duration-150 cursor-pointer w-full"
                                style={{
                                    background: isActive
                                        ? 'rgba(155, 229, 100, 0.08)'
                                        : 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    color: isActive ? 'var(--accent-color)' : 'var(--text-muted)',
                                    fontFamily: UI,
                                }}
                                onMouseEnter={e => {
                                    if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
                                    if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                }}
                                onMouseLeave={e => {
                                    if (!isActive) e.currentTarget.style.color = 'var(--text-muted)';
                                    if (!isActive) e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                {/* Active indicator */}
                                <span
                                    className="shrink-0 rounded-full transition-all duration-150"
                                    style={{
                                        width: 2,
                                        height: isActive ? 18 : 0,
                                        background: 'var(--accent-color)',
                                        opacity: isActive ? 1 : 0,
                                        marginLeft: -4,
                                        marginRight: 2,
                                    }}
                                />
                                <Icon size={14} className="shrink-0" />
                                <span className="text-[11px] font-medium tracking-wide">{label}</span>
                            </button>
                        );
                    })}

                    <div className="my-1 mx-2.5 h-px" style={{ background: 'var(--border)' }} />

                    <button
                        onClick={toggleResume}
                        aria-label="Resume"
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors duration-150 cursor-pointer w-full"
                        style={{
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: 'var(--accent-color)',
                            fontFamily: UI,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(155,229,100,0.06)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        <FileText size={14} className="shrink-0" />
                        <span className="text-[11px] font-medium tracking-wide">
                            {showResume ? 'Back' : 'Resume'}
                        </span>
                    </button>
                </div>
            </nav>

            {/* ── Mobile toggle ── */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="fixed top-4 right-4 z-[70] md:hidden p-2.5 rounded-xl backdrop-blur-xl cursor-pointer transition-colors"
                style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    outline: 'none',
                }}
                aria-label="Toggle navigation"
            >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* ── Mobile dropdown ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-[65] md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                    >
                        <div
                            className="absolute inset-0"
                            style={{ background: 'rgba(11,13,16,0.7)', backdropFilter: 'blur(6px)' }}
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.nav
                            className="absolute top-16 right-4 rounded-xl p-2 min-w-[180px]"
                            style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                            }}
                            initial={{ opacity: 0, y: -6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                        >
                            {navItems.map(({ id, icon: Icon, label }) => (
                                <button
                                    key={id}
                                    onClick={() => handleNav(id)}
                                    aria-label={`Navigate to ${label}`}
                                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        color: activeId === id ? 'var(--accent-color)' : 'var(--text-muted)',
                                        fontFamily: UI,
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <Icon size={15} />
                                    <span className="font-medium">{label}</span>
                                </button>
                            ))}
                            <div className="my-1.5 mx-2 h-px" style={{ background: 'var(--border)' }} />
                            <button
                                onClick={() => { setMobileOpen(false); toggleResume(); }}
                                aria-label="Resume"
                                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    color: 'var(--accent-color)',
                                    fontFamily: UI,
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(155,229,100,0.06)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                <FileText size={15} />
                                <span className="font-medium">{showResume ? 'Back' : 'Resume'}</span>
                            </button>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
