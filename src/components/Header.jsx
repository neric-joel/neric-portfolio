import React from 'react';

const Header = ({ toggleResume, showResume }) => {
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
        <nav className="fixed w-full z-50 top-0 left-0 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-deep-space/80 border-b border-glass-border">
            <div
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-green cursor-pointer hover:scale-105 transition-transform"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                NJ
            </div>

            <div className="hidden md:flex gap-8 items-center">
                {['About', 'Skills', 'Projects', 'Publications', 'Contact'].map((item) => (
                    <button
                        key={item}
                        onClick={() => scrollToSection(item.toLowerCase())}
                        className="text-gray-300 hover:text-electric-blue transition-colors text-sm font-medium uppercase tracking-wider"
                    >
                        {item}
                    </button>
                ))}
            </div>

            <button
                onClick={toggleResume}
                className="px-5 py-2 rounded-full border border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-deep-space transition-all duration-300 font-semibold text-sm shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]"
            >
                {showResume ? 'Back to Portfolio' : 'Resume / CV'}
            </button>
        </nav>
    );
};

export default Header;
