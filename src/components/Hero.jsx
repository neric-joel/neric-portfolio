import React, { useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import profilePic from '../assets/profile.png';
import { Meteors } from './ui/Meteors';
import { Spotlight } from './ui/Spotlight';

const MotionDiv = motion.div;
const MotionH1 = motion.h1;

const stagger = {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } },
    item: {
        hidden:   { opacity: 0, y: 28, filter: 'blur(8px)' },
        visible:  { opacity: 1, y: 0,  filter: 'blur(0px)',
            transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] } },
    },
};

// Animated stat counter
const Stat = ({ value, label }) => {
    const ref = useRef(null);
    const num  = parseFloat(value.replace(/[^0-9.]/g, ''));
    const sfx  = value.replace(/[0-9.]/g, '');

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctrl = animate(0, num, {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.9,
            onUpdate(v) {
                el.textContent = (Number.isInteger(num) ? Math.round(v) : v.toFixed(1)) + sfx;
            },
        });
        return () => ctrl.stop();
    }, [num, sfx]);

    return (
        <div className="flex flex-col items-start">
            <span ref={ref} className="text-2xl font-bold tabular-nums"
                style={{ color: 'var(--accent-color)', fontFamily: 'Space Grotesk, sans-serif' }}>
                0{sfx}
            </span>
            <span className="text-[11px] tracking-widest uppercase mt-0.5"
                style={{ color: 'var(--text-muted)' }}>
                {label}
            </span>
        </div>
    );
};

const stats = [
    { label: 'IEEE Papers', value: '2'   },
    { label: 'Projects',    value: '6'   },
    { label: 'Exp. Years',  value: '3+'  },
    { label: 'Grad',        value: "'26" },
];

const socialLinks = [
    { href: 'https://github.com/neric-joel',      label: 'GitHub',   Icon: Github   },
    { href: 'https://linkedin.com/in/neric-joel', label: 'LinkedIn', Icon: Linkedin },
    { href: 'mailto:naruljoe@asu.edu',            label: 'Email',    Icon: Mail     },
];

const Hero = () => {
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden transition-colors duration-500"
            style={{ color: 'var(--text-primary)' }}
        >
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="var(--accent-color)" />

            {/* Radial fade to darken grid edges in hero */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, var(--bg-primary) 100%)',
            }} />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Meteors number={12} />
            </div>

            {/* Radial glows */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse 70% 55% at 15% 50%, color-mix(in srgb, var(--accent-color) 7%, transparent), transparent)',
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse 50% 35% at 85% 15%, color-mix(in srgb, var(--accent-secondary) 5%, transparent), transparent)',
            }} />

            {/* Floating orbs */}
            <MotionDiv
                className="absolute top-1/3 right-[12%] w-72 h-72 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-color) 7%, transparent), transparent 70%)' }}
                animate={{ y: [0, -22, 0], x: [0, 10, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <MotionDiv
                className="absolute bottom-1/4 left-[8%] w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-secondary) 6%, transparent), transparent 70%)' }}
                animate={{ y: [0, 16, 0], x: [0, -8, 0] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
            />

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex justify-center py-20">
                <MotionDiv
                    variants={stagger.container}
                    initial="hidden"
                    animate="visible"
                    className="max-w-3xl flex flex-col items-start text-left w-full"
                >
                    {/* Avatar */}
                    <MotionDiv variants={stagger.item} className="mb-8">
                        <motion.div
                            style={{ width: 'clamp(116px, 14vw, 152px)', height: 'clamp(116px, 14vw, 152px)', position: 'relative' }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                        >
                            {/* Spinning gradient ring */}
                            <div
                                style={{
                                    position: 'absolute', inset: 0, borderRadius: '50%',
                                    background: 'conic-gradient(from 0deg, var(--accent-color), var(--accent-secondary), transparent, var(--accent-color))',
                                    animation: 'spin-around 5s linear infinite',
                                    padding: '3px',
                                }}
                            />
                            {/* Glow pulse */}
                            <motion.div
                                style={{
                                    position: 'absolute', inset: 0, borderRadius: '50%',
                                    background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-color) 22%, transparent), transparent 70%)',
                                }}
                                animate={{ opacity: [0.3, 0.75, 0.3], scale: [1, 1.12, 1] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <div style={{
                                position: 'absolute', inset: '3px', borderRadius: '50%',
                                overflow: 'hidden', backgroundColor: 'var(--bg-primary)',
                            }}>
                                <img src={profilePic} alt="Neric Joel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </motion.div>
                    </MotionDiv>

                    {/* Status badge */}
                    <MotionDiv variants={stagger.item} className="mb-5">
                        <motion.div
                            className="inline-flex items-center gap-2.5 text-xs font-medium px-3.5 py-1.5 rounded-full"
                            style={{
                                border: '1px solid color-mix(in srgb, var(--accent-color) 22%, transparent)',
                                background: 'color-mix(in srgb, var(--accent-color) 6%, var(--bg-primary))',
                                fontFamily: 'Space Grotesk, sans-serif',
                            }}
                            animate={{ boxShadow: ['0 0 0px transparent', '0 0 12px color-mix(in srgb, var(--accent-color) 14%, transparent)', '0 0 0px transparent'] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            {/* Live green dot */}
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                                    style={{ backgroundColor: '#4ade80' }} />
                                <span className="relative inline-flex rounded-full h-2 w-2"
                                    style={{ backgroundColor: '#22c55e' }} />
                            </span>
                            <span style={{ color: 'var(--text-muted)' }}>
                                Available · Summer 2026 ·
                            </span>
                            <span style={{ color: 'var(--accent-color)', fontWeight: 600 }}>F-1 OPT</span>
                        </motion.div>
                    </MotionDiv>

                    {/* Name */}
                    <MotionDiv variants={stagger.item} className="mb-3">
                        <MotionH1
                            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-shimmer"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                            Neric Joel
                        </MotionH1>
                    </MotionDiv>

                    {/* Role — static */}
                    <MotionDiv variants={stagger.item} className="mb-7 flex items-center gap-3">
                        <span
                            className="text-lg md:text-xl font-semibold"
                            style={{ color: 'var(--accent-color)', fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                            AI / ML Engineer
                        </span>
                        <span className="text-sm md:text-base" style={{ color: 'var(--text-muted)' }}>
                            · M.S. CS @ ASU
                        </span>
                    </MotionDiv>

                    {/* Bio */}
                    <MotionDiv variants={stagger.item} className="text-base md:text-[1.02rem] leading-relaxed max-w-xl mb-9" style={{ color: 'var(--text-muted)' }}>
                        GPA 3.89 · 2 IEEE papers · targeting Summer 2026.{' '}
                        I build ML systems that ship — computer vision, NLP pipelines, and adaptive hardware control.
                    </MotionDiv>

                    {/* Stats */}
                    <MotionDiv variants={stagger.item} className="flex flex-wrap gap-8 mb-9">
                        {stats.map(({ label, value }) => (
                            <Stat key={label} value={value} label={label} />
                        ))}
                    </MotionDiv>

                    {/* CTAs */}
                    <MotionDiv variants={stagger.item} className="flex flex-wrap gap-3 mb-10">
                        {/* Primary */}
                        <motion.button
                            onClick={() => scrollTo('projects')}
                            className="relative px-6 py-3 rounded-xl text-sm font-semibold text-white overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, var(--accent-color), var(--accent-secondary))',
                                fontFamily: 'Space Grotesk, sans-serif',
                            }}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 32px color-mix(in srgb, var(--accent-color) 50%, transparent)' }}
                            whileTap={{ scale: 0.96 }}
                        >
                            {/* shimmer sweep */}
                            <motion.span
                                className="absolute inset-0 rounded-xl pointer-events-none"
                                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18), transparent 60%)' }}
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '160%' }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                            />
                            <span className="relative z-10 flex items-center gap-2">
                                View Projects
                                <motion.span
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                                >→</motion.span>
                            </span>
                        </motion.button>

                        {/* Secondary */}
                        <motion.button
                            onClick={() => scrollTo('contact')}
                            className="relative px-6 py-3 rounded-xl text-sm font-semibold overflow-hidden"
                            style={{
                                color: 'var(--text-heading)',
                                border: '1px solid color-mix(in srgb, var(--text-heading) 22%, transparent)',
                                background: 'transparent',
                                fontFamily: 'Space Grotesk, sans-serif',
                            }}
                            whileHover={{ scale: 1.05, borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
                            whileTap={{ scale: 0.96 }}
                        >
                            Get in Touch
                        </motion.button>
                    </MotionDiv>

                    {/* Social links */}
                    <MotionDiv variants={stagger.item} className="flex items-center gap-4">
                        {socialLinks.map(({ href, label, Icon }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target={href.startsWith('mailto') ? undefined : '_blank'}
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer"
                                style={{
                                    color: 'var(--text-muted)',
                                    border: '1px solid color-mix(in srgb, var(--text-muted) 18%, transparent)',
                                    background: 'var(--glass-bg)',
                                }}
                                whileHover={{
                                    scale: 1.15, y: -3,
                                    color: 'var(--accent-color)',
                                    borderColor: 'var(--accent-color)',
                                    boxShadow: '0 4px 18px color-mix(in srgb, var(--accent-color) 22%, transparent)',
                                }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            >
                                <Icon size={18} />
                            </motion.a>
                        ))}
                    </MotionDiv>
                </MotionDiv>
            </div>

            {/* Scroll hint */}
            <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
                style={{ color: 'var(--text-muted)' }}
            >
                <span className="text-[10px] uppercase tracking-[0.22em]">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                >
                    <ArrowDown size={13} />
                </motion.div>
            </MotionDiv>
        </section>
    );
};

export default Hero;
