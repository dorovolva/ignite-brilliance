import React, { useEffect, useRef } from 'react';

const colors = ["#C0001A", "#E85D24", "#F2A623"];

const FlameParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const particleCount = 120;
    
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
        // Start randomly anywhere on the screen initially
        this.y = Math.random() * canvas.height;
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 4 + 1; // 1 to 5 radius
        this.speedY = Math.random() * 1.5 + 0.5; // rise speed
        this.speedX = (Math.random() - 0.5) * 0.5; // drift
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100; // how long it lasts
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.driftSine = Math.random() * Math.PI * 2;
        this.driftSpeed = Math.random() * 0.05 + 0.01;
      }
      update() {
        this.life++;
        this.y -= this.speedY;
        
        // natural flame drift
        this.driftSine += this.driftSpeed;
        this.x += Math.sin(this.driftSine) * 0.5 + this.speedX;

        // Fading logic: fade in fast, fade out slow at the end
        if (this.life < 20) {
          this.opacity = this.life / 20;
        } else if (this.life > this.maxLife - 50) {
          this.opacity = Math.max(0, (this.maxLife - this.life) / 50);
        } else {
          this.opacity = 1;
        }
        
        // global semi-transparency for flame
        this.opacity *= 0.6; 
        
        // Reset if it "dies" or goes out of bounds
        if (this.life >= this.maxLife || this.y < -10) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }

    // Init particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particleCount; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1, /* Stay behind all elements */
      }}
    />
  );
};

export default FlameParticles;
