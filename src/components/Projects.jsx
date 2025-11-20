import React from 'react';

const Projects = () => {
    const projects = [
        {
            title: "Satellite Image Segmentation (AI)",
            details: [
                "Achieved 91% segmentation accuracy by training ResNet-50 and U-Net models on satellite imagery using TensorFlow.",
                "Automated urban land-use classification, reducing manual annotation time by 60%.",
                "Improved model generalization by applying data augmentation and batch normalization techniques."
            ],
            tags: ["TensorFlow", "ResNet-50", "U-Net", "CV"],
            color: "from-electric-blue/10 to-transparent",
            borderColor: "border-electric-blue/30"
        },
        {
            title: "AI-Driven Solar PV Emulator",
            details: [
                "Increased solar energy efficiency by 15% through developing an AI-based MPPT control model integrated with real-time hardware monitoring.",
                "Built and tested MATLAB-microcontroller feedback systems for adaptive power regulation.",
                "Enhanced model performance using machine learning regression to predict maximum power output under variable sunlight."
            ],
            tags: ["MATLAB", "AI/ML", "Power Systems", "Python"],
            color: "from-yellow-500/10 to-transparent",
            borderColor: "border-yellow-500/30"
        },
        {
            title: "Eye-Tracking Autonomous Parking Car",
            details: [
                "Designed an Arduino-controlled car capable of motion and auto-parking via eye-blink detection using IR and ultrasonic sensors.",
                "Improved accessibility for mobility-impaired users by introducing non-contact control.",
                "Reduced system latency by optimizing C++ sensor communication and control algorithms."
            ],
            tags: ["Arduino", "C++", "Sensors", "Robotics"],
            color: "from-neon-green/10 to-transparent",
            borderColor: "border-neon-green/30"
        },
        {
            title: "Smart Doorbell with Live Feed (IoT)",
            details: [
                "Designed a motion-detection security system using ESP8266 and PIR sensors, enabling mobile live video via Blynk IoT.",
                "Integrated real-time alerts and video streaming for enhanced home security.",
                "Optimized power consumption for long-term battery operation."
            ],
            tags: ["IoT", "ESP8266", "Blynk"],
            color: "from-orange-500/10 to-transparent",
            borderColor: "border-orange-500/30"
        }
    ];

    return (
        <section id="projects" className="py-20 relative">
            <div className="container mx-auto px-6 md:px-20">
                <h2 className="text-3xl font-bold mb-12 text-white">
                    Projects
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <div
                            key={idx}
                            className={`group relative overflow-hidden rounded-xl border ${project.borderColor} bg-gradient-to-br ${project.color} p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] pop-out`}
                        >
                            <div className="relative z-10">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, tIdx) => (
                                        <span key={tIdx} className="text-xs font-mono uppercase tracking-wider text-gray-400 bg-black/40 px-3 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-electric-blue transition-colors">
                                    {project.title}
                                </h3>
                                <ul className="space-y-4">
                                    {project.details.map((detail, dIdx) => (
                                        <li key={dIdx} className="text-gray-300 text-base leading-loose flex items-start gap-3">
                                            <span className="text-electric-blue mt-2.5 text-[8px]">●</span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
