import React from 'react';

const Projects = () => {
    const projects = [
        {
            title: "Satellite Image Segmentation (AI)",
            desc: "Applied ResNet-50 and U-Net models for automated image segmentation and urban analysis. Achieved high accuracy in identifying infrastructure from satellite feeds.",
            tags: ["TensorFlow", "ResNet-50", "U-Net", "CV"],
            color: "from-electric-blue/10 to-transparent",
            borderColor: "border-electric-blue/30"
        },
        {
            title: "Eye-Tracking Autonomous Parking Car",
            desc: "Built an Arduino-based vehicle responding to eye blinks for movement and auto-parking. Integrated IR/ultrasonic sensors with real-time control via C++.",
            tags: ["Arduino", "C++", "Sensors", "Robotics"],
            color: "from-neon-green/10 to-transparent",
            borderColor: "border-neon-green/30"
        },
        {
            title: "Smart Doorbell with Live Feed (IoT)",
            desc: "Designed a motion-detection security system using ESP8266 and PIR sensors, enabling mobile live video via Blynk IoT.",
            tags: ["IoT", "ESP8266", "Blynk"],
            color: "from-orange-500/10 to-transparent",
            borderColor: "border-orange-500/30"
        }
    ];

    return (
        <section id="projects" className="py-20 relative">
            <div className="container mx-auto px-6 md:px-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-white">
                    Selected Work
                </h2>

                <div className="flex flex-col gap-12">
                    {projects.map((project, idx) => (
                        <div
                            key={idx}
                            className={`group relative overflow-hidden rounded-2xl border ${project.borderColor} bg-gradient-to-br ${project.color} p-8 md:p-12 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,255,255,0.1)]`}
                        >
                            <div className="relative z-10">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, tIdx) => (
                                        <span key={tIdx} className="text-xs font-mono uppercase tracking-wider text-gray-400 bg-black/30 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-electric-blue transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                                    {project.desc}
                                </p>
                            </div>

                            {/* Decorative Glow */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
