import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit } from 'lucide-react';

const ActivityLog = () => {
  const activities = [
    {
      date: 'OCT 2026',
      title: 'Updating soon',
      desc: '',
      image: null
    },
    {
      date: 'AUG 2026',
      title: 'Updating soon',
      desc: '',
      image: null
    },
    {
      date: 'MAY 2026',
      title: 'Updating soon',
      desc: '',
      image: null
    }
  ];

  return (
    <section id="activity" className="section container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section-title-wrapper"
      >
        <h2 className="section-title">
          <span style={{ color: 'var(--text-dim)', marginRight: '1rem' }}>#</span>activity-log
        </h2>
        <div className="section-line"></div>
      </motion.div>

      <div style={{ position: 'relative', paddingLeft: '2rem' }}>
        {/* Vertical Line */}
        <div style={{ position: 'absolute', left: '6px', top: 0, bottom: 0, width: '1px', background: 'var(--border-color)' }}></div>

        {activities.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ position: 'relative', marginBottom: '3rem' }}
          >
            {/* Timeline Dot */}
            <div style={{ position: 'absolute', left: '-2rem', top: '2px', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
              <GitCommit size={14} />
            </div>

            <div className="font-mono" style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
              [{item.date}]
            </div>
            
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {item.title}
            </h3>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: item.image ? '1rem' : '0' }}>
              {item.desc}
            </p>

            {item.image && (
              <div style={{ 
                width: '100%', 
                maxWidth: '400px', 
                height: '200px', 
                borderRadius: '8px', 
                overflow: 'hidden', 
                border: '1px solid var(--border-color)',
                position: 'relative'
              }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(80%)', transition: 'filter 0.3s' }} onMouseOver={e => e.target.style.filter = 'grayscale(0%)'} onMouseOut={e => e.target.style.filter = 'grayscale(80%)'} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ActivityLog;
