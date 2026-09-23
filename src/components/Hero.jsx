import React, { useState, useEffect } from 'react';
import { ArrowRight, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const textToType = "Engineering the intersection of software, artificial intelligence, and cybersecurity.";
  const [typedText, setTypedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setTypedText(textToType.substring(0, i));
      i++;
      if (i > textToType.length) clearInterval(intervalId);
    }, 50);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
        
        {/* Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', border: '1px solid var(--border-color)', borderRadius: '20px', fontSize: '0.75rem', marginBottom: '2rem', background: 'rgba(255,255,255,0.02)', color: 'var(--text-dim)' }} className="font-mono">
            <span style={{ width: '6px', height: '6px', background: 'var(--text-dim)', borderRadius: '50%' }}></span>
            Freelance Projects — Currently Unavailable
          </div>

          <p className="font-mono" style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            Software Developer • AI Enthusiast • Cybersecurity Explorer
          </p>

          <h1 style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)', lineHeight: 1.05, marginBottom: '1.5rem', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
            Mayank<br/>
            <span className="text-gradient">Kotuli.</span>
          </h1>

          <p className="font-sans" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '3rem', minHeight: '60px', maxWidth: '400px', lineHeight: 1.7 }}>
            {typedText}<span className="animate-blink" style={{ color: 'var(--accent-cyan)' }}>|</span>
          </p>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#projects" className="btn-primary">
               View Work <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn-outline">
               <Code size={16} /> Contact Me
            </a>
          </div>
        </motion.div>

        {/* Right Side: Graphic/Avatar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
        >
          {/* Floating Badges */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="font-mono" style={{ position: 'absolute', top: '10%', left: '-10%', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', padding: '8px 16px', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--accent-cyan)', backdropFilter: 'blur(8px)', zIndex: 10 }}
          >
            AI · CYBERSECURITY
          </motion.div>
          
          <motion.div 
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="font-mono" style={{ position: 'absolute', bottom: '20%', right: '-10%', background: 'rgba(167, 139, 250, 0.05)', border: '1px solid rgba(167, 139, 250, 0.2)', padding: '8px 16px', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--accent-purple)', backdropFilter: 'blur(8px)', zIndex: 10 }}
          >
            SOFTWARE_DEVELOPER
          </motion.div>

          {/* Profile Box */}
          <div className="scanline-container" style={{ 
            width: '320px', 
            height: '400px', 
            border: '1px solid var(--border-color)', 
            borderRadius: '24px', 
            position: 'relative',
            background: 'var(--bg-card)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            overflow: 'hidden'
          }}>
             {/* Tech Grid Overlay over the image */}
             <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px', zIndex: 2, pointerEvents: 'none' }}></div>
             
             {/* The User's Image */}
             <img src="/profile.jpg" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%) contrast(1.1)', zIndex: 1, position: 'relative' }} onError={(e) => { e.target.style.display = 'none'; }} />
             
             {/* Fallback if image fails to load */}
             <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontStyle: 'italic', zIndex: 0, flexDirection: 'column', gap: '1rem' }}>
                <span className="font-mono text-gradient" style={{ fontSize: '4rem' }}>{'{ }'}</span>
                <span className="font-mono" style={{ fontSize: '0.8rem' }}>add profile.jpg to /public</span>
             </div>
             
             {/* Decorative corners */}
             <div style={{ position: 'absolute', top: 16, left: 16, width: 20, height: 20, borderTop: '2px solid var(--border-hover)', borderLeft: '2px solid var(--border-hover)', zIndex: 3 }}></div>
             <div style={{ position: 'absolute', bottom: 16, right: 16, width: 20, height: 20, borderBottom: '2px solid var(--border-hover)', borderRight: '2px solid var(--border-hover)', zIndex: 3 }}></div>
          </div>
        </motion.div>
      </div>

      {/* Quote Section directly below Hero like in the photo */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="container" style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center' }}
      >
        <div style={{ 
          border: '1px solid var(--border-color)', 
          padding: '2rem 3rem',
          position: 'relative',
          background: 'rgba(255,255,255,0.01)'
        }}>
          <div style={{ position: 'absolute', top: '-12px', left: '20px', background: 'var(--bg-color)', padding: '0 10px', fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--text-dim)' }}>"</div>
          <p className="font-mono" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', letterSpacing: '0.02em', textAlign: 'center' }}>
            Build. Break. Learn. Rebuild.
          </p>
          <div style={{ position: 'absolute', bottom: '-12px', right: '20px', background: 'var(--bg-color)', padding: '0 10px', fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--text-dim)' }}>"</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
