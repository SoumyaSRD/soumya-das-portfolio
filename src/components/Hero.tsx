import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Terminal as TermIcon, Award, Code2, Globe } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const [titleIdx, setTitleIdx] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Rotating typing effect logic
  useEffect(() => {
    const fullText = personalInfo.titles[titleIdx];
    let timer: any;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 100);
    }

    // Phase transition checks
    if (!isDeleting && typedText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 1800); // Wait at complete text
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % personalInfo.titles.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, titleIdx]);

  const scrollToAnchor = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] flex flex-col justify-center items-center py-20 px-6 overflow-hidden select-none border-b border-border-custom"
    >
      {/* 1. Theme-Specific Visual Accents */}
      <div className="absolute inset-0 theme-grid-overlay z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent-glow blur-[100px] pointer-events-none z-0 animate-pulse duration-5000" />

      {/* 2. Floating Tech Badges (Using simple Framer Motion float lines) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden hidden md:block">
        {/* Badge 1 */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] glass-panel px-3 py-1.5 flex items-center gap-2 border border-white/10 text-xs font-mono font-bold shadow-sm"
        >
          <Code2 size={12} className="text-accent-primary" /> NgRx Architecture
        </motion.div>
        {/* Badge 2 */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[45%] right-[8%] glass-panel px-3 py-1.5 flex items-center gap-2 border border-white/10 text-xs font-mono font-bold shadow-sm"
        >
          <Globe size={12} className="text-accent-secondary" /> NestJS Microservices
        </motion.div>
        {/* Badge 3 */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[20%] left-[15%] glass-panel px-3 py-1.5 flex items-center gap-2 border border-white/10 text-xs font-mono font-bold shadow-sm"
        >
          <Award size={12} className="text-[#e23f5f]" /> Monorepo Specialist
        </motion.div>
      </div>

      {/* 3. Main Content Container */}
      <div className="relative z-20 max-w-4xl text-center flex flex-col items-center space-y-8">
        
        {/* Custom Profile Circle Frame */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/15 bg-bg-secondary flex items-center justify-center">
            <img
              src="/developer_avatar.png"
              alt={personalInfo.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            />
          </div>
        </div>

        {/* Hello Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg-secondary/60 border border-border-custom rounded-full text-xs font-semibold text-accent-primary uppercase tracking-widest font-mono shadow-sm">
          <TermIcon size={12} className="animate-pulse" /> Soumya Ranjan Das
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary uppercase leading-tight select-text">
          Crafting Scalable <br />
          <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            Enterprise Platforms
          </span>
        </h1>

        {/* Typing Subtitle */}
        <div className="h-8 flex items-center justify-center font-mono text-sm md:text-lg text-text-muted select-text">
          <span>Expert in: </span>
          <span className="ml-2 font-bold text-text-primary typing-caret pr-1.5">
            {typedText}
          </span>
        </div>

        {/* Short Summary Bio */}
        <p className="max-w-xl text-xs md:text-sm text-text-muted leading-relaxed select-text">
          {personalInfo.bio} Specialized in building high-fidelity logistics platforms, robust state architectures, and mentoring high-output agile engineering teams.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <button
            onClick={() => scrollToAnchor('projects')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-accent-primary text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all group"
            style={{ boxShadow: 'var(--theme-glow-style)' }}
          >
            Explore Projects
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1.5" />
          </button>
          
          <button
            onClick={() => scrollToAnchor('contact')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-bg-secondary hover:bg-border-custom border border-border-custom text-text-primary text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            Contact Me
          </button>

          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-transparent hover:bg-white/5 border border-dashed border-border-custom text-text-muted hover:text-text-primary text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            Print CV / Resume
          </button>
        </div>

        {/* Social Badges Grid */}
        <div className="flex items-center gap-6 pt-8">
          <a
            href={`https://github.com/${personalInfo.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-primary transition-colors hover:scale-110 active:scale-95"
            title="GitHub Profile"
          >
            <Github size={18} />
          </a>
          <a
            href={`https://${personalInfo.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-primary transition-colors hover:scale-110 active:scale-95"
            title="LinkedIn Profile"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-text-muted hover:text-accent-primary transition-colors hover:scale-110 active:scale-95"
            title="Send Email"
          >
            <Mail size={18} />
          </a>
        </div>

      </div>
    </section>
  );
};
