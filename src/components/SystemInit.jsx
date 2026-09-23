import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SystemInit = () => {
  const [stage, setStage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const sequence = [
      { delay: 100, text: 'INITIALIZING...' },
      { delay: 300, text: 'LOADING PROJECTS...' },
      { delay: 500, text: 'LOADING SYSTEM...' },
      { delay: 800, text: 'SYSTEM READY.' }
    ];

    const timeouts = sequence.map((step, index) => {
      return setTimeout(() => {
        setStage(index + 1);
      }, step.delay);
    });

    const finishTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 1100);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(finishTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg-color)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '2rem',
            color: 'var(--text-primary)',
          }}
          className="font-mono"
        >
          <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            {stage > 0 && <div style={{ marginBottom: '0.5rem' }}>&gt; INITIALIZING...</div>}
            {stage > 1 && <div style={{ marginBottom: '0.5rem' }}>&gt; LOADING PROJECTS...</div>}
            {stage > 2 && <div style={{ marginBottom: '0.5rem' }}>&gt; LOADING SYSTEM...</div>}
            {stage > 3 && <div style={{ color: 'var(--accent-cyan)' }}>&gt; SYSTEM READY.</div>}
            {stage <= 3 && (
              <div className="animate-blink" style={{ display: 'inline-block', width: '10px', height: '18px', background: 'var(--text-primary)', marginTop: '0.5rem' }}></div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SystemInit;
