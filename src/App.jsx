import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Publications from './components/Publications';
import Contact from './components/Contact';
import Resume from './components/Resume';
import ChatMail from './components/ChatMail';

function App() {
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    // Lenis virtualizes wheel scrolling through requestAnimationFrame; skip it
    // when motion is reduced or the document is hidden (background tabs and
    // embedded previews suspend rAF, which would leave scrolling dead).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (document.visibilityState !== 'visible') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });
    window._lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); window._lenis = null; };
  }, []);

  return (
    <div className="min-h-screen text-text">
      <Sidebar toggleResume={() => setShowResume(v => !v)} showResume={showResume} />

      {showResume ? (
        <Resume onClose={() => setShowResume(false)} />
      ) : (
        <>
          <main className="md:pl-40">
            <Hero toggleResume={() => setShowResume(v => !v)} />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Achievements />
            <Publications />
            <Contact />
          </main>
          <ChatMail />
        </>
      )}
    </div>
  );
}

export default App;
