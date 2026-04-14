import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

/**
 * 21st.dev-style blur-fade reveal on scroll.
 * Uses Framer Motion viewport detection for clean, performant entrance animations.
 */
const RevealOnScroll = ({ children, className = "", delay = 0, blur = true }) => {
    return (
        <MotionDiv
            initial={{ opacity: 0, y: 20, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className={className}
        >
            {children}
        </MotionDiv>
    );
};

export default RevealOnScroll;
