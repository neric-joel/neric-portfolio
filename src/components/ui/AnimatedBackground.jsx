import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const AnimatedBackground = memo(() => {
    const reduce = useReducedMotion();

    const blob = (animateProps, transitionProps) =>
        reduce ? {} : { animate: animateProps, transition: transitionProps };

    return (
        <div
            aria-hidden="true"
            style={{
                position: 'fixed', inset: 0, zIndex: 0,
                pointerEvents: 'none', overflow: 'hidden',
            }}
        >
            <motion.div
                style={{
                    position: 'absolute',
                    top: '-20%', left: '-15%',
                    width: '55vw', height: '55vw',
                    maxWidth: 640, maxHeight: 640,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at center, var(--accent-color), transparent 65%)',
                    filter: 'blur(72px)',
                    opacity: 0.12,
                }}
                {...blob(
                    { x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.95, 1] },
                    { duration: 18, repeat: Infinity, ease: 'easeInOut' }
                )}
            />

            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '-18%', right: '-12%',
                    width: '48vw', height: '48vw',
                    maxWidth: 560, maxHeight: 560,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at center, var(--accent-secondary), transparent 65%)',
                    filter: 'blur(80px)',
                    opacity: 0.1,
                }}
                {...blob(
                    { x: [0, -30, 20, 0], y: [0, 25, -15, 0], scale: [1, 1.12, 0.92, 1] },
                    { duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }
                )}
            />

            <motion.div
                style={{
                    position: 'absolute',
                    top: '38%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70vw', height: '35vw',
                    maxWidth: 900, maxHeight: 450,
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at center, var(--accent-color), transparent 55%)',
                    filter: 'blur(100px)',
                    opacity: 0,
                }}
                {...blob(
                    { opacity: [0, 0.055, 0] },
                    { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }
                )}
            />

            <motion.div
                style={{
                    position: 'absolute',
                    top: '10%', right: '-5%',
                    width: '28vw', height: '28vw',
                    maxWidth: 340, maxHeight: 340,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at center, var(--accent-secondary), transparent 60%)',
                    filter: 'blur(60px)',
                    opacity: 0.08,
                }}
                {...blob(
                    { x: [0, -20, 10, 0], y: [0, 30, -10, 0] },
                    { duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 7 }
                )}
            />
        </div>
    );
});

export default AnimatedBackground;
