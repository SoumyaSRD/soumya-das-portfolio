import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  angle?: number;
  speed?: number;
}

export const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef<string>('dark-dev');

  useEffect(() => {
    // Determine active theme
    const getActiveTheme = () => {
      return document.documentElement.getAttribute('data-theme') || 'dark-dev';
    };

    themeRef.current = getActiveTheme();

    // Listen for theme changes using MutationObserver
    const observer = new MutationObserver(() => {
      themeRef.current = getActiveTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle customization parameters per theme
    const getThemeParams = (theme: string) => {
      switch (theme) {
        case 'enterprise':
          // Nordic Frost
          return {
            count: 45,
            minSpeed: 0.08,
            maxSpeed: 0.25,
            minSize: 1.5,
            maxSize: 3.5,
            colors: ['rgba(29, 53, 87, 0.12)', 'rgba(69, 123, 157, 0.12)', 'rgba(168, 218, 220, 0.25)'],
            shape: 'circle',
            connect: true,
            connectColor: 'rgba(29, 53, 87, 0.05)',
          };
        case 'cyberpunk':
          // Pure Zinc Monochrome
          return {
            count: 55,
            minSpeed: 0.4,
            maxSpeed: 1.2,
            minSize: 1.5,
            maxSize: 4.5,
            colors: ['rgba(255, 255, 255, 0.09)', 'rgba(161, 161, 170, 0.1)', 'rgba(63, 63, 70, 0.12)'],
            shape: 'square',
            connect: false,
          };
        case 'scandinavian':
          // Warm Sage
          return {
            count: 12,
            minSpeed: 0.03,
            maxSpeed: 0.1,
            minSize: 30,
            maxSize: 85,
            colors: ['rgba(92, 103, 125, 0.03)', 'rgba(58, 80, 107, 0.03)', 'rgba(143, 160, 149, 0.03)'],
            shape: 'bubble',
            connect: false,
          };
        case 'classical':
          // Editorial Burgundy
          return {
            count: 35,
            minSpeed: 0.02,
            maxSpeed: 0.08,
            minSize: 1,
            maxSize: 3.2,
            colors: ['rgba(128, 0, 32, 0.06)', 'rgba(40, 54, 24, 0.05)', 'rgba(94, 86, 77, 0.06)'],
            shape: 'charcoal',
            connect: false,
          };
        case 'dark-dev':
        default:
          // Stark Slate
          return {
            count: 50,
            minSpeed: 0.1,
            maxSpeed: 0.35,
            minSize: 1.5,
            maxSize: 3.8,
            colors: ['rgba(59, 130, 246, 0.15)', 'rgba(99, 102, 241, 0.15)', 'rgba(255, 255, 255, 0.06)'],
            shape: 'circle',
            connect: true,
            connectColor: 'rgba(59, 130, 246, 0.06)',
          };
      }
    };

    const createParticles = () => {
      particles = [];
      const params = getThemeParams(themeRef.current);
      for (let i = 0; i < params.count; i++) {
        const size = Math.random() * (params.maxSize - params.minSize) + params.minSize;
        const color = params.colors[Math.floor(Math.random() * params.colors.length)];
        
        let vx = 0;
        let vy = 0;
        
        if (themeRef.current === 'cyberpunk') {
          vx = (Math.random() - 0.5) * 0.15;
          vy = -(Math.random() * (params.maxSpeed - params.minSpeed) + params.minSpeed); // slide upward
        } else if (themeRef.current === 'classical') {
          vx = (Math.random() - 0.5) * 0.03;
          vy = Math.random() * (params.maxSpeed - params.minSpeed) + params.minSpeed; // drift downward
        } else {
          vx = (Math.random() - 0.5) * (params.maxSpeed - params.minSpeed) * 2;
          vy = (Math.random() - 0.5) * (params.maxSpeed - params.minSpeed) * 2;
        }

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx,
          vy,
          size,
          color,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.005 + 0.001
        });
      }
    };

    createParticles();

    let currentTheme = themeRef.current;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      if (themeRef.current !== currentTheme) {
        currentTheme = themeRef.current;
        createParticles();
      }

      const params = getThemeParams(themeRef.current);

      ctx.clearRect(0, 0, width, height);

      // Draw network connections first
      if (params.connect) {
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = params.connectColor || 'rgba(255,255,255,0.05)';
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Classical Brownian wave drifting
        if (themeRef.current === 'classical') {
          p.angle = (p.angle || 0) + (p.speed || 0.002);
          p.x += Math.sin(p.angle) * 0.15;
        }

        // Boundary wraps
        if (themeRef.current === 'cyberpunk') {
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10 || p.x > width + 10) p.vx *= -1;
        } else if (themeRef.current === 'classical') {
          if (p.y > height + 10) {
            p.y = -10;
            p.x = Math.random() * width;
          }
          if (p.x < -10 || p.x > width + 10) p.vx *= -1;
        } else {
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        // Draw visual shape
        ctx.beginPath();
        if (params.shape === 'square') {
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        } else if (params.shape === 'bubble') {
          ctx.fillStyle = p.color;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = p.color;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'normal' }}
    />
  );
};
