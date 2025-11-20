import React from 'react';

const Publications = () => {
    return (
        <section id="publications" className="py-20 bg-deep-space/30">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    <span className="border-b-2 border-neon-green pb-2">Publications</span>
                </h2>

                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="bg-glass-bg p-6 rounded-lg border-l-4 border-electric-blue hover:bg-white/5 transition-colors">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Design and Comparative Analysis of CMOS, FS-GDI, and MGDI-Based Ripple Carry Adders for Low Power VLSI Applications
                        </h3>
                        <p className="text-electric-blue font-mono text-sm">IEEE, May 2025</p>
                    </div>

                    <div className="bg-glass-bg p-6 rounded-lg border-l-4 border-neon-green hover:bg-white/5 transition-colors">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Optimal Parameter Estimation Techniques for Enhanced Performance of Solar PV Cell
                        </h3>
                        <p className="text-neon-green font-mono text-sm">IEEE, Apr 2025</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Publications;
