import React from 'react';

const About = () => {
    return (
        <section id="about" className="py-20 relative">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    <span className="border-b-2 border-electric-blue pb-2">About Me</span>
                </h2>

                <div className="max-w-4xl mx-auto bg-glass-bg backdrop-blur-lg border border-glass-border rounded-2xl p-8 md:p-12 shadow-2xl hover:transform hover:-translate-y-2 transition-transform duration-500">
                    <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                        Hybrid AI/Embedded Engineer: Motivated graduate student (ASU, CS) with a robust background in EEE.
                        Expertise includes <span className="text-electric-blue font-semibold">AI/ML, VLSI Design, and Embedded Systems.</span>
                        Proven ability to leverage core CS principles (OOP, System Design) to drive innovative hardware-software solutions.
                    </p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-deep-space/50 p-4 rounded-lg border-l-4 border-neon-green">
                            <h3 className="text-neon-green font-bold mb-1">Education</h3>
                            <p className="text-sm text-gray-400">M.S. in Computer Science at ASU (Aug 2025 – Present)</p>
                            <p className="text-sm text-gray-400 mt-2">B.Tech in EEE at Amrita Vishwa Vidyapeetham (Sep 2021 – May 2025)</p>
                        </div>
                        <div className="bg-deep-space/50 p-4 rounded-lg border-l-4 border-electric-blue">
                            <h3 className="text-electric-blue font-bold mb-1">Focus</h3>
                            <p className="text-sm text-gray-400">Bridging the gap between intelligent software and efficient hardware.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
