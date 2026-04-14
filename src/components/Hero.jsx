import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import profilePic from '../assets/profile.png';

const stagger = {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } },
    item: {
        hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } }
    }
};

const Hero = () => {
    const scrollTo = (id) => {
        if (id === 'projects') document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex justify-center py-20">
                <motion.div
                    variants={stagger.container}
                    initial="hidden"
                    animate="visible"
                    className="max-w-3xl flex flex-col items-start text-left w-full"
                >
                    {/* Avatar */}
                    <motion.div variants={stagger.item} className="mb-7">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border border-[var(--text-muted)]/20 shadow-lg">
                            <img src={profilePic} alt="Neric Joel" className="w-full h-full object-cover" />
                        </div>
                    </motion.div>

                    {/* Status badge */}
                    <motion.div variants={stagger.item} className="mb-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase px-3 py-1 rounded-full border border-[var(--accent-color)]/30 text-[var(--accent-color)] bg-[var(--accent-color)]/8">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-pulse" />
                            Open to opportunities · Summer 2026
                        </span>
                    </motion.div>

                    {/* Name — shimmer animation */}
                    <motion.h1
                        variants={stagger.item}
                        className="text-5xl md:text-6xl font-bold tracking-tight mb-3 text-shimmer"
                    >
                        Neric Joel
                    </motion.h1>

                    {/* Role */}
                    <motion.p variants={stagger.item} className="text-lg md:text-xl text-[var(--text-muted)] mb-6 font-normal">
                        Software Engineer · AI/ML · M.S. Computer Science @ ASU
                    </motion.p>

                    {/* Bio */}
                    <motion.div variants={stagger.item} className="space-y-3 text-base md:text-lg leading-relaxed text-[var(--text-primary)] max-w-2xl mb-8">
                        <p>
                            I build intelligent systems — from{' '}
                            <span className="text-[var(--accent-color)] font-medium">computer vision</span> and{' '}
                            <span className="text-[var(--accent-color)] font-medium">NLP models</span> to full-stack
                            applications and research-grade ML pipelines. Currently pursuing my M.S. in CS at ASU,
                            with 2 published IEEE papers.
                        </p>
                        <p className="text-[var(--text-muted)] text-base">
                            My work spans AI research, software engineering, and hardware-software integration — I
                            care about systems that are technically sound and practically useful.
                        </p>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div variants={stagger.item} className="flex flex-wrap gap-3 mb-10">
                        <button
                            onClick={() => scrollTo('projects')}
                            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/30 hover:bg-[var(--accent-color)]/20 hover:border-[var(--accent-color)]/60 transition-all duration-200 cursor-pointer"
                        >
                            View Projects
                        </button>
                        <button
                            onClick={() => scrollTo('contact')}
                            className="px-5 py-2.5 rounded-lg text-sm font-medium text-[var(--text-muted)] border border-[var(--text-muted)]/20 hover:border-[var(--text-muted)]/50 hover:text-[var(--text-primary)] transition-all duration-200 cursor-pointer"
                        >
                            Get in Touch
                        </button>
                    </motion.div>

                    {/* Social links */}
                    <motion.div variants={stagger.item} className="flex items-center gap-5">
                        {[
                            { href: 'https://github.com/neric-joel', label: 'GitHub', icon: Github },
                            { href: 'https://linkedin.com/in/neric-joel', label: 'LinkedIn', icon: Linkedin },
                            { href: 'mailto:naruljoe@asu.edu', label: 'Email', icon: Mail },
                        ].map(({ href, label, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith('mailto') ? undefined : '_blank'}
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 cursor-pointer"
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--text-muted)]"
            >
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                    <ArrowDown size={14} />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
