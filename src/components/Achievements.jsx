import React from 'react';
import { Users, Lightbulb, Award } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const achievements = [
    {
        title: "Volunteer, IEEE Student Branch",
        desc: "Organized technical workshops on circuit design, software tools, and systems engineering for undergraduate students.",
        Icon: Users,
    },
    {
        title: "Member, AI Club at ASU",
        desc: "Collaborating on computer vision and ML pipeline projects with peers across CS and engineering programs.",
        Icon: Lightbulb,
    },
    {
        title: "Mentored 50+ Students",
        desc: "Guided junior students through programming fundamentals, project architecture, and ML concepts.",
        Icon: Award,
    },
];

const Achievements = () => (
    <section id="achievements" className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
            <RevealOnScroll>
                <h2 className="section-title">Leadership &amp; Activities</h2>
                <div className="section-rule" />
            </RevealOnScroll>

            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
                {achievements.map((item, idx) => (
                    <RevealOnScroll key={item.title} delay={idx * 0.06}>
                        <div className="card card-hover h-full p-6">
                            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md border border-accent-line bg-accent-soft text-accent">
                                <item.Icon size={18} aria-hidden="true" />
                            </div>
                            <h3 className="font-display mb-2 text-base font-semibold text-heading">
                                {item.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-muted">
                                {item.desc}
                            </p>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </div>
    </section>
);

export default Achievements;
