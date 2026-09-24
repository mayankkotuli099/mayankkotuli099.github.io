import React, { useState } from 'react';
import { ExternalLink, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: 'ABES Autonomy',
      desc: 'A student-focused academic resource platform for ABES Engineering College, designed to organize notes, PDFs, previous-year papers and academic resources in one place.',
      tech: ['React', 'Next.js', 'JavaScript', 'Node.js', 'MongoDB', 'Git', 'Vercel', 'Render'],
      year: '2026',
      type: 'WEB PLATFORM',
      live: 'https://abes.work',
      source: 'PRIVATE',
      image: '/abes.png'
    },
    {
      title: 'FormMitra AI',
      desc: 'An AI-powered form-filling system that combines OCR, voice interaction and AI to make digital form completion faster and more accessible.',
      tech: ['Next.js', 'React', 'FastAPI', 'Python', 'OCR', 'AI / LLM APIs', 'PDF Processing'],
      year: '2026',
      type: 'AI APPLICATION',
      live: 'https://form-mitra-ai-nu.vercel.app/',
      source: 'https://github.com/mayankkotuli099/FormMitra-AI.git',
      image: '/formmitra.png'
    },
    {
      title: 'CrimeLens',
      desc: 'An AI-powered criminal network analysis system developed for Smart India Hackathon 2026, focused on analyzing relationships and connections within complex criminal networks.',
      tech: ['AI', 'Python', 'Data Analysis', 'Network Analysis', 'Machine Learning'],
      year: '2026',
      type: 'AI SYSTEM',
      live: 'COMING SOON',
      source: 'https://github.com/mayankkotuli099/Crime-Lens.git',
      image: '/crimelens.png'
    },
    {
      title: 'Intervista',
      desc: 'An AI-powered interview preparation platform designed to help users practice interviews, improve their answers, and prepare more effectively for technical and professional interviews.',
      tech: [],
      year: '2026',
      type: 'AI PLATFORM',
      live: null,
      source: null,
      image: '/intervista.png'
    }
  ];

  return (
    <section id="projects" className="section container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section-title-wrapper"
      >
        <h2 className="section-title">
          <span style={{ color: 'var(--text-dim)', marginRight: '1rem' }}>#</span>projects
        </h2>
        <div className="section-line"></div>
      </motion.div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2rem' }}>
        {projects.map((p, i) => (
          <motion.article 
            key={i} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="structured-card" 
            style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Image/Visual Area */}
            <div style={{ height: '180px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               {p.image ? (
                 <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
               ) : (
                 <>
                   <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
                   <Code size={48} color="var(--border-color)" style={{ zIndex: 1 }} />
                 </>
               )}
               
               {/* Hover Technical Info Overlay */}
               <AnimatePresence>
                 {hoveredIndex === i && (
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 20 }}
                     transition={{ duration: 0.2 }}
                     style={{
                       position: 'absolute',
                       inset: 0,
                       background: 'rgba(5, 5, 5, 0.85)',
                       backdropFilter: 'blur(4px)',
                       zIndex: 2,
                       display: 'flex',
                       flexDirection: 'column',
                       justifyContent: 'center',
                       padding: '1.5rem'
                     }}
                     className="font-mono"
                   >
                     <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
                       &gt; INSPECTING_PROJECT
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
                       <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '1rem' }}>
                         <span style={{ color: 'var(--text-secondary)' }}>STATUS</span>
                         <span style={{ color: p.live === 'COMING SOON' ? 'var(--accent-purple)' : p.live ? 'var(--accent-cyan)' : 'var(--text-dim)' }}>
                           ● {p.live === 'COMING SOON' ? 'DEVELOPMENT' : p.live ? 'ONLINE' : 'ARCHIVED'}
                         </span>
                       </div>
                       <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '1rem' }}>
                         <span style={{ color: 'var(--text-secondary)' }}>STACK</span>
                         <span style={{ color: 'var(--text-primary)' }}>{p.tech.slice(0, 4).join(' / ')}{p.tech.length > 4 ? ' / ...' : ''}</span>
                       </div>
                       <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '1rem' }}>
                         <span style={{ color: 'var(--text-secondary)' }}>TYPE</span>
                         <span style={{ color: 'var(--text-primary)' }}>{p.type}</span>
                       </div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }} className="font-mono">
                <span>[0{i + 1}]</span>
                <span>{p.year}</span>
              </div>
              
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{p.title}</h3>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>
                {p.desc}
              </p>
              
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {p.tech.map(t => (
                  <span key={t} className="tech-badge">
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                {p.live && p.live !== 'COMING SOON' ? (
                  <a href={p.live} target="_blank" rel="noreferrer" className="font-mono" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                    Live <ExternalLink size={14} />
                  </a>
                ) : p.live === 'COMING SOON' ? (
                  <span className="font-mono" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-dim)', cursor: 'not-allowed' }}>
                    Live Demo — Coming Soon
                  </span>
                ) : null}

                {p.source && p.source !== 'PRIVATE' ? (
                  <a href={p.source} target="_blank" rel="noreferrer" className="font-mono" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Source <Code size={14} />
                  </a>
                ) : p.source === 'PRIVATE' ? (
                  <span className="font-mono" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    Private Repository <Code size={14} />
                  </span>
                ) : null}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
