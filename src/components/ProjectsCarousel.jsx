import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { ExternalLink } from 'lucide-react';

const projects = [
    {
        title: "Satellite Image Segmentation",
        problem: "Classify land-use regions (urban, vegetation, water) from multispectral satellite imagery at scale.",
        approach: "Multi-scale ResNet-50 + U-Net architectures with Grad-CAM explainability and automated augmentation pipelines.",
        stack: ["Python", "TensorFlow", "OpenCV", "ResNet-50", "U-Net", "Grad-CAM"],
        result: "91% precision on terrain classification; city growth heatmaps generated from raw satellite feeds.",
        category: "Computer Vision"
    },
    {
        title: "AI-Powered Resume Analyzer",
        problem: "Automate resume screening for HR teams handling high-volume candidate pipelines.",
        approach: "NLP ranking engine using Transformers and spaCy to score relevance, sentiment, and skill overlap — served via FastAPI.",
        stack: ["Python", "spaCy", "Transformers", "FastAPI", "HuggingFace"],
        result: "70% reduction in review time; batch-processing mode handles 1000+ resumes with live analytics dashboard.",
        category: "NLP / Full-Stack"
    },
    {
        title: "Emotion Recognition from Speech",
        problem: "Identify human emotional states from raw audio for applications in accessibility and human-computer interaction.",
        approach: "CNN-LSTM models trained on mel-spectrogram features; multilingual dataset support with confusion-matrix-driven iteration.",
        stack: ["Python", "PyTorch", "Librosa", "CNN-LSTM", "Spectrogram Analysis"],
        result: "88% classification accuracy across 7 emotion classes on diverse audio datasets.",
        category: "Deep Learning"
    },
    {
        title: "AI-Driven Solar PV Emulator",
        problem: "Optimize solar energy output under variable irradiance conditions using adaptive control algorithms.",
        approach: "MPPT algorithms with real-time irradiance learning, MATLAB PV modeling, and Python analytics pipeline with IoT monitoring.",
        stack: ["Python", "MATLAB", "TensorFlow", "IoT", "Signal Processing"],
        result: "15% improvement in solar panel efficiency; real-time remote monitoring dashboard deployed.",
        category: "ML / Systems"
    },
    {
        title: "Eye-Tracking Autonomous Car",
        problem: "Enable hands-free vehicle control for users with limited motor mobility using only eye movements.",
        approach: "IR-based blink-to-command mapping fused with ultrasonic obstacle detection for safe autonomous parking.",
        stack: ["C++", "Arduino", "IR Sensors", "Sensor Fusion", "Embedded Systems"],
        result: "100% successful auto-parking in controlled trials; fail-safe blink-sequence stop mechanism.",
        category: "Robotics / Accessibility"
    },
    {
        title: "Smart Doorbell with Live Feed",
        problem: "Improve home security response time with intelligent motion detection and instant mobile alerts.",
        approach: "ESP8266-based IoT gateway with PIR motion triggering, encrypted video streaming, and face-recognition module.",
        stack: ["C++", "ESP8266", "Python", "OpenCV", "Blynk IoT"],
        result: "50% reduction in security response time; face-recognition module identifies known visitors.",
        category: "IoT / Computer Vision"
    }
];

const ProjectsCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const dragX = useMotionValue(0);
    const containerRef = useRef(null);
    const totalProjects = projects.length;

    const paginate = (direction) => {
        setActiveIndex((prev) => {
            const next = prev + direction;
            if (next < 0) return totalProjects - 1;
            if (next >= totalProjects) return 0;
            return next;
        });
    };

    const bind = useDrag(
        ({ active, movement: [mx], velocity: [vx], direction: [xDir] }) => {
            if (active) {
                dragX.set(mx);
            } else {
                if (Math.abs(vx) > 0.5 || Math.abs(mx) > 100) {
                    paginate(xDir > 0 ? -1 : 1);
                }
                animate(dragX, 0, { type: 'spring', stiffness: 50, damping: 20 });
            }
        },
        { axis: 'x', filterTaps: true, rubberband: true }
    );

    const getCardStyle = (index) => {
        const position = (index - activeIndex + totalProjects) % totalProjects;
        if (position === 0) return { x: 0, scale: 1.03, opacity: 1, zIndex: 10, rotateY: 0 };
        if (position === totalProjects - 1) return { x: -370, scale: 0.87, opacity: 0.6, zIndex: 5, rotateY: 12 };
        if (position === 1) return { x: 370, scale: 0.87, opacity: 0.6, zIndex: 5, rotateY: -12 };
        return { x: position > totalProjects / 2 ? -750 : 750, scale: 0.7, opacity: 0, zIndex: 0, rotateY: 0 };
    };

    return (
        <section id="projects" className="relative w-full bg-[var(--bg-primary)] py-16 transition-colors duration-400 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative w-full max-w-7xl mx-auto flex flex-col items-center px-6"
            >
                <div className="text-center mb-10">
                    <h2 className="text-[1.8rem] font-medium text-[var(--text-heading)] mb-2 transition-colors duration-400">
                        Projects
                    </h2>
                    <p className="text-sm text-[var(--text-muted)]">Drag or use arrows to explore · {totalProjects} projects</p>
                    <div className="w-16 h-0.5 bg-[var(--accent-color)] mx-auto mt-4 rounded-full" />
                </div>

                {/* Carousel */}
                <div
                    ref={containerRef}
                    className="relative w-full h-[500px] md:h-[480px] flex items-center justify-center touch-none mb-8"
                    style={{ perspective: '2000px' }}
                    {...bind()}
                >
                    <div className="relative w-full h-full">
                        {projects.map((project, index) => {
                            const style = getCardStyle(index);
                            const isActive = (index - activeIndex + totalProjects) % totalProjects === 0;

                            const parallaxX = useTransform(
                                dragX,
                                [-200, 0, 200],
                                [style.x + 25, style.x, style.x - 25]
                            );

                            return (
                                <motion.div
                                    key={index}
                                    className={`absolute left-1/2 top-1/2 w-[88%] md:w-[520px] -ml-[44%] md:-ml-[260px] bg-[var(--card-bg)] rounded-2xl overflow-hidden flex flex-col p-6 md:p-8 cursor-grab active:cursor-grabbing transition-colors duration-400 ${
                                        isActive
                                            ? 'shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-[var(--accent-color)]/20'
                                            : 'shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
                                    }`}
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        transformStyle: 'preserve-3d',
                                        x: parallaxX,
                                        y: '-50%',
                                        zIndex: style.zIndex,
                                    }}
                                    animate={{
                                        scale: style.scale,
                                        opacity: style.opacity,
                                        rotateY: style.rotateY,
                                    }}
                                    transition={{
                                        scale: { type: 'spring', stiffness: 60, damping: 20 },
                                        opacity: { duration: 0.6, ease: 'easeInOut' },
                                        rotateY: { type: 'spring', stiffness: 50, damping: 20 }
                                    }}
                                    onClick={() => !isActive && setActiveIndex(index)}
                                >
                                    {/* Card Number + Category */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-medium tracking-widest uppercase text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-2.5 py-1 rounded-full">
                                            {project.category}
                                        </span>
                                        <span className="text-3xl font-light text-[var(--text-muted)]/20 select-none">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-heading)] mb-5 leading-tight transition-colors duration-400">
                                        {project.title}
                                    </h3>

                                    {/* Case Study Fields */}
                                    <div className="space-y-3 flex-1 mb-5">
                                        <div>
                                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-1">Problem</p>
                                            <p className="text-sm text-[var(--text-primary)] leading-relaxed">{project.problem}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-1">Approach</p>
                                            <p className="text-sm text-[var(--text-primary)] leading-relaxed">{project.approach}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-1">Outcome</p>
                                            <p className="text-sm font-medium text-[var(--accent-color)] leading-relaxed">{project.result}</p>
                                        </div>
                                    </div>

                                    {/* Stack chips */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 rounded text-[11px] font-medium bg-[var(--bg-primary)] border border-[var(--text-muted)]/10 text-[var(--text-muted)]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => paginate(-1)}
                        className="p-3 rounded-full bg-[var(--card-bg)] hover:bg-[var(--accent-color)]/10 text-[var(--text-primary)] transition-all duration-300 border border-[var(--text-muted)]/20 group"
                        aria-label="Previous project"
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div className="flex gap-2">
                        {projects.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`rounded-full transition-all duration-300 ${
                                    idx === activeIndex
                                        ? 'w-6 h-2 bg-[var(--accent-color)]'
                                        : 'w-2 h-2 bg-[var(--text-muted)]/25 hover:bg-[var(--text-muted)]/50'
                                }`}
                                aria-label={`Go to project ${idx + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => paginate(1)}
                        className="p-3 rounded-full bg-[var(--card-bg)] hover:bg-[var(--accent-color)]/10 text-[var(--text-primary)] transition-all duration-300 border border-[var(--text-muted)]/20 group"
                        aria-label="Next project"
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* GitHub CTA */}
                <a
                    href="https://github.com/neric-joel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors group"
                >
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    View all projects on GitHub
                </a>
            </motion.div>
        </section>
    );
};

export default ProjectsCarousel;
