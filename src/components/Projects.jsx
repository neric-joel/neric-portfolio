import React from 'react';
import { ExternalLink, Github, Play } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

/* Copy sourced from each repo's README and the resume; no invented claims. */
const projects = [
    {
        title: "CareBase: Nonprofit Case Management",
        event: "WiCS × Opportunity Hack @ ASU 2026",
        problem: "Automate client intake, case management, and routing for ICM Food & Clothing Bank's social services.",
        approach: "AI-native platform on Next.js 14 + Supabase with Claude-powered agentic workflows, where tool-calling and structured outputs keep intake and routing reliable across varied inputs.",
        result: "Shipped live on Vercel with a demo login and video walkthrough, built end-to-end in a weekend.",
        stack: ["Next.js 14", "TypeScript", "Supabase", "Claude API", "Tailwind"],
        category: "Agentic AI · Full-Stack",
        links: [
            { label: "Code", href: "https://github.com/neric-joel/CareBase", Icon: Github },
            { label: "Live Demo", href: "https://carebase-murex.vercel.app", Icon: ExternalLink },
            { label: "Video", href: "https://www.youtube.com/watch?v=YtwZh96U1F8", Icon: Play },
        ],
    },
    {
        title: "Path Forward",
        event: "HackASU 2026",
        problem: "15,000+ foster youth age out of care every year and under 3% earn a college degree. The funding exists, but the system is too fragmented to navigate.",
        approach: "Six questions generate a personalized plan via the Claude API: matched funding (up to $24,790/yr in Arizona), school recommendations, a sequenced action plan, and a downloadable PDF roadmap.",
        result: "Live on Vercel with a demo video; built for the Economic Empowerment & Education track.",
        stack: ["React 18", "TypeScript", "Claude API", "Tailwind"],
        category: "AI for Social Impact",
        links: [
            { label: "Code", href: "https://github.com/neric-joel/path-forward", Icon: Github },
            { label: "Live Demo", href: "https://pathforward-az.vercel.app", Icon: ExternalLink },
            { label: "Video", href: "https://www.youtube.com/watch?v=9Z9AgUIAbHk", Icon: Play },
        ],
    },
    {
        title: "AgentRoom",
        problem: "Multi-agent tools hide the agents behind one answer, or demand hosted services and pasted API keys.",
        approach: "A local chat room that turns installed agent CLIs (Claude Code, Codex, Gemini) into named participants. The /discuss mode splits a problem into sub-tasks on a shared blackboard and converges on one answer with attribution.",
        result: "Runs fully local with no accounts or keys; MIT-licensed with CI and versioned releases.",
        stack: ["TypeScript", "Multi-Agent Orchestration", "CLI Tooling"],
        category: "Agentic AI · Dev Tools",
        links: [
            { label: "Code", href: "https://github.com/neric-joel/Whatsapp-Agents", Icon: Github },
        ],
    },
    {
        title: "NotaryGuard: ID Verify AI",
        event: "VillageHacks 2026",
        problem: "Real-estate fraud slips through Remote Online Notarization via fake IDs, name mismatches, and lapsed notary commissions.",
        approach: "A fraud-aware verification rail that runs identity documents through four progressive verification levels, using PaddleOCR extraction and fuzzy name matching, before a notarization can proceed.",
        result: "Working verification pipeline on free, open-source tooling with a FastAPI backend and React front end.",
        stack: ["Python", "FastAPI", "PaddleOCR", "React", "TypeScript"],
        category: "Applied AI · Security",
        links: [
            { label: "Code", href: "https://github.com/neric-joel/Village-Hacks", Icon: Github },
        ],
    },
    {
        title: "Building Footprint Segmentation",
        problem: "Extract building footprints from aerial imagery on the Massachusetts Buildings Dataset.",
        approach: "Deep-learning pipeline in PyTorch, a U-Net with a ResNet-50 encoder, tuned against IoU and precision-recall.",
        result: "30% lower inference latency after profiling and tuning the model.",
        stack: ["Python", "PyTorch", "U-Net", "ResNet-50"],
        category: "Computer Vision",
        links: [],
    },
    {
        title: "Hybrid Movie Recommender",
        event: "CSE 573 @ ASU",
        problem: "Single-strategy recommenders miss patterns: collaborative filtering ignores content signals, and content-based filtering ignores user behavior.",
        approach: "Hybrid system combining collaborative filtering, content-based filtering, and Neural Collaborative Filtering (NeuMF) to capture non-linear user–movie relationships.",
        result: "Hybrid ensemble outperformed the individual models on accuracy and ranking metrics.",
        stack: ["Python", "NeuMF", "Collaborative Filtering"],
        category: "Machine Learning",
        links: [
            { label: "Code", href: "https://github.com/neric-joel/movie-recommender-system", Icon: Github },
        ],
    },
    {
        title: "Hand Gesture Recognition",
        problem: "Recognize hand signs in real time from a webcam, without training a custom model.",
        approach: "OpenCV + MediaPipe pipeline with two-hand tracking and rule-based landmark classification.",
        result: "Recognizes A–Z ASL fingerspelling, 0–10 finger counting, and 7 common gestures in real time.",
        stack: ["Python", "OpenCV", "MediaPipe"],
        category: "Computer Vision",
        links: [
            { label: "Code", href: "https://github.com/neric-joel/hand-gesture-recognition", Icon: Github },
        ],
    },
    {
        title: "AI-Driven Solar PV Emulator",
        problem: "Predict solar PV behavior from large-scale telemetry to improve performance forecasting.",
        approach: "Processed and transformed 120,000+ time-series records for supervised learning; trained neural-network and regression models with numerical optimization.",
        result: "18% reduction in prediction error (RMSE, MAE) versus the baseline.",
        stack: ["Python", "Neural Networks", "Predictive Modeling"],
        category: "ML · Energy",
        links: [],
    },
];

const ProjectCard = ({ project }) => (
    <div className="card card-hover flex h-full flex-col p-6">
        <div className="mb-4 flex items-center justify-between gap-2">
            <span className="tag tag-accent px-2.5 py-1">{project.category}</span>
            {project.event && <span className="eyebrow text-right">{project.event}</span>}
        </div>

        <h3 className="font-display mb-5 text-lg leading-tight font-semibold text-heading">
            {project.title}
        </h3>

        <div className="mb-5 flex-1 space-y-4">
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
                <div className="mt-4 flex flex-wrap gap-4 border-t border-line pt-4">
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
                        <ProjectCard project={project} />
                    </RevealOnScroll>
                ))}
            </div>

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
