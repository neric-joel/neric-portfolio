import React from 'react';
import { Award, Users, Lightbulb } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const Achievements = () => {
    const achievements = [
        {
            title: "Volunteer, IEEE Student Branch",
            desc: "Organized embedded systems and circuit design workshops.",
            icon: Users,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            border: "border-blue-400/20"
        },
        {
            title: "Member, AI Club at ASU",
            desc: "Collaborated on image recognition and ML pipeline projects.",
            icon: Lightbulb,
            color: "text-yellow-400",
            bg: "bg-yellow-400/10",
            border: "border-yellow-400/20"
        },
        {
            title: "Mentored 10+ Students",
            desc: "Guided students in Arduino-based automation and Python programming.",
            icon: Award,
            color: "text-neon-green",
            bg: "bg-neon-green/10",
            border: "border-neon-green/20"
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {achievements.map((item, idx) => (
                        <div
                            key={idx}
                            className={`group relative p-6 rounded-xl border ${item.border} ${item.bg} hover:bg-opacity-20 transition-all duration-300 pop-out`}
                        >
                            <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <item.icon size={20} className={item.color} />
                            </div>
                            <h3 className="text-lg font-bold text-[var(--text-heading)] mb-2 transition-colors duration-400">
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
