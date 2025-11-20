import React, { useState, useEffect } from 'react';

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
                {/* Profile Image Placeholder */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 mb-8 border-2 border-glass-border overflow-hidden">
                    <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover opacity-80" />
                </div>

                <a
                    href="https://linkedin.com/in/neric-joel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block group"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white group-hover:text-electric-blue transition-colors cursor-pointer">
                        Hey, Neric here
                    </h1>
                </a>

                <p className="text-xl text-gray-500 mb-8 font-light">
                    {greeting}
                </p>

                <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                    <p>
                        Hey there! I'm Neric Joel, your friendly neighborhood <span className="text-electric-blue font-semibold">AI/Embedded Engineer</span>.
                        With a robust background in EEE and currently mastering CS at ASU, I turn "what if?" hardware ideas into "wow, that works!" reality.
                    </p>
                    <p>
                        Whether I'm jamming with a team of innovators or flying solo like a code ninja, I bring a mix of
                        <span className="text-neon-green"> creativity, precision, and just enough magic</span> to make projects shine.
                    </p>
                </div>

                <div className="mt-12">
                    <a
                        href="#contact"
                        className="inline-block px-8 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold transition-all hover:scale-105"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
