import React from 'react';
import { Github, Linkedin, Mail, ArrowRight, FileText } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import CopyEmail from './CopyEmail';
import { scrollToId } from '../utils/scrollTo';
import profilePic from '../assets/profile.jpg';

/* ── Proof items, sourced from resume ── */
const proof = [
    { value: '2',    label: 'IEEE Papers'       },
    { value: 'M.S.', label: 'CS @ ASU'          },
    { value: "'27",  label: 'Graduating'        },
    { value: '120+', label: 'Students Mentored' },
];

/* ── Social links ── */
const social = [
    { href: 'https://github.com/neric-joel',      label: 'GitHub',   Icon: Github   },
    { href: 'https://linkedin.com/in/neric-joel', label: 'LinkedIn', Icon: Linkedin },
    { href: 'mailto:nericjoel07@gmail.com',       label: 'Email',    Icon: Mail     },
];

const Hero = ({ toggleResume }) => {
    return (
        <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
            {/* Single static glow behind the photo side; no animation */}
            <div
                aria-hidden="true"
                className="hero-glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_72%_38%,rgba(155,229,100,0.07),transparent_70%)]"
            />

            <div className="relative mx-auto w-full max-w-5xl px-6 py-20">
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-5 md:gap-10">

                    {/* ── LEFT: identity, role, proof, CTAs ── */}
                    <div className="order-2 flex flex-col items-center gap-6 text-center md:order-1 md:col-span-3 md:items-start md:text-left">

                        {/* Availability badge */}
                        <RevealOnScroll delay={0.05}>
                            <span className="tag-accent tag inline-flex items-center gap-1.5 px-2.5 py-1">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                                Open to Fall 2026 internships
                            </span>
                        </RevealOnScroll>

                        {/* Name + email */}
                        <RevealOnScroll delay={0.1}>
                            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none font-bold tracking-tight text-heading">
                                Neric Joel
                            </h1>
                            <CopyEmail className="mx-auto mt-2 block text-sm font-medium text-muted md:mx-0" />
                        </RevealOnScroll>

                        {/* Role */}
                        <RevealOnScroll delay={0.15}>
                            <p className="text-xl font-semibold text-accent md:text-2xl">
                                Software &amp; AI/ML Engineer
                            </p>
                        </RevealOnScroll>

                        {/* Tagline */}
                        <RevealOnScroll delay={0.2}>
                            <p className="max-w-lg text-base leading-relaxed text-muted md:text-lg">
                                I build and deploy ML models and agentic AI systems: tool-calling,
                                RAG pipelines, and computer vision, from research prototype to production.
                            </p>
                        </RevealOnScroll>

                        {/* Proof strip */}
                        <RevealOnScroll delay={0.25}>
                            <div className="card inline-flex flex-wrap justify-center gap-x-6 gap-y-3 rounded-md px-4 py-3">
                                {proof.map(({ value, label }, i) => (
                                    <React.Fragment key={label}>
                                        <div className="flex min-w-12 flex-col items-center">
                                            <span className="font-display text-lg leading-none font-bold text-heading tabular-nums">
                                                {value}
                                            </span>
                                            <span className="mt-1 text-[10px] font-medium tracking-wider text-muted uppercase">
                                                {label}
                                            </span>
                                        </div>
                                        {i < proof.length - 1 && (
                                            <div className="w-px self-stretch bg-line" aria-hidden="true" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </RevealOnScroll>

                        {/* CTAs */}
                        <RevealOnScroll delay={0.3} className="flex flex-wrap justify-center gap-3 md:justify-start">
                            <button onClick={() => scrollToId('projects')} className="btn btn-primary">
                                View Projects
                                <ArrowRight size={14} aria-hidden="true" />
                            </button>
                            <button onClick={toggleResume} className="btn btn-secondary">
                                <FileText size={14} aria-hidden="true" />
                                Resume
                            </button>
                        </RevealOnScroll>

                        {/* Social links */}
                        <RevealOnScroll delay={0.35} className="flex items-center justify-center gap-2 md:justify-start">
                            {social.map(({ href, label, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('mailto') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex min-h-11 items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors duration-200 hover:border-accent-line hover:text-text"
                                >
                                    <Icon size={13} aria-hidden="true" />
                                    {label}
                                </a>
                            ))}
                        </RevealOnScroll>
                    </div>

                    {/* ── RIGHT: photo ── */}
                    <RevealOnScroll delay={0.15} className="order-1 flex justify-center md:order-2 md:col-span-2">
                        <div className="hero-photo overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-card">
                            <img
                                src={profilePic}
                                alt="Neric Joel"
                                width={288} height={288}
                                fetchPriority="high"
                                decoding="sync"
                                className="h-48 w-48 rounded-xl object-cover md:h-72 md:w-72"
                            />
                        </div>
                    </RevealOnScroll>

                </div>
            </div>
        </section>
    );
};

export default Hero;
