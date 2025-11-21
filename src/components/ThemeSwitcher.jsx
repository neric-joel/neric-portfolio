import React, { useState, useEffect } from 'react';

const themes = [
    { name: 'Dark', id: 'dark', accent: '#00ff88' },
    { name: 'Abstract', id: 'abstract', accent: '#f472b6' },
    { name: 'Geometric', id: 'geometric', accent: '#60a5fa' },
    { name: 'Nature', id: 'nature', accent: '#84cc16' },
    { name: 'Cyberpunk', id: 'cyberpunk', accent: '#ff00ff' },
];

const ThemeSwitcher = () => {
    const [currentTheme, setCurrentTheme] = useState(0);

    useEffect(() => {
        const savedTheme = localStorage.getItem('portfolio-theme-index');
        if (savedTheme) {
            const index = parseInt(savedTheme);
            if (!isNaN(index) && index >= 0 && index < themes.length) {
                setCurrentTheme(index);
                applyTheme(index);
            }
        }
    }, []);

    const applyTheme = (index) => {
        const theme = themes[index];
        document.documentElement.setAttribute('data-theme', theme.id);
        localStorage.setItem('portfolio-theme-index', index);
    };

    const cycleTheme = () => {
        const nextIndex = (currentTheme + 1) % themes.length;
        setCurrentTheme(nextIndex);
        applyTheme(nextIndex);
    };

    return (
        <button
            onClick={cycleTheme}
            className="fixed top-6 right-24 z-50 px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-sm font-mono text-white transition-all hover:scale-105 group"
        >
            <span className="relative flex items-center gap-2">
                TRY ME
                <span className="text-xs opacity-50">({themes[currentTheme].name})</span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--accent-color)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
        </button>
    );
};

export default ThemeSwitcher;
