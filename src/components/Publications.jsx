import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';

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
        <section id="publications" className="py-20 pb-10 relative">
            <div className="container mx-auto px-6 md:px-20">
                <h2 className="text-3xl font-bold mb-12 text-white">
                    Publications
                </h2>

                <div className="grid gap-6">
                    {papers.map((paper, idx) => (
                        <a
                            key={idx}
                            href={paper.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block bg-white/5 border border-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 pop-out"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:text-white group-hover:bg-blue-500 transition-colors">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-electric-blue transition-colors leading-tight mb-2">
                                            {paper.title}
                                        </h3>
                                        <div className="flex items-center gap-3 text-sm text-gray-400">
                                            <span className="font-medium text-gray-300">{paper.venue}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                            <span>{paper.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <ExternalLink size={20} className="text-gray-500 group-hover:text-white transition-colors" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Publications;
