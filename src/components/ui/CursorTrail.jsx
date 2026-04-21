import { useEffect, useRef } from 'react';

const TRAIL = 28;

const parseHex = (hex) => {
    const h = hex.trim().replace('#', '');
    if (h.length === 6)
        return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
    return [34, 211, 238];
};

const CursorTrail = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(hover: none)').matches) return;

        const canvas = canvasRef.current;
        const ctx    = canvas.getContext('2d');
        let raf;

        const pts    = Array.from({ length: TRAIL }, () => ({ x: -600, y: -600 }));
        let mx = -600, my = -600, hovering = false;
        let sparks = [];   // click burst particles
        let ringScale = 1; // animated ring scale

        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener('resize', resize, { passive: true });

        const onMove  = (e) => { mx = e.clientX; my = e.clientY; };
        const onOver  = (e) => {
            hovering = !!e.target?.closest('a, button, [role="button"], input, label, select, textarea');
        };
        const onClick = (e) => {
            const raw = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
            const [r,g,b] = raw.startsWith('#') ? parseHex(raw) : [34,211,238];
            for (let i = 0; i < 10; i++) {
                const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.3;
                const speed = 2.5 + Math.random() * 3.5;
                sparks.push({
                    x: e.clientX, y: e.clientY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1,
                    r, g, b,
                    size: 2 + Math.random() * 2,
                });
            }
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        document.addEventListener('mouseover', onOver, { passive: true });
        window.addEventListener('click', onClick, { passive: true });

        const draw = () => {
            // Chase chain with spring-like follow
            pts[0].x += (mx - pts[0].x) * 0.26;
            pts[0].y += (my - pts[0].y) * 0.26;
            for (let i = 1; i < TRAIL; i++) {
                const f = Math.max(0.06, 0.2 - i * 0.005);
                pts[i].x += (pts[i-1].x - pts[i].x) * f;
                pts[i].y += (pts[i-1].y - pts[i].y) * f;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const raw = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
            const [r,g,b] = raw.startsWith('#') ? parseHex(raw) : [34,211,238];

            // ── Draw comet trail ──
            for (let i = TRAIL - 1; i >= 1; i--) {
                const t     = 1 - i / TRAIL;           // 0 at tail → 1 at head
                const alpha = t * (hovering ? 0.62 : 0.42) * t; // quadratic fade
                const size  = (hovering ? 14 : 9) * t * t;

                if (size < 0.4) continue;

                // Outer soft glow
                const glow = ctx.createRadialGradient(pts[i].x, pts[i].y, 0, pts[i].x, pts[i].y, size * 2.5);
                glow.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.6})`);
                glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
                ctx.beginPath();
                ctx.arc(pts[i].x, pts[i].y, size * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = glow;
                ctx.fill();

                // Inner bright core
                if (i < TRAIL * 0.4) {
                    ctx.beginPath();
                    ctx.arc(pts[i].x, pts[i].y, size * 0.55, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, alpha * 2.2)})`;
                    ctx.fill();
                }
            }

            // ── Hover ring ──
            ringScale += (hovering ? 1.0 : 0.0 - ringScale) * 0.15;
            if (hovering || ringScale > 0.02) {
                const rs  = 20 + 4 * ringScale;
                const ra  = Math.max(0, ringScale) * 0.75;
                // Outer ring
                ctx.beginPath();
                ctx.arc(pts[0].x, pts[0].y, rs, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${r},${g},${b},${ra * 0.5})`;
                ctx.lineWidth   = 6;
                ctx.stroke();
                // Inner sharp ring
                ctx.beginPath();
                ctx.arc(pts[0].x, pts[0].y, rs, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${r},${g},${b},${ra})`;
                ctx.lineWidth   = 1.5;
                ctx.stroke();
            }

            // ── Click sparks ──
            sparks = sparks.filter(s => s.life > 0.01);
            for (const s of sparks) {
                s.x  += s.vx;
                s.y  += s.vy;
                s.vy += 0.08;      // subtle gravity
                s.vx *= 0.95;
                s.vy *= 0.95;
                s.life -= 0.045;

                const sa = Math.max(0, s.life * 0.9);
                const ss = s.size * s.life;

                // Spark glow
                const sg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, ss * 3);
                sg.addColorStop(0, `rgba(${s.r},${s.g},${s.b},${sa * 0.7})`);
                sg.addColorStop(1, `rgba(${s.r},${s.g},${s.b},0)`);
                ctx.beginPath();
                ctx.arc(s.x, s.y, ss * 3, 0, Math.PI * 2);
                ctx.fillStyle = sg;
                ctx.fill();

                // Spark core
                ctx.beginPath();
                ctx.arc(s.x, s.y, ss, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${sa * 0.9})`;
                ctx.fill();
            }

            raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
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
