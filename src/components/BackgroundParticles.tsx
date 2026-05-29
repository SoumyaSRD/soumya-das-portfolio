import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
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
          return {
            count: 45,
            minSpeed: 0.1,
            maxSpeed: 0.4,
            minSize: 1,
            maxSize: 3,
            colors: ['#0f172a', '#475569', '#cbd5e1'],
            shape: 'circle',
            connect: false,
          };
        case 'cyberpunk':
          return {
            count: 70,
            minSpeed: 1.0,
            maxSpeed: 2.2,
            minSize: 2,
            maxSize: 5,
            colors: ['#ff007f', '#00ffff', '#d946ef'],
            shape: 'square',
            connect: false,
          };
        case 'scandinavian':
          return {
            count: 25,
            minSpeed: 0.05,
            maxSpeed: 0.2,
            minSize: 6,
            maxSize: 18,
            colors: ['#8fa095', '#607065', '#d1cfc7', '#eceae3'],
            shape: 'bubble',
            connect: false,
          };
        case 'classical':
          return {
            count: 35,
            minSpeed: 0.04,
            maxSpeed: 0.12,
            minSize: 1,
            maxSize: 3.2,
            colors: ['#800020', '#3d503f', '#d0c9bc', '#5e564d'],
            shape: 'circle',
            connect: false,
          };
        case 'dark-dev':
        default:
          return {
            count: 60,
            minSpeed: 0.2,
            maxSpeed: 0.6,
            minSize: 1.5,
            maxSize: 4,
            colors: ['#3b82f6', '#8b5cf6', '#a78bfa', '#1d4ed8'],
            shape: 'circle',
            connect: true,
          };
      }
    };

    const createParticles = () => {
      particles = [];
      const params = getThemeParams(themeRef.current);
      for (let i = 0; i < params.count; i++) {
        const size = Math.random() * (params.maxSize - params.minSize) + params.minSize;
        const color = params.colors[Math.floor(Math.random() * params.colors.length)];
        
        // Cyberpunk particles drift upward, Enterprise flows rightward, Dev drifts randomly
        let vx = 0;
        let vy = 0;
        
        if (themeRef.current === 'cyberpunk') {
          vx = (Math.random() - 0.5) * 0.4;
          vy = -(Math.random() * (params.maxSpeed - params.minSpeed) + params.minSpeed);
        } else if (themeRef.current === 'enterprise') {
          vx = Math.random() * (params.maxSpeed - params.minSpeed) + params.minSpeed;
          vy = (Math.random() - 0.5) * 0.15;
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
        });
      }
    };

    createParticles();

    // Reinitialize particles on theme change
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

      // Clear or fade background
      if (themeRef.current === 'cyberpunk') {
        // Leave tiny trail for neon glow effect
        ctx.fillStyle = 'rgba(11, 2, 20, 0.2)';
        ctx.fillRect(0, 0, width, height);
      } else if (themeRef.current === 'scandinavian' || themeRef.current === 'classical') {
        ctx.clearRect(0, 0, width, height);
      } else if (themeRef.current === 'enterprise') {
        ctx.clearRect(0, 0, width, height);
      } else {
        // Dark developer
        ctx.clearRect(0, 0, width, height);
      }

      // Draw connections first (for Dark Dev mode)
      if (params.connect) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              const alpha = (1 - dist / 120) * 0.15;
              ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
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
        // Update positions
        p.x += p.vx;
        p.y += p.vy;

        // Boundaries check
        if (themeRef.current === 'cyberpunk') {
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10 || p.x > width + 10) {
            p.vx *= -1;
          }
        } else if (themeRef.current === 'enterprise') {
          if (p.x > width + 10) {
            p.x = -10;
            p.y = Math.random() * height;
          }
          if (p.y < -10 || p.y > height + 10) {
            p.vy *= -1;
          }
        } else {
          // Wrap around or bounce
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        // Draw particle
        ctx.beginPath();
        if (params.shape === 'square') {
          ctx.fillStyle = p.color;
          // Glow effect for cyberpunk squares
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          ctx.shadowBlur = 0; // reset
        } else if (params.shape === 'bubble') {
          // Large transparent circles
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.08;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0; // reset
        } else {
          // Standard circle
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
