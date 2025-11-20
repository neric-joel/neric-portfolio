import React from 'react';

const Skills = () => {
    const skillCategories = [
        {
            title: "Languages",
            skills: [
                { name: "Python", url: "https://www.python.org/" },
                { name: "C++", url: "https://isocpp.org/" },
                { name: "MATLAB", url: "https://www.mathworks.com/products/matlab.html" },
                { name: "C", url: "https://en.wikipedia.org/wiki/C_(programming_language)" },
                { name: "SQL", url: "https://www.mysql.com/" },
                { name: "PostgreSQL", url: "https://www.postgresql.org/" }
            ],
            color: "text-blue-400"
        },
        {
            title: "AI/ML",
            skills: [
                { name: "TensorFlow", url: "https://www.tensorflow.org/" },
                { name: "scikit-learn", url: "https://scikit-learn.org/" },
                { name: "Deep Learning", url: "https://en.wikipedia.org/wiki/Deep_learning" },
                { name: "U-Net", url: "https://en.wikipedia.org/wiki/U-Net" },
                { name: "ResNet-50", url: "https://arxiv.org/abs/1512.03385" },
                { name: "OpenCV", url: "https://opencv.org/" }
            ],
            color: "text-purple-400"
        },
        {
            title: "Hardware",
            skills: [
                { name: "Cadence Virtuoso", url: "https://www.cadence.com/" },
                { name: "LTSpice", url: "https://www.analog.com/en/design-center/design-tools-and-calculators/ltspice-simulator.html" },
                { name: "Microcontrollers", url: "https://en.wikipedia.org/wiki/Microcontroller" },
                { name: "PCB Design", url: "https://www.altium.com/" },
                { name: "IoT Systems", url: "https://en.wikipedia.org/wiki/Internet_of_things" }
            ],
            color: "text-neon-green"
        },
        {
            title: "Tools",
            skills: [
                { name: "Git", url: "https://git-scm.com/" },
                { name: "Linux", url: "https://www.linux.org/" },
                { name: "VS Code", url: "https://code.visualstudio.com/" },
                { name: "Jupyter", url: "https://jupyter.org/" },
                { name: "Google Colab", url: "https://colab.research.google.com/" },
                { name: "Simulink", url: "https://www.mathworks.com/products/simulink.html" },
                { name: "Blynk IoT", url: "https://blynk.io/" }
            ],
            color: "text-orange-400"
        }
    ];

    return (
        <section id="skills" className="py-20 relative">
            <div className="container mx-auto px-6 md:px-20">
                <h2 className="text-3xl font-bold mb-12 text-white">
                    Technical Arsenal
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillCategories.map((category, idx) => (
                        <div
                            key={idx}
                            className="bg-white/5 border border-white/5 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 pop-out"
                        >
                            <h3 className={`text-xl font-bold mb-6 ${category.color}`}>
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {category.skills.map((skill, sIdx) => (
                                    <a
                                        key={sIdx}
                                        href={skill.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-sm text-gray-300 hover:text-white hover:border-electric-blue hover:bg-electric-blue/10 transition-all duration-300 cursor-pointer"
                                    >
                                        {skill.name}
                                    </a>
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
