import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  // 0 — Graphite (default)
  {
    world:'default',
    bg:'#0B0D10', bgSecondary:'#13171C', text:'#F3F5F7', heading:'#FFFFFF', muted:'#A7B0BA',
    accent:'#9BE564', accentRgb:'155,229,100', accentSecondary:'#6DD440',
    glassBg:'rgba(19,23,28,0.85)', glassBorder:'#232A33',
    cardBg:'#13171C', cardBorder:'#232A33', cardHoverBorder:'rgba(155,229,100,0.35)',
  },
  // 1 — Matrix
  {
    world:'matrix',
    bg:'#000600', bgSecondary:'#000e00', text:'rgba(0,255,65,0.85)', heading:'#a0ffb0', muted:'#3a9a50',
    accent:'#00ff41', accentRgb:'0,255,65', accentSecondary:'#00cc33',
    glassBg:'rgba(0,255,65,0.05)', glassBorder:'rgba(0,255,65,0.14)',
    cardBg:'rgba(0,255,65,0.04)', cardBorder:'rgba(0,255,65,0.09)', cardHoverBorder:'rgba(0,255,65,0.38)',
  },
  // 2 — Pokémon
  {
    world:'pokemon',
    bg:'#0f0800', bgSecondary:'#1a0f00', text:'rgba(255,240,200,0.90)', heading:'#fff8e0', muted:'#d4aa45',
    accent:'#f5c400', accentRgb:'245,196,0', accentSecondary:'#e8a000',
    glassBg:'rgba(245,196,0,0.06)', glassBorder:'rgba(245,196,0,0.16)',
    cardBg:'rgba(245,196,0,0.04)', cardBorder:'rgba(245,196,0,0.11)', cardHoverBorder:'rgba(245,196,0,0.42)',
  },
  // 3 — Iron Man
  {
    world:'ironman',
    bg:'#0a0000', bgSecondary:'#140000', text:'rgba(255,220,180,0.88)', heading:'#ffd4a0', muted:'#c07848',
    accent:'#e8192c', accentRgb:'232,25,44', accentSecondary:'#f5a623',
    glassBg:'rgba(232,25,44,0.05)', glassBorder:'rgba(232,25,44,0.16)',
    cardBg:'rgba(232,25,44,0.04)', cardBorder:'rgba(245,166,35,0.12)', cardHoverBorder:'rgba(232,25,44,0.46)',
  },
  // 4 — Synthwave
  {
    world:'synthwave',
    bg:'#0d0015', bgSecondary:'#140020', text:'rgba(240,200,255,0.88)', heading:'#f5e0ff', muted:'#b080cc',
    accent:'#ff2d78', accentRgb:'255,45,120', accentSecondary:'#b800d0',
    glassBg:'rgba(255,45,120,0.05)', glassBorder:'rgba(255,45,120,0.16)',
    cardBg:'rgba(130,0,255,0.05)', cardBorder:'rgba(255,45,120,0.12)', cardHoverBorder:'rgba(255,45,120,0.46)',
  },
  // 5 — Spider-Man
  {
    world:'spiderman',
    bg:'#05080f', bgSecondary:'#080e1c', text:'rgba(220,228,255,0.90)', heading:'#ffffff', muted:'#8a9bc0',
    accent:'#e8192c', accentRgb:'232,25,44', accentSecondary:'#1c3d7a',
    glassBg:'rgba(232,25,44,0.05)', glassBorder:'rgba(232,25,44,0.16)',
    cardBg:'rgba(28,61,122,0.10)', cardBorder:'rgba(232,25,44,0.12)', cardHoverBorder:'rgba(232,25,44,0.46)',
  },
];

const labels = [
  'SWITCH THEME',
  'TAKE THE PILL?',
  'GOTTA CATCH EM?',
  'I AM IRON MAN',
  'OUTRUN THE NIGHT',
  'YOUR FRIENDLY DEV',
];

const TryMe = () => {
  const [idx, setIdx] = useState(0);

  const handleClick = () => {
    const next = (idx + 1) % themes.length;
    setIdx(next);
    const t = themes[next];
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
    window.dispatchEvent(new CustomEvent('worldthemechange', { detail: { world: t.world } }));
  };

  return (
    <motion.button
      onClick={handleClick}
      aria-label="Switch world theme"
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
          '0 0 18px color-mix(in srgb, var(--accent-color) 32%, transparent)',
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
