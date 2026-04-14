import React from 'react';

// Pre-generate meteor positions at module level (outside component) to satisfy react-compiler purity rules
const MAX_METEORS = 30;
const METEOR_DATA = Array.from({ length: MAX_METEORS }, (_, idx) => ({
    id: idx,
    left: (Math.floor(Math.random() * 1800) - 200) + 'px',
    delay: (Math.random() * 4).toFixed(2) + 's',
    duration: (Math.random() * 8 + 3).toFixed(2) + 's',
}));

export const Meteors = ({ number = 20 }) => {
    const meteors = METEOR_DATA.slice(0, number);

    return (
        <>
            {meteors.map(({ id, left, delay, duration }) => (
                <span
                    key={'meteor' + id}
                    className="pointer-events-none absolute top-0 rotate-[215deg] h-0.5 w-0.5 rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
                    style={{
                        left,
                        animation: `meteor ${duration} linear ${delay} infinite`,
                    }}
                >
                    <span className="absolute top-1/2 -translate-y-1/2 w-[50px] h-[1px] bg-gradient-to-r from-slate-400/40 to-transparent" />
                </span>
            ))}
        </>
    );
};
