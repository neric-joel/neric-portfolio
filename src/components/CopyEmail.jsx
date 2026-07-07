import React, { useEffect, useRef, useState } from 'react';

const EMAIL = 'nericjoel07@gmail.com';

/* Click-to-copy email: swaps its label to "Copied" for a beat, falls back to
   mailto when the clipboard API is unavailable. */
const CopyEmail = ({ className = '' }) => {
    const [copied, setCopied] = useState(false);
    const timer = useRef(null);

    useEffect(() => () => clearTimeout(timer.current), []);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 1500);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    return (
        <button
            onClick={copy}
            className={`cursor-pointer transition-colors duration-200 hover:text-accent ${className}`}
            aria-label={copied ? 'Email copied' : `Copy email address ${EMAIL}`}
        >
            {copied ? 'Copied' : EMAIL}
        </button>
    );
};

export default CopyEmail;
