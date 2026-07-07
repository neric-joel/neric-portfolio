import React from 'react';
import { ExternalLink } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const projects = [
    {
        title: "Agentic AI Case Management System",
        problem: "Automate case intake and routing for a nonprofit during the WiCS × Opportunity Hack weekend hackathon.",
        approach: "Agentic AI workflows using tool-calling and structured outputs; iterated on system prompts and API integrations to keep the agent reliable across varied user inputs.",
        stack: ["Python", "Tool-Calling", "Structured Outputs", "Prompt Design"],
        result: "Working case-management tool that automates intake and routing, built end-to-end in a weekend.",
        category: "Agentic AI"
    },
    {
        title: "Building Footprint Segmentation",
        problem: "Extract building footprints from aerial imagery on the Massachusetts Buildings Dataset.",
        approach: "Deep-learning pipeline in PyTorch — U-Net with a ResNet-50 encoder — tuned against IoU and precision-recall.",
        stack: ["Python", "PyTorch", "U-Net", "ResNet-50"],
        result: "30% lower inference latency after profiling and tuning the model.",
        category: "Computer Vision"
    },
    {
        title: "AI-Driven Solar PV Emulator",
        problem: "Predict solar PV behavior from large-scale telemetry to improve performance forecasting.",
        approach: "Processed and transformed 120,000+ time-series records for supervised learning; trained neural-network and regression models with numerical optimization.",
        stack: ["Python", "Neural Networks", "Predictive Modeling"],
        result: "18% reduction in prediction error (RMSE, MAE) versus the baseline.",
        category: "ML · Energy"
    },
    {
        title: "AI-Powered Resume Analyzer",
        problem: "Automate resume screening for HR teams handling high-volume candidate pipelines.",
        approach: "NLP ranking engine using Transformers and spaCy to score relevance, sentiment, and skill overlap, served via FastAPI.",
        stack: ["Python", "spaCy", "Transformers", "FastAPI", "HuggingFace"],
        result: "70% reduction in review time; batch-processes 1000+ resumes with live analytics dashboard.",
        category: "NLP · Full-Stack"
    },
];

const ProjectCard = ({ project }) => (
    <div className="card card-hover flex h-full flex-col p-6">
        <div className="mb-4">
            <span className="tag tag-accent px-2.5 py-1">{project.category}</span>
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

        <div className="mt-auto flex flex-wrap gap-1.5">
            {project.stack.map(tech => (
                <span key={tech} className="tag">{tech}</span>
            ))}
        </div>
    </div>
);

const Projects = () => (
    <section id="projects" className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
            <RevealOnScroll>
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
