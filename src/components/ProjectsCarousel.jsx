import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const MotionDiv = motion.div;

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
        approach: "NLP ranking engine using Transformers and spaCy to score relevance, sentiment, and skill overlap, served via FastAPI.",
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

const ProjectCard = memo(({ project, index, total }) => (
    <div className="flex flex-col h-full p-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
            <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
                style={{
                    background: 'color-mix(in srgb, var(--accent-color) 10%, transparent)',
                    color: 'var(--accent-color)',
                    border: '1px solid color-mix(in srgb, var(--accent-color) 20%, transparent)',
                }}>
                {project.category}
            </span>
            <span className="text-2xl font-light select-none tabular-nums"
                style={{ color: 'color-mix(in srgb, var(--text-muted) 25%, transparent)' }}>
                {String(index + 1).padStart(2,'0')}/{String(total).padStart(2,'0')}
            </span>
        </div>

        <h3 className="text-xl md:text-2xl font-semibold leading-tight mb-5"
            style={{ color: 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif' }}>
            {project.title}
        </h3>

        <div className="space-y-4 flex-1 mb-5">
            {[
                { label: 'Problem',  text: project.problem,  accent: false },
                { label: 'Approach', text: project.approach, accent: false },
                { label: 'Outcome',  text: project.result,   accent: true  },
            ].map(({ label, text, accent }) => (
                <div key={label}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                        style={{ color: 'var(--text-muted)' }}>{label}</p>
                    <p className="text-sm leading-relaxed"
                        style={{ color: accent ? 'var(--accent-color)' : 'var(--text-primary)', fontWeight: accent ? 500 : 400 }}>
                        {text}
                    </p>
                </div>
            ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.stack.map(tech => (
                <span key={tech} className="px-2 py-0.5 rounded text-[11px] font-medium"
                    style={{
                        background: 'var(--bg-primary)',
                        border: '1px solid color-mix(in srgb, var(--text-muted) 12%, transparent)',
                        color: 'var(--text-muted)',
                    }}>
                    {tech}
                </span>
            ))}
        </div>
    </div>
));

/* ── Scroll progress indicator ── */
const ScrollHint = ({ current, total }) => (
    <div className="flex flex-col items-center gap-2 my-4">
        <div className="flex gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ width: i === current ? 20 : 6, opacity: i === current ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                    className="h-1.5 rounded-full"
                    style={{ background: 'var(--accent-color)' }}
                />
            ))}
        </div>
        {current < total - 1 && (
            <p className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                scroll to advance
            </p>
        )}
        {current === total - 1 && (
            <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-[10px] tracking-widest uppercase"
                style={{ color: 'var(--accent-color)' }}
            >
                scroll to continue ↓
            </motion.p>
        )}
    </div>
);

/* ── Mobile ── */
const MobileCarousel = ({ activeIndex, setActiveIndex, paginate }) => {
    const bind = useDrag(
        ({ swipe: [swipeX] }) => { if (swipeX !== 0) paginate(-swipeX); },
        { axis: 'x', filterTaps: true }
    );
    return (
        <div className="w-full">
            <div className="relative rounded-2xl"
                style={{ minHeight: '420px', background: 'var(--card-bg)', border: '1px solid color-mix(in srgb, var(--text-muted) 10%, transparent)', overflow: 'hidden' }}
                {...bind()}>
                <AnimatePresence mode="wait">
                    <MotionDiv key={activeIndex}
                        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ position: 'relative' }}>
                        <ProjectCard project={projects[activeIndex]} index={activeIndex} total={projects.length} />
                    </MotionDiv>
                </AnimatePresence>
            </div>
            <div className="flex items-center justify-between mt-4 px-1">
                <button aria-label="Previous project" onClick={() => paginate(-1)} className="p-2.5 rounded-xl cursor-pointer"
                    style={{ background: 'var(--card-bg)', border: '1px solid color-mix(in srgb, var(--text-muted) 10%, transparent)', color: 'var(--text-muted)' }}>
                    <ChevronLeft size={18} />
                </button>
                <ScrollHint current={activeIndex} total={projects.length} />
                <button aria-label="Next project" onClick={() => paginate(1)} className="p-2.5 rounded-xl cursor-pointer"
                    style={{ background: 'var(--card-bg)', border: '1px solid color-mix(in srgb, var(--text-muted) 10%, transparent)', color: 'var(--text-muted)' }}>
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

/* ── Desktop 3D ── */
const DesktopCarousel = ({ activeIndex, setActiveIndex, paginate }) => {
    const total = projects.length;
    const getStyle = (index) => {
        const pos = (index - activeIndex + total) % total;
        if (pos === 0)        return { x: 0,    scale: 1.0,  opacity: 1,    zIndex: 10, filter: 'blur(0px)'   };
        if (pos === total-1)  return { x: -400, scale: 0.84, opacity: 0.55, zIndex: 5,  filter: 'blur(1.5px)' };
        if (pos === 1)        return { x: 400,  scale: 0.84, opacity: 0.55, zIndex: 5,  filter: 'blur(1.5px)' };
        return { x: pos > total/2 ? -720 : 720, scale: 0.7, opacity: 0, zIndex: 0, filter: 'blur(4px)' };
    };

    return (
        <div className="w-full">
            <div
                className="relative h-[460px] w-full flex items-center justify-center"
                style={{
                    perspective: '2000px',
                    overflow: 'hidden',
                    maskImage: 'linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)',
                }}
            >
                {projects.map((project, index) => {
                    const s = getStyle(index);
                    const isActive = (index - activeIndex + total) % total === 0;
                    return (
                        <MotionDiv key={index}
                            className="absolute w-[500px] rounded-2xl overflow-hidden"
                            style={{
                                left: '50%', top: '50%',
                                marginLeft: '-250px', marginTop: '-210px', height: '420px',
                                zIndex: s.zIndex,
                                background: 'var(--card-bg)',
                                backdropFilter: 'blur(24px)',
                                border: isActive
                                    ? '1px solid color-mix(in srgb, var(--accent-color) 45%, transparent)'
                                    : '1px solid color-mix(in srgb, var(--text-muted) 8%, transparent)',
                                boxShadow: isActive
                                    ? '0 0 0 1px color-mix(in srgb, var(--accent-color) 12%, transparent), 0 16px 48px color-mix(in srgb, var(--accent-color) 18%, transparent)'
                                    : 'none',
                            }}
                            animate={{ x: s.x, scale: s.scale, opacity: s.opacity, filter: s.filter }}
                            transition={{
                                x:       { type: 'spring', stiffness: 35, damping: 22 },
                                scale:   { type: 'spring', stiffness: 60, damping: 20 },
                                opacity: { duration: 0.5 },
                                filter:  { duration: 0.4 },
                            }}
                            onClick={() => !isActive && setActiveIndex(index)}
                        >
                            <ProjectCard project={project} index={index} total={total} />
                        </MotionDiv>
                    );
                })}
            </div>

            <div className="flex items-center justify-center gap-6 mt-4">
                <button aria-label="Previous project" onClick={() => paginate(-1)}
                    className="p-2.5 rounded-xl cursor-pointer group transition-all duration-200"
                    style={{ background: 'var(--card-bg)', border: '1px solid color-mix(in srgb, var(--text-muted) 10%, transparent)', color: 'var(--text-muted)' }}>
                    <ChevronLeft size={18} />
                </button>
                <ScrollHint current={activeIndex} total={projects.length} />
                <button aria-label="Next project" onClick={() => paginate(1)}
                    className="p-2.5 rounded-xl cursor-pointer group transition-all duration-200"
                    style={{ background: 'var(--card-bg)', border: '1px solid color-mix(in srgb, var(--text-muted) 10%, transparent)', color: 'var(--text-muted)' }}>
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

/* ── Main ── */
const ProjectsCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const total = projects.length;

    const paginate = useCallback((dir) => {
        setActiveIndex(prev => (prev + dir + total) % total);
    }, [total]);

    return (
        <section id="projects"
            className="relative w-full py-16 transition-colors duration-400 overflow-x-hidden"
>

            <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center">
                <RevealOnScroll>
                    <div className="text-center mb-10">
                        <h2 className="text-[1.8rem] font-semibold mb-2"
                            style={{ color: 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif' }}>
                            Projects
                        </h2>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            {projects.length} case studies · click arrows or swipe to navigate
                        </p>
                        <div className="w-12 h-0.5 mx-auto mt-4 rounded-full opacity-60"
                            style={{ background: 'var(--accent-color)' }} />
                    </div>
                </RevealOnScroll>

                <div className="w-full block md:hidden">
                    <MobileCarousel activeIndex={activeIndex} setActiveIndex={setActiveIndex} paginate={paginate} />
                </div>
                <div className="w-full hidden md:block">
                    <DesktopCarousel activeIndex={activeIndex} setActiveIndex={setActiveIndex} paginate={paginate} />
                </div>

                <a href="https://github.com/neric-joel" target="_blank" rel="noopener noreferrer"
                    className="mt-6 flex items-center gap-1.5 text-sm transition-colors group cursor-pointer"
                    style={{ color: 'var(--text-muted)' }}>
                    <ExternalLink size={13} />
                    View all on GitHub
                </a>
            </div>
        </section>
    );
};

export default ProjectsCarousel;
