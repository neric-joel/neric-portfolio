import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const About = () => {
    return (
        <section id="about" className="py-20 relative">
            <div className="container mx-auto px-6">
                <RevealOnScroll>
                    <h2 className="text-[1.8rem] font-medium mb-12 text-center text-[var(--text-heading)]">
                        <span className="border-b-2 border-[var(--accent-color)] pb-2">About</span>
                    </h2>
                </RevealOnScroll>

                <div className="max-w-4xl mx-auto bg-[var(--card-bg)] backdrop-blur-lg border border-[var(--text-muted)]/10 rounded-2xl p-8 md:p-12 shadow-xl">
                    <p className="text-lg md:text-xl leading-relaxed text-[var(--text-primary)] mb-6">
                        I'm a graduate student in Computer Science at Arizona State University, with a background in electrical engineering and a focus on applied AI and software systems. I work across the full spectrum — from training ML models to building production applications to optimizing systems closer to the hardware.
                    </p>
                    <p className="text-base leading-relaxed text-[var(--text-muted)]">
                        I've published research in IEEE on <span className="text-[var(--text-primary)]">low-power VLSI design</span> and <span className="text-[var(--text-primary)]">solar energy optimization</span>, built ML projects across computer vision, NLP, and signal processing, and contributed to research labs and technical leadership roles. I'm looking for opportunities where I can ship meaningful software and grow as an engineer.
                    </p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[var(--bg-primary)]/50 p-4 rounded-lg border-l-4 border-[var(--accent-color)]">
                            <h3 className="text-[var(--accent-color)] font-semibold mb-2 text-sm uppercase tracking-wide">Graduate Education</h3>
                            <p className="text-sm text-[var(--text-muted)]">M.S. Computer Science</p>
                            <p className="text-sm text-[var(--text-primary)] font-medium">Arizona State University</p>
                            <p className="text-xs text-[var(--text-muted)] mt-1">Aug 2025 – Present</p>
                        </div>
                        <div className="bg-[var(--bg-primary)]/50 p-4 rounded-lg border-l-4 border-[var(--accent-color)]/60">
                            <h3 className="text-[var(--accent-color)] font-semibold mb-2 text-sm uppercase tracking-wide">Undergraduate</h3>
                            <p className="text-sm text-[var(--text-muted)]">B.Tech Electrical Engineering</p>
                            <p className="text-sm text-[var(--text-primary)] font-medium">Amrita Vishwa Vidyapeetham</p>
                            <p className="text-xs text-[var(--text-muted)] mt-1">Sep 2021 – May 2025</p>
                        </div>
                        <div className="bg-[var(--bg-primary)]/50 p-4 rounded-lg border-l-4 border-[var(--accent-color)]/40">
                            <h3 className="text-[var(--accent-color)] font-semibold mb-2 text-sm uppercase tracking-wide">Research</h3>
                            <p className="text-sm text-[var(--text-muted)]">2 IEEE Publications</p>
                            <p className="text-sm text-[var(--text-primary)] font-medium">ML · VLSI · Energy Systems</p>
                            <p className="text-xs text-[var(--text-muted)] mt-1">2024 – 2025</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
