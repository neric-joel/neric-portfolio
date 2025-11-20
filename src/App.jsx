import React, { useState } from 'react';
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

  const toggleResume = () => {
    setShowResume(!showResume);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-electric-blue selection:text-black font-sans">
      <Sidebar toggleResume={toggleResume} showResume={showResume} />

      <div className="md:pl-24 transition-all duration-300">
        {showResume ? (
          <Resume />
        ) : (
          <main className="max-w-7xl mx-auto">
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Achievements />
            <Publications />
            <Contact />
          </main>
        )}

        {!showResume && (
          <footer className="py-8 text-center text-gray-800 text-xs">
            <p>© {new Date().getFullYear()} Neric Joel.</p>
          </footer>
        )}
      </div>

      <ChatMail />
    </div>
  );
}

export default App;
