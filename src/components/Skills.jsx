import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code2, Globe, Cpu } from 'lucide-react';

const categories = [
    {
        icon: Brain,
        label: 'AI & ML',
        color: 'var(--accent-color)',
        skills: ['TensorFlow', 'PyTorch', 'scikit-learn', 'OpenCV', 'Keras', 'Transformers', 'HuggingFace', 'YOLO'],
    },
    {
        icon: Code2,
        label: 'Languages',
        color: 'var(--accent-secondary)',
        skills: ['Python', 'C++', 'JavaScript', 'TypeScript', 'MATLAB', 'C', 'SQL', 'Verilog'],
    },
    {
        icon: Globe,
        label: 'Web & Cloud',
        color: 'var(--accent-color)',
        skills: ['React', 'FastAPI', 'Node.js', 'Docker', 'AWS', 'Git', 'MongoDB', 'Linux'],
    },
    {
        icon: Cpu,
        label: 'Embedded',
        color: 'var(--accent-secondary)',
        skills: ['Embedded C', 'RTOS', 'Arduino', 'Raspberry Pi', 'ESP32', 'STM32', 'FPGA', 'Altium'],
    },
];

// Flatten all skills for the marquee rows
const row1 = [...categories[0].skills, ...categories[1].skills];
const row2 = [...categories[2].skills, ...categories[3].skills];

const Pill = ({ skill, accent }) => (
    <span
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap mx-2 shrink-0"
        style={{
            border: '1px solid color-mix(in srgb, var(--text-muted) 15%, transparent)',
            background: 'var(--glass-bg)',
            color: 'var(--text-muted)',
            backdropFilter: 'blur(8px)',
        }}
    >
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent || 'var(--accent-color)' }} />
        {skill}
    </span>
);

const Marquee = ({ skills, reverse, accent }) => {
    const doubled = [...skills, ...skills];
    return (
        <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
            <div
                className="flex"
                style={{ animation: `${reverse ? 'marquee-rev' : 'marquee'} ${reverse ? '22s' : '28s'} linear infinite` }}
            >
                {doubled.map((s, i) => <Pill key={i} skill={s} accent={accent} />)}
            </div>
        </div>
    );
};

const CategoryCard = ({ cat, index }) => {
    const Icon = cat.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.08, duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -6, borderColor: 'color-mix(in srgb, var(--accent-color) 35%, transparent)' }}
            className="relative rounded-2xl p-6 overflow-hidden group"
            style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--card-border)',
                backdropFilter: 'blur(12px)',
            }}
        >
            {/* BG glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 30%, color-mix(in srgb, ${cat.color} 6%, transparent), transparent 70%)` }} />

            {/* Icon + label */}
            <div className="flex items-center gap-3 mb-5">
                <motion.div
                    className="p-2.5 rounded-xl"
                    style={{ background: `color-mix(in srgb, ${cat.color} 12%, transparent)`, color: cat.color }}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                >
                    <Icon size={20} />
                </motion.div>
                <h3 className="text-sm font-semibold tracking-wide uppercase"
                    style={{ color: 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.06em' }}>
                    {cat.label}
                </h3>
                <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ background: `color-mix(in srgb, ${cat.color} 12%, transparent)`, color: cat.color }}>
                    {cat.skills.length}
                </span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                    <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.06 + i * 0.04, duration: 0.3 }}
                        whileHover={{ scale: 1.08, y: -1, color: cat.color, borderColor: `color-mix(in srgb, ${cat.color} 40%, transparent)` }}
                        className="px-2.5 py-1 rounded-lg text-[0.78rem] font-medium cursor-default"
                        style={{
                            background: 'color-mix(in srgb, var(--text-muted) 6%, transparent)',
                            border: '1px solid color-mix(in srgb, var(--text-muted) 10%, transparent)',
                            color: 'var(--text-muted)',
                            transition: 'color 0.2s, border-color 0.2s',
                        }}
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>

            {/* Bottom accent line */}
            <motion.div
                className="absolute bottom-0 left-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }}
                initial={{ width: 0, left: '50%' }}
                whileHover={{ width: '100%', left: 0 }}
                transition={{ duration: 0.4 }}
            />
        </motion.div>
    );
};

const Skills = () => (
    <section id="skills" className="relative w-full py-24 transition-colors duration-400 overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)' }}>

        {/* Subtle section bg pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-30"
            style={{
                backgroundImage: 'radial-gradient(circle, color-mix(in srgb, var(--accent-color) 8%, transparent) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)',
            }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-center mb-14"
            >
                <h2 className="text-[2rem] font-bold mb-4"
                    style={{ color: 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Technical Stack
                </h2>
                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                    32+ technologies across 4 domains
                </p>
                <div className="w-16 h-px mx-auto rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--accent-color), var(--accent-secondary))' }} />
            </motion.div>

            {/* Marquee rows */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-3 mb-14"
            >
                <Marquee skills={row1} reverse={false} accent="var(--accent-color)" />
                <Marquee skills={row2} reverse={true}  accent="var(--accent-secondary)" />
            </motion.div>

            {/* Category cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((cat, i) => (
                    <CategoryCard key={cat.label} cat={cat} index={i} />
                ))}
            </div>
        </div>
    </section>
);

export default Skills;
