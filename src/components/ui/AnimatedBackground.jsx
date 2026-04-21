import { motion } from 'framer-motion';

/* Animated gradient blobs — reads CSS vars so they react to TryMe theme changes automatically */
const AnimatedBackground = () => (
    <div
        aria-hidden="true"
        style={{
            position: 'fixed', inset: 0, zIndex: 0,
            pointerEvents: 'none', overflow: 'hidden',
        }}
    >
        {/* Top-left primary blob */}
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
            animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.95, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Bottom-right secondary blob */}
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
            animate={{ x: [0, -30, 20, 0], y: [0, 25, -15, 0], scale: [1, 1.12, 0.92, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />

        {/* Mid-center soft pulse — very subtle */}
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
            animate={{ opacity: [0, 0.055, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Top-right accent accent blob */}
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
            animate={{ x: [0, -20, 10, 0], y: [0, 30, -10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
        />
    </div>
);

export default AnimatedBackground;
