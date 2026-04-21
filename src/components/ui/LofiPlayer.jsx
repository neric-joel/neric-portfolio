import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music2, ChevronDown } from 'lucide-react';

const NUM_BARS = 8;
// Base heights give each bar a "personality"
const BASE_HEIGHTS = [6, 12, 18, 22, 16, 20, 14, 8];

// Pink noise via Paul Kellett's method
function fillPinkNoise(data) {
    let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
    for (let i = 0; i < data.length; i++) {
        const w = Math.random() * 2 - 1;
        b0=.99886*b0+w*.0555179; b1=.99332*b1+w*.0750759;
        b2=.96900*b2+w*.1538520; b3=.86650*b3+w*.3104856;
        b4=.55000*b4+w*.5329522; b5=-.7616*b5-w*.0168980;
        data[i] = (b0+b1+b2+b3+b4+b5+b6+w*.5362) * 0.065;
        b6 = w * 0.115926;
    }
}

const LofiPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.55);
    const [bars, setBars] = useState(BASE_HEIGHTS.map(() => 3));
    const [collapsed, setCollapsed] = useState(false);

    const ctxRef     = useRef(null);
    const masterRef  = useRef(null);
    const nodesRef   = useRef([]);
    const animRef    = useRef(null);

    // Animate EQ bars
    useEffect(() => {
        if (isPlaying) {
            animRef.current = setInterval(() => {
                setBars(BASE_HEIGHTS.map(base =>
                    Math.max(3, base + (Math.random() * 10 - 5))
                ));
            }, 110);
        } else {
            clearInterval(animRef.current);
            setBars(BASE_HEIGHTS.map(() => 3));
        }
        return () => clearInterval(animRef.current);
    }, [isPlaying]);

    const buildAudio = useCallback((ctx, master) => {
        // Pink noise (vinyl texture)
        const bufSize = 2 * ctx.sampleRate;
        const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
        fillPinkNoise(buf.getChannelData(0));
        const noise = ctx.createBufferSource();
        noise.buffer = buf;
        noise.loop = true;

        const lpf = ctx.createBiquadFilter();
        lpf.type = 'lowpass';
        lpf.frequency.value = 2600;
        lpf.Q.value = 0.6;

        const ng = ctx.createGain();
        ng.gain.value = 0.028;

        noise.connect(lpf); lpf.connect(ng); ng.connect(master);
        noise.start();

        // Dm7 pad: D3 F3 A3 C4
        const chord = [146.83, 174.61, 220.00, 261.63];
        const oscs = chord.map((freq, i) => {
            const osc = ctx.createOscillator();
            osc.type = i % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.value = freq;
            osc.detune.value = (Math.random() - 0.5) * 14;

            const g = ctx.createGain();
            g.gain.value = 0.038 / chord.length;

            // Slow LFO tremolo
            const lfo = ctx.createOscillator();
            lfo.frequency.value = 0.12 + i * 0.04;
            const lg = ctx.createGain();
            lg.gain.value = 0.009;
            lfo.connect(lg); lg.connect(g.gain); lfo.start();

            osc.connect(g); g.connect(master); osc.start();
            return { osc, lfo };
        });

        nodesRef.current = [{ noise }, ...oscs.map(o => o)];
    }, []);

    const toggle = () => {
        if (!isPlaying) {
            if (!ctxRef.current) {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const master = ctx.createGain();
                master.gain.value = volume;
                master.connect(ctx.destination);
                ctxRef.current = ctx;
                masterRef.current = master;
                buildAudio(ctx, master);
            } else if (ctxRef.current.state === 'suspended') {
                ctxRef.current.resume();
            }
            setIsPlaying(true);
        } else {
            ctxRef.current?.suspend();
            setIsPlaying(false);
        }
    };

    const handleVolume = (e) => {
        const v = parseFloat(e.target.value);
        setVolume(v);
        if (masterRef.current) masterRef.current.gain.value = v;
    };

    useEffect(() => {
        return () => {
            clearInterval(animRef.current);
            ctxRef.current?.close();
        };
    }, []);

    return (
        <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            <motion.div
                className="relative rounded-2xl overflow-hidden"
                style={{
                    background: 'rgba(6, 6, 15, 0.85)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid',
                    borderColor: isPlaying
                        ? 'color-mix(in srgb, var(--accent-color) 45%, transparent)'
                        : 'color-mix(in srgb, var(--text-muted) 18%, transparent)',
                    boxShadow: isPlaying
                        ? '0 0 28px color-mix(in srgb, var(--accent-color) 18%, transparent)'
                        : 'none',
                    transition: 'border-color 0.4s, box-shadow 0.4s',
                }}
            >
                {/* Glow line top */}
                <AnimatePresence>
                    {isPlaying && (
                        <motion.div
                            className="absolute top-0 left-0 right-0 h-px"
                            style={{ background: 'linear-gradient(90deg, transparent, var(--accent-color), var(--accent-secondary), transparent)' }}
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        />
                    )}
                </AnimatePresence>

                <AnimatePresence initial={false}>
                    {!collapsed ? (
                        <motion.div
                            key="expanded"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="flex items-center gap-3 px-4 py-3"
                        >
                            {/* Music icon + label */}
                            <div className="flex items-center gap-1.5 select-none">
                                <motion.div
                                    animate={isPlaying ? { rotate: [0, 15, -15, 0] } : { rotate: 0 }}
                                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                                >
                                    <Music2 size={13} style={{ color: isPlaying ? 'var(--accent-color)' : 'var(--text-muted)' }} />
                                </motion.div>
                                <span className="text-[11px] font-medium tracking-wide select-none"
                                    style={{ color: isPlaying ? 'var(--text-primary)' : 'var(--text-muted)', fontFamily: 'Space Grotesk, sans-serif' }}>
                                    lofi beats
                                </span>
                            </div>

                            {/* EQ bars */}
                            <div className="flex items-end gap-[2px]" style={{ height: '24px' }}>
                                {bars.map((h, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: `${h}px` }}
                                        transition={{ duration: 0.1, ease: 'easeOut' }}
                                        style={{
                                            width: '3px',
                                            borderRadius: '2px',
                                            background: isPlaying
                                                ? `color-mix(in srgb, var(--accent-color) ${60 + i * 5}%, var(--accent-secondary))`
                                                : 'var(--text-muted)',
                                            opacity: isPlaying ? 1 : 0.3,
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Play / Pause */}
                            <motion.button
                                onClick={toggle}
                                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shrink-0"
                                style={{
                                    background: isPlaying
                                        ? 'linear-gradient(135deg, var(--accent-color), var(--accent-secondary))'
                                        : 'color-mix(in srgb, var(--accent-color) 14%, transparent)',
                                    color: isPlaying ? '#fff' : 'var(--accent-color)',
                                    border: '1px solid color-mix(in srgb, var(--accent-color) 30%, transparent)',
                                }}
                                whileHover={{ scale: 1.12 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={isPlaying ? 'pause' : 'play'}
                                        initial={{ scale: 0.6, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.6, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className="flex"
                                    >
                                        {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                                    </motion.span>
                                </AnimatePresence>
                            </motion.button>

                            {/* Volume slider */}
                            <input
                                type="range" min="0" max="1" step="0.05"
                                value={volume}
                                onChange={handleVolume}
                                className="w-14 h-1 cursor-pointer appearance-none rounded-full"
                                style={{ accentColor: 'var(--accent-color)' }}
                            />

                            {/* Collapse */}
                            <motion.button
                                onClick={() => setCollapsed(true)}
                                className="cursor-pointer opacity-40 hover:opacity-80"
                                style={{ color: 'var(--text-muted)' }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <ChevronDown size={12} />
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.button
                            key="collapsed"
                            onClick={() => setCollapsed(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 px-3 py-2.5 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                animate={isPlaying
                                    ? { scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }
                                    : {}}
                                transition={{ repeat: Infinity, duration: 1.2 }}
                            >
                                <Music2 size={14} style={{ color: isPlaying ? 'var(--accent-color)' : 'var(--text-muted)' }} />
                            </motion.div>
                            <div className="flex items-end gap-[2px]" style={{ height: '16px' }}>
                                {[6, 10, 14, 10, 8].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        animate={isPlaying ? { height: [`${h}px`, `${h * 1.4}px`, `${h}px`] } : { height: '3px' }}
                                        transition={{ repeat: Infinity, duration: 0.6 + i * 0.1, ease: 'easeInOut' }}
                                        style={{ width: '2px', borderRadius: '2px', background: 'var(--accent-color)', opacity: 0.7 }}
                                    />
                                ))}
                            </div>
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default LofiPlayer;
