import React, { useState } from 'react';

const TryMe = () => {
    const [clickCount, setClickCount] = useState(0);

    const messages = [
        "TRY ME",
        "TRY AGAIN?",
        "ANOTHER ONE?",
        "HOW ABOUT THIS?",
        "OK, THE LAST ONE"
    ];

    const themes = [
        {
            name: 'Dark Default',
            bg: '#000000',
            text: 'rgba(255, 255, 255, 0.9)',
            heading: '#FFFFFF',
            muted: '#9CA3AF',
            accent: '#00FF88',
            accentSecondary: '#00FFFF',
            card: '#0A0A0A'
        },
        {
            name: 'Clean Neutral',
            bg: '#F6F5F2',
            text: '#1A1A1A',
            heading: '#000000',
            muted: '#333333',
            accent: '#00796B',
            accentSecondary: '#005F52',
            card: '#FFFFFF'
        },
        {
            name: 'Deep Navy',
            bg: '#0C1B2A',
            text: '#E5E7EB',
            heading: '#FFFFFF',
            muted: '#94A3B8',
            accent: '#00C2FF',
            accentSecondary: '#0099CC',
            card: '#152D42'
        },
        {
            name: 'Warm Coffee',
            bg: '#2E1F1A',
            text: '#F1E3D3',
            heading: '#FFFFFF',
            muted: '#C4B5A0',
            accent: '#FF9F43',
            accentSecondary: '#E68A2E',
            card: '#3D2A24'
        },
        {
            name: 'Modern Gray',
            bg: '#1C1C1C',
            text: '#E8E8E8',
            heading: '#FFFFFF',
            muted: '#A0A0A0',
            accent: '#22D3EE',
            accentSecondary: '#06B6D4',
            card: '#2A2A2A'
        }
    ];

    const handleClick = () => {
        const nextCount = (clickCount + 1) % messages.length;
        setClickCount(nextCount);

        // Apply theme to CSS variables
        const theme = themes[nextCount];
        document.documentElement.style.setProperty('--bg-primary', theme.bg);
        document.documentElement.style.setProperty('--text-primary', theme.text);
        document.documentElement.style.setProperty('--text-heading', theme.heading);
        document.documentElement.style.setProperty('--text-muted', theme.muted);
        document.documentElement.style.setProperty('--accent-color', theme.accent);
        document.documentElement.style.setProperty('--accent-secondary', theme.accentSecondary);
        document.documentElement.style.setProperty('--card-bg', theme.card);
    };

    return (
        <button
            onClick={handleClick}
            className="fixed top-8 left-8 z-[100] text-sm font-medium tracking-widest text-[var(--text-heading)] hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'serif' }}
        >
            {messages[clickCount]}
        </button>
    );
};

export default TryMe;
