import { useEffect, useRef } from 'react';

// Canvas-based cursor trail — reads --accent-color every frame, no React re-renders
const TRAIL = 20;

const parseHex = (hex) => {
    const h = hex.trim().replace('#', '');
    if (h.length === 6) {
        return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
    }
    return [99, 102, 241]; // fallback indigo
};

const CursorTrail = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(hover: none)').matches) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let raf;
        const pts = Array.from({ length: TRAIL }, () => ({ x: -400, y: -400 }));
        let mx = -400, my = -400, hovering = false;

        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize, { passive: true });

        const onMove = (e) => { mx = e.clientX; my = e.clientY; };
        const onOver = (e) => {
            hovering = !!e.target?.closest('a, button, [role="button"], input, label, select, textarea');
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        document.addEventListener('mouseover', onOver, { passive: true });

        const draw = () => {
            // Chase chain
            pts[0].x += (mx - pts[0].x) * 0.28;
            pts[0].y += (my - pts[0].y) * 0.28;
            for (let i = 1; i < TRAIL; i++) {
                const f = Math.max(0.07, 0.22 - i * 0.007);
                pts[i].x += (pts[i-1].x - pts[i].x) * f;
                pts[i].y += (pts[i-1].y - pts[i].y) * f;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Read current accent color (updates on theme change)
            const raw = getComputedStyle(document.documentElement)
                .getPropertyValue('--accent-color').trim();
            const [r, g, b] = raw.startsWith('#') ? parseHex(raw) : [99,102,241];

            // Draw trail
            for (let i = TRAIL - 1; i >= 1; i--) {
                const t = 1 - i / TRAIL;
                const alpha = t * (hovering ? 0.55 : 0.38);
                const size  = (hovering ? 12 : 8) * t;
                if (size < 0.5) continue;

                const grd = ctx.createRadialGradient(pts[i].x, pts[i].y, 0, pts[i].x, pts[i].y, size * 2);
                grd.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
                grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
                ctx.beginPath();
                ctx.arc(pts[i].x, pts[i].y, size * 2, 0, Math.PI * 2);
                ctx.fillStyle = grd;
                ctx.fill();
            }

            // Lead dot
            const lead = hovering ? 18 : 7;
            ctx.beginPath();
            ctx.arc(pts[0].x, pts[0].y, lead, 0, Math.PI * 2);
            if (hovering) {
                ctx.strokeStyle = `rgba(${r},${g},${b},0.85)`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
                ctx.fillStyle = `rgba(${r},${g},${b},0.12)`;
            } else {
                ctx.fillStyle = `rgba(${r},${g},${b},0.85)`;
            }
            ctx.fill();

            raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
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
