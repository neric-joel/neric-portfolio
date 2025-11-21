import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const Publications = () => {
    const papers = [
        {
            title: "Design and Comparative Analysis of CMOS, FS-GDI, and MGDI-Based Ripple Carry Adders for Low Power VLSI Applications",
            venue: "IEEE Xplore",
            date: "2024",
            link: "https://ieeexplore.ieee.org/abstract/document/11071839"
        },
        {
            title: "Optimal Parameter Estimation Techniques for Enhanced Performance of Solar PV Cell",
            venue: "IEEE Xplore",
            date: "2025",
            link: "https://ieeexplore.ieee.org/document/11048280"
        }
    ];

    return (
        <section id="publications" className="py-20 relative">
            <div className="container mx-auto px-6 md:px-20">
                <RevealOnScroll>
                    <h2 className="text-[1.8rem] font-medium mb-12 text-[var(--text-heading)] text-center">
                        Publications
                    </h2>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {papers.map((paper, idx) => (
                        <a
                            key={idx}
                            href={paper.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block bg-[var(--card-bg)] border border-[var(--text-muted)]/10 rounded-xl p-6 hover:bg-[var(--bg-primary)] transition-all duration-300 pop-out"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)] group-hover:text-[var(--bg-primary)] group-hover:bg-[var(--accent-color)] transition-colors duration-400">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[var(--text-heading)] group-hover:text-[var(--accent-color)] transition-colors leading-tight mb-2 duration-400">
                                            {paper.title}
                                        </h3>
                                        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] transition-colors duration-400">
                                            <span className="font-medium text-[var(--text-primary)] transition-colors duration-400">{paper.venue}</span>
                                            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]"></span>
                                            <span>{paper.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <ExternalLink size={20} className="text-[var(--text-muted)] group-hover:text-[var(--accent-color)] transition-colors duration-400" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Publications;
