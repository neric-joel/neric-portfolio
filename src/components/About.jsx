import React from 'react';
import { motion } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';

const cards = [
    {
        label: 'Graduate Education',
        degree: 'M.S. Computer Science',
        school: 'Arizona State University',
        year: 'Aug 2025 – Present',
        borderColor: 'var(--accent-color)',
    },
    {
        label: 'Undergraduate',
        degree: 'B.Tech Electrical Engineering',
        school: 'Amrita Vishwa Vidyapeetham',
        year: 'Sep 2021 – May 2025',
        borderColor: 'color-mix(in srgb, var(--accent-color) 65%, transparent)',
    },
    {
        label: 'Research',
        degree: '2 IEEE Publications',
        school: 'ML · VLSI · Energy Systems',
        year: '2024 – 2025',
        borderColor: 'color-mix(in srgb, var(--accent-secondary) 70%, transparent)',
    },
];

const About = () => (
    <section id="about" className="py-24 relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-6">
            <RevealOnScroll>
                <h2
                    className="text-[2rem] font-bold mb-14 text-center heading-accent inline-block w-full"
                    style={{ color: 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    About
                </h2>
            </RevealOnScroll>

            <div
                className="max-w-4xl mx-auto rounded-2xl p-8 md:p-12 gradient-border"
                style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 0 60px color-mix(in srgb, var(--accent-color) 5%, transparent)',
                }}
            >
                <RevealOnScroll delay={0.1}>
                    <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: 'var(--text-primary)' }}>
                        I'm a graduate student in Computer Science at Arizona State University, with a background
                        in electrical engineering and a focus on applied AI and software systems. I work across
                        the full spectrum — from training ML models to building production applications to
                        optimizing systems closer to the hardware.
                    </p>
                    <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        I've published research in IEEE on{' '}
                        <span style={{ color: 'var(--text-primary)' }}>low-power VLSI design</span> and{' '}
                        <span style={{ color: 'var(--text-primary)' }}>solar energy optimization</span>, built ML
                        projects across computer vision, NLP, and signal processing, and contributed to research
                        labs and technical leadership roles.
                    </p>
                </RevealOnScroll>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cards.map((card, i) => (
                        <motion.div
                            key={card.label}
                            initial={{ opacity: 0, x: -20, filter: 'blur(6px)' }}
                            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                            whileHover={{ x: 5 }}
                            className="p-4 rounded-xl cursor-default"
                            style={{
                                background: 'color-mix(in srgb, var(--bg-primary) 50%, transparent)',
                                borderLeft: `3px solid ${card.borderColor}`,
                            }}
                        >
                            <h3
                                className="font-semibold mb-2 text-xs uppercase tracking-widest"
                                style={{ color: 'var(--accent-color)' }}
                            >
                                {card.label}
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{card.degree}</p>
                            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{card.school}</p>
                            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{card.year}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default About;
