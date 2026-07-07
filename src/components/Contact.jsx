import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import signatureImg from '../assets/final_signature.png';

const links = [
    { href: 'mailto:nericjoel07@gmail.com',       label: 'Email',    Icon: Mail     },
    { href: 'https://linkedin.com/in/neric-joel', label: 'LinkedIn', Icon: Linkedin },
    { href: 'https://github.com/neric-joel',      label: 'GitHub',   Icon: Github   },
];

const Contact = () => (
    <section id="contact" className="flex min-h-[60vh] flex-col justify-center py-24 pb-32 md:py-32">
        <div className="mx-auto w-full max-w-5xl px-6 text-center">
            <RevealOnScroll>
                <h2 className="section-title">Let's Connect</h2>
                <p className="mx-auto mt-4 mb-12 max-w-md text-sm text-muted">
                    Open to internships, new-grad roles, and research opportunities. Feel free to reach out.
                </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.05}>
                <div className="mb-16 flex flex-wrap justify-center gap-3">
                    {links.map(({ href, label, Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith('mailto') ? undefined : '_blank'}
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            <Icon size={16} aria-hidden="true" />
                            {label}
                        </a>
                    ))}
                </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
                <div className="flex flex-col items-center">
                    <img
                        src={signatureImg}
                        alt="Neric Joel signature"
                        className="h-14 opacity-80 md:h-16"
                        style={{
                            filter: 'grayscale(1) brightness(2) contrast(2)',
                            mixBlendMode: 'screen',
                        }}
                    />
                    <p className="mt-4 text-[10px] tracking-widest text-muted uppercase">
                        Thanks for visiting · nericjoel07@gmail.com
                    </p>
                    <p className="mt-3 text-xs text-muted">
                        Designed &amp; built by Neric Joel with React &amp; Tailwind ·{' '}
                        <a
                            href="https://github.com/neric-joel/neric-portfolio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-accent"
                        >
                            view source
                        </a>
                    </p>
                </div>
            </RevealOnScroll>
        </div>
    </section>
);

export default Contact;
