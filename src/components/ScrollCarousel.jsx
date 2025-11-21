import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollCarousel = ({ projects }) => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        const cards = cardsRef.current;

        // Clear previous animations
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        // Set up horizontal scroll
        const totalScrollDistance = cards.length * window.innerWidth;

        // Create timeline for horizontal scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: () => `+=${totalScrollDistance}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

        // Animate each card
        cards.forEach((card, index) => {
            // Set initial position
            gsap.set(card, {
                x: index * window.innerWidth,
                opacity: index === 0 ? 1 : 0.3,
            });

            // Animate to center and fade in
            tl.to(card, {
                x: -index * window.innerWidth,
                opacity: 1,
                ease: 'power2.inOut',
                duration: 1,
            }, index * 0.5);

            // Fade out as it passes
            if (index < cards.length - 1) {
                tl.to(card, {
                    opacity: 0.3,
                    ease: 'power2.inOut',
                    duration: 0.5,
                }, (index + 0.5) * 0.5);
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [projects]);

    return (
        <div ref={containerRef} className="scroll-carousel-container relative h-screen w-full overflow-hidden">
            {/* Gradient Background - Black to Dark Navy */}
            <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-950 to-slate-950 -z-10"></div>

            <div className="carousel-wrapper absolute inset-0 flex items-center justify-start overflow-visible">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className="project-card absolute top-0 left-0 w-screen h-screen flex items-center justify-center px-8 md:px-16 lg:px-24"
                    >
                        {/* Card Content - Centered */}
                        <div className="max-w-4xl w-full">
                            {/* Card Background with subtle gradient */}
                            <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16">
                                {/* Project Number */}
                                <div className="text-7xl md:text-8xl lg:text-9xl font-serif text-white/10 mb-4 leading-none">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                {/* Project Title */}
                                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
                                    {project.title}
                                </h3>

                                {/* Project Description */}
                                <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed font-light max-w-3xl">
                                    {project.description}
                                </p>

                                {/* Skills - Clearly Visible */}
                                <div className="flex flex-wrap gap-3">
                                    {project.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-4 py-2 text-sm md:text-base font-mono text-electric-blue bg-electric-blue/10 border border-electric-blue/30 rounded-full backdrop-blur-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm font-light flex items-center gap-2 z-20 pointer-events-none">
                <span>Scroll to explore</span>
                <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </div>
    );
};

export default ScrollCarousel;
