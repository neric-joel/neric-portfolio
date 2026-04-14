import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import profilePic from '../assets/profile.png';
import { Meteors } from './ui/Meteors';
import { WordRotate } from './ui/WordRotate';
import { Spotlight } from './ui/Spotlight';
import { ShimmerButton } from './ui/ShimmerButton';

// Named consts so ESLint no-unused-vars tracks motion.* usage
const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;

const stagger = {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } },
    item: {
        hidden:   { opacity: 0, y: 20, filter: 'blur(8px)' },
        visible:  { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
    },
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
            className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500"
        >
            {/* Spotlight sweep */}
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="var(--accent-color)" />

            {/* Meteor shower */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Meteors number={18} />
            </div>

            {/* Radial accent glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, var(--accent-color) 4%, transparent), transparent)' }}
            />

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex justify-center py-20">
                <MotionDiv
                    variants={stagger.container}
                    initial="hidden"
                    animate="visible"
                    className="max-w-3xl flex flex-col items-start text-left w-full"
                >
                    {/* Avatar with spinning accent ring */}
                    <MotionDiv variants={stagger.item} className="mb-7">
                        <div className="relative w-16 h-16 md:w-20 md:h-20">
                            {/* Spinning conic ring */}
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: 'conic-gradient(var(--accent-color), transparent, var(--accent-color))',
                                    animation: 'spin-around 4s linear infinite',
                                }}
                            />
                            <div
                                className="absolute inset-[2px] rounded-full overflow-hidden"
                                style={{ backgroundColor: 'var(--bg-primary)' }}
                            >
                                <img src={profilePic} alt="Neric Joel" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </MotionDiv>

                    {/* Status badge */}
                    <MotionDiv variants={stagger.item} className="mb-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase px-3 py-1 rounded-full border border-[var(--accent-color)]/30 text-[var(--accent-color)] bg-[var(--accent-color)]/8">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-pulse" />
                            Open to opportunities · Summer 2026
                        </span>
                    </MotionDiv>

                    {/* Name — shimmer animation */}
                    <MotionH1
                        variants={stagger.item}
                        className="text-5xl md:text-6xl font-bold tracking-tight mb-3 text-shimmer"
                    >
                        Neric Joel
                    </MotionH1>

                    {/* Rotating role */}
                    <MotionDiv variants={stagger.item} className="mb-6 h-8 flex items-center gap-3">
                        <WordRotate
                            words={roles}
                            duration={2800}
                            className="text-lg md:text-xl font-medium"
                            style={{ color: 'var(--accent-color)' }}
                        />
                        <span className="text-base text-[var(--text-muted)] font-normal">· M.S. CS @ ASU</span>
                    </MotionDiv>

                    {/* Bio */}
                    <MotionDiv variants={stagger.item} className="space-y-3 text-base md:text-lg leading-relaxed text-[var(--text-primary)] max-w-2xl mb-8">
                        <p>
                            I build intelligent systems — from{' '}
                            <span className="text-[var(--accent-color)] font-medium">computer vision</span> and{' '}
                            <span className="text-[var(--accent-color)] font-medium">NLP models</span> to full-stack
                            applications and research-grade ML pipelines. Currently pursuing my M.S. in CS at ASU,
                            with 2 published IEEE papers.
                        </p>
                        <MotionP className="text-[var(--text-muted)] text-base">
                            My work spans AI research, software engineering, and hardware-software integration — I
                            care about systems that are technically sound and practically useful.
                        </MotionP>
                    </MotionDiv>

                    {/* Stats strip */}
                    <MotionDiv variants={stagger.item} className="flex flex-wrap gap-6 mb-8">
                        {stats.map(({ label, value }) => (
                            <div key={label} className="flex flex-col">
                                <span className="text-2xl font-semibold tabular-nums text-[var(--accent-color)]">{value}</span>
                                <span className="text-xs tracking-wide uppercase text-[var(--text-muted)]">{label}</span>
                            </div>
                        ))}
                    </MotionDiv>

                    {/* CTAs */}
                    <MotionDiv variants={stagger.item} className="flex flex-wrap gap-3 mb-10">
                        <ShimmerButton
                            background="var(--accent-color)"
                            shimmerColor="rgba(255,255,255,0.4)"
                            borderRadius="8px"
                            shimmerDuration="2.5s"
                            style={{ color: '#000', fontWeight: 600 }}
                            onClick={() => scrollTo('projects')}
                        >
                            View Projects
                        </ShimmerButton>
                        <button
                            onClick={() => scrollTo('contact')}
                            className="px-5 py-2.5 rounded-lg text-sm font-medium text-[var(--text-muted)] border border-[var(--text-muted)]/20 hover:border-[var(--text-muted)]/50 hover:text-[var(--text-primary)] transition-all duration-200 cursor-pointer"
                        >
                            Get in Touch
                        </button>
                    </MotionDiv>

                    {/* Social links */}
                    <MotionDiv variants={stagger.item} className="flex items-center gap-5">
                        {socialLinks.map((link) => {
                            const LinkIcon = link.Icon;
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 cursor-pointer"
                                >
                                    <LinkIcon size={18} />
                                </a>
                            );
                        })}
                    </MotionDiv>
                </MotionDiv>
            </div>

            {/* Scroll hint */}
            <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--text-muted)]"
            >
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                <MotionDiv
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                    <ArrowDown size={14} />
                </MotionDiv>
            </MotionDiv>
        </section>
    );
};

export default Hero;
