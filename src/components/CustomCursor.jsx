import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile to disable custom cursor
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
      setIsMobile(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: `1px solid var(${isHovering ? '--accent-cyan' : '--text-dim'})`,
          transform: `translate(${position.x - 10}px, ${position.y - 10}px) scale(${isHovering ? 1.5 : 1})`,
          transition: 'transform 0.15s ease-out, border-color 0.2s',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,217,255,0.03) 0%, transparent 70%)',
          transform: `translate(${position.x - 200}px, ${position.y - 200}px)`,
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
    </>
  );
};

export default CustomCursor;
