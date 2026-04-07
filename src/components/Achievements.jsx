import React from 'react';
import { Users, Lightbulb, Award } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const Achievements = () => {
    const achievements = [
        {
            title: "Volunteer, IEEE Student Branch",
            desc: "Organized technical workshops on circuit design, software tools, and systems engineering for undergraduate students.",
            icon: Users,
            accent: "text-[var(--accent-color)]",
            bg: "bg-[var(--accent-color)]/10",
            border: "border-[var(--accent-color)]/20"
        },
        {
            title: "Member, AI Club at ASU",
            desc: "Collaborating on computer vision and ML pipeline projects with peers across CS and engineering programs.",
            icon: Lightbulb,
            accent: "text-[var(--accent-secondary)]",
            bg: "bg-[var(--accent-secondary)]/10",
            border: "border-[var(--accent-secondary)]/20"
        },
        {
            title: "Mentored 10+ Students",
            desc: "Guided junior students through programming fundamentals, project architecture, and ML concepts.",
            icon: Award,
            accent: "text-[var(--accent-color)]",
            bg: "bg-[var(--accent-color)]/10",
            border: "border-[var(--accent-color)]/20"
        }
    ];

    return (
        <section id="achievements" className="py-20 relative">
            <div className="container mx-auto px-6 md:px-20">
                <RevealOnScroll>
                    <h2 className="text-[1.8rem] font-medium mb-12 text-[var(--text-heading)] text-center">
                        Leadership & Activities
                    </h2>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {achievements.map((item, idx) => (
                        <div
                            key={idx}
                            className={`group relative p-6 rounded-xl border ${item.border} ${item.bg} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                        >
                            <div className={`w-10 h-10 rounded-lg ${item.bg} border ${item.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <item.icon size={20} className={item.accent} />
                            </div>
                            <h3 className="text-base font-semibold text-[var(--text-heading)] mb-2 transition-colors duration-400">
                                {item.title}
                            </h3>
                            <p className="text-sm text-[var(--text-muted)] leading-relaxed transition-colors duration-400">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
