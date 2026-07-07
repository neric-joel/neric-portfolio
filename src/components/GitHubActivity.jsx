import React, { useEffect, useState } from 'react';

const LEVEL_CLASSES = [
    'bg-line',
    'bg-accent opacity-25',
    'bg-accent opacity-50',
    'bg-accent opacity-75',
    'bg-accent',
];

/* Verifiable-activity strip. Fetch failure of any kind renders nothing:
   the page never depends on this network call. */
const GitHubActivity = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const ctrl = new AbortController();
        fetch('https://github-contributions-api.jogruber.de/v4/neric-joel?y=last', { signal: ctrl.signal })
            .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
            .then(json => {
                if (!Array.isArray(json?.contributions) || typeof json?.total?.lastYear !== 'number') {
                    throw new Error('unexpected shape');
                }
                setData(json);
            })
            .catch(() => {});
        return () => ctrl.abort();
    }, []);

    if (!data) return null;

    return (
        <figure className="mx-auto mt-12 w-fit max-w-full">
            <div className="max-w-full overflow-x-auto">
                <div className="grid w-fit grid-flow-col grid-rows-7 gap-[2px]">
                    {data.contributions.map(day => (
                        <span
                            key={day.date}
                            title={`${day.count} contributions on ${day.date}`}
                            className={`h-[10px] w-[10px] rounded-[2px] ${LEVEL_CLASSES[Math.min(day.level, 4)]}`}
                        />
                    ))}
                </div>
            </div>
            <figcaption className="font-mono mt-3 text-center text-xs text-muted">
                {data.total.lastYear.toLocaleString()} contributions in the last year
            </figcaption>
        </figure>
    );
};

export default GitHubActivity;
