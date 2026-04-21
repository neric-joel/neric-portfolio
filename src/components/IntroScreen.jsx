import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LETTERS = 'NERIC JOEL'.split('');

const IntroScreen = ({ visible, onComplete }) => {
    useEffect(() => {
        if (!visible) return;
        const t = setTimeout(onComplete, 2800);
        return () => clearTimeout(t);
    }, [visible, onComplete]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none pointer-events-none"
                    style={{ backgroundColor: '#04040b' }}
                    exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                    transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Letter-by-letter name — white stroke, no accent */}
                    <div className="flex items-center" style={{ gap: '0.04em' }}>
                        {LETTERS.map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 44, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{
                                    delay: char === ' ' ? 0 : i * 0.07,
                                    duration: 0.55,
                                    ease: [0.21, 0.47, 0.32, 0.98],
                                }}
                                style={{
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontSize: 'clamp(3.5rem, 11vw, 9rem)',
                                    fontWeight: 700,
                                    letterSpacing: char === ' ' ? '0.25em' : '0.03em',
                                    WebkitTextStroke: '1.5px rgba(255,255,255,0.75)',
                                    color: 'transparent',
                                    display: 'inline-block',
                                    width: char === ' ' ? '0.25em' : 'auto',
                                }}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </div>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.95, duration: 0.5 }}
                        className="mt-4 text-xs tracking-[0.45em] uppercase"
                        style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif' }}
                    >
                        SOFTWARE &amp; AI/ML ENGINEER
                    </motion.p>

                    {/* Slim progress bar — white */}
                    <motion.div
                        className="mt-10 h-px rounded-full"
                        style={{ background: 'rgba(255,255,255,0.45)', width: 0 }}
                        animate={{ width: '90px' }}
                        transition={{ delay: 1.1, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Corner brackets — white */}
                    {[
                        'top-6 left-6',
                        'top-6 right-6 rotate-90',
                        'bottom-6 left-6 -rotate-90',
                        'bottom-6 right-6 rotate-180',
                    ].map((cls, i) => (
                        <motion.div
                            key={i}
                            className={`absolute ${cls} w-6 h-6`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 0.3, scale: 1 }}
                            transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
                            style={{
                                borderTop: '1.5px solid rgba(255,255,255,0.5)',
                                borderLeft: '1.5px solid rgba(255,255,255,0.5)',
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroScreen;
