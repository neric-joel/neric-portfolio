import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectCarousel = ({ projects }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto h-[700px] flex items-center justify-center perspective-1000">
            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-2 md:left-10 z-30 p-4 rounded-full bg-black/50 text-white hover:bg-electric-blue hover:text-black transition-all border border-white/10 backdrop-blur-md"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 md:right-10 z-30 p-4 rounded-full bg-black/50 text-white hover:bg-electric-blue hover:text-black transition-all border border-white/10 backdrop-blur-md"
            >
                <ChevronRight size={32} />
            </button>

            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="popLayout">
                    {projects.map((project, index) => {
                        let offset = index - currentIndex;
                        if (offset < -1) offset += projects.length;
                        if (offset > 1) offset -= projects.length;

                        if (Math.abs(offset) > 1 && projects.length > 2) return null;

                        const isActive = offset === 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ scale: 0.8, opacity: 0, x: offset * 100 + '%' }}
                                animate={{
                                    scale: isActive ? 1 : 0.85,
                                    opacity: isActive ? 1 : 0.4,
                                    x: `${offset * 65}%`,
                                    zIndex: isActive ? 20 : 10,
                                    rotateY: offset * -15
                                }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                className={`absolute w-[90%] md:w-[800px] bg-black/90 rounded-3xl overflow-hidden border ${isActive ? 'border-electric-blue shadow-[0_0_50px_rgba(0,255,255,0.2)]' : 'border-white/10'} backdrop-blur-2xl flex flex-col md:flex-row h-[500px]`}
                            >
                                {/* Image Section - Left/Top */}
                                <div className="h-48 md:h-full md:w-1/2 relative overflow-hidden group">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
                                </div>

                                {/* Content Section - Right/Bottom */}
                                <div className="p-6 md:p-10 md:w-1/2 flex flex-col justify-center bg-gradient-to-b from-transparent to-black/50">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag, tIdx) => (
                                            <span key={tIdx} className="text-xs font-bold uppercase tracking-widest text-electric-blue bg-electric-blue/10 px-3 py-1 rounded-full border border-electric-blue/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isActive ? 'text-white' : 'text-gray-400'} leading-tight`}>
                                        {project.title}
                                    </h3>

                                    <ul className="space-y-3 mb-6">
                                        {project.details.map((detail, dIdx) => (
                                            <li key={dIdx} className="text-gray-300 text-sm md:text-base leading-relaxed flex items-start gap-3">
                                                <span className="text-neon-green mt-1.5 text-xs">►</span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>

                                    <button className="mt-auto self-start px-6 py-2 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all text-sm font-bold tracking-wide">
                                        VIEW PROJECT
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProjectCarousel;
