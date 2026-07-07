import React, { useState, useCallback } from 'react';
import { useDrag } from '@use-gesture/react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

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

const ProjectCard = ({ project, index, total }) => (
    <div className="flex h-full flex-col p-6 md:p-8">
        <div className="mb-4 flex items-start justify-between">
            <span className="tag tag-accent px-2.5 py-1">{project.category}</span>
            <span className="text-sm font-medium text-muted tabular-nums" aria-label={`Project ${index + 1} of ${total}`}>
                {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </span>
        </div>

        <h3 className="font-display mb-6 text-xl leading-tight font-semibold text-heading md:text-2xl">
            {project.title}
        </h3>

        <div className="mb-6 flex-1 space-y-4">
            {[
                { label: 'Problem',  text: project.problem,  accent: false },
                { label: 'Approach', text: project.approach, accent: false },
                { label: 'Outcome',  text: project.result,   accent: true  },
            ].map(({ label, text, accent }) => (
                <div key={label}>
                    <p className="eyebrow mb-1">{label}</p>
                    <p className={`text-sm leading-relaxed ${accent ? 'font-medium text-accent' : 'text-text'}`}>
                        {text}
                    </p>
                </div>
            ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-1.5">
            {project.stack.map(tech => (
                <span key={tech} className="tag">{tech}</span>
            ))}
        </div>
    </div>
);

const Dots = ({ current, total, onSelect }) => (
    <div className="flex items-center gap-1.5" role="tablist" aria-label="Project pagination">
        {Array.from({ length: total }).map((_, i) => (
            <button
                key={i}
                onClick={() => onSelect(i)}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to project ${i + 1}`}
                className="flex h-6 cursor-pointer items-center px-0.5"
            >
                <span
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                        i === current ? 'w-5 bg-accent' : 'w-1.5 bg-line'
                    }`}
                />
            </button>
        ))}
    </div>
);

const ProjectsCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const total = projects.length;

    const paginate = useCallback((dir) => {
        setActiveIndex(prev => (prev + dir + total) % total);
    }, [total]);

    const bind = useDrag(
        ({ swipe: [swipeX] }) => { if (swipeX !== 0) paginate(-swipeX); },
        { axis: 'x', filterTaps: true }
    );

    return (
        <section id="projects" className="py-24 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <RevealOnScroll>
                    <h2 className="section-title">Projects</h2>
                    <div className="section-rule" />
                    <p className="mt-4 text-sm text-muted">
                        {projects.length} case studies · click arrows or swipe to navigate
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={0.05}>
                    <div className="mt-12">
                        <div
                            {...bind()}
                            className="card mx-auto max-w-2xl touch-pan-y overflow-hidden"
                            style={{ minHeight: 420 }}
                        >
                            <div key={activeIndex} className="h-full">
                                <ProjectCard project={projects[activeIndex]} index={activeIndex} total={total} />
                            </div>
                        </div>

                        <div className="mx-auto mt-6 flex max-w-2xl items-center justify-between">
                            <button
                                aria-label="Previous project"
                                onClick={() => paginate(-1)}
                                className="card card-hover flex h-11 w-11 cursor-pointer items-center justify-center text-muted transition-colors hover:text-heading"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <Dots current={activeIndex} total={total} onSelect={setActiveIndex} />
                            <button
                                aria-label="Next project"
                                onClick={() => paginate(1)}
                                className="card card-hover flex h-11 w-11 cursor-pointer items-center justify-center text-muted transition-colors hover:text-heading"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>

                        <div className="mx-auto mt-8 flex max-w-2xl justify-center">
                            <a
                                href="https://github.com/neric-joel"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-arrow text-muted hover:text-text"
                            >
                                <ExternalLink size={13} aria-hidden="true" />
                                View all on GitHub
                            </a>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default ProjectsCarousel;
