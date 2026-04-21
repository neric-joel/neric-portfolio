import React from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, Award } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const achievements = [
    {
        title: "Volunteer, IEEE Student Branch",
        desc: "Organized technical workshops on circuit design, software tools, and systems engineering for undergraduate students.",
        Icon: Users,
        accentVar: '--accent-color',
    },
    {
        title: "Member, AI Club at ASU",
        desc: "Collaborating on computer vision and ML pipeline projects with peers across CS and engineering programs.",
        Icon: Lightbulb,
        accentVar: '--accent-secondary',
    },
    {
        title: "Mentored 50+ Students",
        desc: "Guided junior students through programming fundamentals, project architecture, and ML concepts.",
        Icon: Award,
        accentVar: '--accent-color',
    },
];

const Achievements = () => (
    <section id="achievements" className="py-16 relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-6 md:px-20">
            <RevealOnScroll>
                <h2
                    className="text-[2rem] font-bold mb-14 text-center"
                    style={{ color: 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    Leadership &amp; Activities
                </h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {achievements.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                        whileHover={{ y: -7, boxShadow: '0 12px 40px color-mix(in srgb, var(--accent-color) 12%, transparent)' }}
                        className="group relative p-6 rounded-2xl cursor-default gradient-border"
                        style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--card-border)',
                            backdropFilter: 'blur(12px)',
                        }}
                    >
                        {/* Icon */}
                        <motion.div
                            className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                            style={{
                                background: `color-mix(in srgb, var(${item.accentVar}) 12%, transparent)`,
                                border: `1px solid color-mix(in srgb, var(${item.accentVar}) 22%, transparent)`,
                                color: `var(${item.accentVar})`,
                            }}
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                        >
                            <item.Icon size={20} />
                        </motion.div>

                        <h3
                            className="text-base font-semibold mb-2"
                            style={{ color: 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                            {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            {item.desc}
                        </p>

                        {/* Hover glow accent line */}
                        <motion.div
                            className="absolute bottom-0 left-6 right-6 h-px rounded-full"
                            style={{ background: `linear-gradient(90deg, transparent, var(${item.accentVar}), transparent)` }}
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileHover={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default Achievements;
