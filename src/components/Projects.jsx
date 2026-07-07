import React from 'react';
import { ExternalLink, Github, Play, FileText } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import GitHubActivity from './GitHubActivity';
import carebaseImg from '../assets/projects/carebase.jpg';
import pathforwardImg from '../assets/projects/pathforward.jpg';
import agentroomGif from '../assets/projects/agentroom-demo.gif';
import footprintDiagram from '../assets/projects/footprint-diagram.svg';
import eyetrackingDiagram from '../assets/projects/eyetracking-diagram.svg';
import pvCitation from '../assets/projects/pv-citation.svg';

/* Copy sourced from each repo's README, its own evaluation artifacts, and the
   resume; no invented claims. Images are real product captures and charts. */
const projects = [
    {
        title: "CareBase: Nonprofit Case Management",
        status: "Shipped",
        event: "WiCS × Opportunity Hack @ ASU 2026",
        problem: "Automate client intake, case management, and routing for ICM Food & Clothing Bank's social services.",
        approach: "AI-native platform on Next.js 14 + Supabase with Claude-powered agentic workflows, where tool-calling and structured outputs keep intake and routing reliable across varied inputs.",
        result: "Shipped live on Vercel with a demo login and video walkthrough, built end-to-end in a weekend.",
        stack: ["Next.js 14", "TypeScript", "Supabase", "Claude API", "Tailwind"],
        category: "Agentic AI · Full-Stack",
        image: { src: carebaseImg, alt: "CareBase landing page: AI-powered nonprofit case management" },
        links: [
            { label: "Code", href: "https://github.com/neric-joel/CareBase", Icon: Github },
            { label: "Live Demo", href: "https://carebase-murex.vercel.app", Icon: ExternalLink },
            { label: "Video", href: "https://www.youtube.com/watch?v=YtwZh96U1F8", Icon: Play },
        ],
    },
    {
        title: "Path Forward",
        status: "Shipped",
        event: "HackASU 2026",
        problem: "15,000+ foster youth age out of care every year and under 3% earn a college degree. The funding exists, but the system is too fragmented to navigate.",
        approach: "Six questions generate a personalized plan via the Claude API: matched funding (up to $24,790/yr in Arizona), school recommendations, a sequenced action plan, and a downloadable PDF roadmap.",
        result: "Live on Vercel with a demo video; built for the Economic Empowerment & Education track.",
        stack: ["React 18", "TypeScript", "Claude API", "Tailwind"],
        category: "AI for Social Impact",
        image: { src: pathforwardImg, alt: "Path Forward app: college readiness planner for foster youth" },
        links: [
            { label: "Code", href: "https://github.com/neric-joel/path-forward", Icon: Github },
            { label: "Live Demo", href: "https://pathforward-az.vercel.app", Icon: ExternalLink },
            { label: "Video", href: "https://www.youtube.com/watch?v=9Z9AgUIAbHk", Icon: Play },
        ],
    },
    {
        title: "AgentRoom",
        status: "Active",
        problem: "Multi-agent tools hide the agents behind one answer, or demand hosted services and pasted API keys.",
        approach: "A local chat room that turns installed agent CLIs (Claude Code, Codex, Gemini) into named participants. The /discuss mode splits a problem into sub-tasks on a shared blackboard and converges on one answer with attribution.",
        result: "Runs fully local with no accounts or keys; MIT-licensed with CI and versioned releases.",
        stack: ["TypeScript", "Multi-Agent Orchestration", "CLI Tooling"],
        category: "Agentic AI · Dev Tools",
        image: { src: agentroomGif, alt: "AgentRoom demo: connecting Claude Code, Codex, and Gemini CLIs into one room" },
        links: [
            { label: "Code", href: "https://github.com/neric-joel/Whatsapp-Agents", Icon: Github },
        ],
    },
    {
        title: "Building Footprint Segmentation",
        status: "Research",
        problem: "Extract building footprints from aerial imagery on the Massachusetts Buildings Dataset.",
        approach: "Deep-learning pipeline in PyTorch, a U-Net with a ResNet-50 encoder, tuned against IoU and precision-recall.",
        result: "30% lower inference latency after profiling and tuning the model.",
        stack: ["Python", "PyTorch", "U-Net", "ResNet-50"],
        category: "Computer Vision",
        image: { src: footprintDiagram, alt: "Architecture diagram: aerial tile through ResNet-50 encoder and U-Net decoder to building mask" },
        links: [],
    },
    {
        title: "Eye-Tracking Autonomous Parking Car",
        status: "Prototype",
        event: "Amrita Vishwa Vidyapeetham",
        problem: "Enable hands-free vehicle control for users with limited motor mobility.",
        approach: "Prototype vehicle executing blink-based control and automated parking: IR sensors mapped to commands on Arduino, with ultrasonic sensors and L298N motor control for navigation and obstacle avoidance.",
        result: "100% successful auto-parking in controlled trials, with a blink-sequence fail-safe.",
        stack: ["Embedded C", "Arduino", "IR Sensors", "Real-Time Control"],
        category: "Embedded · Accessibility",
        image: { src: eyetrackingDiagram, alt: "Control loop diagram: IR blink sensor to Arduino command mapping to L298N motor control, with ultrasonic obstacle sensing" },
        links: [],
    },
    {
        title: "AI-Driven Solar PV Emulator",
        status: "Published",
        problem: "Predict solar PV behavior from large-scale telemetry to improve performance forecasting.",
        approach: "Processed and transformed 120,000+ time-series records for supervised learning; trained neural-network and regression models with numerical optimization.",
        result: "18% reduction in prediction error (RMSE, MAE) versus the baseline; the underlying parameter-estimation research is peer-reviewed and published in IEEE.",
        stack: ["Python", "Neural Networks", "Predictive Modeling"],
        category: "ML · Energy",
        image: { src: pvCitation, alt: "IEEE citation: Optimal Parameter Estimation Techniques for Enhanced Performance of Solar PV Cell" },
        links: [
            { label: "IEEE Paper", href: "https://ieeexplore.ieee.org/document/11048280", Icon: FileText },
        ],
    },
];

const ProjectCard = ({ project, index }) => (
    <div className="card card-hover group relative flex h-full flex-col overflow-hidden">
        {project.image && (
            <div className="card-media">
                <img
                    src={project.image.src}
                    alt={project.image.alt}
                    loading="lazy"
                    decoding="async"
                />
            </div>
        )}
        <div className="relative flex flex-1 flex-col p-5">
            <span
                aria-hidden="true"
                className="font-display pointer-events-none absolute top-3 right-4 text-[3.5rem] leading-none font-bold text-heading opacity-[0.07] transition-all duration-200 select-none group-hover:text-accent group-hover:opacity-25"
            >
                {String(index + 1).padStart(2, '0')}
            </span>
            <div className="relative z-10 mb-3 flex flex-wrap items-center gap-2">
                <span className="tag tag-accent px-2.5 py-1">{project.category}</span>
                <span className={`tag tag-mono ${['Shipped', 'Active', 'Published'].includes(project.status) ? 'border-accent-line text-accent' : ''}`}>
                    {project.status}
                </span>
                {project.event && <span className="eyebrow ml-auto text-right">{project.event}</span>}
            </div>

            <h3 className="font-display mb-4 text-lg leading-tight font-semibold text-heading">
                {project.title}
            </h3>

            <div className="mb-4 flex-1 space-y-3">
                {[
                    { label: 'Problem',  text: project.problem,  accent: false },
                    { label: 'Approach', text: project.approach, accent: false },
                    { label: 'Outcome',  text: project.result,   accent: true  },
                ].map(({ label, text, accent }) => (
                    <div key={label}>
                        <p className="eyebrow mb-1">{label}</p>
                        <p className={`text-sm leading-relaxed ${accent ? 'font-medium text-accent' : 'text-text'}`}>
                            {text}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-auto">
                <div className="flex flex-wrap gap-1.5">
                    {project.stack.map(tech => (
                        <span key={tech} className="tag">{tech}</span>
                    ))}
                </div>
                {project.links.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-4 border-t border-line pt-3.5">
                        {project.links.map(({ label, href, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-arrow text-xs"
                            >
                                <Icon size={13} aria-hidden="true" />
                                {label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
);

const Projects = () => (
    <section id="projects" className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
            <RevealOnScroll>
                <span className="section-index">04</span>
                <h2 className="section-title">Projects</h2>
                <div className="section-rule" />
                <p className="mt-4 text-sm text-muted">
                    {projects.length} case studies · problem, approach, outcome
                </p>
            </RevealOnScroll>

            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
                {projects.map((project, i) => (
                    <RevealOnScroll key={project.title} delay={(i % 2) * 0.06}>
                        <ProjectCard project={project} index={i} />
                    </RevealOnScroll>
                ))}
            </div>

            <GitHubActivity />

            <div className="mt-10 flex justify-center">
                <a
                    href="https://github.com/neric-joel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow text-muted hover:text-text"
                >
                    <ExternalLink size={13} aria-hidden="true" />
                    View all on GitHub
                </a>
            </div>
        </div>
    </section>
);

export default Projects;
