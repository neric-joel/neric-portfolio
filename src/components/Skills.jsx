import React from 'react';

const Skills = () => {
    const skillCategories = [
        {
            title: "Core CS",
            color: "text-electric-blue",
            borderColor: "border-electric-blue",
            skills: ["Python", "C++", "Data Structures & Algorithms", "OOP", "System Design Fundamentals"]
        },
        {
            title: "AI/ML & Vision",
            color: "text-neon-green",
            borderColor: "border-neon-green",
            skills: ["Deep Learning", "TensorFlow", "U-Net", "ResNet-50", "Computer Vision", "scikit-learn"]
        },
        {
            title: "Hardware & Embedded",
            color: "text-purple-400",
            borderColor: "border-purple-400",
            skills: ["VLSI Design", "Cadence Virtuoso", "LTSpice", "Analog Circuits", "Microcontrollers", "PCB Design", "IoT Integration", "MATLAB", "Simulink"]
        }
    ];

    return (
        <section id="skills" className="py-20 bg-deep-space/50">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
                    <span className="border-b-2 border-neon-green pb-2">Technical Arsenal</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skillCategories.map((category, idx) => (
                        <div
                            key={idx}
                            className={`bg-glass-bg backdrop-blur-md border border-glass-border p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300 group`}
                        >
                            <h3 className={`text-xl font-bold mb-6 ${category.color} group-hover:translate-x-2 transition-transform`}>
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {category.skills.map((skill, sIdx) => (
                                    <span
                                        key={sIdx}
                                        className={`px-3 py-1 text-sm rounded-full border ${category.borderColor} bg-deep-space/40 text-gray-300`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
