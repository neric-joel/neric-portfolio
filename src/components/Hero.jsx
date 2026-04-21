import React, { useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import profilePic from '../assets/profile.png';
import { Meteors } from './ui/Meteors';
import { WordRotate } from './ui/WordRotate';
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

const roles = ['Software Engineer', 'AI/ML Engineer', 'Research Engineer', 'Full-Stack Builder'];

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
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="var(--accent-color)" />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Meteors number={16} />
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
                        <motion.span
                            className="inline-flex items-center gap-2 text-xs font-medium tracking-wide px-4 py-1.5 rounded-full"
                            style={{
                                border: '1px solid color-mix(in srgb, var(--accent-color) 28%, transparent)',
                                color: 'var(--accent-color)',
                                background: 'color-mix(in srgb, var(--accent-color) 8%, transparent)',
                                fontFamily: 'Space Grotesk, sans-serif',
                                letterSpacing: '0.03em',
                            }}
                            animate={{ boxShadow: ['0 0 0 transparent', '0 0 14px color-mix(in srgb, var(--accent-color) 18%, transparent)', '0 0 0 transparent'] }}
                            transition={{ duration: 3.5, repeat: Infinity }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-color)' }} />
                            Open to roles · Summer 2026 · F-1 OPT
                        </motion.span>
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

                    {/* Rotating role */}
                    <MotionDiv variants={stagger.item} className="mb-7 h-9 flex items-center gap-3">
                        <WordRotate
                            words={roles}
                            duration={2800}
                            className="text-lg md:text-xl font-semibold"
                            style={{ color: 'var(--accent-color)', fontFamily: 'Space Grotesk, sans-serif' }}
                        />
                        <span className="text-sm md:text-base" style={{ color: 'var(--text-muted)' }}>
                            · M.S. CS @ ASU
                        </span>
                    </MotionDiv>

                    {/* Bio — specific, no slop */}
                    <MotionDiv variants={stagger.item} className="space-y-2.5 text-base md:text-[1.05rem] leading-relaxed max-w-2xl mb-9">
                        <p style={{ color: 'var(--text-primary)' }}>
                            GPA 3.89. Two IEEE papers published. I've shipped{' '}
                            <span style={{ color: 'var(--accent-color)', fontWeight: 500 }}>satellite image segmentation</span>{' '}
                            at 91% precision, a solar PV emulator with 15% efficiency gains, and an AI resume analyzer
                            that cut review time by 70%.
                        </p>
                        <p style={{ color: 'var(--text-muted)' }}>
                            I like problems at the edge of ML and real systems — hardware, research, production software.
                            Not looking for "rockstar engineers" — looking for hard problems.
                        </p>
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
                            className="relative px-6 py-3 rounded-xl text-sm font-semibold text-white overflow-hidden cursor-pointer"
                            style={{
                                background: 'linear-gradient(135deg, var(--accent-color), var(--accent-secondary))',
                                fontFamily: 'Space Grotesk, sans-serif',
                            }}
                            whileHover={{ scale: 1.04, boxShadow: '0 0 28px color-mix(in srgb, var(--accent-color) 40%, transparent)' }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <motion.span
                                className="absolute inset-0 rounded-xl"
                                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }}
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.45 }}
                            />
                            <span className="relative z-10">View Projects</span>
                        </motion.button>

                        {/* Secondary — white border, always visible */}
                        <motion.button
                            onClick={() => scrollTo('contact')}
                            className="px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                            style={{
                                color: 'var(--text-heading)',
                                border: '1px solid color-mix(in srgb, var(--text-heading) 28%, transparent)',
                                background: 'transparent',
                                fontFamily: 'Space Grotesk, sans-serif',
                            }}
                            whileHover={{
                                scale: 1.04,
                                borderColor: 'var(--accent-color)',
                                color: 'var(--accent-color)',
                            }}
                            whileTap={{ scale: 0.97 }}
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
