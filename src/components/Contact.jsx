import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import signatureImg from '../assets/final_signature.png';
import { playClick } from '../utils/clickSound';

const links = [
    { href: 'mailto:nericjoel07@gmail.com',            label: 'Email',    Icon: Mail,     delay: 0    },
    { href: 'https://linkedin.com/in/neric-joel',  label: 'LinkedIn', Icon: Linkedin, delay: 0.08 },
    { href: 'https://github.com/neric-joel',       label: 'GitHub',   Icon: Github,   delay: 0.16 },
];

const Contact = () => (
    <section
        id="contact"
        className="py-20 pb-32 relative min-h-[60vh] flex flex-col justify-center transition-all duration-500"
    >
        {/* Section background so it reads clearly over body dot-grid */}
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
                background: 'linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--bg-primary) 85%, transparent) 20%, var(--bg-primary) 50%, var(--bg-primary) 100%)',
            }}
        />

        {/* Accent glow at top edge */}
        <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, var(--accent-color), transparent)', opacity: 0.35 }}
        />

        <div className="container mx-auto px-6 md:px-20 text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
                <h2
                    className="text-2xl md:text-3xl font-bold mb-4"
                    style={{ color: 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    Let's Connect
                </h2>
                <p className="text-sm mb-12 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
                    Open to internships, new-grad roles, and research opportunities. Feel free to reach out.
                </p>
            </motion.div>

            {/* Contact buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
                {links.map(({ href, label, Icon, delay }) => (
                    <motion.a
                        key={label}
                        href={href}
                        target={href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        aria-label={label}
                        onClick={playClick}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium cursor-pointer overflow-hidden"
                        style={{
                            background: 'color-mix(in srgb, var(--accent-color) 6%, var(--glass-bg))',
                            border: '1px solid color-mix(in srgb, var(--accent-color) 22%, transparent)',
                            color: 'var(--text-muted)',
                            backdropFilter: 'blur(12px)',
                            fontFamily: 'Space Grotesk, sans-serif',
                        }}
                        whileHover={{
                            y: -3,
                            color: 'var(--accent-color)',
                            borderColor: 'var(--accent-color)',
                            boxShadow: '0 0 28px color-mix(in srgb, var(--accent-color) 30%, transparent), 0 0 0 1px color-mix(in srgb, var(--accent-color) 15%, transparent)',
                        }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ delay, duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                        {/* Shimmer sweep on hover */}
                        <motion.span
                            className="absolute inset-0 pointer-events-none"
                            style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1), transparent 65%)' }}
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '160%' }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        />
                        <Icon size={16} />
                        <span className="relative z-10">{label}</span>
                    </motion.a>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col items-center"
            >
                <img
                    src={signatureImg}
                    alt="Neric Joel signature"
                    className="h-14 md:h-16 opacity-80"
                    style={{ filter: 'var(--signature-filter)', mixBlendMode: 'var(--signature-mix-blend)' }}
                />
                <p
                    className="text-[10px] mt-4 uppercase tracking-widest"
                    style={{ color: 'var(--text-muted)' }}
                >
                    Thanks for visiting · nericjoel07@gmail.com
                </p>
            </motion.div>
        </div>
    </section>
);

export default Contact;
