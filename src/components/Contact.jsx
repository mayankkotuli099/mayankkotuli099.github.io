import React, { useState } from 'react';
import { Mail, Send, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('transmitting...');
    setTimeout(() => {
      setStatus('message_delivered');
      setMsg('');
      setTimeout(() => setStatus(''), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="section container" style={{ borderBottom: 'none', paddingBottom: '8rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section-title-wrapper"
      >
        <h2 className="section-title">
          <span style={{ color: 'var(--text-dim)', marginRight: '1rem' }}>#</span>contact-me
        </h2>
        <div className="section-line"></div>
      </motion.div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '4rem' }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: 1.8 }}>
            If you have a request, question, or just want to say hi, don't hesitate to contact me. I'll try my best to get back to you!
          </p>
          
          <div style={{ 
            border: '1px solid var(--border-color)', 
            padding: '1.5rem', 
            background: 'var(--bg-card)', 
            display: 'inline-flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
             <span className="font-mono" style={{ color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Message me here</span>
             <a href="mailto:mayankkotuli099@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <Mail size={16} /> mayankkotuli099@gmail.com
             </a>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <MapPin size={16} /> Delhi NCR, India
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                <Briefcase size={16} /> Freelance Projects — Currently Unavailable
             </div>
          </div>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--bg-card)', padding: '2rem', border: '1px solid var(--border-color)' }}
        >
          <div>
            <label className="font-mono" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>&gt; IDENTIFIER (NAME)</label>
            <input 
              type="text" 
              required
              style={{ width: '100%', padding: '0.8rem 1rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', outline: 'none', fontSize: '0.9rem' }}
            />
          </div>
          <div>
            <label className="font-mono" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>&gt; RETURN_ADDRESS (EMAIL)</label>
            <input 
              type="email" 
              required
              style={{ width: '100%', padding: '0.8rem 1rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', outline: 'none', fontSize: '0.9rem' }}
            />
          </div>
          <div>
            <label className="font-mono" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>&gt; PAYLOAD (MESSAGE)</label>
            <textarea 
              required
              value={msg}
              onChange={e => setMsg(e.target.value)}
              style={{ width: '100%', padding: '1rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', minHeight: '120px', resize: 'vertical', outline: 'none', fontSize: '0.9rem' }}
            ></textarea>
          </div>
          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
            {status || <><Send size={16} /> Send Message</>}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
