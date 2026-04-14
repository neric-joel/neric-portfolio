import React from 'react';
import { Code, Brain, Cpu, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const Skills = () => {
    const skills = {
        "AI & ML": ["TensorFlow", "PyTorch", "scikit-learn", "OpenCV", "Keras", "Transformers", "Hugging Face", "YOLO"],
        "Languages": ["Python", "C++", "JavaScript", "TypeScript", "MATLAB", "C", "SQL", "Verilog"],
        "Web & Tools": ["React", "FastAPI", "Node.js", "Docker", "AWS", "Git", "MongoDB", "Linux"],
        "Embedded": ["Embedded C", "RTOS", "Arduino", "Raspberry Pi", "ESP32", "STM32", "FPGA", "Altium"],
    };

    const categoryIcons = {
        "Languages": <Code size={24} />,
        "AI & ML": <Brain size={24} />,
        "Embedded": <Cpu size={24} />,
        "Web & Tools": <Wrench size={24} />
    };

    return (
        <section id="skills" className="relative w-full bg-[var(--bg-primary)] py-20 transition-colors duration-400">
            <div className="max-w-6xl mx-auto px-6">
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[1.8rem] font-medium text-[var(--text-heading)] mb-4 transition-colors duration-400">
                        Technical Skills
                    </h2>
                    <div className="w-20 h-1 bg-[var(--accent-color)] mx-auto rounded-full shadow-[0_0_10px_var(--accent-color)]" />
                </MotionDiv>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(skills).map(([category, items], index) => (
                        <MotionDiv
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[var(--card-bg)] rounded-2xl p-6 border border-[var(--text-muted)]/10 hover:border-[var(--accent-color)]/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group flex flex-col h-full"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)] group-hover:scale-110 transition-transform duration-300">
                                    {categoryIcons[category]}
                                </div>
                                <h3 className="text-[1.25rem] font-medium text-[var(--text-heading)]">
                                    {category}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2 content-start flex-1">
                                {items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--text-muted)]/10 text-[0.95rem] font-normal text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--card-bg)] hover:border-[var(--accent-color)]/30 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default text-center flex-grow-0"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </MotionDiv>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
