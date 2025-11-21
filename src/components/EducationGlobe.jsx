import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

const EducationGlobe = ({ onClose }) => {
    const canvasRef = useRef();
    const pointerInteracting = useRef(null);
    const pointerInteractionMovement = useRef(0);
    const phi = useRef(0);
    const theta = useRef(0.3);

    // Coordinates
    const coimbatore = { lat: 10.9027, lng: 76.9006 };
    const tempe = { lat: 33.4255, lng: -111.9400 };

    useEffect(() => {
        let width = 0;

        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
        window.addEventListener('resize', onResize);
        onResize();

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 1200,
            height: 1200,
            phi: 0,
            theta: 0.3,
            dark: 1,
            diffuse: 2.5,
            mapSamples: 16000,
            mapBrightness: 10,
            baseColor: [0.05, 0.1, 0.15],
            markerColor: [0, 1, 0.8], // Blue-green neon
            glowColor: [0, 1, 0.8], // Blue-green neon glow
            markers: [
                { location: [coimbatore.lat, coimbatore.lng], size: 0.1 },
                { location: [tempe.lat, tempe.lng], size: 0.1 },
            ],
            onRender: (state) => {
                // Interactive rotation
                if (!pointerInteracting.current) {
                    phi.current += 0.001; // Very slow auto-rotation when not dragging, or 0 if strictly no auto-rotation
                }

                // Smooth inertia
                state.phi = phi.current + pointerInteractionMovement.current;
                state.theta = theta.current;
            },
        });

        return () => {
            globe.destroy();
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black">
            {/* Pure Black Background */}
            <div className="absolute inset-0 bg-black"></div>

            {/* Subtle stars on black */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-8 right-8 z-50 text-white hover:text-electric-blue text-4xl font-light bg-white/5 hover:bg-white/10 w-16 h-16 rounded-full backdrop-blur-md transition-all hover:scale-110 border border-white/10 cursor-pointer"
            >
                ×
            </button>

            {/* Content Container */}
            <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
                {/* Centered Title */}
                <div className="absolute top-12 md:top-16 text-center z-40 w-full pointer-events-none">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-3 md:mb-4 tracking-tight px-4">
                        Educational Journey
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-gray-300 font-light px-4 mb-8 md:mb-12">
                        From India to the United States
                    </p>
                </div>

                {/* University Labels - Above Globe */}
                <div className="absolute top-[25%] md:top-[28%] flex flex-col md:flex-row gap-4 md:gap-12 z-40 pointer-events-none">
                    <div className="flex items-center gap-3 bg-black/50 px-6 py-3 rounded-full border border-cyan-500/40 backdrop-blur-md">
                        <span className="w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.8)] animate-pulse"></span>
                        <div className="text-left">
                            <p className="text-xs text-gray-400 font-light">Undergraduate</p>
                            <p className="text-white font-medium text-sm md:text-base">Amrita University, Coimbatore</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-black/50 px-6 py-3 rounded-full border border-emerald-500/40 backdrop-blur-md">
                        <span className="w-5 h-5 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(0,255,136,0.8)] animate-pulse"></span>
                        <div className="text-left">
                            <p className="text-xs text-gray-400 font-light">Graduate</p>
                            <p className="text-white font-medium text-sm md:text-base">Arizona State University, Tempe</p>
                        </div>
                    </div>
                </div>

                {/* Globe Container - Centered */}
                <div
                    className="relative w-full max-w-[700px] aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
                    onPointerDown={(e) => {
                        pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
                        canvasRef.current.style.cursor = 'grabbing';
                    }}
                    onPointerUp={() => {
                        pointerInteracting.current = null;
                        canvasRef.current.style.cursor = 'grab';
                    }}
                    onPointerOut={() => {
                        pointerInteracting.current = null;
                        canvasRef.current.style.cursor = 'grab';
                    }}
                    onMouseMove={(e) => {
                        if (pointerInteracting.current !== null) {
                            const delta = e.clientX - pointerInteracting.current;
                            pointerInteractionMovement.current = delta;
                        }
                    }}
                    onTouchMove={(e) => {
                        if (pointerInteracting.current !== null && e.touches[0]) {
                            const delta = e.touches[0].clientX - pointerInteracting.current;
                            pointerInteractionMovement.current = delta;
                        }
                    }}
                >
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full"
                        style={{
                            maxWidth: '700px',
                            maxHeight: '700px',
                            filter: 'drop-shadow(0 0 60px rgba(0, 255, 200, 0.4))'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default EducationGlobe;
