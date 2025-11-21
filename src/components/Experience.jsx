import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const Experience = () => {
    const experiences = [
        {
            role: "Research Assistant",
            org: "PV Systems Lab, Amrita University",
            date: "Jan 2024 – May 2024",
            details: [
                "Developed a solar PV emulator with AI-based MPPT algorithms to enhance solar cell efficiency.",
                "Modeled PV characteristics using MATLAB and Python for real-time performance prediction.",
                "Co-authored IEEE paper on optimization algorithms for PV performance enhancement."
            ]
        },
        {
            role: "Student Lead",
            org: "Amritavotav Technical Events",
            date: "Sep 2024 – Oct 2024",
            details: [
                "Led university-wide technical competitions with 50+ teams.",
                "Mentored undergraduates in embedded systems and IoT projects.",
                "Oversaw event execution, judging criteria, and technical presentation management."
            ]
        },
        {
            role: "Intern – Electrical Design",
            org: "Ranga and Company, Chennai",
            date: "May 2023 – Jun 2023",
            details: [
                "Designed and simulated electrical distribution systems adhering to safety standards.",
                "Created documentation and assisted in schematic design and testing."
            ]
        }
    ];

    return (
        <section id="experience" className="py-20 relative bg-[var(--bg-primary)] transition-colors duration-400">
            <div className="container mx-auto px-6 md:px-20">
                <RevealOnScroll>
                    <h2 className="text-[1.8rem] font-medium mb-12 text-[var(--text-heading)] transition-colors duration-400 text-center md:text-left">
                        Experience
                    </h2>
                </RevealOnScroll>

                <div className="relative border-l-2 border-[var(--text-muted)]/20 ml-4 md:ml-6 space-y-8">
                    {experiences.map((exp, idx) => (
                        <div key={idx} className="relative pl-8 md:pl-12 group">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[var(--accent-color)] shadow-[0_0_10px_var(--accent-color)] group-hover:scale-150 transition-all duration-300"></div>

                            <div className="bg-[var(--card-bg)] border border-[var(--text-muted)]/10 p-6 rounded-2xl hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-400">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[var(--text-heading)] group-hover:text-[var(--accent-color)] transition-colors duration-300">
                                            {exp.role}
                                        </h3>
                                        <p className="text-[var(--text-muted)] text-sm font-medium mt-1 transition-colors duration-400">
                                            {exp.org}
                                        </p>
                                    </div>
                                    <span className="text-xs font-mono text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-3 py-1.5 rounded-full mt-2 md:mt-0 inline-block transition-colors duration-400">
                                        {exp.date}
                                    </span>
                                </div>

                                <ul className="space-y-2">
                                    {exp.details.map((detail, dIdx) => (
                                        <li
                                            key={dIdx}
                                            className="text-sm leading-[1.5] flex items-start gap-3 transition-colors duration-400 text-[var(--text-primary)]"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] mt-1.5 shrink-0 shadow-[0_0_6px_var(--accent-color)]" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Divider Line (except for last item) */}
                            {idx !== experiences.length - 1 && (
                                <div className="absolute bottom-[-16px] left-12 right-0 h-[1px] bg-[var(--text-muted)]/10 md:hidden"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
