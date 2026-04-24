import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music2, ChevronDown, SkipForward } from 'lucide-react';

const NUM_BARS = 8;
const BASE_HEIGHTS = [6, 12, 18, 22, 16, 20, 14, 8];

// Pink noise — Paul Kellett's method
function fillPinkNoise(data) {
    let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
    for (let i = 0; i < data.length; i++) {
        const w = Math.random() * 2 - 1;
        b0=.99886*b0+w*.0555179; b1=.99332*b1+w*.0750759;
        b2=.96900*b2+w*.1538520; b3=.86650*b3+w*.3104856;
        b4=.55000*b4+w*.5329522; b5=-.7616*b5-w*.0168980;
        data[i] = (b0+b1+b2+b3+b4+b5+b6+w*.5362) * 0.06;
        b6 = w * 0.115926;
    }
}

// Vinyl crackle — sparse random clicks
function fillVinylCrackle(data, rate) {
    for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() < 0.0008 ? (Math.random() * 2 - 1) * 0.35 : 0;
    }
}

const TRACKS = [
    { title: 'focus mode',    key: 'Dm7',   chord: [146.83, 174.61, 220.00, 261.63] },
    { title: 'deep work',     key: 'Fmaj7', chord: [174.61, 220.00, 261.63, 329.63] },
    { title: 'flow state',    key: 'Am7',   chord: [110.00, 130.81, 164.81, 196.00] },
];

const LofiPlayer = () => {
    const [isPlaying, setIsPlaying]   = useState(false);
    const [volume, setVolume]         = useState(0.5);
    const [bars, setBars]             = useState(BASE_HEIGHTS.map(() => 3));
    const [collapsed, setCollapsed]   = useState(() => window.innerWidth < 768);
    const [trackIdx, setTrackIdx]     = useState(0);

    const ctxRef    = useRef(null);
    const masterRef = useRef(null);
    const nodesRef  = useRef([]);
    const animRef   = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            animRef.current = setInterval(() => {
                setBars(BASE_HEIGHTS.map(base =>
                    Math.max(3, base + (Math.random() * 12 - 6))
                ));
            }, 100);
        } else {
            clearInterval(animRef.current);
            setBars(BASE_HEIGHTS.map(() => 3));
        }
        return () => clearInterval(animRef.current);
    }, [isPlaying]);

    const teardown = useCallback(() => {
        nodesRef.current.forEach(n => {
            try { n.noise?.stop(); } catch {}
            try { n.crackle?.stop(); } catch {}
            try { n.osc?.stop(); } catch {}
            try { n.lfo?.stop(); } catch {}
        });
        nodesRef.current = [];
    }, []);

    const buildAudio = useCallback((ctx, master, track) => {
        teardown();

        // Pink noise (vinyl texture)
        const bufSize = 2 * ctx.sampleRate;
        const noiseBuf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
        fillPinkNoise(noiseBuf.getChannelData(0));
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuf;
        noise.loop = true;
        const lpf = ctx.createBiquadFilter();
        lpf.type = 'lowpass'; lpf.frequency.value = 2800; lpf.Q.value = 0.7;
        const ng = ctx.createGain(); ng.gain.value = 0.022;
        noise.connect(lpf); lpf.connect(ng); ng.connect(master);
        noise.start();

        // Vinyl crackle
        const crackBuf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
        fillVinylCrackle(crackBuf.getChannelData(0), ctx.sampleRate);
        const crackle = ctx.createBufferSource();
        crackle.buffer = crackBuf;
        crackle.loop = true;
        const cg = ctx.createGain(); cg.gain.value = 0.018;
        crackle.connect(cg); cg.connect(master);
        crackle.start();

        // Chord pad with LFO tremolo
        const oscs = track.chord.map((freq, i) => {
            const osc = ctx.createOscillator();
            osc.type = i % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.value = freq;
            osc.detune.value = (Math.random() - 0.5) * 16;
            const g = ctx.createGain();
            g.gain.value = 0.042 / track.chord.length;

            // Warm low-pass on each voice
            const vf = ctx.createBiquadFilter();
            vf.type = 'lowpass'; vf.frequency.value = 1800;

            // LFO tremolo
            const lfo = ctx.createOscillator();
            lfo.frequency.value = 0.10 + i * 0.035;
            const lg = ctx.createGain(); lg.gain.value = 0.008;
            lfo.connect(lg); lg.connect(g.gain); lfo.start();

            osc.connect(g); g.connect(vf); vf.connect(master);
            osc.start();
            return { osc, lfo };
        });

        // Sub bass note (root)
        const bass = ctx.createOscillator();
        bass.type = 'sine';
        bass.frequency.value = track.chord[0] / 2;
        const bg = ctx.createGain(); bg.gain.value = 0.055;
        const blpf = ctx.createBiquadFilter();
        blpf.type = 'lowpass'; blpf.frequency.value = 220;
        bass.connect(bg); bg.connect(blpf); blpf.connect(master);
        bass.start();

        nodesRef.current = [{ noise }, { crackle }, { osc: bass }, ...oscs];
    }, [teardown]);

    const toggle = () => {
        if (!isPlaying) {
            if (!ctxRef.current) {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const master = ctx.createGain();
                master.gain.value = volume;
                master.connect(ctx.destination);
                ctxRef.current = ctx;
                masterRef.current = master;
                buildAudio(ctx, master, TRACKS[trackIdx]);
            } else if (ctxRef.current.state === 'suspended') {
                ctxRef.current.resume();
            }
            setIsPlaying(true);
        } else {
            ctxRef.current?.suspend();
            setIsPlaying(false);
        }
    };

    const nextTrack = () => {
        const next = (trackIdx + 1) % TRACKS.length;
        setTrackIdx(next);
        if (isPlaying && ctxRef.current) {
            buildAudio(ctxRef.current, masterRef.current, TRACKS[next]);
        }
    };

    const handleVolume = (e) => {
        const v = parseFloat(e.target.value);
        setVolume(v);
        if (masterRef.current) masterRef.current.gain.value = v;
    };

    useEffect(() => () => {
        clearInterval(animRef.current);
        teardown();
        ctxRef.current?.close();
    }, [teardown]);

    const track = TRACKS[trackIdx];

    return (
        <motion.div
            className="fixed bottom-6 left-6 z-50"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            <motion.div
                className="relative rounded-2xl overflow-hidden"
                style={{
                    background: 'rgba(4, 4, 12, 0.96)',
                    backdropFilter: 'blur(28px)',
                    border: '1px solid',
                    borderColor: isPlaying
                        ? 'color-mix(in srgb, var(--accent-color) 45%, transparent)'
                        : 'rgba(255,255,255,0.12)',
                    boxShadow: isPlaying
                        ? '0 0 32px color-mix(in srgb, var(--accent-color) 18%, transparent), 0 4px 24px rgba(0,0,0,0.6)'
                        : '0 4px 24px rgba(0,0,0,0.5)',
                    transition: 'border-color 0.4s, box-shadow 0.4s',
                }}
            >
                {/* Top glow line when playing */}
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
                        >
                            <div className="flex flex-col px-4 pt-3 pb-3 gap-2.5" style={{ minWidth: '220px' }}>
                                {/* Top row: icon + track name + collapse */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            animate={isPlaying ? { rotate: [0, 15, -15, 0] } : { rotate: 0 }}
                                            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                                        >
                                            <Music2 size={12} style={{ color: isPlaying ? 'var(--accent-color)' : 'var(--text-muted)' }} />
                                        </motion.div>
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={track.title}
                                                initial={{ opacity: 0, y: 4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -4 }}
                                                transition={{ duration: 0.2 }}
                                                className="text-[11px] font-medium tracking-wide"
                                                style={{ color: isPlaying ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)', fontFamily: 'Space Grotesk, sans-serif' }}
                                            >
                                                {track.title}
                                            </motion.span>
                                        </AnimatePresence>
                                    </div>
                                    <motion.button
                                        onClick={() => setCollapsed(true)}
                                        className="cursor-pointer opacity-40 hover:opacity-80 ml-2"
                                        style={{ color: 'rgba(255,255,255,0.6)' }}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <ChevronDown size={12} />
                                    </motion.button>
                                </div>

                                {/* Bottom row: EQ bars + controls */}
                                <div className="flex items-center gap-3">
                                    {/* EQ bars */}
                                    <div className="flex items-end gap-[2px]" style={{ height: '22px' }}>
                                        {bars.map((h, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ height: `${h}px` }}
                                                transition={{ duration: 0.1, ease: 'easeOut' }}
                                                style={{
                                                    width: '3px',
                                                    borderRadius: '2px',
                                                    background: isPlaying
                                                        ? `color-mix(in srgb, var(--accent-color) ${55 + i * 5}%, var(--accent-secondary))`
                                                        : 'var(--text-muted)',
                                                    opacity: isPlaying ? 1 : 0.25,
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Play/Pause */}
                                    <motion.button
                                        onClick={toggle}
                                        aria-label={isPlaying ? 'Pause music' : 'Play music'}
                                        aria-pressed={isPlaying}
                                        className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer shrink-0"
                                        style={{
                                            background: isPlaying
                                                ? 'linear-gradient(135deg, var(--accent-color), var(--accent-secondary))'
                                                : 'color-mix(in srgb, var(--accent-color) 14%, transparent)',
                                            color: isPlaying ? '#fff' : 'var(--accent-color)',
                                            border: '1px solid color-mix(in srgb, var(--accent-color) 28%, transparent)',
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
                                                {isPlaying ? <Pause size={11} /> : <Play size={11} />}
                                            </motion.span>
                                        </AnimatePresence>
                                    </motion.button>

                                    {/* Skip */}
                                    <motion.button
                                        onClick={nextTrack}
                                        aria-label="Next track"
                                        className="flex items-center justify-center cursor-pointer"
                                        style={{ color: 'rgba(255,255,255,0.4)' }}
                                        whileHover={{ scale: 1.15, color: 'var(--accent-color)' }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <SkipForward size={11} />
                                    </motion.button>

                                    {/* Volume */}
                                    <div className="flex items-center gap-1 w-14">
                                        <input
                                            type="range" min="0" max="1" step="0.05"
                                            value={volume}
                                            aria-label="Volume"
                                            onChange={handleVolume}
                                            className="w-full appearance-none rounded-full"
                                            style={{
                                                height: '3px',
                                                accentColor: 'var(--accent-color)',
                                                background: `linear-gradient(to right, var(--accent-color) ${volume * 100}%, rgba(255,255,255,0.15) ${volume * 100}%)`,
                                                outline: 'none',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
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
                                    ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }
                                    : {}}
                                transition={{ repeat: Infinity, duration: 1.2 }}
                            >
                                <Music2 size={14} style={{ color: isPlaying ? 'var(--accent-color)' : 'var(--text-muted)' }} />
                            </motion.div>
                            <div className="flex items-end gap-[2px]" style={{ height: '16px' }}>
                                {[6, 10, 14, 10, 8].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        animate={isPlaying ? { height: [`${h}px`, `${h * 1.45}px`, `${h}px`] } : { height: '3px' }}
                                        transition={{ repeat: Infinity, duration: 0.55 + i * 0.1, ease: 'easeInOut' }}
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
