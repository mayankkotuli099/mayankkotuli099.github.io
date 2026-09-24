import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import ActivityLog from './components/ActivityLog';
import Contact from './components/Contact';
import AgentChat from './components/AgentChat';
import CustomCursor from './components/CustomCursor';
import SystemInit from './components/SystemInit';
import CommandPalette from './components/CommandPalette';
import CyberBackground from './components/CyberBackground';

function App() {
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    // Console Easter Egg
    console.log(
      "%c╔══════════════════════════════════╗\n║ MAYANK KOTULI // DEVELOPER       ║\n║ SYSTEM ONLINE                    ║\n║                                  ║\n║ Looking under the hood? 👀       ║\n╚══════════════════════════════════╝",
      "color: #00d9ff; font-family: monospace; font-size: 14px;"
    );

    // Keyboard sequence Easter Egg (1337)
    let keys = '';
    const secretCode = '1337';
    
    const handleKeyDown = (e) => {
      keys += e.key;
      if (keys.length > 4) {
        keys = keys.substring(1, 5);
      }
      if (keys === secretCode) {
        alert("GOD MODE ACTIVATED 🚀");
        setDevMode(true);
        document.body.style.boxShadow = "inset 0 0 20px var(--accent-cyan)";
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <SystemInit />
      <CustomCursor />
      <CommandPalette onDevMode={() => setDevMode(true)} />

      <CyberBackground />
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <ActivityLog />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <AgentChat />

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '2rem 0', display: 'flex', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        <div className="container footer-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
           <div className="font-mono" style={{ fontSize: '0.85rem' }}>
             © {new Date().getFullYear()} Mayank Kotuli. Software Developer • AI Enthusiast • Cybersecurity Explorer
             <br />
             <span style={{ color: 'var(--text-dim)' }}>Delhi NCR, India | mayankkotuli099@gmail.com</span>
           </div>
           <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }} className="font-mono footer-socials">
              <a href="https://github.com/mayankkotuli099" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/mayank-kotuli-445891363/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/mayank_kotuli.tech" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://x.com/mayank099" target="_blank" rel="noreferrer">X</a>
           </div>
        </div>
      </footer>
    </>
  );
}

export default App;
