import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useDrag } from '@use-gesture/react';

const projects = [
    {
        title: "AI-Driven Solar PV Emulator",
        details: [
            "Boosted solar panel performance and reliability by 15% through intelligent energy tracking.",
            "Deployed adaptive MPPT algorithms capable of learning irradiance variations in real time.",
            "Combined MATLAB modeling, embedded C firmware, and Python analytics for a fully autonomous PV optimization system.",
            "Integrated IoT dashboard for real-time remote monitoring of energy output.",
            "Conducted stress testing on variable light conditions to validate stability and accuracy."
        ]
    },
    {
        title: "Satellite Image Segmentation",
        details: [
            "Achieved 91% precision in identifying urban and vegetation regions from multispectral images.",
            "Implemented multi-scale ResNet-50 and U-Net architectures for terrain classification.",
            "Integrated TensorFlow pipelines and OpenCV preprocessing to generate city growth heatmaps.",
            "Built an automated data-augmentation pipeline to handle noise and limited datasets.",
            "Deployed model visualization for explainable AI insights using Grad-CAM."
        ]
    },
    {
        title: "Eye-Tracking Autonomous Parking Car",
        details: [
            "Built an accessibility-focused smart car that converts eye blinks into movement commands.",
            "Combined IR tracking with ultrasonic mapping for centimeter-level precision.",
            "Engineered using Arduino, C++, and modular sensor fusion for real-time control.",
            "Added fail-safe stop mechanism triggered by blink sequence patterns.",
            "Achieved 100% successful auto-parking in controlled trials."
        ]
    },
    {
        title: "Smart Doorbell with Live Feed",
        details: [
            "Reduced home security response time by 50% through motion-activated video alerts.",
            "Designed IoT gateway that streams encrypted video directly to smartphones.",
            "Developed with ESP8266 microcontroller, PIR sensors, and Blynk IoT dashboard.",
            "Integrated face-recognition module for known-visitor detection.",
            "Optimized power consumption using adaptive sleep cycles."
        ]
    },
    {
        title: "AI-Powered Resume Analyzer",
        details: [
            "Automated resume screening workflow, reducing review time by 70%.",
            "Implemented NLP-based ranking to assess relevance, sentiment, and skill overlap.",
            "Built with Python, spaCy, Transformers, and FastAPI for instant candidate scoring.",
            "Added HR dashboard for live visual feedback and analytics.",
            "Integrated batch-processing mode to handle 1000+ resumes efficiently."
        ]
    },
    {
        title: "Emotion Recognition from Speech",
        details: [
            "Identified human emotions from audio with 88% classification accuracy.",
            "Trained CNN-LSTM models on spectrogram data for emotion correlation.",
            "Utilized Librosa and PyTorch for adaptive emotion modeling.",
            "Added multilingual dataset handling for diverse voice inputs.",
            "Developed confusion-matrix visualization to improve classifier performance."
        ]
    }
];

const ProjectsCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const dragX = useMotionValue(0);
    const containerRef = useRef(null);

    const totalProjects = projects.length;

    const snapToNearest = (offset) => {
        const cardWidth = 500; // Reduced from 600
        const threshold = cardWidth / 3;

        if (Math.abs(offset) > threshold) {
            const direction = offset > 0 ? -1 : 1;
            paginate(direction);
        }

        animate(dragX, 0, {
            type: 'spring',
            stiffness: 50,
            damping: 20
        });
    };

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
                    animate(dragX, 0, {
                        type: 'spring',
                        stiffness: 50,
                        damping: 20
                    });
                } else {
                    snapToNearest(mx);
                }
            }
        },
        {
            axis: 'x',
            filterTaps: true,
            rubberband: true
        }
    );

    const getCardStyle = (index) => {
        const position = (index - activeIndex + totalProjects) % totalProjects;
        const isActive = position === 0;
        const isLeft = position === totalProjects - 1;
        const isRight = position === 1;

        let x = 0;
        let scale = 0.85;
        let opacity = 0.6;
        let zIndex = 1;
        let rotateY = 0;

        if (isActive) {
            x = 0;
            scale = 1.05;
            opacity = 1;
            zIndex = 10;
            rotateY = 0;
        } else if (isLeft) {
            x = -380; // Reduced from -450
            scale = 0.85;
            opacity = 0.7;
            zIndex = 5;
            rotateY = 15;
        } else if (isRight) {
            x = 380; // Reduced from 450
            scale = 0.85;
            opacity = 0.7;
            zIndex = 5;
            rotateY = -15;
        } else {
            x = position > totalProjects / 2 ? -750 : 750; // Reduced from -900/900
            scale = 0.7;
            opacity = 0;
            zIndex = 0;
        }

        return { x, scale, opacity, zIndex, rotateY };
    };

    return (
        <section className="relative w-full bg-[var(--bg-primary)] py-16 transition-colors duration-400 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative w-full max-w-7xl mx-auto flex flex-col items-center px-6"
            >
                {/* Title - Standardized to 1.8rem, weight 500 */}
                <h2 className="text-[1.8rem] font-medium text-[var(--text-heading)] mb-4 text-center transition-colors duration-400">
                    Projects
                </h2>

                {/* Carousel Container */}
                <div
                    ref={containerRef}
                    className="relative w-full h-[480px] md:h-[520px] flex items-center justify-center touch-none mb-6"
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
                                [style.x + 30, style.x, style.x - 30]
                            );

                            return (
                                <motion.div
                                    key={index}
                                    className={`absolute left-1/2 top-1/2 w-[85%] md:w-[500px] -ml-[42.5%] md:-ml-[250px] bg-[var(--card-bg)] rounded-[2rem] overflow-hidden flex flex-col p-6 md:p-8 cursor-grab active:cursor-grabbing transition-colors duration-400 ${isActive ? 'shadow-[0_12px_40px_rgba(0,0,0,0.08)] ring-2 ring-[var(--accent-color)]/20' : 'shadow-[0_8px_32px_rgba(0,0,0,0.05)]'
                                        }`}
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        transformStyle: 'preserve-3d',
                                        x: parallaxX,
                                        y: "-50%", // Center vertically dynamically
                                        zIndex: style.zIndex,
                                    }}
                                    animate={{
                                        scale: style.scale,
                                        opacity: style.opacity,
                                        rotateY: style.rotateY,
                                    }}
                                    transition={{
                                        x: { type: 'spring', stiffness: 30, damping: 20, mass: 1.2 }, // Slower lateral slide
                                        scale: { type: 'spring', stiffness: 60, damping: 20, mass: 1 }, // "Coming out" speed
                                        opacity: { duration: 0.8, ease: 'easeInOut' },
                                        rotateY: { type: 'spring', stiffness: 50, damping: 20 }
                                    }}
                                    onClick={() => !isActive && setActiveIndex(index)}
                                >
                                    {/* Project Number */}
                                    <div className="text-5xl font-serif text-[var(--text-primary)]/8 absolute top-4 right-6 select-none pointer-events-none">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    {/* Project Title */}
                                    <h3 className="text-[1.4rem] md:text-[1.6rem] font-medium text-[var(--text-heading)] mt-2 mb-4 pr-10 leading-tight transition-colors duration-400">
                                        {project.title}
                                    </h3>

                                    {/* Details - Natural Bullet Points */}
                                    <div className="flex flex-col justify-start flex-1 gap-3">
                                        {project.details.map((point, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: isActive ? idx * 0.1 : 0,
                                                    duration: 0.5,
                                                    ease: 'easeOut'
                                                }}
                                                className="flex items-start gap-2.5"
                                            >
                                                {/* Bullet Icon - Auto Contrast */}
                                                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] mt-1.5 shadow-[0_0_8px_var(--accent-color)]" />

                                                {/* Text Content */}
                                                <p className="text-[var(--text-primary)] text-[12px] md:text-[13px] leading-snug font-normal transition-colors duration-400">
                                                    {point}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-8">
                    <button
                        onClick={() => paginate(-1)}
                        className="p-4 rounded-full bg-[var(--card-bg)] hover:bg-[var(--accent-color)]/10 text-[var(--text-primary)] transition-all duration-300 hover:scale-110 border border-[var(--text-muted)]/20 backdrop-blur-md group shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
                        aria-label="Previous project"
                    >
                        <svg className="w-6 h-6 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex gap-3">
                        {projects.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`rounded-full transition-all duration-300 ${idx === activeIndex
                                    ? 'w-8 h-2 bg-[var(--accent-color)] shadow-[0_0_10px_var(--accent-color)]'
                                    : 'w-2 h-2 bg-[var(--text-muted)]/30 hover:bg-[var(--text-muted)]/50'
                                    }`}
                                aria-label={`Go to project ${idx + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => paginate(1)}
                        className="p-4 rounded-full bg-[var(--card-bg)] hover:bg-[var(--accent-color)]/10 text-[var(--text-primary)] transition-all duration-300 hover:scale-110 border border-[var(--text-muted)]/20 backdrop-blur-md group shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
                        aria-label="Next project"
                    >
                        <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default ProjectsCarousel;
