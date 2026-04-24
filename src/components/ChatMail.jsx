import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Terminal } from 'lucide-react';

const CHIPS = [
  { label: 'Working on something cool?', subject: 'Collaboration Idea', body: "Hey Neric, I'm working on something cool and thought you'd be a great fit. Let me tell you about it:" },
  { label: 'Open to collaborate?', subject: 'Collaboration Request', body: "Hey Neric, I came across your portfolio and would love to explore a collaboration. Here's what I have in mind:" },
  { label: 'Just saying hi', subject: 'Hey from your portfolio', body: "Hey Neric, just dropped by your portfolio and wanted to say hi!" },
];

const panelVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transformOrigin: 'bottom right',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 380, damping: 28 },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.94,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
};

const orbVariants = {
  idle: {
    boxShadow: [
      '0 0 0px 0px color-mix(in srgb, var(--accent-color) 0%, transparent)',
      '0 0 18px 6px color-mix(in srgb, var(--accent-color) 35%, transparent)',
      '0 0 0px 0px color-mix(in srgb, var(--accent-color) 0%, transparent)',
    ],
    transition: {
      duration: 2.4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const ChatMail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('Portfolio Contact');
  const [activeChip, setActiveChip] = useState(null);
  const textareaRef = useRef(null);

  const handleChip = (chip, idx) => {
    setMessage(chip.body);
    setSubject(chip.subject);
    setActiveChip(idx);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    window.location.href = `mailto:nericjoel07@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    setIsOpen(false);
    setMessage('');
    setSubject('Portfolio Contact');
    setActiveChip(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessage('');
    setSubject('Portfolio Contact');
    setActiveChip(null);
  };

  return (
    <div
      style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50 }}
      aria-label="Contact widget"
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              width: '300px',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid color-mix(in srgb, var(--accent-color) 25%, transparent)',
              borderRadius: '1rem',
              padding: '1.25rem',
              boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
              cursor: 'none',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: 'var(--accent-color)',
                    boxShadow: '0 0 6px var(--accent-color)',
                  }}
                />
                <span
                  style={{
                    color: 'var(--text-heading)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  Drop a message
                </span>
              </div>
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                aria-label="Close contact panel"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'none',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Quick reply chips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.9rem' }}>
              {CHIPS.map((chip, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleChip(chip, idx)}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  style={{
                    textAlign: 'left',
                    background: activeChip === idx
                      ? 'color-mix(in srgb, var(--accent-color) 12%, transparent)'
                      : 'color-mix(in srgb, var(--text-muted) 5%, transparent)',
                    border: `1px solid ${activeChip === idx
                      ? 'color-mix(in srgb, var(--accent-color) 40%, transparent)'
                      : 'color-mix(in srgb, var(--text-muted) 12%, transparent)'}`,
                    borderRadius: '0.5rem',
                    padding: '0.45rem 0.75rem',
                    color: activeChip === idx ? 'var(--accent-color)' : 'var(--text-muted)',
                    fontSize: '0.72rem',
                    cursor: 'none',
                    transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                    letterSpacing: '0.01em',
                  }}
                >
                  {chip.label}
                </motion.button>
              ))}
            </div>

            {/* Textarea */}
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="chatmail-message"
                style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.35rem' }}
              >
                Your message
              </label>
              <textarea
                id="chatmail-message"
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
                required
                rows={4}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: 'color-mix(in srgb, var(--text-muted) 5%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--text-muted) 12%, transparent)',
                  borderRadius: '0.6rem',
                  padding: '0.65rem 0.75rem',
                  color: 'var(--text-heading)',
                  fontSize: '0.78rem',
                  resize: 'none',
                  outline: 'none',
                  cursor: 'none',
                  transition: 'border-color 0.2s',
                  fontFamily: 'inherit',
                  lineHeight: '1.5',
                  marginBottom: '0.75rem',
                  display: 'block',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'color-mix(in srgb, var(--accent-color) 55%, transparent)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'color-mix(in srgb, var(--text-muted) 12%, transparent)';
                }}
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.6rem',
                  background: 'color-mix(in srgb, var(--accent-color) 18%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--accent-color) 40%, transparent)',
                  borderRadius: '0.6rem',
                  color: 'var(--accent-color)',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  letterSpacing: '0.04em',
                  cursor: 'none',
                  textTransform: 'uppercase',
                }}
              >
                <Send size={13} />
                Send via email
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            key="trigger"
            onClick={() => setIsOpen(true)}
            variants={orbVariants}
            animate="idle"
            whileHover={{
              scale: 1.12,
              boxShadow: '0 0 28px 10px color-mix(in srgb, var(--accent-color) 45%, transparent)',
            }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            aria-label="Open contact widget"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.65rem 1.1rem 0.65rem 0.85rem',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid color-mix(in srgb, var(--accent-color) 30%, transparent)',
              borderRadius: '9999px',
              cursor: 'none',
              color: 'var(--accent-color)',
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'color-mix(in srgb, var(--accent-color) 14%, transparent)',
                border: '1px solid color-mix(in srgb, var(--accent-color) 30%, transparent)',
              }}
            >
              <Terminal size={13} strokeWidth={2.2} />
            </span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: 'var(--text-heading)',
                whiteSpace: 'nowrap',
              }}
            >
              say hello{' '}
              <span style={{ color: 'var(--accent-color)' }}>→</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatMail;
