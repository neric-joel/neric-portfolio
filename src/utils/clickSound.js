let ctx = null;

const getCtx = () => {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
};

export const playClick = () => {
    try {
        const ac  = getCtx();
        const now = ac.currentTime;

        // Soft tick: sine burst with quick decay
        const osc = ac.createOscillator();
        const env = ac.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.06);

        env.gain.setValueAtTime(0.18, now);
        env.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

        osc.connect(env);
        env.connect(ac.destination);

        osc.start(now);
        osc.stop(now + 0.1);
    } catch {}
};
