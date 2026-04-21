import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Trail dot count and spring configs — each dot lags more behind the previous
const TRAIL_COUNT = 8;
const springConfigs = Array.from({ length: TRAIL_COUNT }, (_, i) => ({
    stiffness: 800 - i * 80,
    damping: 35 + i * 3,
    mass: 0.4 + i * 0.08,
}));

// Shrink + fade as the dot is further from cursor
const dotSize  = (i) => Math.max(4, 14 - i * 1.4);
const dotAlpha = (i) => Math.max(0.05, 0.55 - i * 0.065);

const TrailDot = ({ x, y, index, hovering }) => {
    const size = dotSize(index);
    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                x,
                y,
                width: size,
                height: size,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9998,
                translateX: '-50%',
                translateY: '-50%',
                background: hovering
                    ? `rgba(var(--accent-rgb, 139,92,246), ${dotAlpha(index) * 1.4})`
                    : `rgba(var(--accent-rgb, 139,92,246), ${dotAlpha(index)})`,
                boxShadow: index === 0
                    ? `0 0 ${hovering ? 18 : 10}px rgba(var(--accent-rgb, 139,92,246), ${hovering ? 0.55 : 0.3})`
                    : 'none',
                transition: 'width 0.2s, height 0.2s, background 0.2s',
            }}
        />
    );
};

const CursorTrail = () => {
    const mouseX = useMotionValue(-200);
    const mouseY = useMotionValue(-200);
    const [hovering, setHovering] = useState(false);
    const [visible, setVisible] = useState(false);
    const isTouchRef = useRef(false);

    // Create spring-chained x/y values for each dot
    const springs = springConfigs.map((cfg) => ({
        // eslint-disable-next-line react-hooks/rules-of-hooks
        x: useSpring(mouseX, cfg),
        // eslint-disable-next-line react-hooks/rules-of-hooks
        y: useSpring(mouseY, cfg),
    }));

    useEffect(() => {
        const onMove = (e) => {
            if (isTouchRef.current) return;
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!visible) setVisible(true);
        };

        const onTouch = () => { isTouchRef.current = true; };

        const onEnterInteractive = (e) => {
            const el = e.target;
            if (el.closest('a, button, [role="button"], input, textarea, select, label')) {
                setHovering(true);
            }
        };
        const onLeaveInteractive = () => setHovering(false);

        window.addEventListener('mousemove', onMove);
        window.addEventListener('touchstart', onTouch, { passive: true });
        document.addEventListener('mouseover', onEnterInteractive);
        document.addEventListener('mouseout', onLeaveInteractive);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('touchstart', onTouch);
            document.removeEventListener('mouseover', onEnterInteractive);
            document.removeEventListener('mouseout', onLeaveInteractive);
        };
    }, [mouseX, mouseY, visible]);

    // Hide on touch devices
    if (isTouchRef.current || !visible) return null;

    return (
        <>
            {springs.map(({ x, y }, i) => (
                <TrailDot key={i} x={x} y={y} index={i} hovering={hovering} />
            ))}
        </>
    );
};

export default CursorTrail;
