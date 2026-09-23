import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Command, ArrowRight } from 'lucide-react';

const CommandPalette = ({ onDevMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('menu'); // 'menu' | 'terminal'
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    { type: 'sys', text: 'MAYANK@PORTFOLIO ~ %' },
    { type: 'sys', text: 'Type "help" for a list of commands.' }
  ]);
  const inputRef = useRef(null);
  const endOfTerminalRef = useRef(null);

  const commands = [
    { name: 'about', desc: 'Navigate to About section', action: () => scrollTo('home') },
    { name: 'projects', desc: 'Navigate to Projects', action: () => scrollTo('projects') },
    { name: 'skills', desc: 'Navigate to Skills', action: () => scrollTo('skills') },
    { name: 'contact', desc: 'Navigate to Contact', action: () => scrollTo('contact') },
    { name: 'github', desc: 'Open GitHub profile', action: () => window.open('https://github.com', '_blank') },
    { name: 'terminal', desc: 'Open developer terminal', action: () => setView('terminal') },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && view === 'terminal' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, view]);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newOutput = [...output, { type: 'user', text: `$ ${input.trim()}` }];

    // AI Knowledge Base
    if (cmd.includes('who is mayank')) {
      newOutput.push({ type: 'sys', text: 'Mayank Kotuli is a software developer focused on web development, artificial intelligence and cybersecurity. He builds real-world applications and is currently strengthening his DSA and software engineering skills.' });
    } else if (cmd.includes('what does mayank do')) {
      newOutput.push({ type: 'sys', text: 'Mayank builds modern web applications and experiments with AI-powered and security-focused software. He also has previous freelancing experience, although he is currently not available for freelance projects.' });
    } else if (cmd.includes('technologies') || cmd.includes('tech stack')) {
      newOutput.push({ type: 'sys', text: 'Mayank works with C++, Python, JavaScript, React, Next.js, Node.js, FastAPI, Flutter, MongoDB, MySQL, Git and GitHub. He also works with AI platforms and APIs including Claude, Gemini and OpenAI.' });
    } else if (cmd.includes('learning')) {
      newOutput.push({ type: 'sys', text: 'Mayank is currently focusing on Data Structures & Algorithms, advanced AI and LLM development, software engineering, system design and cybersecurity.' });
    } else if (cmd.includes('what are mayank') && cmd.includes('projects')) {
      newOutput.push({ type: 'sys', text: 'Some of Mayank’s projects include ABES Autonomy, FormMitra AI, CrimeLens and a Flutter Calculator application.' });
    } else if (cmd.includes('freelance')) {
      newOutput.push({ type: 'sys', text: 'Mayank has previous freelancing experience, but he is currently not available for freelance projects.' });
    } else if (cmd.includes('cybersecurity experience')) {
      newOutput.push({ type: 'sys', text: 'Mayank has an intermediate level of cybersecurity knowledge, with experience and learning across cybersecurity fundamentals, web security, OWASP concepts, network security and vulnerability analysis.' });
    } else if (cmd.includes('where is mayank based') || cmd.includes('location')) {
      newOutput.push({ type: 'sys', text: 'Delhi NCR, India.' });
    } 
    // Default Commands
    else {
      switch (cmd) {
        case 'help':
          newOutput.push({ type: 'sys', text: 'Available commands: help, about, projects, skills, github, contact, status, clear\nYou can also ask questions like "Who is Mayank?"' });
          break;
        case 'status':
          newOutput.push({ type: 'sys', text: 'SYSTEM: ONLINE\nMODE: DEVELOPMENT\nPROJECTS: ACTIVE' });
          break;
        case 'clear':
          setOutput([{ type: 'sys', text: 'MAYANK@PORTFOLIO ~ %' }]);
          setInput('');
          return;
        case 'about':
          scrollTo('home');
          newOutput.push({ type: 'sys', text: 'Navigating to About...' });
          break;
        case 'projects':
          scrollTo('projects');
          newOutput.push({ type: 'sys', text: 'Navigating to Projects...' });
          break;
        case 'skills':
          scrollTo('skills');
          newOutput.push({ type: 'sys', text: 'Navigating to Skills...' });
          break;
        case 'contact':
          scrollTo('contact');
          newOutput.push({ type: 'sys', text: 'Navigating to Contact...' });
          break;
        case 'github':
          window.open('https://github.com/mayankkotuli099', '_blank');
          newOutput.push({ type: 'sys', text: 'Opening GitHub...' });
          break;
        case 'sudo access':
          newOutput.push({ type: 'sys', text: 'AUTHENTICATING...\n████████████████████ 100%\nACCESS GRANTED\nWELCOME, MAYANK.' });
          if (onDevMode) onDevMode();
          break;
        default:
          newOutput.push({ type: 'sys', text: `Command not found: ${cmd}` });
      }
    }

    setOutput(newOutput);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 5, 5, 0.7)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            style={{
              width: '100%',
              maxWidth: '600px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
              <Command size={16} color="var(--text-secondary)" style={{ marginRight: '0.75rem' }} />
              <input
                type="text"
                placeholder={view === 'menu' ? "Type a command or search..." : "Type a terminal command..."}
                style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }}
                className="font-mono"
                value={view === 'terminal' ? input : ''}
                onChange={(e) => setView('terminal') || setInput(e.target.value)}
                autoFocus
              />
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            {view === 'menu' ? (
              <div style={{ padding: '0.5rem', maxHeight: '400px', overflowY: 'auto' }}>
                <div style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', color: 'var(--text-dim)' }} className="font-mono">
                  SUGGESTIONS
                </div>
                {commands.map((cmd) => (
                  <button
                    key={cmd.name}
                    onClick={cmd.action}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      transition: 'background 0.2s',
                      textAlign: 'left'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {cmd.name === 'terminal' ? <TerminalIcon size={16} color="var(--accent-cyan)" /> : <ArrowRight size={16} />}
                      <span className="font-mono" style={{ fontSize: '0.9rem' }}>{cmd.name}</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{cmd.desc}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ height: '300px', display: 'flex', flexDirection: 'column', background: 'var(--bg-color)' }}>
                <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }} className="font-mono">
                  {output.map((line, i) => (
                    <div key={i} style={{ color: line.type === 'user' ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>
                      {line.text}
                    </div>
                  ))}
                  <div ref={endOfTerminalRef} />
                </div>
                <form onSubmit={handleTerminalSubmit} style={{ padding: '0.5rem 1rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="font-mono">
                  <span style={{ color: 'var(--accent-cyan)' }}>$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '0.85rem' }}
                  />
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
