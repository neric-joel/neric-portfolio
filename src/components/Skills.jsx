import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Cpu, Wrench } from 'lucide-react';

const MotionDiv = motion.div;

const skills = {
    "AI & ML":     ["TensorFlow", "PyTorch", "scikit-learn", "OpenCV", "Keras", "Transformers", "Hugging Face", "YOLO"],
    "Languages":   ["Python", "C++", "JavaScript", "TypeScript", "MATLAB", "C", "SQL", "Verilog"],
    "Web & Tools": ["React", "FastAPI", "Node.js", "Docker", "AWS", "Git", "MongoDB", "Linux"],
    "Embedded":    ["Embedded C", "RTOS", "Arduino", "Raspberry Pi", "ESP32", "STM32", "FPGA", "Altium"],
};

const categoryIcons = {
    "AI & ML":     <Brain size={22} />,
    "Languages":   <Code size={22} />,
    "Web & Tools": <Wrench size={22} />,
    "Embedded":    <Cpu size={22} />,
};

const Skills = () => (
    <section id="skills" className="relative w-full py-24 transition-colors duration-400" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-6xl mx-auto px-6">
            {/* Heading */}
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-center mb-16"
            >
                <h2
                    className="text-[2rem] font-bold mb-4"
                    style={{ color: 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    Technical Skills
                </h2>
                <div className="w-16 h-0.5 mx-auto rounded-full" style={{
                    background: 'linear-gradient(90deg, var(--accent-color), var(--accent-secondary))',
                    boxShadow: '0 0 12px var(--accent-color)'
                }} />
            </MotionDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {Object.entries(skills).map(([category, items], index) => (
                    <MotionDiv
                        key={category}
                        initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="relative flex flex-col h-full rounded-2xl gradient-border"
                        style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--card-border)',
                            backdropFilter: 'blur(12px)',
                        }}
                        whileHover={{
                            y: -5,
                            borderColor: 'var(--card-hover-border)',
                            boxShadow: '0 8px 40px color-mix(in srgb, var(--accent-color) 10%, transparent)',
                        }}
                        transition2={{ duration: 0.3 }}
                    >
                        <div className="p-6 flex flex-col h-full">
                            {/* Category header */}
                            <div className="flex items-center gap-3 mb-5">
                                <motion.div
                                    className="p-2.5 rounded-xl"
                                    style={{
                                        background: 'color-mix(in srgb, var(--accent-color) 12%, transparent)',
                                        color: 'var(--accent-color)',
                                    }}
                                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.12 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    {categoryIcons[category]}
                                </motion.div>
                                <h3
                                    className="text-base font-semibold"
                                    style={{ color: 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif' }}
                                >
                                    {category}
                                </h3>
                            </div>

                            {/* Skill chips with stagger */}
                            <MotionDiv
                                className="flex flex-wrap gap-2 flex-1 content-start"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    visible: {
                                        transition: { staggerChildren: 0.045, delayChildren: index * 0.1 + 0.25 }
                                    }
                                }}
                            >
                                {items.map((skill) => (
                                    <motion.span
                                        key={skill}
                                        variants={{
                                            hidden:   { opacity: 0, scale: 0.75, filter: 'blur(4px)' },
                                            visible:  { opacity: 1, scale: 1,    filter: 'blur(0px)',
                                                transition: { duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] }
                                            },
                                        }}
                                        whileHover={{ scale: 1.08, y: -2 }}
                                        className="px-3 py-1.5 rounded-lg text-[0.82rem] font-medium cursor-default"
                                        style={{
                                            background: 'color-mix(in srgb, var(--text-muted) 6%, transparent)',
                                            border: '1px solid color-mix(in srgb, var(--text-muted) 12%, transparent)',
                                            color: 'var(--text-muted)',
                                            transition: 'color 0.2s, border-color 0.2s',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.color = 'var(--accent-color)';
                                            e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent-color) 35%, transparent)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.color = 'var(--text-muted)';
                                            e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--text-muted) 12%, transparent)';
                                        }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </MotionDiv>
                        </div>
                    </MotionDiv>
                ))}
            </div>
        </div>
    </section>
);

export default Skills;
