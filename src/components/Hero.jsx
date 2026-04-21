import React, { useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Download } from 'lucide-react';
import profilePic from '../assets/profile.png';
import { Meteors } from './ui/Meteors';
import { WordRotate } from './ui/WordRotate';
import { Spotlight } from './ui/Spotlight';

const MotionDiv = motion.div;
const MotionH1 = motion.h1;

const stagger = {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } },
    item: {
        hidden:   { opacity: 0, y: 24, filter: 'blur(8px)' },
        visible:  { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] } },
    },
};

// Animated number counter
const AnimatedStat = ({ value, label }) => {
    const nodeRef = useRef(null);
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;
        const controls = animate(0, numericValue, {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.8,
            onUpdate(v) {
                node.textContent = (Number.isInteger(numericValue) ? Math.round(v) : v.toFixed(1)) + suffix;
            },
        });
        return () => controls.stop();
    }, [numericValue, suffix]);

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col items-start"
        >
            <span ref={nodeRef} className="text-2xl font-bold tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--accent-color)' }}>
                0{suffix}
            </span>
            <span className="text-xs tracking-widest uppercase mt-0.5" style={{ color: 'var(--text-muted)' }}>{label}</span>
        </MotionDiv>
    );
};

const stats = [
    { label: 'IEEE Papers', value: '2' },
    { label: 'Projects',    value: '6' },
    { label: 'Years Exp.',  value: '3+' },
    { label: 'Graduating',  value: "'26" },
];

const roles = ['Software Engineer', 'AI/ML Engineer', 'Research Engineer', 'Full-Stack Builder'];

const socialLinks = [
    { href: 'https://github.com/neric-joel',      label: 'GitHub',   Icon: Github },
    { href: 'https://linkedin.com/in/neric-joel', label: 'LinkedIn', Icon: Linkedin },
    { href: 'mailto:naruljoe@asu.edu',            label: 'Email',    Icon: Mail },
];

const Hero = () => {
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden transition-colors duration-500"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            {/* Spotlight sweep */}
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="var(--accent-color)" />

            {/* Meteor shower */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Meteors number={18} />
            </div>

            {/* Deep radial glow */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse 80% 60% at 20% 50%, color-mix(in srgb, var(--accent-color) 6%, transparent), transparent)'
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse 60% 40% at 80% 20%, color-mix(in srgb, var(--accent-secondary) 5%, transparent), transparent)'
            }} />

            {/* Floating ambient orbs */}
            <MotionDiv
                className="absolute top-1/3 right-[15%] w-80 h-80 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-color) 8%, transparent), transparent 70%)' }}
                animate={{ y: [0, -24, 0], x: [0, 12, 0], scale: [1, 1.06, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <MotionDiv
                className="absolute bottom-1/4 left-[10%] w-56 h-56 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-secondary) 6%, transparent), transparent 70%)' }}
                animate={{ y: [0, 18, 0], x: [0, -10, 0], scale: [1, 1.1, 1] }}
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
                            className="relative"
                            style={{ width: 'clamp(112px, 14vw, 152px)', height: 'clamp(112px, 14vw, 152px)' }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                        >
                            {/* Animated gradient ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: 'conic-gradient(from 0deg, var(--accent-color), var(--accent-secondary), transparent, var(--accent-color))',
                                    animation: 'spin-around 5s linear infinite',
                                    padding: '3px',
                                }}
                            />
                            {/* Outer glow */}
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-color) 25%, transparent), transparent 70%)' }}
                                animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.12, 1] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            {/* Inner background gap */}
                            <div className="absolute inset-[3px] rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
                                <img
                                    src={profilePic}
                                    alt="Neric Joel"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </MotionDiv>

                    {/* Status badge */}
                    <MotionDiv variants={stagger.item} className="mb-5">
                        <motion.span
                            className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase px-4 py-1.5 rounded-full"
                            style={{
                                border: '1px solid color-mix(in srgb, var(--accent-color) 30%, transparent)',
                                color: 'var(--accent-color)',
                                background: 'color-mix(in srgb, var(--accent-color) 8%, transparent)',
                            }}
                            animate={{ boxShadow: ['0 0 0px transparent', '0 0 12px color-mix(in srgb, var(--accent-color) 20%, transparent)', '0 0 0px transparent'] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-color)' }} />
                            Open to opportunities · Summer 2026
                        </motion.span>
                    </MotionDiv>

                    {/* Name */}
                    <MotionH1
                        variants={stagger.item}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3 text-shimmer"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                        Neric Joel
                    </MotionH1>

                    {/* Rotating role */}
                    <MotionDiv variants={stagger.item} className="mb-7 h-9 flex items-center gap-3">
                        <WordRotate
                            words={roles}
                            duration={2800}
                            className="text-lg md:text-xl font-semibold"
                            style={{ color: 'var(--accent-color)', fontFamily: 'Space Grotesk, sans-serif' }}
                        />
                        <span className="text-sm md:text-base font-normal" style={{ color: 'var(--text-muted)' }}>· M.S. CS @ ASU</span>
                    </MotionDiv>

                    {/* Bio */}
                    <MotionDiv variants={stagger.item} className="space-y-3 text-base md:text-lg leading-relaxed max-w-2xl mb-8" style={{ color: 'var(--text-primary)' }}>
                        <p>
                            I build intelligent systems — from{' '}
                            <span className="font-medium" style={{ color: 'var(--accent-color)' }}>computer vision</span> and{' '}
                            <span className="font-medium" style={{ color: 'var(--accent-color)' }}>NLP models</span> to full-stack
                            applications and research-grade ML pipelines. Currently pursuing my M.S. in CS at ASU,
                            with 2 published IEEE papers.
                        </p>
                        <p className="text-base" style={{ color: 'var(--text-muted)' }}>
                            My work spans AI research, software engineering, and hardware-software integration — I
                            care about systems that are technically sound and practically useful.
                        </p>
                    </MotionDiv>

                    {/* Stats */}
                    <MotionDiv variants={stagger.item} className="flex flex-wrap gap-8 mb-9">
                        {stats.map(({ label, value }) => (
                            <AnimatedStat key={label} value={value} label={label} />
                        ))}
                    </MotionDiv>

                    {/* CTAs */}
                    <MotionDiv variants={stagger.item} className="flex flex-wrap gap-3 mb-10">
                        {/* Primary CTA — solid fill, always visible */}
                        <motion.button
                            onClick={() => scrollTo('projects')}
                            className="relative px-6 py-3 rounded-xl text-sm font-semibold text-white overflow-hidden cursor-pointer"
                            style={{
                                background: 'linear-gradient(135deg, var(--accent-color), var(--accent-secondary))',
                                fontFamily: 'Space Grotesk, sans-serif',
                            }}
                            whileHover={{ scale: 1.04, boxShadow: '0 0 24px color-mix(in srgb, var(--accent-color) 40%, transparent)' }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                            {/* Shimmer sweep on hover */}
                            <motion.span
                                className="absolute inset-0 bg-white/10 rounded-xl"
                                initial={{ x: '-100%', skewX: '-15deg' }}
                                whileHover={{ x: '200%' }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                            />
                            <span className="relative z-10">View Projects</span>
                        </motion.button>

                        {/* Secondary CTA — clearly visible border + text */}
                        <motion.button
                            onClick={() => scrollTo('contact')}
                            className="px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                            style={{
                                color: 'var(--text-heading)',
                                border: '1px solid color-mix(in srgb, var(--text-heading) 25%, transparent)',
                                background: 'transparent',
                                fontFamily: 'Space Grotesk, sans-serif',
                            }}
                            whileHover={{
                                scale: 1.04,
                                borderColor: 'var(--accent-color)',
                                color: 'var(--accent-color)',
                            }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                            Get in Touch
                        </motion.button>

                        {/* Resume download hint */}
                        <motion.button
                            className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer"
                            style={{
                                color: 'var(--text-muted)',
                                background: 'transparent',
                            }}
                            whileHover={{ color: 'var(--text-primary)', x: 2 }}
                            transition={{ duration: 0.2 }}
                            title="Print resume from sidebar"
                        >
                            <Download size={14} />
                            <span>Resume</span>
                        </motion.button>
                    </MotionDiv>

                    {/* Social links */}
                    <MotionDiv variants={stagger.item} className="flex items-center gap-6">
                        {socialLinks.map((link) => {
                            const LinkIcon = link.Icon;
                            return (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    className="flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer"
                                    style={{
                                        color: 'var(--text-muted)',
                                        border: '1px solid color-mix(in srgb, var(--text-muted) 20%, transparent)',
                                        background: 'var(--glass-bg)',
                                    }}
                                    whileHover={{
                                        scale: 1.15,
                                        y: -3,
                                        color: 'var(--accent-color)',
                                        borderColor: 'var(--accent-color)',
                                        boxShadow: '0 4px 20px color-mix(in srgb, var(--accent-color) 25%, transparent)',
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                >
                                    <LinkIcon size={18} />
                                </motion.a>
                            );
                        })}
                    </MotionDiv>
                </MotionDiv>
            </div>

            {/* Scroll hint */}
            <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
                style={{ color: 'var(--text-muted)' }}
            >
                <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
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
