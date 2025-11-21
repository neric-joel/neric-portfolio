import React, { useState } from 'react';

const Header = ({ toggleResume, showResume }) => {
    const [clickCount, setClickCount] = useState(0);
    const [themeIndex, setThemeIndex] = useState(0);

    const messages = [
        "Try me",
        "Try again?",
        "Another one?",
        "How about this?",
        "OK THE LAST ONE"
    ];

    const themes = ['dark', 'white', 'abstract', 'geometric', 'cyberpunk'];

    const handleTryMeClick = () => {
        const nextCount = (clickCount + 1) % messages.length;
        setClickCount(nextCount);

        const nextThemeIndex = (themeIndex + 1) % themes.length;
        setThemeIndex(nextThemeIndex);

        document.documentElement.setAttribute('data-theme', themes[nextThemeIndex]);
    };

    const scrollToSection = (id) => {
        if (showResume) {
            toggleResume();
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <nav className="fixed w-full z-50 top-0 left-0 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-[var(--bg-primary)]/80 border-b border-glass-border transition-colors duration-700">
                <div
                    className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-green cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    NJ
                </div>

                {/* TryMe in Center */}
                <div
                    onClick={handleTryMeClick}
                    className="cursor-pointer select-none group"
                >
                    <span className="text-base md:text-lg font-medium text-[var(--text-heading)] transition-all duration-300 group-hover:scale-105 group-hover:brightness-125 tracking-wide">
                        {messages[clickCount]}
                    </span>
                </div>

                <div className="hidden md:flex gap-8 items-center">
                    {['About', 'Skills', 'Projects', 'Publications', 'Contact'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            className="text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors text-sm font-medium uppercase tracking-wider"
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <button
                    onClick={toggleResume}
                    className="px-5 py-2 rounded-full border border-[var(--accent-color)] text-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-[var(--bg-primary)] transition-all duration-300 font-semibold text-sm shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]"
                >
                    {showResume ? 'Back to Portfolio' : 'Resume / CV'}
                </button>
            </nav>
        </>
    );
};

export default Header;
