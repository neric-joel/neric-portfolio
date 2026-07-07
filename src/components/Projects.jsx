import React from 'react';
import { ExternalLink } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const projects = [
    {
        title: "Satellite Image Segmentation",
        problem: "Classify land-use regions from multispectral satellite imagery at scale.",
        approach: "Multi-scale ResNet-50 + U-Net with Grad-CAM explainability and automated augmentation pipelines.",
        stack: ["Python", "TensorFlow", "OpenCV", "ResNet-50", "U-Net", "Grad-CAM"],
        result: "91% precision on terrain classification; city growth heatmaps from raw satellite feeds.",
        category: "Computer Vision"
    },
    {
        title: "AI-Powered Resume Analyzer",
        problem: "Automate resume screening for HR teams handling high-volume candidate pipelines.",
        approach: "NLP ranking engine using Transformers and spaCy to score relevance, sentiment, and skill overlap, served via FastAPI.",
        stack: ["Python", "spaCy", "Transformers", "FastAPI", "HuggingFace"],
        result: "70% reduction in review time; batch-processes 1000+ resumes with live analytics dashboard.",
        category: "NLP · Full-Stack"
    },
    {
        title: "Emotion Recognition from Speech",
        problem: "Identify emotional states from raw audio for HCI and accessibility applications.",
        approach: "CNN-LSTM models on mel-spectrogram features with multilingual dataset support.",
        stack: ["Python", "PyTorch", "Librosa", "CNN-LSTM"],
        result: "88% accuracy across 7 emotion classes on diverse audio datasets.",
        category: "Deep Learning"
    },
    {
        title: "AI-Driven Solar PV Emulator",
        problem: "Optimize solar energy output under variable irradiance using adaptive control.",
        approach: "MPPT algorithms with real-time irradiance learning, MATLAB modeling, and IoT monitoring.",
        stack: ["Python", "MATLAB", "TensorFlow", "IoT", "Signal Processing"],
        result: "15% improvement in panel efficiency; real-time remote monitoring deployed.",
        category: "ML · Systems"
    },
    {
        title: "Eye-Tracking Autonomous Car",
        problem: "Enable hands-free vehicle control for users with limited motor mobility.",
        approach: "IR blink-to-command mapping fused with ultrasonic obstacle detection.",
        stack: ["C++", "Arduino", "IR Sensors", "Sensor Fusion"],
        result: "100% successful auto-parking in controlled trials; blink-sequence fail-safe.",
        category: "Robotics · Accessibility"
    },
    {
        title: "Smart Doorbell with Live Feed",
        problem: "Improve home security response time with intelligent motion detection and alerts.",
        approach: "ESP8266 IoT gateway with PIR triggering, encrypted video streaming, and face recognition.",
        stack: ["C++", "ESP8266", "Python", "OpenCV", "Blynk IoT"],
        result: "50% reduction in security response time; face recognition for known visitors.",
        category: "IoT · Computer Vision"
    }
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
