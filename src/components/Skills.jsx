import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'PROGRAMMING',
      skills: ['C++', 'Python', 'JavaScript', 'Dart']
    },
    {
      title: 'WEB DEVELOPMENT',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js', 'Node.js', 'FastAPI', 'REST APIs']
    },
    {
      title: 'DATABASE & TOOLS',
      skills: ['MongoDB', 'MySQL', 'Git', 'GitHub', 'Docker']
    },
    {
      title: 'ARTIFICIAL INTELLIGENCE',
      skills: ['Generative AI', 'LLM Integration', 'AI APIs', 'OCR', 'AI-powered Applications', 'Prompt Engineering', 'Claude', 'Google Gemini', 'OpenAI']
    },
    {
      title: 'CYBERSECURITY (Intermediate)',
      skills: ['Cybersecurity Fundamentals', 'Web Security', 'OWASP Concepts', 'Network Security', 'Vulnerability Analysis']
    },
    {
      title: 'CURRENTLY LEARNING',
      skills: ['Data Structures & Algorithms', 'Advanced AI / LLM Development', 'Software Engineering', 'System Design', 'Advanced Cybersecurity']
    }
  ];

  return (
    <section id="skills" className="section container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section-title-wrapper"
      >
        <h2 className="section-title">
          <span style={{ color: 'var(--text-dim)', marginRight: '1rem' }}>#</span>skills
        </h2>
        <div className="section-line"></div>
      </motion.div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        {skillCategories.map((cat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ 
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid var(--border-color)',
              padding: '2rem',
              borderRadius: '12px'
            }}
          >
            <h3 className="font-mono" style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
              &gt; {cat.title}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              {cat.skills.map((skill, j) => (
                <span 
                  key={j} 
                  className="font-sans"
                  style={{ 
                    fontSize: '0.85rem', 
                    padding: '0.5rem 1rem', 
                    background: 'var(--bg-color)', 
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                    borderRadius: '4px'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
