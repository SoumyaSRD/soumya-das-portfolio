import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { useI18n } from '../context/I18nContext';

export const Hero: React.FC = () => {
  const { t, language } = useI18n();
  const [titleIdx, setTitleIdx] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [activeTheme, setActiveTheme] = useState<string>(() => {
    try {
      return localStorage.getItem('srd-portfolio-theme') || 'dark-dev';
    } catch (e) {
      return 'dark-dev';
    }
  });

  // Listen to active theme changes
  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setActiveTheme(customEvent.detail);
    };
    window.addEventListener('theme-changed', handleThemeChange);
    return () => window.removeEventListener('theme-changed', handleThemeChange);
  }, []);

  const isClassical = activeTheme === 'classical';
  const isRetro = activeTheme === 'retro';
  const isGold = activeTheme === 'gold';

  // Rotating typing effect logic
  useEffect(() => {
    const titles = [
      t('hero.titles.0'),
      t('hero.titles.1'),
      t('hero.titles.2'),
      t('hero.titles.3')
    ];
    const fullText = titles[titleIdx] || '';
    let timer: ReturnType<typeof setTimeout>;

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
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && typedText === '') {
      setTimeout(() => {
        setIsDeleting(false);
        setTitleIdx((prev) => (prev + 1) % titles.length);
      }, 0);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, titleIdx, t]);

  // Reset typing carousel on language change to keep it robust and synchronous
  useEffect(() => {
    setTimeout(() => {
      setTypedText('');
      setIsDeleting(false);
      setTitleIdx(0);
    }, 0);
  }, [language]);

  const scrollToAnchor = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-20 px-4 sm:px-8 md:px-12 overflow-hidden select-none border-b border-border-custom"
    >
      {/* Dynamic Theme Grids & Background Orbs */}
      <div className="absolute inset-0 theme-grid-overlay z-0" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -100, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-accent-secondary/10 rounded-full blur-[100px]"
        />
      </div>

      {/* Floating Interactive Technical Tags */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden hidden md:block">
        {[
          { label: 'NgRx Architecture', top: '25%', left: '15%', color: 'var(--accent-primary)', delay: 0 },
          { label: 'NestJS Scalability', top: '50%', right: '12%', color: 'var(--accent-secondary)', delay: 1 },
          { label: 'Microfrontends', top: '75%', left: '20%', color: 'var(--accent-primary)', delay: 2 },
          { label: 'Cloud Native', top: '15%', right: '25%', color: 'var(--accent-secondary)', delay: 3 },
        ].map((tag, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: tag.delay 
            }}
            className="absolute glass-panel px-5 py-2.5 flex items-center gap-3 border border-border-custom text-[11px] font-black font-mono text-text-primary shadow-2xl backdrop-blur-2xl rounded-2xl"
            style={{ top: tag.top, left: tag.left, right: tag.right }}
          >
            <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: tag.color }} />
            {tag.label}
          </motion.div>
        ))}
      </div>

      {/* Main Core Landing Content */}
      <div className="relative z-20 w-full max-w-5xl text-center flex flex-col items-center space-y-12 select-text">
        
        {/* Profile Circle with Glowing Spotlight Rings */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative group select-none"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-12 bg-gradient-to-r from-accent-primary/20 via-accent-secondary/20 to-accent-primary/20 rounded-full blur-[60px] opacity-50 group-hover:opacity-100 transition duration-1000"
          />
          <div className="relative w-40 h-40 md:w-52 md:h-48 rounded-[50px] rotate-3 p-1.5 bg-gradient-to-tr from-accent-primary via-white/20 to-accent-secondary shadow-2xl overflow-hidden transition-transform duration-700 group-hover:rotate-0">
            <div className="w-full h-full rounded-[48px] overflow-hidden bg-bg-secondary flex items-center justify-center border-2 border-white/10">
              <img
                src="/developer_avatar.png"
                alt={personalInfo.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115 -rotate-3 group-hover:rotate-0"
              />
            </div>
          </div>
        </motion.div>

        {/* Brand Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-accent-primary/20 blur-xl rounded-full" />
          <div className="relative inline-flex items-center gap-3 px-8 py-2.5 bg-bg-secondary/90 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-black text-accent-primary uppercase tracking-[0.5em] font-mono shadow-2xl">
            <Sparkles size={14} className="text-amber-400 animate-pulse" /> {t('hero.badge')}
          </div>
        </motion.div>

        {/* Title Mappings */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "circOut" }}
          className="space-y-6"
        >
          <h1 className={`text-5xl sm:text-7xl md:text-9xl font-black tracking-tight text-text-primary uppercase leading-[0.8] ${isClassical ? 'font-serif' : 'font-display'}`}>
            {t('hero.title1')} <br />
            <span className={`relative inline-block mt-6 text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_auto] animate-gradient ${isRetro ? 'font-mono' : ''}`}>
              {t('hero.title2')}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.2, duration: 1.2 }}
                className={`absolute -bottom-4 left-0 h-2 bg-accent-primary/20 rounded-full blur-sm ${isGold ? 'bg-accent-primary/40 shadow-[0_0_20px_var(--accent-primary)]' : ''}`} 
              />
            </span>
          </h1>
        </motion.div>

        {/* Rotating Typing Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="h-12 py-2 flex items-center justify-center font-mono text-base md:text-2xl text-text-muted select-none"
        >
          <div className={`bg-bg-secondary/60 backdrop-blur-xl px-8 py-3 rounded-3xl border border-white/5 shadow-2xl ${isRetro ? 'border-accent-primary/30 text-accent-primary' : ''}`}>
             <span className="text-accent-primary font-black opacity-50">{isRetro ? 'root@srd_os:~#' : 'SRD_SYSTEM:'} </span>
             <span>{t('hero.expert')}</span>
             <span className={`ml-3 font-black text-text-primary typing-caret pr-2 ${isRetro ? 'text-accent-primary' : ''}`}>
               {typedText}
             </span>
          </div>
        </motion.div>

        {/* Action Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap justify-center gap-8 pt-8"
        >
          <button
            onClick={() => scrollToAnchor('projects')}
            className="group relative px-10 py-5 bg-accent-primary text-white rounded-[24px] font-black text-[12px] uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-3">
               {t('hero.cta.projects')} <ArrowRight size={18} />
            </span>
          </button>

          <button
            onClick={() => scrollToAnchor('contact')}
            className="px-10 py-5 bg-bg-secondary/90 backdrop-blur-2xl border border-white/10 text-text-primary rounded-[24px] font-black text-[12px] uppercase tracking-[0.3em] hover:bg-bg-primary hover:border-accent-primary/50 transition-all active:scale-95 shadow-2xl"
          >
            {t('hero.cta.book')}
          </button>
        </motion.div>

        {/* Social connections links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center gap-10 pt-12 select-none"
        >
          {[
            { icon: <Github size={24} />, href: `https://github.com/${personalInfo.github}`, label: 'GitHub' },
            { icon: <Linkedin size={24} />, href: `https://${personalInfo.linkedin}`, label: 'LinkedIn' },
            { icon: <Mail size={24} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-primary transition-all duration-300 hover:scale-125 active:scale-90"
              title={social.label}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
