import React from 'react';
import { Globe } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const About = () => {
    return (
        <section id="about" className="py-20 relative">
            <div className="container mx-auto px-6">
                <RevealOnScroll>
                    <h2 className="text-[1.8rem] font-medium mb-12 text-center text-[var(--text-heading)]">
                        <span className="border-b-2 border-[var(--accent-color)] pb-2">About Me</span>
                    </h2>
                </RevealOnScroll>

                <div className="max-w-4xl mx-auto bg-[var(--card-bg)] backdrop-blur-lg border border-[var(--text-muted)]/10 rounded-2xl p-8 md:p-12 shadow-2xl hover:transform hover:-translate-y-2 transition-all duration-500">
                    <p className="text-lg md:text-xl leading-relaxed text-[var(--text-primary)] transition-colors duration-400">
                        Hybrid AI/Embedded Engineer: Motivated graduate student (ASU, CS) with a robust background in EEE.
                        Expertise includes <span className="text-[var(--accent-color)] font-semibold transition-colors duration-400">AI/ML, VLSI Design, and Embedded Systems.</span>
                        Proven ability to leverage core CS principles (OOP, System Design) to drive innovative hardware-software solutions.
                    </p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[var(--bg-primary)]/50 p-4 rounded-lg border-l-4 border-[var(--accent-color)] hover:bg-[var(--accent-color)]/5 transition-colors group relative overflow-hidden duration-400">
                            <div className="flex justify-between items-start">
                                <h3 className="text-[var(--accent-color)] font-bold mb-1 transition-colors duration-400">Education</h3>
                                <Globe size={20} className="text-[var(--accent-color)] opacity-50 group-hover:opacity-100 transition-opacity duration-400" />
                            </div>
                            <p className="text-sm text-[var(--text-muted)] transition-colors duration-400">M.S. in Computer Science at ASU (Aug 2025 – Present)</p>
                            <p className="text-sm text-[var(--text-muted)] mt-2 transition-colors duration-400">B.Tech in EEE at Amrita Vishwa Vidyapeetham (Sep 2021 – May 2025)</p>
                        </div>
                        <div className="bg-[var(--bg-primary)]/50 p-4 rounded-lg border-l-4 border-[var(--accent-secondary)] transition-colors duration-400">
                            <h3 className="text-[var(--accent-secondary)] font-bold mb-1 transition-colors duration-400">Focus</h3>
                            <p className="text-sm text-[var(--text-muted)] transition-colors duration-400">Bridging the gap between intelligent software and efficient hardware.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
