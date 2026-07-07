import React from 'react';
import { Brain, Bot, Code2, Database } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const categories = [
    {
        icon: Brain,
        label: 'AI & ML',
        skills: ['Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'Model Evaluation (RMSE/MAE, IoU)'],
    },
    {
        icon: Bot,
        label: 'Agentic AI',
        skills: ['Tool-Calling', 'RAG Pipelines', 'Prompt Engineering', 'System Prompt Design', 'Claude/OpenAI API', 'n8n'],
    },
    {
        icon: Code2,
        label: 'Languages',
        skills: ['Python', 'SQL', 'C++'],
    },
    {
        icon: Database,
        label: 'Data & Tools',
        skills: ['ETL / Data Pipelines', 'Statistical Analysis', 'PostgreSQL', 'FastAPI', 'Tableau', 'Git'],
    },
];

const Skills = () => (
    <section id="skills" className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
            <RevealOnScroll>
                <span className="section-index">03</span>
                <h2 className="section-title">Technical Stack</h2>
                <div className="section-rule" />
            </RevealOnScroll>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {categories.map((cat, i) => {
                    const Icon = cat.icon;
                    return (
                        <RevealOnScroll key={cat.label} delay={i * 0.06}>
                            <div className="card card-hover h-full p-6">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-accent-line bg-accent-soft text-accent">
                                        <Icon size={18} aria-hidden="true" />
                                    </div>
                                    <h3 className="font-display text-sm font-semibold tracking-wide text-heading uppercase">
                                        {cat.label}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((skill) => (
                                        <span key={skill} className="tag px-2.5 py-1 text-xs">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>
                    );
                })}
            </div>
        </div>
    </section>
);

export default Skills;
