import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const MotionSpan = motion.span;

export function WordRotate({ words, duration = 2500, className = '', style }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, duration);
        return () => clearInterval(interval);
    }, [words, duration]);

    return (
        <div className="overflow-hidden">
            <AnimatePresence mode="wait">
                <MotionSpan
                    key={words[index]}
                    className={className}
                    style={style}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    {words[index]}
                </MotionSpan>
            </AnimatePresence>
        </div>
    );
}
