import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
    {
        title: "Satellite Image Segmentation",
        problem: "Classify land-use regions from multispectral satellite imagery at scale.",
        approach: "Multi-scale ResNet-50 + U-Net with Grad-CAM explainability and automated augmentation pipelines.",
        stack: ["Python", "TensorFlow", "OpenCV", "ResNet-50", "U-Net", "Grad-CAM"],
        result: "91% precision on terrain classification; city growth heatmaps from raw satellite feeds.",
        category: "Computer Vision"
    },
    {
        title: "AI-Powered Resume Analyzer",
        problem: "Automate resume screening for HR teams handling high-volume candidate pipelines.",
        approach: "NLP ranking engine using Transformers and spaCy to score relevance, sentiment, and skill overlap — served via FastAPI.",
        stack: ["Python", "spaCy", "Transformers", "FastAPI", "HuggingFace"],
        result: "70% reduction in review time; batch-processes 1000+ resumes with live analytics dashboard.",
        category: "NLP · Full-Stack"
    },
    {
        title: "Emotion Recognition from Speech",
        problem: "Identify emotional states from raw audio for HCI and accessibility applications.",
        approach: "CNN-LSTM models on mel-spectrogram features with multilingual dataset support.",
        stack: ["Python", "PyTorch", "Librosa", "CNN-LSTM"],
        result: "88% accuracy across 7 emotion classes on diverse audio datasets.",
        category: "Deep Learning"
    },
    {
        title: "AI-Driven Solar PV Emulator",
        problem: "Optimize solar energy output under variable irradiance using adaptive control.",
        approach: "MPPT algorithms with real-time irradiance learning, MATLAB modeling, and IoT monitoring.",
        stack: ["Python", "MATLAB", "TensorFlow", "IoT", "Signal Processing"],
        result: "15% improvement in panel efficiency; real-time remote monitoring deployed.",
        category: "ML · Systems"
    },
    {
        title: "Eye-Tracking Autonomous Car",
        problem: "Enable hands-free vehicle control for users with limited motor mobility.",
        approach: "IR blink-to-command mapping fused with ultrasonic obstacle detection.",
        stack: ["C++", "Arduino", "IR Sensors", "Sensor Fusion"],
        result: "100% successful auto-parking in controlled trials; blink-sequence fail-safe.",
        category: "Robotics · Accessibility"
    },
    {
        title: "Smart Doorbell with Live Feed",
        problem: "Improve home security response time with intelligent motion detection and alerts.",
        approach: "ESP8266 IoT gateway with PIR triggering, encrypted video streaming, and face recognition.",
        stack: ["C++", "ESP8266", "Python", "OpenCV", "Blynk IoT"],
        result: "50% reduction in security response time; face recognition for known visitors.",
        category: "IoT · Computer Vision"
    }
];

/* ── Card component ── */
const ProjectCard = ({ project, index, total }) => (
    <div className="flex flex-col h-full p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
            <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/20">
                {project.category}
            </span>
            <span className="text-2xl font-light text-[var(--text-muted)]/20 select-none tabular-nums">
                {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-heading)] leading-tight mb-5">
            {project.title}
        </h3>

        {/* Case study fields */}
        <div className="space-y-4 flex-1 mb-5">
            {[
                { label: 'Problem', text: project.problem, highlight: false },
                { label: 'Approach', text: project.approach, highlight: false },
                { label: 'Outcome', text: project.result, highlight: true },
            ].map(({ label, text, highlight }) => (
                <div key={label}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-1">{label}</p>
                    <p className={`text-sm leading-relaxed ${highlight ? 'text-[var(--accent-color)] font-medium' : 'text-[var(--text-primary)]'}`}>
                        {text}
                    </p>
                </div>
            ))}
        </div>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.stack.map((tech) => (
                <span key={tech} className="px-2 py-0.5 rounded text-[11px] font-medium bg-[var(--bg-primary)] border border-[var(--text-muted)]/10 text-[var(--text-muted)]">
                    {tech}
                </span>
            ))}
        </div>
    </div>
);

/* ── Mobile: simple slide view ── */
const MobileCarousel = ({ activeIndex, setActiveIndex, paginate }) => {
    const bind = useDrag(
        ({ swipe: [swipeX] }) => { if (swipeX !== 0) paginate(-swipeX); },
        { axis: 'x', filterTaps: true }
    );

    return (
        <div className="w-full">
            <div className="relative overflow-hidden rounded-2xl bg-[var(--card-bg)] border border-[var(--text-muted)]/10 min-h-[480px]" {...bind()}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0"
                    >
                        <ProjectCard project={projects[activeIndex]} index={activeIndex} total={projects.length} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Mobile nav */}
            <div className="flex items-center justify-between mt-4 px-1">
                <button onClick={() => paginate(-1)} className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--text-muted)]/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer" aria-label="Previous">
                    <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                    {projects.map((_, i) => (
                        <button key={i} onClick={() => setActiveIndex(i)} className={`rounded-full transition-all duration-300 cursor-pointer ${i === activeIndex ? 'w-5 h-2 bg-[var(--accent-color)]' : 'w-2 h-2 bg-[var(--text-muted)]/25'}`} aria-label={`Project ${i + 1}`} />
                    ))}
                </div>
                <button onClick={() => paginate(1)} className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--text-muted)]/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer" aria-label="Next">
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

/* ── Desktop: 3D carousel ── */
const DesktopCarousel = ({ activeIndex, setActiveIndex, paginate }) => {
    const total = projects.length;

    const getStyle = (index) => {
        const pos = (index - activeIndex + total) % total;
        if (pos === 0) return { x: 0, scale: 1.02, opacity: 1, zIndex: 10, rotateY: 0 };
        if (pos === total - 1) return { x: -380, scale: 0.86, opacity: 0.55, zIndex: 5, rotateY: 10 };
        if (pos === 1) return { x: 380, scale: 0.86, opacity: 0.55, zIndex: 5, rotateY: -10 };
        return { x: pos > total / 2 ? -720 : 720, scale: 0.7, opacity: 0, zIndex: 0, rotateY: 0 };
    };

    return (
        <div className="w-full">
            <div className="relative h-[480px] w-full flex items-center justify-center" style={{ perspective: '2000px' }}>
                {projects.map((project, index) => {
                    const style = getStyle(index);
                    const isActive = (index - activeIndex + total) % total === 0;
                    return (
                        <motion.div
                            key={index}
                            className={`absolute w-[500px] bg-[var(--card-bg)] rounded-2xl border cursor-grab active:cursor-grabbing overflow-hidden ${isActive ? 'border-[var(--accent-color)]/20 shadow-[0_8px_32px_rgba(99,102,241,0.08)]' : 'border-[var(--text-muted)]/8'}`}
                            style={{ transformStyle: 'preserve-3d', left: '50%', top: '50%', marginLeft: '-250px', marginTop: '-240px', height: '480px' }}
                            animate={{ x: style.x, scale: style.scale, opacity: style.opacity, rotateY: style.rotateY }}
                            transition={{ x: { type: 'spring', stiffness: 35, damping: 22 }, scale: { type: 'spring', stiffness: 60, damping: 20 }, opacity: { duration: 0.5 }, rotateY: { type: 'spring', stiffness: 50, damping: 22 } }}
                            style={{ zIndex: style.zIndex, transformStyle: 'preserve-3d', left: '50%', top: '50%', marginLeft: '-250px', marginTop: '-240px', height: '480px' }}
                            onClick={() => !isActive && setActiveIndex(index)}
                        >
                            <ProjectCard project={project} index={index} total={total} />
                        </motion.div>
                    );
                })}
            </div>

            {/* Desktop nav */}
            <div className="flex items-center justify-center gap-6 mt-6">
                <button onClick={() => paginate(-1)} className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--text-muted)]/10 text-[var(--text-muted)] hover:text-[var(--accent-color)] hover:border-[var(--accent-color)]/30 transition-all duration-200 group cursor-pointer" aria-label="Previous">
                    <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <div className="flex gap-2">
                    {projects.map((_, i) => (
                        <button key={i} onClick={() => setActiveIndex(i)} className={`rounded-full transition-all duration-300 cursor-pointer ${i === activeIndex ? 'w-6 h-2 bg-[var(--accent-color)]' : 'w-2 h-2 bg-[var(--text-muted)]/25 hover:bg-[var(--text-muted)]/50'}`} aria-label={`Project ${i + 1}`} />
                    ))}
                </div>
                <button onClick={() => paginate(1)} className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--text-muted)]/10 text-[var(--text-muted)] hover:text-[var(--accent-color)] hover:border-[var(--accent-color)]/30 transition-all duration-200 group cursor-pointer" aria-label="Next">
                    <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </div>
    );
};

/* ── Main export ── */
const ProjectsCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const total = projects.length;

    const paginate = (dir) => setActiveIndex((prev) => (prev + dir + total) % total);

    return (
        <section id="projects" className="relative w-full bg-[var(--bg-primary)] py-16 transition-colors duration-400 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center">
                <RevealHeader />

                {/* Mobile view */}
                <div className="w-full block md:hidden">
                    <MobileCarousel activeIndex={activeIndex} setActiveIndex={setActiveIndex} paginate={paginate} />
                </div>

                {/* Desktop view */}
                <div className="w-full hidden md:block">
                    <DesktopCarousel activeIndex={activeIndex} setActiveIndex={setActiveIndex} paginate={paginate} />
                </div>

                {/* GitHub CTA */}
                <a href="https://github.com/neric-joel" target="_blank" rel="noopener noreferrer" className="mt-8 flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors group cursor-pointer">
                    <ExternalLink size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    View all on GitHub
                </a>
            </div>
        </section>
    );
};

const RevealHeader = () => (
    <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="text-center mb-10"
    >
        <h2 className="text-[1.8rem] font-semibold text-[var(--text-heading)] mb-2">Projects</h2>
        <p className="text-sm text-[var(--text-muted)]">Swipe or use arrows · {projects.length} projects</p>
        <div className="w-12 h-0.5 bg-[var(--accent-color)] mx-auto mt-4 rounded-full opacity-60" />
    </motion.div>
);

export default ProjectsCarousel;
