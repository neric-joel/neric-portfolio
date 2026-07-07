import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const experiences = [
    {
        role: "Teaching Assistant",
        org: "W. P. Carey School of Business, Arizona State University",
        orgUrl: "https://wpcarey.asu.edu",
        date: "May 2026 – Jul 2026",
        tech: ["n8n", "System Prompts", "Tool-Calling", "REST APIs"],
        details: [
            "Debugged system prompts, tool-calling routines, and REST API integrations for AI agents on the n8n automation platform, supporting 106 graduate students and resolving most issues within the same session.",
            "Explained agentic AI concepts (chat completions, function calling, prompt design) to students from non-technical business backgrounds, both one-on-one and in small groups.",
            "Authored reference solutions and debugging guides that cut repeat questions and standardized how the cohort validated their agents.",
        ],
    },
    {
        role: "Member",
        org: "AI Club, Arizona State University",
        date: "Aug 2025 – Present",
        kind: "Volunteer",
        details: [
            "Collaborate on applied AI/ML and computer-vision research initiatives, and mentored 15+ students in Python, SQL, and machine-learning fundamentals.",
        ],
    },
    {
        role: "Research Assistant",
        org: "PV Systems Lab, Amrita University",
        orgUrl: "https://www.amrita.edu",
        date: "Jan 2024 – May 2025",
        tech: ["Python", "SQL", "ETL Pipelines", "Tableau"],
        details: [
            "Built and benchmarked predictive models in Python and SQL (RMSE/MAE against experimental data), raising degradation-forecast accuracy 18% over the baseline.",
            "Cleaned and analyzed 100,000+ records of bench and field telemetry, then built automated ETL pipelines that cut manual data prep 40%.",
            "Developed Tableau visualizations and regression models to surface reliability and field-failure patterns, improving operational efficiency 15%.",
        ],
    },
    {
        role: "Volunteer & Co-Author",
        org: "IEEE Student Branch, Coimbatore",
        date: "Sep 2022 – May 2025",
        kind: "Volunteer",
        details: [
            "Organized technical workshops and stakeholder-facing sessions; co-authored two IEEE papers on PV parameter estimation and low-power CMOS design (2025).",
        ],
    },
];

const Experience = () => (
    <section id="experience" className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
            <RevealOnScroll>
                <span className="section-index">02</span>
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
                                                {exp.orgUrl ? (
                                                    <a
                                                        href={exp.orgUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="transition-colors duration-200 hover:text-accent"
                                                    >
                                                        {exp.org}
                                                    </a>
                                                ) : exp.org}
                                            </p>
                                        </div>
                                        <span className="flex shrink-0 items-center gap-1.5 self-start">
                                            {exp.kind && <span className="tag tag-accent">{exp.kind}</span>}
                                            <span className="tag">{exp.date}</span>
                                        </span>
                                    </div>
                                    <ul className="space-y-2.5">
                                        {exp.details.map((detail) => (
                                            <li key={detail} className="flex items-start gap-3 text-sm leading-relaxed text-text">
                                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                    {exp.tech && (
                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {exp.tech.map((t) => (
                                                <span key={t} className="tag">{t}</span>
                                            ))}
                                        </div>
                                    )}
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
