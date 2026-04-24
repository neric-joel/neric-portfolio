import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, FileText } from 'lucide-react';
import profilePic from '../assets/profile.png';

const DISPLAY = 'Syne, sans-serif';
const UI      = 'Plus Jakarta Sans, Inter, sans-serif';

/* ── Fade-up variant — simple, no blur ── */
const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 14 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
});

/* ── Proof items ── */
const proof = [
    { value: '3.89', label: 'GPA'         },
    { value: '2',    label: 'IEEE Papers'  },
    { value: 'M.S.', label: 'CS @ ASU'    },
    { value: "'27",  label: 'Graduating'   },
];

/* ── Social links ── */
const social = [
    { href: 'https://github.com/neric-joel',      label: 'GitHub',   Icon: Github   },
    { href: 'https://linkedin.com/in/neric-joel', label: 'LinkedIn', Icon: Linkedin },
    { href: 'mailto:naruljoe@asu.edu',            label: 'Email',    Icon: Mail     },
];

/* ── Featured project ── */
const featured = {
    label:    'Featured Work',
    title:    'Satellite Image Segmentation',
    desc:     'Multi-scale ResNet-50 + U-Net pipeline for land-use classification from multispectral satellite imagery. Includes Grad-CAM explainability and automated augmentation.',
    result:   '91% precision on terrain classification',
    stack:    ['Python', 'TensorFlow', 'OpenCV', 'Grad-CAM'],
    category: 'Computer Vision',
};

/* ──────────────────────────────────────────────────── */

const Hero = ({ toggleResume }) => {
    const scrollTo = (id) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center"
            style={{ color: 'var(--text-primary)' }}
        >
            {/* Single faint top-center glow — CSS only, no canvas noise */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(155,229,100,0.06) 0%, transparent 100%)',
                }}
            />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-20">
                {/*
                  Two-column grid on lg+:
                  left = 3 cols (name, role, tagline, proof, CTAs, social)
                  right = 2 cols (featured project card)
                */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">

                    {/* ── LEFT: main content ── */}
                    <div className="lg:col-span-3 flex flex-col gap-6">

                        {/* Availability badge */}
                        <motion.div {...fadeUp(0.05)} className="flex items-center gap-2">
                            <span
                                className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md"
                                style={{
                                    background: 'rgba(155,229,100,0.08)',
                                    border: '1px solid rgba(155,229,100,0.22)',
                                    color: 'var(--accent-color)',
                                    fontFamily: UI,
                                }}
                            >
                                <span
                                    className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
                                    style={{ background: 'var(--accent-color)' }}
                                />
                                Open to Summer 2026 internships
                            </span>
                        </motion.div>

                        {/* Name + photo row */}
                        <motion.div {...fadeUp(0.1)} className="flex items-center gap-5">
                            {/* Profile photo */}
                            <div
                                className="shrink-0 rounded-full overflow-hidden"
                                style={{
                                    width: 96, height: 96,
                                    border: '2px solid var(--border)',
                                }}
                            >
                                <img
                                    src={profilePic}
                                    alt="Neric Joel"
                                    width={96} height={96}
                                    fetchPriority="high"
                                    decoding="sync"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div>
                                <h1
                                    className="font-bold leading-none tracking-tight"
                                    style={{
                                        fontFamily: DISPLAY,
                                        fontSize: 'clamp(36px, 5vw, 58px)',
                                        color: 'var(--text-heading)',
                                        letterSpacing: '-0.02em',
                                    }}
                                >
                                    Neric Joel
                                </h1>
                                <p
                                    className="mt-0.5 text-sm font-medium"
                                    style={{ color: 'var(--text-muted)', fontFamily: UI }}
                                >
                                    naruljoe@asu.edu
                                </p>
                            </div>
                        </motion.div>

                        {/* Role */}
                        <motion.div {...fadeUp(0.15)}>
                            <p
                                className="text-xl md:text-2xl font-semibold"
                                style={{ color: 'var(--accent-color)', fontFamily: UI }}
                            >
                                Computer Vision Engineer
                            </p>
                        </motion.div>

                        {/* Tagline */}
                        <motion.div {...fadeUp(0.2)}>
                            <p
                                className="text-base md:text-lg leading-relaxed max-w-lg"
                                style={{ color: 'var(--text-muted)', fontFamily: UI }}
                            >
                                I build and deploy ML systems across computer vision, NLP, and signal
                                processing, from research prototype to production pipeline.
                            </p>
                        </motion.div>

                        {/* Proof strip */}
                        <motion.div {...fadeUp(0.25)}>
                            <div
                                className="inline-flex flex-wrap gap-x-6 gap-y-3 px-4 py-3 rounded-lg"
                                style={{
                                    background: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    fontFamily: UI,
                                }}
                            >
                                {proof.map(({ value, label }, i) => (
                                    <React.Fragment key={label}>
                                        <div className="flex flex-col items-center min-w-[3rem]">
                                            <span
                                                className="text-lg font-bold tabular-nums leading-none"
                                                style={{ color: 'var(--text-heading)', fontFamily: DISPLAY }}
                                            >
                                                {value}
                                            </span>
                                            <span
                                                className="text-[10px] font-medium tracking-wider uppercase mt-0.5"
                                                style={{ color: 'var(--text-muted)' }}
                                            >
                                                {label}
                                            </span>
                                        </div>
                                        {i < proof.length - 1 && (
                                            <div
                                                className="self-stretch w-px"
                                                style={{ background: 'var(--border)' }}
                                            />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3">
                            {/* Primary */}
                            <motion.button
                                onClick={() => scrollTo('projects')}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer"
                                style={{
                                    background: 'var(--accent-color)',
                                    color: '#0B0D10',
                                    fontFamily: UI,
                                    border: 'none',
                                    outline: 'none',
                                }}
                                whileHover={{ opacity: 0.9 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.12 }}
                            >
                                View Projects
                                <ArrowRight size={14} />
                            </motion.button>

                            {/* Secondary */}
                            <motion.button
                                onClick={toggleResume}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer"
                                style={{
                                    background: 'transparent',
                                    color: 'var(--text-primary)',
                                    fontFamily: UI,
                                    border: '1px solid var(--border)',
                                    outline: 'none',
                                }}
                                whileHover={{ borderColor: 'rgba(155,229,100,0.5)', color: 'var(--accent-color)' }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.12 }}
                            >
                                <FileText size={14} />
                                Resume
                            </motion.button>
                        </motion.div>

                        {/* Social links */}
                        <motion.div {...fadeUp(0.35)} className="flex items-center gap-2">
                            {social.map(({ href, label, Icon }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('mailto') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
                                    style={{
                                        color: 'var(--text-muted)',
                                        background: 'transparent',
                                        border: '1px solid var(--border)',
                                        fontFamily: UI,
                                        textDecoration: 'none',
                                    }}
                                    whileHover={{ color: 'var(--text-primary)', borderColor: 'rgba(155,229,100,0.3)' }}
                                    whileTap={{ scale: 0.96 }}
                                    transition={{ duration: 0.12 }}
                                >
                                    <Icon size={13} />
                                    {label}
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT: featured project card ── */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                    >
                        <div
                            className="rounded-xl p-5 flex flex-col gap-4"
                            style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                            }}
                        >
                            {/* Card header */}
                            <div className="flex items-center justify-between">
                                <span
                                    className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded"
                                    style={{
                                        background: 'rgba(155,229,100,0.08)',
                                        border: '1px solid rgba(155,229,100,0.18)',
                                        color: 'var(--accent-color)',
                                        fontFamily: UI,
                                    }}
                                >
                                    {featured.category}
                                </span>
                                <span
                                    className="text-[10px] font-medium uppercase tracking-widest"
                                    style={{ color: 'var(--text-muted)', fontFamily: UI }}
                                >
                                    Featured
                                </span>
                            </div>

                            {/* Title */}
                            <h2
                                className="text-base font-semibold leading-snug"
                                style={{ color: 'var(--text-heading)', fontFamily: DISPLAY }}
                            >
                                {featured.title}
                            </h2>

                            {/* Description */}
                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: 'var(--text-muted)', fontFamily: UI }}
                            >
                                {featured.desc}
                            </p>

                            {/* Result — highlighted */}
                            <div
                                className="flex items-start gap-2 px-3 py-2.5 rounded-lg"
                                style={{
                                    background: 'rgba(155,229,100,0.06)',
                                    border: '1px solid rgba(155,229,100,0.15)',
                                }}
                            >
                                <span
                                    className="mt-0.5 shrink-0 rounded-full"
                                    style={{ width: 6, height: 6, background: 'var(--accent-color)', marginTop: 6 }}
                                />
                                <p
                                    className="text-sm font-medium"
                                    style={{ color: 'var(--accent-color)', fontFamily: UI }}
                                >
                                    {featured.result}
                                </p>
                            </div>

                            {/* Stack */}
                            <div className="flex flex-wrap gap-1.5">
                                {featured.stack.map(t => (
                                    <span
                                        key={t}
                                        className="px-2 py-0.5 rounded text-[11px] font-medium"
                                        style={{
                                            background: 'var(--bg-primary)',
                                            border: '1px solid var(--border)',
                                            color: 'var(--text-muted)',
                                            fontFamily: UI,
                                        }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* Link */}
                            <motion.button
                                onClick={() => scrollTo('projects')}
                                className="flex items-center gap-1.5 text-sm font-medium cursor-pointer w-fit"
                                style={{
                                    color: 'var(--accent-color)',
                                    background: 'none',
                                    border: 'none',
                                    outline: 'none',
                                    padding: 0,
                                    fontFamily: UI,
                                }}
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.15 }}
                            >
                                View all projects
                                <ArrowRight size={13} />
                            </motion.button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
