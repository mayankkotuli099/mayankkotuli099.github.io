import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AgentChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'sys', text: 'Initializing SYSTEM_AGENT v2.0...' },
    { type: 'agent', text: 'Connection established. How can I assist you in navigating this portfolio?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const predefinedQuestions = [
    "What is your tech stack?",
    "Are you available for work?",
    "Tell me a joke."
  ];

  const handleQuestionClick = (question) => {
    setMessages(prev => [...prev, { type: 'user', text: question }]);
    setIsTyping(true);
    
    setTimeout(() => {
      let response = '';
      if (question.includes("stack")) {
        response = "I primarily build with React, Next.js, Node.js, and Python. I love clean architecture and scalable systems.";
      } else if (question.includes("available")) {
        response = "Yes, currently accepting freelance projects for Q4. You can use the contact form below or email me directly.";
      } else {
        response = "Why do programmers prefer dark mode? Because light attracts bugs.";
      }
      
      setMessages(prev => [...prev, { type: 'agent', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--text-primary)',
          color: 'var(--bg-color)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          zIndex: 90
        }}
      >
        <Terminal size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            style={{
              position: 'fixed',
              bottom: '6rem',
              right: '2rem',
              width: '350px',
              height: '450px',
              background: 'rgba(10, 10, 10, 0.8)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 100,
              boxShadow: '0 10px 40px rgba(0,0,0,0.6)'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }} className="font-mono">
                <span className="animate-blink" style={{ width: '8px', height: '8px', background: 'var(--accent-cyan)', borderRadius: '50%' }}></span>
                ~/ask-agent.sh
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} className="font-mono">
              {messages.map((m, i) => (
                <div key={i} style={{ 
                  alignSelf: m.type === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  fontSize: '0.8rem'
                }}>
                  {m.type === 'sys' && <span style={{ color: 'var(--text-dim)' }}>{m.text}</span>}
                  {m.type === 'user' && (
                    <div style={{ background: 'var(--border-color)', padding: '0.5rem 0.8rem', borderRadius: '8px 8px 0 8px', color: 'var(--text-primary)' }}>
                      {m.text}
                    </div>
                  )}
                  {m.type === 'agent' && (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--accent-cyan)' }}>&gt;</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{m.text}</span>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--accent-cyan)' }}>&gt;</span>
                  <span className="animate-blink" style={{ color: 'var(--text-dim)' }}>typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area (Buttons instead of text input for a cleaner UX) */}
            <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>SELECT_PROMPT:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {predefinedQuestions.map((q, i) => (
                  <button 
                    key={i}
                    onClick={() => handleQuestionClick(q)}
                    disabled={isTyping}
                    className="font-mono"
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)',
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.75rem',
                      borderRadius: '4px',
                      cursor: isTyping ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={e => { if(!isTyping) { e.target.style.borderColor = 'var(--text-primary)'; e.target.style.color = 'var(--text-primary)'; } }}
                    onMouseOut={e => { if(!isTyping) { e.target.style.borderColor = 'var(--border-color)'; e.target.style.color = 'var(--text-secondary)'; } }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AgentChat;
