import React, { useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';

const MotionDiv = motion.div;

export function BlurFade({
    children,
    className,
    duration = 0.4,
    delay = 0,
    yOffset = 6,
    inViewMargin = '-50px',
    blur = '6px',
}) {
    const ref = useRef(null);
    const inViewResult = useInView(ref, { once: true, margin: inViewMargin });

    return (
        <AnimatePresence>
            <MotionDiv
                ref={ref}
                initial={{ y: yOffset, opacity: 0, filter: `blur(${blur})` }}
                animate={inViewResult
                    ? { y: 0, opacity: 1, filter: 'blur(0px)' }
                    : { y: yOffset, opacity: 0, filter: `blur(${blur})` }
                }
                transition={{ delay: 0.04 + delay, duration, ease: 'easeOut' }}
                className={className}
            >
                {children}
            </MotionDiv>
        </AnimatePresence>
    );
}
