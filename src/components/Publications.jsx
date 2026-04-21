import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const papers = [
    {
        title: "Design and Comparative Analysis of CMOS, FS-GDI, and MGDI-Based Ripple Carry Adders for Low Power VLSI Applications",
        venue: "IEEE Xplore",
        date: "2024",
        link: "https://ieeexplore.ieee.org/abstract/document/11071839",
    },
    {
        title: "Optimal Parameter Estimation Techniques for Enhanced Performance of Solar PV Cell",
        venue: "IEEE Xplore",
        date: "2025",
        link: "https://ieeexplore.ieee.org/document/11048280",
    },
];

const Publications = () => (
    <section id="publications" className="py-16 relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-6 md:px-20">
            <RevealOnScroll>
                <h2
                    className="text-[2rem] font-bold mb-14 text-center"
                    style={{ color: 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    Publications
                </h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {papers.map((paper, idx) => (
                    <motion.a
                        key={idx}
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                        whileHover={{
                            y: -5,
                            borderColor: 'var(--card-hover-border)',
                            boxShadow: '0 8px 40px color-mix(in srgb, var(--accent-color) 10%, transparent)',
                        }}
                        className="group block rounded-2xl p-6 gradient-border cursor-pointer"
                        style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--card-border)',
                            backdropFilter: 'blur(12px)',
                            textDecoration: 'none',
                        }}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <motion.div
                                    className="p-3 rounded-xl shrink-0"
                                    style={{
                                        background: 'color-mix(in srgb, var(--accent-color) 10%, transparent)',
                                        color: 'var(--accent-color)',
                                        border: '1px solid color-mix(in srgb, var(--accent-color) 20%, transparent)',
                                    }}
                                    whileHover={{
                                        background: 'var(--accent-color)',
                                        color: '#fff',
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FileText size={22} />
                                </motion.div>

                                <div>
                                    <h3
                                        className="text-base font-semibold leading-snug mb-2 transition-colors duration-200"
                                        style={{ color: 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif' }}
                                    >
                                        {paper.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                                        <span className="font-semibold" style={{ color: 'var(--accent-color)' }}>{paper.venue}</span>
                                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--text-muted)' }} />
                                        <span>{paper.date}</span>
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                style={{ color: 'var(--text-muted)' }}
                                whileHover={{ color: 'var(--accent-color)', y: -2, x: 2 }}
                                transition={{ duration: 0.2 }}
                                className="shrink-0 mt-0.5"
                            >
                                <ExternalLink size={18} />
                            </motion.div>
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    </section>
);

export default Publications;
