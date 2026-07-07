import React from 'react';
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
    <section id="publications" className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
            <RevealOnScroll>
                <span className="section-index">05</span>
                <h2 className="section-title">Publications</h2>
                <div className="section-rule" />
            </RevealOnScroll>

            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
                {papers.map((paper, idx) => (
                    <RevealOnScroll key={paper.link} delay={idx * 0.06}>
                        <a
                            href={paper.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card card-hover group flex h-full items-start justify-between gap-4 p-6 no-underline"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-accent-line bg-accent-soft text-accent">
                                    <FileText size={20} aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="font-display mb-2 text-base leading-snug font-semibold text-heading">
                                        {paper.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-muted">
                                        <span className="font-semibold text-accent">{paper.venue}</span>
                                        <span className="h-1 w-1 rounded-full bg-line" aria-hidden="true" />
                                        <span>{paper.date}</span>
                                    </div>
                                </div>
                            </div>
                            <ExternalLink
                                size={16}
                                aria-hidden="true"
                                className="mt-0.5 shrink-0 text-muted transition-colors duration-200 group-hover:text-accent"
                            />
                        </a>
                    </RevealOnScroll>
                ))}
            </div>
        </div>
    </section>
);

export default Publications;
