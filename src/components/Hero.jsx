import React from 'react';
import { motion } from 'framer-motion';
import profilePic from '../assets/profile.png';

const Hero = () => {
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-700">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex justify-center">
                <div className="max-w-3xl flex flex-col items-start text-left w-full">
                    {/* Profile Picture */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6"
                    >
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gray-200/20">
                            <img
                                src={profilePic}
                                alt="Neric Joel"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-3xl md:text-4xl font-medium mb-2 tracking-tight text-[var(--text-heading)]"
                    >
                        Hey, Neric here
                    </motion.h1>

                    {/* Dynamic Sub-headline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-lg md:text-xl text-[var(--text-muted)] mb-6 font-normal"
                    >
                        How's your {currentDay}?
                    </motion.p>

                    {/* Bio */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="space-y-4 text-base md:text-lg leading-relaxed text-[var(--text-primary)] max-w-2xl"
                    >
                        <p>
                            Hey there! I'm Neric Joel, your friendly neighborhood <span className="text-[var(--accent-color)] font-semibold">AI/Embedded Engineer</span>.
                            With a robust background in EEE and currently mastering CS at ASU, I turn
                            "what if?" hardware ideas into "wow, that works!" reality.
                        </p>
                        <p>
                            Whether I'm jamming with a team of innovators or flying solo like a code ninja,
                            I bring a mix of <span className="text-[var(--accent-color)] font-semibold transition-colors duration-400">creativity, precision, and just enough magic</span> to make projects
                            shine.
                        </p>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-8"
                    >
                        <button
                            onClick={scrollToContact}
                            className="px-6 py-2.5 rounded-lg bg-[#1a1a1a] text-white font-medium hover:bg-[#2a2a2a] transition-colors border border-white/10"
                        >
                            Contact
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
