import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const cards = [
    {
        label: 'Graduate Education',
        degree: 'M.S. Computer Science',
        school: 'Arizona State University',
        year: 'Aug 2025 – Present',
    },
    {
        label: 'Undergraduate',
        degree: 'B.Tech Electrical Engineering',
        school: 'Amrita Vishwa Vidyapeetham',
        year: 'Sep 2021 – May 2025',
    },
    {
        label: 'Research',
        degree: '2 IEEE Publications',
        school: 'ML · VLSI · Energy Systems',
        year: '2024 – 2025',
    },
];

const About = () => (
    <section id="about" className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
            <RevealOnScroll>
                <h2 className="section-title">About</h2>
                <div className="section-rule" />
            </RevealOnScroll>

            <div className="mt-12">
                <RevealOnScroll delay={0.05}>
                    <p className="max-w-3xl text-lg leading-relaxed text-text md:text-xl">
                        I'm a graduate student in Computer Science at Arizona State University, with a background
                        in electrical engineering and a focus on applied AI and software systems. I work across
                        the full spectrum: from training ML models to building production applications to
                        optimizing systems closer to the hardware.
                    </p>
                    <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted">
                        I've published research in IEEE on{' '}
                        <span className="text-text">low-power VLSI design</span> and{' '}
                        <span className="text-text">solar energy optimization</span>, built ML
                        projects across computer vision, NLP, and signal processing, and contributed to research
                        labs and technical leadership roles.
                    </p>
                </RevealOnScroll>

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {cards.map((card, i) => (
                        <RevealOnScroll key={card.label} delay={0.05 + i * 0.06}>
                            <div className="card card-hover h-full p-5">
                                <h3 className="mb-3 text-xs font-semibold tracking-widest text-accent uppercase">
                                    {card.label}
                                </h3>
                                <p className="text-sm text-muted">{card.degree}</p>
                                <p className="text-sm font-medium text-text">{card.school}</p>
                                <p className="mt-1 text-xs text-muted">{card.year}</p>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default About;
