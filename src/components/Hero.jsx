import React, { useState, useEffect } from 'react';
import profileImg from '../assets/profile.png';

const Hero = () => {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const date = new Date();
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        setGreeting(`How's your ${day}?`);
    }, []);

    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center items-start px-6 md:px-20 lg:px-40 relative pt-20">
            <div className="max-w-3xl animate-fade-up">
                {/* Profile Image */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-gray-800 to-black mb-8 border-2 border-glass-border overflow-hidden shadow-2xl">
                    <img src={profileImg} alt="Neric Joel" className="w-full h-full object-cover" />
                </div>

                <a
                    href="https://linkedin.com/in/neric-joel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block group"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white group-hover:text-electric-blue transition-colors cursor-pointer">
                        Hey, Neric here
                    </h1>
                </a>

                <p className="text-lg text-gray-500 mb-6 font-light">
                    {greeting}
                </p>

                <div className="space-y-4 text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl">
                    <p>
                        Hey there! I'm Neric Joel, your friendly neighborhood <span className="text-electric-blue font-semibold">AI/Embedded Engineer</span>.
                        With a robust background in EEE and currently mastering CS at ASU, I turn "what if?" hardware ideas into "wow, that works!" reality.
                    </p>
                    <p>
                        Whether I'm jamming with a team of innovators or flying solo like a code ninja, I bring a mix of
                        <span className="text-neon-green"> creativity, precision, and just enough magic</span> to make projects shine.
                    </p>
                </div>

                <div className="mt-10">
                    <a
                        href="#contact"
                        className="inline-block px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all hover:scale-105 text-sm tracking-wide"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
