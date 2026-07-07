import React, { useEffect, useState } from 'react';

const LETTERS = 'NERIC JOEL'.split('');
const HOLD_MS = 2400;
const EXIT_MS = 450;

/* Fully CSS-driven so it can never stall: auto-dismisses, skippable with
   click or key. The parent decides whether to show it at all (once per
   session, only in visible documents, never under reduced motion). */
const IntroScreen = ({ onComplete }) => {
    const [leaving, setLeaving] = useState(false);

    useEffect(() => {
        let done = false;
        let exitTimer;
        const leave = () => {
            if (done) return;
            done = true;
            setLeaving(true);
            exitTimer = setTimeout(onComplete, EXIT_MS);
        };
        const holdTimer = setTimeout(leave, HOLD_MS);
        window.addEventListener('keydown', leave);
        window.addEventListener('pointerdown', leave);
        return () => {
            clearTimeout(holdTimer);
            clearTimeout(exitTimer);
            window.removeEventListener('keydown', leave);
            window.removeEventListener('pointerdown', leave);
        };
    }, [onComplete]);

    return (
        <div
            className={`intro-overlay fixed inset-0 z-9999 flex select-none flex-col items-center justify-center bg-bg${leaving ? ' is-leaving' : ''}`}
            aria-hidden="true"
        >
            <div className="flex items-center" style={{ gap: '0.04em' }}>
                {LETTERS.map((char, i) => (
                    <span
                        key={i}
                        className="intro-letter font-display inline-block font-bold"
                        style={{
                            fontSize: 'clamp(3rem, 10vw, 8rem)',
                            letterSpacing: char === ' ' ? '0.25em' : '0.03em',
                            width: char === ' ' ? '0.25em' : 'auto',
                            WebkitTextStroke: '1.5px rgba(255,255,255,0.75)',
                            color: 'transparent',
                            animationDelay: `${i * 60}ms`,
                        }}
                    >
                        {char === ' ' ? ' ' : char}
                    </span>
                ))}
            </div>
            <p className="intro-tagline mt-4 text-xs tracking-[0.45em] text-muted uppercase">
                SOFTWARE &amp; AI/ML ENGINEER
            </p>
        </div>
    );
};

export default IntroScreen;
