import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
    {
        name: 'Cyber Dark',
        bg: '#04040b', bgSecondary: '#0d0d1a', text: 'rgba(255,255,255,0.88)', heading: '#ffffff', muted: '#8b95a9',
        accent: '#22d3ee', accentRgb: '34,211,238', accentSecondary: '#06b6d4',
        glassBg: 'rgba(255,255,255,0.04)', glassBorder: 'rgba(255,255,255,0.08)',
        cardBg: 'rgba(255,255,255,0.03)', cardBorder: 'rgba(255,255,255,0.07)', cardHoverBorder: 'rgba(34,211,238,0.35)',
    },
    {
        name: 'Clean Neutral',
        bg: '#F6F5F2', bgSecondary: '#ffffff', text: '#1a1a1a', heading: '#000000', muted: '#4b5563',
        accent: '#00796B', accentRgb: '0,121,107', accentSecondary: '#005F52',
        glassBg: 'rgba(255,255,255,0.85)', glassBorder: 'rgba(0,0,0,0.1)',
        cardBg: 'rgba(0,0,0,0.04)', cardBorder: 'rgba(0,0,0,0.08)', cardHoverBorder: 'rgba(0,121,107,0.35)',
    },
    {
        name: 'Deep Navy',
        bg: '#0C1B2A', bgSecondary: '#112236', text: '#E5E7EB', heading: '#ffffff', muted: '#94A3B8',
        accent: '#00C2FF', accentRgb: '0,194,255', accentSecondary: '#0099CC',
        glassBg: 'rgba(0,194,255,0.04)', glassBorder: 'rgba(0,194,255,0.12)',
        cardBg: 'rgba(0,194,255,0.03)', cardBorder: 'rgba(255,255,255,0.06)', cardHoverBorder: 'rgba(0,194,255,0.35)',
    },
    {
        name: 'Warm Coffee',
        bg: '#2E1F1A', bgSecondary: '#3d2a24', text: '#F1E3D3', heading: '#ffffff', muted: '#C4B5A0',
        accent: '#FF9F43', accentRgb: '255,159,67', accentSecondary: '#E68A2E',
        glassBg: 'rgba(255,159,67,0.06)', glassBorder: 'rgba(255,159,67,0.15)',
        cardBg: 'rgba(255,159,67,0.04)', cardBorder: 'rgba(255,255,255,0.07)', cardHoverBorder: 'rgba(255,159,67,0.35)',
    },
    {
        name: 'Void Green',
        bg: '#040f08', bgSecondary: '#081a0e', text: 'rgba(220,255,220,0.88)', heading: '#e8ffe8', muted: '#5a8a6a',
        accent: '#00FF88', accentRgb: '0,255,136', accentSecondary: '#00cc6a',
        glassBg: 'rgba(0,255,136,0.04)', glassBorder: 'rgba(0,255,136,0.10)',
        cardBg: 'rgba(0,255,136,0.03)', cardBorder: 'rgba(0,255,136,0.08)', cardHoverBorder: 'rgba(0,255,136,0.35)',
    },
];

const labels = ['TRY ME', 'TRY AGAIN?', 'ANOTHER ONE?', 'HOW ABOUT THIS?', 'BACK TO DEFAULT'];

const TryMe = () => {
    const [idx, setIdx] = useState(0);
    const [showLabel, setShowLabel] = useState(false);

    const handleClick = () => {
        const next = (idx + 1) % labels.length;
        setIdx(next);
        const t = themes[next % themes.length];
        const el = document.documentElement;
        el.style.setProperty('--bg-primary',        t.bg);
        el.style.setProperty('--bg-secondary',       t.bgSecondary);
        el.style.setProperty('--text-primary',       t.text);
        el.style.setProperty('--text-heading',       t.heading);
        el.style.setProperty('--text-muted',         t.muted);
        el.style.setProperty('--accent-color',       t.accent);
        el.style.setProperty('--accent-rgb',         t.accentRgb);
        el.style.setProperty('--accent-secondary',   t.accentSecondary);
        el.style.setProperty('--glass-bg',           t.glassBg);
        el.style.setProperty('--glass-border',       t.glassBorder);
        el.style.setProperty('--card-bg',            t.cardBg);
        el.style.setProperty('--card-border',        t.cardBorder);
        el.style.setProperty('--card-hover-border',  t.cardHoverBorder);
    };

    return (
        <motion.button
            onClick={handleClick}
            onHoverStart={() => setShowLabel(true)}
            onHoverEnd={() => setShowLabel(false)}
            className="fixed top-6 left-6 z-[100] flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer"
            style={{
                fontFamily: 'Space Grotesk, sans-serif',
                background: 'color-mix(in srgb, var(--accent-color) 8%, transparent)',
                border: '1px solid color-mix(in srgb, var(--accent-color) 35%, transparent)',
                color: 'var(--accent-color)',
                backdropFilter: 'blur(12px)',
            }}
            animate={{
                boxShadow: [
                    '0 0 0px transparent',
                    '0 0 16px color-mix(in srgb, var(--accent-color) 30%, transparent)',
                    '0 0 0px transparent',
                ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="text-[10px] font-semibold tracking-widest uppercase"
                >
                    {labels[idx]}
                </motion.span>
            </AnimatePresence>
        </motion.button>
    );
};

export default TryMe;
