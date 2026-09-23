import React, { useEffect, useRef } from 'react';

const CyberBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Opaque for performance if possible, but we need transparency.
    // Wait, the background should be transparent to let the CSS gradient show through, 
    // or we can draw the background on the canvas. Drawing on canvas is more performant.
    // Let's draw the background on the canvas.
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let animationFrameId;
    
    // Mouse state
    let mouse = { x: -1000, y: -1000 };
    let scrollY = window.scrollY;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initSystem();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // System Data
    const isMobile = width < 768;
    const NUM_NODES = isMobile ? 30 : 80;
    const MAX_DISTANCE = isMobile ? 120 : 180;
    
    let nodes = [];
    let telemetry = [];
    let signals = [];

    const TELEMETRY_STRINGS = [
      "01001101 01000001",
      "0x7F3A91",
      "AUTH_NODE_04",
      "PORT: 443",
      "TCP://NODE_07",
      "STATUS: 200",
      "ENCRYPTED",
      "SYS_CORE",
      "0xA91F",
      "PACKET_RECEIVED",
      "NODE_CONNECTED",
      "ACCESS_LOG",
      "API_GATEWAY",
      "HASH: 7A91F",
      "const system = initialize();",
      "await connect(node);",
      "if (status === 'online') ...",
      "GET /api/system"
    ];

    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.radius = Math.random() > 0.9 ? 2 : 1;
        this.baseAlpha = Math.random() * 0.4 + 0.1;
        this.alpha = this.baseAlpha;
        // Jhap-jhap flicker
        this.flickerTimer = Math.random() * 500;
        this.isFlickering = false;
      }

      update() {
        // Subtle drift
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < -200) this.y = height + 200; // Account for parallax
        if (this.y > height + 200) this.y = -200;

        // Mouse repulsion
        const dx = mouse.x - this.x;
        const dy = mouse.y - (this.y - scrollY * 0.2); // Adjust mouse y with parallax
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.x -= (dx / dist) * force * 0.5;
          this.y -= (dy / dist) * force * 0.5;
        }

        // Flicker logic
        this.flickerTimer--;
        if (this.flickerTimer <= 0) {
          this.isFlickering = !this.isFlickering;
          this.flickerTimer = this.isFlickering ? Math.random() * 20 + 5 : Math.random() * 300 + 100;
        }
        this.alpha = this.isFlickering ? Math.min(1, this.baseAlpha * 3) : this.baseAlpha;
      }

      draw(parallaxY) {
        ctx.beginPath();
        ctx.arc(this.x, this.y - parallaxY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 217, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    class Signal {
      constructor(startNode, endNode) {
        this.start = startNode;
        this.end = endNode;
        this.progress = 0;
        this.speed = Math.random() * 0.02 + 0.01;
        this.active = true;
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) this.active = false;
      }

      draw(parallaxY) {
        if (!this.active) return;
        const x = this.start.x + (this.end.x - this.start.x) * this.progress;
        const y = this.start.y + (this.end.y - this.start.y) * this.progress;
        
        ctx.beginPath();
        ctx.arc(x, y - parallaxY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${Math.sin(this.progress * Math.PI)})`; // Emerald
        ctx.fill();
      }
    }

    class Telemetry {
      constructor() {
        this.text = TELEMETRY_STRINGS[Math.floor(Math.random() * TELEMETRY_STRINGS.length)];
        this.x = Math.random() * (width - 100);
        this.y = Math.random() * height;
        this.life = 0;
        this.maxLife = Math.random() * 100 + 50;
        this.active = true;
      }

      update() {
        this.life++;
        if (this.life >= this.maxLife) this.active = false;
      }

      draw(parallaxY) {
        if (!this.active) return;
        
        // Fade in and out
        let alpha = 0.15;
        if (this.life < 10) alpha = (this.life / 10) * 0.15;
        if (this.life > this.maxLife - 10) alpha = ((this.maxLife - this.life) / 10) * 0.15;
        
        // Occasional flicker
        if (Math.random() > 0.95) alpha *= 0.2;

        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = `rgba(160, 160, 160, ${alpha})`;
        ctx.fillText(this.text, this.x, this.y - parallaxY);
      }
    }

    const initSystem = () => {
      nodes = [];
      signals = [];
      telemetry = [];
      for (let i = 0; i < NUM_NODES; i++) {
        nodes.push(new Node());
      }
    };

    const render = () => {
      // Clear the canvas. It's perfectly transparent so CSS handles the dark gradient base.
      ctx.clearRect(0, 0, width, height);
      
      const parallaxY = scrollY * 0.2; // 20% scroll speed

      // Update and draw nodes + connections
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.update();
        n1.draw(parallaxY);

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y - parallaxY);
            ctx.lineTo(n2.x, n2.y - parallaxY);
            const alpha = (1 - dist / MAX_DISTANCE) * 0.15; // Extremely faint
            ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Randomly spawn signals along connections
            if (Math.random() > 0.999 && signals.length < 5) {
              signals.push(new Signal(n1, n2));
            }
          }
        }
      }

      // Update and draw signals
      for (let i = signals.length - 1; i >= 0; i--) {
        signals[i].update();
        signals[i].draw(parallaxY);
        if (!signals[i].active) signals.splice(i, 1);
      }

      // Spawn telemetry randomly
      if (Math.random() > 0.95 && telemetry.length < (isMobile ? 3 : 8)) {
        telemetry.push(new Telemetry());
      }

      // Update and draw telemetry
      for (let i = telemetry.length - 1; i >= 0; i--) {
        telemetry[i].update();
        telemetry[i].draw(parallaxY);
        if (!telemetry[i].active) telemetry.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    initSystem();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -10, // Behind EVERYTHING
          pointerEvents: 'none' // Don't block clicks
        }}
      />
      <div className="global-scanline"></div>
    </>
  );
};

export default CyberBackground;
