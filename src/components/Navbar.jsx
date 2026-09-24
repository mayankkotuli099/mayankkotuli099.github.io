import React, { useState, useEffect } from 'react';
import { Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  
  const statuses = [
    'SYSTEM ONLINE',
    'BUILD MODE',
    'CODING',
    'DEPLOYING',
    'SYSTEM ONLINE'
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const triggerCommandPalette = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 50,
      background: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
      transition: 'all 0.3s ease'
    }}>
      <div className="container nav-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.2rem 2rem'
      }}>
        {/* Left Side: Brand & System Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="#top" className="font-mono" style={{ fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
            <span className="animate-blink" style={{ width: '8px', height: '14px', background: 'var(--accent-cyan)', display: 'inline-block' }}></span>
            system.init()
          </a>

          {/* System Status Indicator */}
          <div className="font-mono" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', color: 'var(--text-dim)' }}>
            <span style={{ color: 'var(--accent-cyan)' }}>●</span>
            <div style={{ position: 'relative', height: '14px', width: '90px', overflow: 'hidden' }}>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={statusIndex}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ position: 'absolute' }}
                >
                  {statuses[statusIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Side: Nav & Command Trigger */}
        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <nav style={{ display: 'flex', gap: '2.5rem', fontSize: '0.85rem' }} className="font-mono nav-links">
            {['home', 'projects', 'skills', 'contact'].map(link => (
              <a 
                key={link} 
                href={`#${link}`} 
                style={{ color: 'var(--text-secondary)' }}
                onMouseOver={e => e.target.style.color = 'var(--text-primary)'}
                onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}
              >
                <span style={{ color: 'var(--border-hover)', marginRight: '4px' }}>//</span>
                {link}
              </a>
            ))}
          </nav>

          <button 
            onClick={triggerCommandPalette}
            className="font-mono"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-color)',
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              color: 'var(--text-secondary)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <Command size={14} /> K
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
