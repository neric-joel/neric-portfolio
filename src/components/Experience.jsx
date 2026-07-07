import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const experiences = [
    {
        role: "Research Assistant",
        org: "PV Systems Lab, Amrita University",
        date: "Jan 2024 – May 2025",
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
    <section id="experience" className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
            <RevealOnScroll>
                <h2 className="section-title">Experience</h2>
                <div className="section-rule" />
            </RevealOnScroll>

            <div className="relative mt-12 border-l border-line pl-6 md:pl-10">
                <div className="space-y-8">
                    {experiences.map((exp, idx) => (
                        <RevealOnScroll key={exp.role} delay={idx * 0.06}>
                            <div className="relative">
                                {/* Timeline dot */}
                                <span
                                    className="absolute top-7 -left-6 h-2 w-2 -translate-x-[calc(50%+0.5px)] rounded-full bg-accent md:-left-10"
                                    aria-hidden="true"
                                />

                                <div className="card card-hover p-6">
                                    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                        <div>
                                            <h3 className="font-display text-lg font-bold text-heading">
                                                {exp.role}
                                            </h3>
                                            <p className="mt-0.5 text-sm font-medium text-muted">
                                                {exp.org}
                                            </p>
                                        </div>
                                        <span className="tag shrink-0 self-start">{exp.date}</span>
                                    </div>
                                    <ul className="space-y-2.5">
                                        {exp.details.map((detail) => (
                                            <li key={detail} className="flex items-start gap-3 text-sm leading-relaxed text-text">
                                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default Experience;
