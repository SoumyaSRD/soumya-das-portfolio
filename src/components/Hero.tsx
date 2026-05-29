import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Terminal as TermIcon, Code2, Globe } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { useI18n } from '../context/I18nContext';

export const Hero: React.FC = () => {
  const { t, language } = useI18n();
  const [titleIdx, setTitleIdx] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [activeTheme, setActiveTheme] = useState<string>('dark-dev');

  // Listen to active theme changes
  useEffect(() => {
    const savedTheme = localStorage.getItem('srd-portfolio-theme') || 'dark-dev';
    setActiveTheme(savedTheme);

    const handleThemeChange = (e: any) => {
      setActiveTheme(e.detail);
    };
    window.addEventListener('theme-changed', handleThemeChange);
    return () => window.removeEventListener('theme-changed', handleThemeChange);
  }, []);

  // Rotating typing effect logic
  useEffect(() => {
    const titles = [
      t('hero.titles.0'),
      t('hero.titles.1'),
      t('hero.titles.2'),
      t('hero.titles.3')
    ];
    const fullText = titles[titleIdx] || '';
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
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, titleIdx, language, t]);

  // Reset typing carousel on language change to keep it robust and synchronous
  useEffect(() => {
    setTypedText('');
    setIsDeleting(false);
    setTitleIdx(0);
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
      className="relative w-full min-h-[85vh] flex flex-col justify-center items-center py-20 px-4 sm:px-8 md:px-12 overflow-hidden select-none border-b border-border-custom"
    >
      {/* Dynamic Theme Grids & Background Orbs */}
      <div className="absolute inset-0 theme-grid-overlay z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent-glow blur-[110px] pointer-events-none z-0 animate-pulse duration-5000" />

      {/* Floating Interactive Technical Tags */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden hidden md:block">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[22%] left-[12%] glass-panel px-3.5 py-2 flex items-center gap-2 border border-border-custom text-xs font-mono font-bold text-text-primary shadow-sm"
        >
          <Code2 size={12} className="text-accent-primary animate-pulse" /> NgRx Architecture
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[48%] right-[10%] glass-panel px-3.5 py-2 flex items-center gap-2 border border-border-custom text-xs font-mono font-bold text-text-primary shadow-sm"
        >
          <Globe size={12} className="text-accent-secondary animate-pulse" /> NestJS APIs
        </motion.div>
      </div>

      {/* Main Core Landing Content */}
      <div className="relative z-20 w-full max-w-5xl text-center flex flex-col items-center space-y-8 select-text">
        
        {/* Profile Circle with Glowing Spotlight Rings */}
        <div className="relative group select-none">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-border-custom bg-bg-secondary flex items-center justify-center shadow-lg">
            <img
              src="/developer_avatar.png"
              alt={personalInfo.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            />
          </div>
        </div>

        {/* Brand Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg-secondary/60 border border-border-custom rounded-full text-xs font-semibold text-accent-primary uppercase tracking-widest font-mono shadow-sm select-none">
          <TermIcon size={12} className="animate-pulse" /> {t('hero.badge')}
        </div>

        {/* Title Mappings Conditionally Built */}
        {activeTheme === 'cyberpunk' ? (
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary uppercase leading-tight font-mono">
            {t('hero.title1')} <br />
            <span className="bg-white text-black px-4 py-0.5 rounded inline-block mt-2">
              {t('hero.title2')}
            </span>
          </h1>
        ) : activeTheme === 'classical' ? (
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-extrabold tracking-tight text-text-primary uppercase leading-tight">
            {t('hero.title1')} <br />
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent italic">
              {t('hero.title2')}
            </span>
          </h1>
        ) : (
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary uppercase leading-tight">
            {t('hero.title1')} <br />
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              {t('hero.title2')}
            </span>
          </h1>
        )}

        {/* Typing rotation subtitle */}
        <div className="min-h-8 py-1.5 flex items-center justify-center font-mono text-xs xs:text-sm md:text-lg text-text-muted select-none">
          <span>{t('hero.expert')}</span>
          <span className="ml-2 font-bold text-text-primary typing-caret pr-1.5">
            {typedText}
          </span>
        </div>

        {/* Short Summary biography supporting elegant drop caps */}
        {activeTheme === 'classical' ? (
          <p className="max-w-xl text-xs md:text-sm text-text-muted leading-relaxed text-left first-letter:text-5xl first-letter:font-bold first-letter:text-accent-primary first-letter:float-left first-letter:mr-2.5 first-letter:font-display">
            {t('hero.bio')}
          </p>
        ) : (
          <p className="max-w-xl text-xs md:text-sm text-text-muted leading-relaxed">
            {t('hero.bio')}
          </p>
        )}

        {/* Dynamic CTA Button Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 select-none">
          <button
            onClick={() => scrollToAnchor('projects')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-accent-primary text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all group"
            style={{ boxShadow: 'var(--theme-glow-style)' }}
          >
            {t('hero.cta.projects')}
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1.5" />
          </button>
          
          <button
            onClick={() => scrollToAnchor('contact')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-bg-secondary hover:bg-border-custom border border-border-custom text-text-primary text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 animate-pulse"
          >
            {t('hero.cta.book')}
          </button>

          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-transparent hover:bg-white/5 border border-dashed border-border-custom text-text-muted hover:text-text-primary text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            {t('hero.cta.cv')}
          </button>
        </div>

        {/* Social connections links */}
        <div className="flex items-center gap-6 pt-8 select-none">
          <a
            href={`https://github.com/${personalInfo.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-primary transition-colors hover:scale-110 active:scale-95"
            title="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={`https://${personalInfo.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-primary transition-colors hover:scale-110 active:scale-95"
            title="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-text-muted hover:text-accent-primary transition-colors hover:scale-110 active:scale-95"
            title="Email"
          >
            <Mail size={18} />
          </a>
        </div>

      </div>
    </section>
  );
};
