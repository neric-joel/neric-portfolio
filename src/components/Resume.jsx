import React from 'react';
import { motion } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';
import { playClick } from '../utils/clickSound';

const Resume = ({ onClose }) => (
    <motion.div
        className="fixed inset-0 z-[200] flex flex-col"
        style={{ backgroundColor: 'var(--bg-primary)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0"
            style={{
                borderBottom: '1px solid color-mix(in srgb, var(--text-muted) 12%, transparent)',
                background: 'color-mix(in srgb, var(--bg-primary) 95%, transparent)',
                backdropFilter: 'blur(12px)',
            }}>
            <span className="text-sm font-semibold tracking-wide"
                style={{ color: 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif' }}>
                Neric Joel — Résumé
            </span>
            <div className="flex items-center gap-3">
                <motion.a
                    href="/neric-resume.pdf"
                    download="Neric_Joel_Resume.pdf"
                    onClick={playClick}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                    style={{
                        background: 'linear-gradient(135deg, var(--accent-color), var(--accent-secondary))',
                        color: '#fff',
                        fontFamily: 'Space Grotesk, sans-serif',
                    }}
                    whileHover={{ scale: 1.04, boxShadow: '0 0 20px color-mix(in srgb, var(--accent-color) 40%, transparent)' }}
                    whileTap={{ scale: 0.97 }}
                >
                    <Download size={14} />
                    Download
                </motion.a>
                <motion.a
                    href="/neric-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm"
                    style={{
                        color: 'var(--text-muted)',
                        border: '1px solid color-mix(in srgb, var(--text-muted) 18%, transparent)',
                    }}
                    whileHover={{ color: 'var(--accent-color)', borderColor: 'var(--accent-color)', scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <ExternalLink size={13} />
                    Open
                </motion.a>
                <motion.button
                    onClick={onClose}
                    className="flex items-center justify-center w-8 h-8 rounded-lg"
                    style={{
                        color: 'var(--text-muted)',
                        border: '1px solid color-mix(in srgb, var(--text-muted) 15%, transparent)',
                    }}
                    whileHover={{ scale: 1.1, rotate: 90, color: 'var(--accent-color)' }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                    <X size={16} />
                </motion.button>
            </div>
        </div>

        {/* PDF viewer */}
        <div className="flex-1 overflow-hidden">
            <iframe
                src="/neric-resume.pdf"
                title="Neric Joel Resume"
                className="w-full h-full"
                style={{ border: 'none' }}
            />
        </div>
    </motion.div>
);

export default Resume;
