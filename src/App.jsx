import React, { useState, useEffect, useCallback } from 'react';
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
import TryMe from './components/TryMe';
import IntroScreen from './components/IntroScreen';
import LofiPlayer from './components/ui/LofiPlayer';
import CursorTrail from './components/ui/CursorTrail';

function App() {
  const [showResume, setShowResume] = useState(false);

  // Only show intro once per session
  const [introVisible, setIntroVisible] = useState(
    () => sessionStorage.getItem('nj-intro') !== 'done'
  );

  const handleIntroComplete = useCallback(() => {
    setIntroVisible(false);
    sessionStorage.setItem('nj-intro', 'done');
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div
      className="min-h-screen transition-colors duration-700"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      {/* Cursor trail — hidden on touch devices */}
      <CursorTrail />

      {/* Intro overlay — only shown once per session */}
      <IntroScreen visible={introVisible} onComplete={handleIntroComplete} />

      <TryMe />
      <Sidebar toggleResume={() => setShowResume(v => !v)} showResume={showResume} />

      {showResume ? (
        <Resume onClose={() => setShowResume(false)} />
      ) : (
        <>
          <main className="md:pl-24">
            <Hero />
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

      {/* Lofi music player — always visible */}
      <LofiPlayer />
    </div>
  );
}

export default App;
