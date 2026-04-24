import { useEffect, useRef } from 'react';

// ── Color helpers ─────────────────────────────────────────────────────────────
const hexToRgb = (hex) => {
  const h = hex.trim().replace('#','');
  if (h.length !== 6) return [34,211,238];
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
};
const readColors = () => {
  const s = getComputedStyle(document.documentElement);
  const parse = (v) => { v=v.trim(); return v.startsWith('#') ? hexToRgb(v) : (v.match(/\d+/g)||[]).slice(0,3).map(Number); };
  return {
    accent:    parse(s.getPropertyValue('--accent-color')),
    secondary: parse(s.getPropertyValue('--accent-secondary')),
    bg:        parse(s.getPropertyValue('--bg-primary')),
  };
};

// ═══════════════════════════════════════════════════════════
// WORLD 1 — CYBER DARK (default blobs)
// ═══════════════════════════════════════════════════════════
// Default world: one soft radial accent glow — no particles, no animation
const initDefault = () => ({});
const drawDefault = (ctx, W, H, _s, _t, c) => {
  ctx.clearRect(0, 0, W, H);
  // Single subtle radial glow at top-center — restrained, non-distracting
  const gr = ctx.createRadialGradient(W * 0.5, 0, 0, W * 0.5, 0, H * 0.75);
  gr.addColorStop(0,   `rgba(${c.accent}, 0.07)`);
  gr.addColorStop(0.5, `rgba(${c.accent}, 0.02)`);
  gr.addColorStop(1,   `rgba(${c.accent}, 0)`);
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, W, H);
};

// ═══════════════════════════════════════════════════════════
// WORLD 2 — MATRIX (falling katakana code rain)
// ═══════════════════════════════════════════════════════════
const KANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF!@#$%';
const initMatrix = (W, H) => {
  const cw = 16, cols = Math.ceil(W/cw);
  return {
    cols: Array.from({length:cols}, (_,i) => ({
      x: i*cw+7,
      y: -(Math.random()*H*1.5),
      speed: 0.7 + Math.random()*1.8,
      chars: Array.from({length:35}, () => KANA[Math.floor(Math.random()*KANA.length)]),
      len: 10 + Math.floor(Math.random()*22),
    }))
  };
};
const drawMatrix = (ctx, W, H, s) => {
  ctx.fillStyle = 'rgba(0,4,0,0.88)';
  ctx.fillRect(0,0,W,H);
  ctx.font = '13px monospace';
  for (const col of s.cols) {
    col.y += col.speed;
    if (col.y > H + col.len*16) { col.y = -(col.len*16 + Math.random()*H*0.5); col.speed = 0.7+Math.random()*1.8; }
    if (Math.random() < 0.04) col.chars[Math.floor(Math.random()*col.chars.length)] = KANA[Math.floor(Math.random()*KANA.length)];
    for (let i=0; i<col.len; i++) {
      const cy = col.y - i*16;
      if (cy < -16 || cy > H) continue;
      const ratio = 1 - i/col.len;
      ctx.fillStyle = i===0
        ? `rgba(180,255,180,${Math.min(1,ratio+0.3)})`
        : `rgba(0,${Math.floor(80+160*ratio)},30,${ratio*0.85})`;
      ctx.fillText(col.chars[i%col.chars.length], col.x-6, cy);
    }
  }
};

// ═══════════════════════════════════════════════════════════
// WORLD 3 — POKÉMON (bouncing pokéballs + lightning sparks)
// ═══════════════════════════════════════════════════════════
const drawPokeball = (ctx, x, y, r, angle) => {
  ctx.save(); ctx.translate(x,y); ctx.rotate(angle);
  ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.clip();
  ctx.fillStyle='#cc1010'; ctx.fillRect(-r,-r,r*2,r);
  ctx.fillStyle='#f2f2f2'; ctx.fillRect(-r,0,r*2,r);
  ctx.strokeStyle='#111'; ctx.lineWidth=Math.max(1.5,r*0.08);
  ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-r,0); ctx.lineTo(r,0); ctx.stroke();
  ctx.beginPath(); ctx.arc(0,0,r*0.30,0,Math.PI*2); ctx.fillStyle='#111'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0,0,r*0.16,0,Math.PI*2); ctx.fillStyle='#f5f5f5'; ctx.fill();
  ctx.restore();
};
const initPokemon = (W, H) => ({
  balls: Array.from({length:8}, () => ({
    x: 80+Math.random()*(W-160), y: 80+Math.random()*(H-160),
    vx: (Math.random()-0.5)*2.8, vy: (Math.random()-0.5)*2.8,
    r: 18+Math.random()*22, angle: Math.random()*Math.PI*2,
    spin: (Math.random()-0.5)*0.05,
  })),
  sparks: [], sparkT: 0,
});
const drawPokemon = (ctx, W, H, s) => {
  ctx.clearRect(0,0,W,H);
  const aura = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*0.6);
  aura.addColorStop(0,'rgba(255,195,0,0.06)'); aura.addColorStop(1,'rgba(220,50,0,0)');
  ctx.fillStyle=aura; ctx.fillRect(0,0,W,H);
  for (const b of s.balls) {
    b.x+=b.vx; b.y+=b.vy; b.angle+=b.spin;
    if (b.x-b.r<0||b.x+b.r>W) { b.vx*=-1; b.x=Math.max(b.r,Math.min(W-b.r,b.x)); }
    if (b.y-b.r<0||b.y+b.r>H) { b.vy*=-1; b.y=Math.max(b.r,Math.min(H-b.r,b.y)); }
    const glow = ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r*2.2);
    glow.addColorStop(0,'rgba(255,195,0,0.12)'); glow.addColorStop(1,'rgba(255,80,0,0)');
    ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(b.x,b.y,b.r*2.2,0,Math.PI*2); ctx.fill();
    drawPokeball(ctx,b.x,b.y,b.r,b.angle);
  }
  s.sparkT++;
  if (s.sparkT>40) { s.sparkT=0; s.sparks.push({ x:60+Math.random()*(W-120), y:Math.random()*H*0.85, life:1, segs:4+Math.floor(Math.random()*3) }); }
  s.sparks = s.sparks.filter(sp=>sp.life>0.02);
  for (const sp of s.sparks) {
    sp.life-=0.035;
    ctx.strokeStyle=`rgba(255,220,0,${sp.life*0.9})`; ctx.lineWidth=1.8; ctx.beginPath();
    let sx=sp.x, sy=sp.y;
    for (let i=0;i<sp.segs;i++) { const nx=sx+(Math.random()-0.5)*36, ny=sy+12+Math.random()*20; ctx.moveTo(sx,sy); ctx.lineTo(nx,ny); sx=nx; sy=ny; }
    ctx.stroke();
  }
};

// ═══════════════════════════════════════════════════════════
// WORLD 4 — IRON MAN HUD (hex grid + arc reactor + scanner)
// ═══════════════════════════════════════════════════════════
const HEX_SIZE = 30;
const initIronMan = (W, H) => {
  const hw=HEX_SIZE*Math.sqrt(3), hh=HEX_SIZE*2;
  const hexes=[];
  for (let row=-1; row<H/(hh*0.75)+2; row++)
    for (let col=-1; col<W/hw+2; col++)
      hexes.push({ x:col*hw+(row%2===0?0:hw/2), y:row*hh*0.75, pulse:Math.random(), speed:0.003+Math.random()*0.009 });
  return { hexes, scanY:0, scanDir:1, arcT:0 };
};
const drawHexPath = (ctx,cx,cy) => {
  ctx.beginPath();
  for(let i=0;i<6;i++){const a=Math.PI/3*i-Math.PI/6; ctx.lineTo(cx+HEX_SIZE*Math.cos(a),cy+HEX_SIZE*Math.sin(a));}
  ctx.closePath();
};
const drawIronMan = (ctx, W, H, s, t, c) => {
  ctx.clearRect(0,0,W,H);
  const [r,g,b] = c.accent;
  for (const h of s.hexes) {
    h.pulse = (h.pulse+h.speed)%1;
    const glow = Math.sin(h.pulse*Math.PI*2)*0.5+0.5;
    drawHexPath(ctx,h.x,h.y);
    ctx.strokeStyle=`rgba(${r},${g},${b},${0.035+glow*0.10})`; ctx.lineWidth=0.7; ctx.stroke();
    if (glow>0.88) { ctx.fillStyle=`rgba(${r},${g},${b},0.04)`; ctx.fill(); }
  }
  s.scanY+=1.3*s.scanDir;
  if (s.scanY>H||s.scanY<0) s.scanDir*=-1;
  const sg=ctx.createLinearGradient(0,s.scanY-50,0,s.scanY+50);
  sg.addColorStop(0,`rgba(${r},${g},${b},0)`); sg.addColorStop(0.5,`rgba(${r},${g},${b},0.15)`); sg.addColorStop(1,`rgba(${r},${g},${b},0)`);
  ctx.fillStyle=sg; ctx.fillRect(0,s.scanY-50,W,100);
  s.arcT=(s.arcT+0.025)%(Math.PI*2);
  const pulse=Math.sin(s.arcT)*0.35+0.65;
  const cx=W/2, cy=H/2;
  [65,46,30,16].forEach((rad,i)=>{
    const alpha=(0.055-i*0.011)*pulse;
    const gr=ctx.createRadialGradient(cx,cy,0,cx,cy,rad*pulse);
    gr.addColorStop(0,`rgba(${r},${g},${b},${alpha*4})`); gr.addColorStop(1,`rgba(${r},${g},${b},0)`);
    ctx.beginPath(); ctx.arc(cx,cy,rad*pulse,0,Math.PI*2); ctx.fillStyle=gr; ctx.fill();
  });
  ctx.strokeStyle=`rgba(${r},${g},${b},0.09)`; ctx.lineWidth=0.6;
  [[0,0,1,1],[W,0,-1,1],[0,H,1,-1],[W,H,-1,-1]].forEach(([ox,oy,dx,dy])=>{
    ctx.beginPath(); ctx.moveTo(ox,oy+dy*25); ctx.lineTo(ox,oy+dy*90);
    ctx.moveTo(ox+dx*25,oy); ctx.lineTo(ox+dx*160,oy); ctx.stroke();
  });
};

// ═══════════════════════════════════════════════════════════
// WORLD 5 — SYNTHWAVE (retro grid + neon sun + stars)
// ═══════════════════════════════════════════════════════════
const initSynthwave = (W, H) => ({
  stars: Array.from({length:150}, ()=>({ x:Math.random()*W, y:Math.random()*H*0.50, r:Math.random()*1.5+0.3, tw:Math.random()*Math.PI*2, ts:0.018+Math.random()*0.04 })),
  gridOff: 0,
});
const drawSynthwave = (ctx, W, H, s) => {
  ctx.clearRect(0,0,W,H);
  const hz = H*0.52;
  const sky=ctx.createLinearGradient(0,0,0,hz);
  sky.addColorStop(0,'rgba(8,2,25,0)'); sky.addColorStop(1,'rgba(80,0,90,0.22)');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,hz);
  for (const st of s.stars) {
    st.tw=(st.tw+st.ts)%(Math.PI*2);
    ctx.beginPath(); ctx.arc(st.x,st.y,st.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,190,255,${0.3+Math.sin(st.tw)*0.45})`; ctx.fill();
  }
  const sunX=W/2, sunY=hz, sunR=Math.min(W,H)*0.145;
  ctx.save();
  ctx.beginPath(); ctx.arc(sunX,sunY,sunR,Math.PI,0); ctx.clip();
  const sg=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,sunR);
  sg.addColorStop(0,'rgba(255,160,0,0.95)'); sg.addColorStop(0.45,'rgba(255,45,130,0.85)'); sg.addColorStop(1,'rgba(130,0,210,0.55)');
  ctx.fillStyle=sg; ctx.beginPath(); ctx.arc(sunX,sunY,sunR,0,Math.PI*2); ctx.fill();
  const lspc=sunR*0.10;
  for (let ly=sunY-sunR; ly<sunY; ly+=lspc) { ctx.fillStyle='rgba(0,0,15,0.36)'; ctx.fillRect(sunX-sunR,ly,sunR*2,lspc*0.48); }
  ctx.restore();
  s.gridOff=(s.gridOff+1.4)%52;
  const flH=H-hz; ctx.lineWidth=0.75;
  for (let i=0;i<=13;i++) {
    const prog=Math.pow(i/13,1.85);
    const ly=hz+prog*flH+(s.gridOff/52*flH/13);
    if (ly>H+3) continue;
    ctx.strokeStyle=`rgba(255,35,200,${0.04+prog*0.24})`; ctx.beginPath(); ctx.moveTo(0,ly); ctx.lineTo(W,ly); ctx.stroke();
  }
  for (let i=0;i<=15;i++) {
    const fx=(i/15)*W;
    ctx.strokeStyle=`rgba(130,0,255,${i===7||i===8?0.30:0.09})`; ctx.beginPath(); ctx.moveTo(W/2,hz); ctx.lineTo(fx,H+10); ctx.stroke();
  }
  const fg=ctx.createLinearGradient(0,hz,0,H);
  fg.addColorStop(0,'rgba(170,0,200,0.08)'); fg.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=fg; ctx.fillRect(0,hz,W,flH);
};

// ═══════════════════════════════════════════════════════════
// WORLD 6 — SPIDER-MAN (animated web + silk connections)
// ═══════════════════════════════════════════════════════════
const initSpiderman = (W, H) => {
  const origins=[{x:0,y:0},{x:W,y:0},{x:0,y:H},{x:W,y:H},{x:W/2,y:0},{x:0,y:H/2},{x:W,y:H/2},{x:W/4,y:0},{x:W*3/4,y:0}];
  const strands=[];
  origins.forEach(o=>{
    const base=Math.atan2(H/2-o.y, W/2-o.x);
    const count=4+Math.floor(Math.random()*3);
    for(let i=0;i<count;i++) {
      strands.push({
        ox:o.x, oy:o.y, angle:base+(i-(count-1)/2)*0.30,
        len:90+Math.random()*Math.min(W,H)*0.40,
        drawn:0, drawSpeed:0.007+Math.random()*0.007,
        branches:[], branchDone:false,
      });
    }
  });
  return { strands, pulse:0 };
};
const drawSpiderman = (ctx, W, H, s, t, c) => {
  ctx.clearRect(0,0,W,H);
  const [r,g,b]=c.accent;
  s.pulse=(s.pulse+0.018)%(Math.PI*2);
  const bgGr=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.min(W,H)*0.6);
  bgGr.addColorStop(0,`rgba(${r},${g},${b},0.06)`); bgGr.addColorStop(1,`rgba(${r},${g},${b},0)`);
  ctx.fillStyle=bgGr; ctx.fillRect(0,0,W,H);
  const ends=[];
  for(const strand of s.strands){
    if(strand.drawn<1) strand.drawn=Math.min(1,strand.drawn+strand.drawSpeed);
    const ex=strand.ox+Math.cos(strand.angle)*strand.len*strand.drawn;
    const ey=strand.oy+Math.sin(strand.angle)*strand.len*strand.drawn;
    ctx.strokeStyle=`rgba(${r},${g},${b},0.14)`; ctx.lineWidth=0.85;
    ctx.beginPath(); ctx.moveTo(strand.ox,strand.oy); ctx.lineTo(ex,ey); ctx.stroke();
    if(strand.drawn===1&&!strand.branchDone){
      strand.branchDone=true;
      for(let bi=0;bi<3;bi++) strand.branches.push({angle:strand.angle+(Math.random()-0.5)*1.1,len:22+Math.random()*58,t:0});
    }
    for(const br of strand.branches){
      if(br.t<1)br.t=Math.min(1,br.t+0.011);
      const bx=ex+Math.cos(br.angle)*br.len*br.t, by=ey+Math.sin(br.angle)*br.len*br.t;
      ctx.strokeStyle=`rgba(${r},${g},${b},0.07)`; ctx.lineWidth=0.5;
      ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(bx,by); ctx.stroke();
    }
    if(strand.drawn>0.55) ends.push({x:ex,y:ey});
  }
  ctx.strokeStyle=`rgba(${r},${g},${b},0.06)`; ctx.lineWidth=0.4;
  for(let i=0;i<ends.length;i++)
    for(let j=i+1;j<ends.length;j++){
      const dx=ends[i].x-ends[j].x,dy=ends[i].y-ends[j].y;
      if(dx*dx+dy*dy<15000){ ctx.beginPath(); ctx.moveTo(ends[i].x,ends[i].y); ctx.lineTo(ends[j].x,ends[j].y); ctx.stroke(); }
    }
};

// ═══════════════════════════════════════════════════════════
// World registry
// ═══════════════════════════════════════════════════════════
const WORLDS = {
  default:   { init:initDefault,   draw:drawDefault   },
  matrix:    { init:initMatrix,    draw:drawMatrix    },
  pokemon:   { init:initPokemon,   draw:drawPokemon   },
  ironman:   { init:initIronMan,   draw:drawIronMan   },
  synthwave: { init:initSynthwave, draw:drawSynthwave },
  spiderman: { init:initSpiderman, draw:drawSpiderman },
};

// ═══════════════════════════════════════════════════════════
// Main component
// ═══════════════════════════════════════════════════════════
const WorldBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let worldKey = 'default';
    let state    = WORLDS.default.init(W, H);
    let colors   = readColors();
    let rafId;
    const startT = performance.now();

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      state = WORLDS[worldKey].init(W, H);
    };
    window.addEventListener('resize', resize, { passive:true });

    const onWorld = (e) => {
      worldKey = e.detail.world || 'default';
      colors   = readColors();
      state    = WORLDS[worldKey].init(W, H);
    };
    window.addEventListener('worldthemechange', onWorld);

    const mo = new MutationObserver(() => { colors = readColors(); });
    mo.observe(document.documentElement, { attributes:true, attributeFilter:['style'] });

    const animate = (now) => {
      const t = (now - startT) / 1000;
      WORLDS[worldKey].draw(ctx, W, H, state, t, colors);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onVis = () => { if (document.hidden) cancelAnimationFrame(rafId); else rafId = requestAnimationFrame(animate); };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('worldthemechange', onWorld);
      document.removeEventListener('visibilitychange', onVis);
      mo.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }}
      aria-hidden="true"
    />
  );
};

export default WorldBackground;
