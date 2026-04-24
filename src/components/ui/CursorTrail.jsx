import { useEffect, useRef } from 'react';

const TRAIL = 36;


const parseHex = (hex) => {
    const h = hex.trim().replace('#', '');
    if (h.length === 6)
        return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
    return [34, 211, 238];
};

const readAccent = () => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
    return raw.startsWith('#') ? parseHex(raw) : [34, 211, 238];
};

const CursorTrail = ({ paused = false }) => {
    const canvasRef  = useRef(null);
    const pausedRef  = useRef(paused);
    const prevPaused = useRef(paused);

    // Keep pausedRef in sync; when unpausing, signal the draw loop to reset position
    const resetRef   = useRef(false);
    useEffect(() => {
        pausedRef.current = paused;
        // Transitioning from paused → unpaused: stale mx/my would show cursor
        // frozen at the position it was in before the iframe captured events.
        // Signal the draw loop to reset to off-screen until real mousemove fires.
        if (prevPaused.current && !paused) {
            resetRef.current = true;
        }
        prevPaused.current = paused;
    }, [paused]);

    useEffect(() => {
        if (window.matchMedia('(hover: none)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const canvas = canvasRef.current;
        const ctx    = canvas.getContext('2d');
        let raf;

        const pts  = Array.from({ length: TRAIL }, () => ({ x: -600, y: -600 }));
        let mx = -600, my = -600;
        let sparks = [];
        let hasMoved = false;

        let [r, g, b] = readAccent();
        const observer = new MutationObserver(() => { [r, g, b] = readAccent(); });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        // ResizeObserver catches ALL viewport changes; window resize misses some
        const ro = new ResizeObserver(resize);
        ro.observe(document.documentElement);

        const onMove = (e) => {
            mx = e.clientX;
            my = e.clientY;
            hasMoved = true;
        };

        const onClick = (e) => {
            for (let i = 0; i < 14; i++) {
                const angle = (i / 14) * Math.PI * 2 + Math.random() * 0.3;
                const speed = 3 + Math.random() * 4;
                if (sparks.length < 100) sparks.push({
                    x: e.clientX, y: e.clientY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1,
                    r, g, b,
                    size: 2.5 + Math.random() * 2.5,
                });
            }
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('click', onClick, { passive: true });

        let lastFrameTs = performance.now();
        const draw = (ts) => {
            lastFrameTs = ts ?? performance.now();
            if (pausedRef.current) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                raf = requestAnimationFrame(draw);
                return;
            }

            // Resume from pause: discard stale cursor position so it doesn't
            // appear frozen at wherever the mouse was before the iframe opened.
            if (resetRef.current) {
                mx = -600; my = -600;
                hasMoved = false;
                for (let i = 0; i < TRAIL; i++) { pts[i].x = -600; pts[i].y = -600; }
                resetRef.current = false;
            }

            // Smooth trailing chain
            pts[0].x += (mx - pts[0].x) * 0.28;
            pts[0].y += (my - pts[0].y) * 0.28;
            for (let i = 1; i < TRAIL; i++) {
                const f = Math.max(0.05, 0.18 - i * 0.004);
                pts[i].x += (pts[i-1].x - pts[i].x) * f;
                pts[i].y += (pts[i-1].y - pts[i].y) * f;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (hasMoved) {
                // ── Glow trail ──
                for (let i = TRAIL - 1; i >= 1; i--) {
                    const t     = 1 - i / TRAIL;
                    const alpha = t * 0.55 * t;
                    const size  = 11 * t * t;
                    if (size < 0.5) continue;

                    // Soft outer glow
                    const glow = ctx.createRadialGradient(pts[i].x, pts[i].y, 0, pts[i].x, pts[i].y, size * 2.8);
                    glow.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.55})`);
                    glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
                    ctx.beginPath();
                    ctx.arc(pts[i].x, pts[i].y, size * 2.8, 0, Math.PI * 2);
                    ctx.fillStyle = glow;
                    ctx.fill();

                    // Bright inner core (front 40% of trail)
                    if (i < TRAIL * 0.4) {
                        ctx.beginPath();
                        ctx.arc(pts[i].x, pts[i].y, size * 0.6, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, alpha * 2.5)})`;
                        ctx.fill();
                    }
                }

                // ── Custom cursor dot ──
                // Outer ring
                ctx.beginPath();
                ctx.arc(mx, my, 10, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${r},${g},${b},0.5)`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
                // Inner fill
                ctx.beginPath();
                ctx.arc(mx, my, 3.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r},${g},${b},0.9)`;
                ctx.fill();
                // Outer glow ring
                const cursorGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 20);
                cursorGlow.addColorStop(0, `rgba(${r},${g},${b},0.15)`);
                cursorGlow.addColorStop(1, `rgba(${r},${g},${b},0)`);
                ctx.beginPath();
                ctx.arc(mx, my, 20, 0, Math.PI * 2);
                ctx.fillStyle = cursorGlow;
                ctx.fill();
            }

            // ── Click sparks ──
            sparks = sparks.filter(s => s.life > 0.01);
            for (const s of sparks) {
                s.x  += s.vx;
                s.y  += s.vy;
                s.vy += 0.09;
                s.vx *= 0.94;
                s.vy *= 0.94;
                s.life -= 0.04;

                const sa = Math.max(0, s.life * 0.9);
                const ss = s.size * s.life;

                const sg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, ss * 3.5);
                sg.addColorStop(0, `rgba(${s.r},${s.g},${s.b},${sa * 0.8})`);
                sg.addColorStop(1, `rgba(${s.r},${s.g},${s.b},0)`);
                ctx.beginPath();
                ctx.arc(s.x, s.y, ss * 3.5, 0, Math.PI * 2);
                ctx.fillStyle = sg;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(s.x, s.y, ss, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${sa})`;
                ctx.fill();
            }

            raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);

        const onVisibility = () => {
            if (document.hidden) {
                cancelAnimationFrame(raf);
                raf = null;
            } else {
                // Always cancel stale handle and get a fresh one — "else if (!raf)"
                // misses the case where raf holds an already-fired ID that isn't null.
                cancelAnimationFrame(raf);
                raf = requestAnimationFrame(draw);
            }
        };
        document.addEventListener('visibilitychange', onVisibility);

        // Watchdog: if no frame in 800ms and tab is visible, the loop silently
        // died (HMR, visibilitychange race, etc.). Restart unconditionally.
        const watchdog = setInterval(() => {
            if (!document.hidden && performance.now() - lastFrameTs > 800) {
                cancelAnimationFrame(raf);
                raf = requestAnimationFrame(draw);
            }
        }, 800);

        return () => {
            cancelAnimationFrame(raf);
            clearInterval(watchdog);
            document.removeEventListener('visibilitychange', onVisibility);
            observer.disconnect();
            ro.disconnect();
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('click', onClick);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }}
            aria-hidden="true"
        />
    );
};

export default CursorTrail;
