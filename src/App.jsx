import React, { useState, useEffect } from 'react';
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
import Lenis from 'lenis';

function App() {
  const [showResume, setShowResume] = useState(false);

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

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleResume = () => {
    setShowResume(!showResume);
  };

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] selection:bg-[var(--accent-color)] selection:text-black transition-colors duration-700">
      <TryMe />
      <Sidebar toggleResume={toggleResume} showResume={showResume} />
      {showResume ? (
        <Resume onClose={toggleResume} />
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
    </div>
  );
}

export default App;
