import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section-title-wrapper"
      >
        <h2 className="section-title">
          <span style={{ color: 'var(--text-dim)', marginRight: '1rem' }}>#</span>about-me
        </h2>
        <div className="section-line"></div>
      </motion.div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ 
            background: 'var(--bg-card)', 
            border: '1px solid var(--border-color)', 
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative subtle grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '15px 15px', pointerEvents: 'none' }}></div>
          
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8 }}>
            <p>
              I'm <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Mayank Kotuli</span>, a software developer focused on building modern web applications and exploring the intersection of AI and cybersecurity.
            </p>
            <p>
              I enjoy turning ideas into real products, experimenting with new technologies, and solving problems through code. I have experience with web development and freelancing, while currently strengthening my Data Structures & Algorithms skills and expanding into AI, LLMs and advanced software engineering.
            </p>
            <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>
              &gt; My long-term direction is to build intelligent, secure and scalable software.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
