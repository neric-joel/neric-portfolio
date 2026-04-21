import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LETTERS = 'NERIC JOEL'.split('');

const IntroScreen = ({ visible, onComplete }) => {
    useEffect(() => {
        if (!visible) return;
        const t = setTimeout(onComplete, 2600);
        return () => clearTimeout(t);
    }, [visible, onComplete]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none pointer-events-none"
                    style={{ backgroundColor: 'var(--bg-primary)' }}
                    exit={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
                    transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Letter-by-letter name */}
                    <div className="flex items-center" style={{ gap: '0.04em' }}>
                        {LETTERS.map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
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
                                    WebkitTextStroke: '1.5px var(--accent-color)',
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
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="mt-3 text-xs tracking-[0.45em] uppercase"
                        style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}
                    >
                        SOFTWARE &amp; AI/ML ENGINEER
                    </motion.p>

                    {/* Animated loading bar */}
                    <motion.div
                        className="mt-10 h-px rounded-full"
                        style={{ background: 'linear-gradient(90deg, var(--accent-color), var(--accent-secondary))', width: 0 }}
                        animate={{ width: '100px' }}
                        transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Corner decorations */}
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
                            animate={{ opacity: 0.4, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                            style={{
                                borderTop: '1.5px solid var(--accent-color)',
                                borderLeft: '1.5px solid var(--accent-color)',
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroScreen;
