import React from 'react';

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
        <section id="experience" className="py-20 relative">
            <div className="container mx-auto px-6 md:px-20">
                <h2 className="text-3xl font-bold mb-12 text-white">
                    Experience
                </h2>

                <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12">
                    {experiences.map((exp, idx) => (
                        <div key={idx} className="relative pl-8 md:pl-12 group">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-electric-blue shadow-[0_0_10px_#00FFFF] group-hover:scale-150 transition-transform"></div>

                            <div className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-electric-blue transition-colors">
                                            {exp.role}
                                        </h3>
                                        <p className="text-gray-400 text-sm font-medium">
                                            {exp.org}
                                        </p>
                                    </div>
                                    <span className="text-xs font-mono text-neon-green bg-neon-green/10 px-2 py-1 rounded mt-2 md:mt-0 inline-block">
                                        {exp.date}
                                    </span>
                                </div>

                                <ul className="space-y-2">
                                    {exp.details.map((detail, dIdx) => (
                                        <li key={dIdx} className="text-gray-300 text-sm leading-relaxed flex items-start gap-2">
                                            <span className="text-electric-blue mt-1.5 text-[10px]">●</span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
