import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import profilePic from '../assets/profile.png';

const Hero = () => {
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToProjects = () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-700">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex justify-center">
                <div className="max-w-3xl flex flex-col items-start text-left w-full">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="mb-6"
                    >
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-[var(--text-muted)]/20">
                            <img
                                src={profilePic}
                                alt="Neric Joel"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="mb-2"
                    >
                        <span className="text-xs font-medium tracking-widest uppercase text-[var(--accent-color)] mb-3 block">
                            Open to opportunities · Summer 2026
                        </span>
                        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text-heading)]">
                            Neric Joel
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-lg md:text-xl text-[var(--text-muted)] mb-6 font-normal"
                    >
                        Software Engineer · AI/ML · M.S. Computer Science @ ASU
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="space-y-3 text-base md:text-lg leading-relaxed text-[var(--text-primary)] max-w-2xl mb-8"
                    >
                        <p>
                            I build intelligent systems — from <span className="text-[var(--accent-color)] font-medium">computer vision</span> and <span className="text-[var(--accent-color)] font-medium">NLP models</span> to full-stack applications and research-grade ML pipelines. Currently pursuing my M.S. in CS at Arizona State University, with 2 published IEEE papers.
                        </p>
                        <p className="text-[var(--text-muted)] text-base">
                            My work spans AI research, software engineering, and hardware-software integration — I care about systems that are technically sound and practically useful.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="flex flex-wrap gap-3 mb-10"
                    >
                        <button
                            onClick={scrollToProjects}
                            className="px-5 py-2.5 rounded-lg bg-[var(--accent-color)] text-white font-medium hover:opacity-90 transition-opacity text-sm"
                        >
                            View Projects
                        </button>
                        <button
                            onClick={scrollToContact}
                            className="px-5 py-2.5 rounded-lg bg-transparent text-[var(--text-primary)] font-medium border border-[var(--text-muted)]/30 hover:border-[var(--accent-color)]/60 transition-colors text-sm"
                        >
                            Get in Touch
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        className="flex items-center gap-4"
                    >
                        <a href="https://github.com/neric-joel" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="https://linkedin.com/in/neric-joel" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:naruljoe@asu.edu" aria-label="Email" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                            <Mail size={20} />
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
