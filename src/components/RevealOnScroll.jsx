import React, { useEffect, useRef, useState } from 'react';

/* The hidden starting state is only applied when the document is visible at
   mount, so content is never stuck invisible in background tabs or embedded
   previews where the rendering timeline is suspended. */
const canAnimate = () =>
    typeof document !== 'undefined' &&
    document.visibilityState === 'visible' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Shared reveal-on-scroll: fade + small translate, fast, once-only.
 */
const RevealOnScroll = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const [animate] = useState(canAnimate);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!animate) return;
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { rootMargin: '-40px 0px' }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [animate]);

    if (!animate) {
        return <div className={className}>{children}</div>;
    }

    return (
        <div
            ref={ref}
            className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
            style={delay ? { '--reveal-delay': `${Math.round(delay * 1000)}ms` } : undefined}
        >
            {children}
        </div>
    );
};

export default RevealOnScroll;
