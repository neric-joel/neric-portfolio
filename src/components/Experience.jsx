import React from 'react';
import { motion } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';

const experiences = [
    {
        role: "Research Assistant",
        org: "PV Systems Lab, Amrita University",
        date: "Jan 2024 – May 2024",
        details: [
            "Developed a solar PV emulator with AI-based MPPT algorithms to enhance solar cell efficiency.",
            "Modeled PV characteristics using MATLAB and Python for real-time performance prediction.",
            "Co-authored IEEE paper on optimization algorithms for PV performance enhancement.",
        ],
    },
    {
        role: "Student Lead",
        org: "Amritavotav Technical Events",
        date: "Sep 2024 – Oct 2024",
        details: [
            "Led university-wide technical competitions with 50+ teams.",
            "Mentored undergraduates in embedded systems and IoT projects.",
            "Oversaw event execution, judging criteria, and technical presentation management.",
        ],
    },
    {
        role: "Intern – Electrical Design",
        org: "Ranga and Company, Chennai",
        date: "May 2023 – Jun 2023",
        details: [
            "Designed and simulated electrical distribution systems adhering to safety standards.",
            "Created documentation and assisted in schematic design and testing.",
        ],
    },
];

const Experience = () => (
    <section id="experience" className="py-16 relative transition-colors duration-400" >
        <div className="container mx-auto px-6 md:px-20">
            <RevealOnScroll>
                <h2
                    className="text-[2rem] font-bold mb-14 text-center md:text-left"
                    style={{ color: 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    Experience
                </h2>
            </RevealOnScroll>

            <div className="relative pl-5 md:pl-8">
                {/* Animated timeline line */}
                <motion.div
                    className="absolute left-0 top-0 bottom-0 w-px"
                    style={{ background: 'linear-gradient(to bottom, var(--accent-color), var(--accent-secondary), transparent)' }}
                    initial={{ scaleY: 0, originY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                />

                <div className="space-y-8">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -24, filter: 'blur(8px)' }}
                            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="relative pl-8 md:pl-12 group"
                        >
                            {/* Timeline dot */}
                            <motion.div
                                className="absolute left-[-5px] top-5 w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: 'var(--accent-color)', boxShadow: '0 0 10px var(--accent-color)' }}
                                whileHover={{ scale: 1.6 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                            />

                            <motion.div
                                className="rounded-2xl p-6 gradient-border"
                                style={{
                                    background: 'var(--glass-bg)',
                                    border: '1px solid var(--card-border)',
                                    backdropFilter: 'blur(12px)',
                                }}
                                whileHover={{
                                    borderColor: 'var(--card-hover-border)',
                                    boxShadow: '0 8px 32px color-mix(in srgb, var(--accent-color) 8%, transparent)',
                                    y: -3,
                                }}
                                transition={{ duration: 0.25 }}
                            >
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                                    <div>
                                        <h3
                                            className="text-lg font-bold transition-colors duration-200"
                                            style={{ color: 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif' }}
                                        >
                                            {exp.role}
                                        </h3>
                                        <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                            {exp.org}
                                        </p>
                                    </div>
                                    <span
                                        className="text-xs font-mono px-3 py-1.5 rounded-full shrink-0 inline-block"
                                        style={{
                                            color: 'var(--accent-color)',
                                            background: 'color-mix(in srgb, var(--accent-color) 10%, transparent)',
                                            border: '1px solid color-mix(in srgb, var(--accent-color) 20%, transparent)',
                                        }}
                                    >
                                        {exp.date}
                                    </span>
                                </div>
                                <ul className="space-y-2.5">
                                    {exp.details.map((detail, dIdx) => (
                                        <li key={dIdx} className="text-sm leading-relaxed flex items-start gap-3" style={{ color: 'var(--text-primary)' }}>
                                            <span
                                                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                                style={{ backgroundColor: 'var(--accent-color)', boxShadow: '0 0 6px var(--accent-color)' }}
                                            />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default Experience;
