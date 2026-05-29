import React, { useState } from 'react';
import { experienceTimeline } from '../data/portfolioData';
import { Briefcase, Calendar, ChevronDown, ChevronUp, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { useI18n } from '../context/I18nContext';

interface CardProps {
  exp: typeof experienceTimeline[0];
  idx: number;
}

const ExperienceCard: React.FC<CardProps> = ({ exp, idx }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // Match premium icons per company index
  const getCompanyIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Briefcase size={13} className="text-accent-primary animate-pulse" />;
      case 1:
      default:
        return <Sparkles size={13} className="text-accent-secondary animate-pulse" />;
    }
  };

  return (
    <div className={`relative pl-10 md:pl-0 flex flex-col md:flex-row items-start w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
      {/* 
         Timeline Bullet Anchor (Mathematically Centered!)
         Bullet sits centered at left-[5px] on mobile (lines up with left-4 track),
         and sits exactly at center (left-1/2) on desktop.
      */}
      <span 
        className="absolute left-[5px] md:left-1/2 md:-translate-x-1/2 top-6 w-6 h-6 rounded-full bg-bg-primary border-2 border-accent-primary flex items-center justify-center z-20 shadow-sm transition-transform duration-300 hover:scale-115 cursor-pointer"
        style={{
          boxShadow: 'var(--theme-glow-style)'
        }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-accent-primary" />
      </span>

      {/* Experience Item Card Side */}
      <div className="w-full md:w-[calc(50%-24px)] z-10">
        <div
          className="glass-panel border border-border-custom overflow-hidden transition-all duration-300 relative group"
          style={{
            boxShadow: 'var(--theme-glow-style)',
            borderRadius: 'var(--card-radius)',
          }}
        >
          {/* Sleek Visual Side Border Indicator */}
          <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-accent-primary to-accent-secondary opacity-80" />

          {/* Collapsible Header */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer select-none"
          >
            <div className="space-y-1 pl-2">
              {/* Company Label - High Hierarchy */}
              <span className="text-[10px] sm:text-[11px] font-extrabold text-accent-primary uppercase tracking-widest font-mono flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-accent-primary/10 flex items-center justify-center">
                  {getCompanyIcon(idx)}
                </span>
                {exp.company}
              </span>
              
              {/* Professional Role - Title */}
              <h3 className="text-base sm:text-lg font-bold text-text-primary uppercase tracking-wide mt-1.5">
                {exp.role}
              </h3>
            </div>

            {/* Collapsible Trigger Badge Panel */}
            <div className="flex items-center gap-3 self-end md:self-auto select-none">
              <span className="text-[10px] sm:text-[11px] font-bold text-text-muted font-mono bg-bg-primary border border-border-custom px-3 py-1 rounded-full flex items-center gap-1.5">
                <Calendar size={11} className="text-accent-secondary" /> {exp.period}
              </span>
              <button 
                className="text-text-muted hover:text-text-primary transition-all p-1 rounded-lg hover:bg-white/5 cursor-pointer"
                aria-label="Toggle Details"
              >
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>

          {/* Card Details Body */}
          {isOpen && (
            <div className="px-6 pb-6 pt-4 border-t border-border-custom bg-black/5 animate-in slide-in-from-top-1.5 duration-200">
              {/* Responsibilities list */}
              <ul className="space-y-3.5 mt-2 text-[13px] text-text-muted leading-relaxed">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle size={14} className="text-accent-primary mt-0.5 flex-shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Stack Tags */}
              <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border-custom">
                {exp.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-[10px] font-bold bg-bg-secondary hover:border-accent-primary border border-border-custom text-text-primary rounded-lg transition-colors cursor-default font-mono uppercase"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spacer Side (Handles column sizing on desktop layout) */}
      <div className="hidden md:block md:w-[calc(50%+24px)]" />
    </div>
  );
};

export const Experience: React.FC = () => {
  const { t } = useI18n();
  return (
    <section id="experience" className="w-full py-20 px-4 sm:px-8 md:px-12 max-w-5xl mx-auto border-b border-border-custom relative select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-52 h-52 bg-accent-glow blur-[130px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-20 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-primary/10 rounded-full text-[10px] font-bold tracking-widest text-accent-primary uppercase font-mono">
          <ShieldCheck size={11} className="animate-pulse" /> {t('experience.badge')}
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-text-primary uppercase">
          {t('experience.title')}
        </h2>
        <p className="text-xs text-text-muted leading-relaxed">
          {t('experience.desc')}
        </p>
      </div>

      {/* Timeline track container */}
      <div className="relative w-full max-w-4xl mx-auto select-text">
        {/* Central Vertical Track Line (Sits at left-4 on mobile, centers on desktop) */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border-custom z-0" />

        <div className="space-y-12">
          {experienceTimeline.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
