import React from 'react';
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

            <div className="mt-12 divide-y divide-line border-y border-line">
                {papers.map((paper, idx) => (
                    <RevealOnScroll key={paper.link} delay={idx * 0.06}>
                        <a
                            href={paper.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex min-h-11 flex-col gap-1 py-5 no-underline md:flex-row md:items-baseline md:justify-between md:gap-6"
                        >
                            <span className="font-display text-base leading-snug font-semibold text-heading transition-colors duration-200 group-hover:text-accent">
                                {paper.title}
                            </span>
                            <span className="font-mono shrink-0 text-xs text-muted tabular-nums">
                                {paper.venue} · {paper.date}
                            </span>
                        </a>
                    </RevealOnScroll>
                ))}
            </div>
        </div>
    </section>
);

export default Publications;
