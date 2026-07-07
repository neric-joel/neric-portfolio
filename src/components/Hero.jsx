import React from 'react';
import { Github, Linkedin, Mail, ArrowRight, FileText } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { scrollToId } from '../utils/scrollTo';
import profilePic from '../assets/profile.png';

/* ── Proof items ── */
const proof = [
    { value: '3.89', label: 'GPA'         },
    { value: '2',    label: 'IEEE Papers' },
    { value: 'M.S.', label: 'CS @ ASU'    },
    { value: "'27",  label: 'Graduating'  },
];

/* ── Social links ── */
const social = [
    { href: 'https://github.com/neric-joel',      label: 'GitHub',   Icon: Github   },
    { href: 'https://linkedin.com/in/neric-joel', label: 'LinkedIn', Icon: Linkedin },
    { href: 'mailto:nericjoel07@gmail.com',       label: 'Email',    Icon: Mail     },
];

/* ── Featured project ── */
const featured = {
    label:    'Featured Work',
    title:    'Satellite Image Segmentation',
    desc:     'Multi-scale ResNet-50 + U-Net pipeline for land-use classification from multispectral satellite imagery. Includes Grad-CAM explainability and automated augmentation.',
    result:   '91% precision on terrain classification',
    stack:    ['Python', 'TensorFlow', 'OpenCV', 'Grad-CAM'],
    category: 'Computer Vision',
};

const Hero = ({ toggleResume }) => {
    return (
        <section id="hero" className="relative flex min-h-screen items-center">
            <div className="relative w-full max-w-6xl mx-auto px-6 py-20 md:px-10">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-5 lg:gap-14">

                    {/* ── LEFT: identity, role, proof, CTAs ── */}
                    <div className="flex flex-col gap-6 lg:col-span-3">

                        {/* Availability badge */}
                        <RevealOnScroll delay={0.05}>
                            <span className="tag-accent tag inline-flex items-center gap-1.5 px-2.5 py-1">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                                Open to Summer 2026 internships
                            </span>
                        </RevealOnScroll>

                        {/* Name + photo */}
                        <RevealOnScroll delay={0.1} className="flex items-center gap-5">
                            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full border border-line md:h-36 md:w-36">
                                <img
                                    src={profilePic}
                                    alt="Neric Joel"
                                    width={144} height={144}
                                    fetchPriority="high"
                                    decoding="sync"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <h1 className="font-display text-[clamp(2.25rem,5vw,3.625rem)] leading-none font-bold tracking-tight text-heading">
                                    Neric Joel
                                </h1>
                                <p className="mt-1.5 text-sm font-medium text-muted">
                                    nericjoel07@gmail.com
                                </p>
                            </div>
                        </RevealOnScroll>

                        {/* Role */}
                        <RevealOnScroll delay={0.15}>
                            <p className="text-xl font-semibold text-accent md:text-2xl">
                                Computer Vision Engineer
                            </p>
                        </RevealOnScroll>

                        {/* Tagline */}
                        <RevealOnScroll delay={0.2}>
                            <p className="max-w-lg text-base leading-relaxed text-muted md:text-lg">
                                I build and deploy ML systems across computer vision, NLP, and signal
                                processing, from research prototype to production pipeline.
                            </p>
                        </RevealOnScroll>

                        {/* Proof strip */}
                        <RevealOnScroll delay={0.25}>
                            <div className="card inline-flex flex-wrap gap-x-6 gap-y-3 rounded-md px-4 py-3">
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
                        <RevealOnScroll delay={0.3} className="flex flex-wrap gap-3">
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
                        <RevealOnScroll delay={0.35} className="flex items-center gap-2">
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

                    {/* ── RIGHT: featured project card ── */}
                    <RevealOnScroll delay={0.3} className="lg:col-span-2">
                        <div className="card flex flex-col gap-4 p-5">
                            <div className="flex items-center justify-between">
                                <span className="tag tag-accent">{featured.category}</span>
                                <span className="eyebrow">Featured</span>
                            </div>

                            <h2 className="font-display text-base leading-snug font-semibold text-heading">
                                {featured.title}
                            </h2>

                            <p className="text-sm leading-relaxed text-muted">
                                {featured.desc}
                            </p>

                            {/* Result — the one accent moment on this card */}
                            <div className="flex items-start gap-2 rounded-md border border-accent-line bg-accent-soft px-3 py-2.5">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                                <p className="text-sm font-medium text-accent">
                                    {featured.result}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {featured.stack.map(t => (
                                    <span key={t} className="tag">{t}</span>
                                ))}
                            </div>

                            <button onClick={() => scrollToId('projects')} className="link-arrow w-fit">
                                View all projects
                                <ArrowRight size={13} aria-hidden="true" />
                            </button>
                        </div>
                    </RevealOnScroll>

                </div>
            </div>
        </section>
    );
};

export default Hero;
