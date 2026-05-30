import React, { useState } from 'react';
import { experienceTimeline } from '../data/portfolioData';
import { Briefcase, Calendar, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';

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
      <div className="w-full md:w-[calc(50%-40px)] z-10">
        <motion.div
          initial={{ opacity: 0, x: idx % 2 === 0 ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="creative-card group transition-all duration-500 hover:scale-[1.02]"
          style={{
            boxShadow: 'var(--theme-glow-style)',
          }}
        >
          {/* Decorative Corner Glow */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Collapsible Header */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="p-8 flex flex-col justify-between items-start gap-6 cursor-pointer select-none relative z-10"
          >
            <div className="w-full space-y-4">
              {/* Company & Role */}
              <div className="flex justify-between items-start w-full">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-accent-primary uppercase tracking-[0.3em] font-mono flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20 shadow-inner">
                      {getCompanyIcon(idx)}
                    </span>
                    {exp.company}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-text-primary uppercase tracking-tight leading-none pt-2">
                    {exp.role}
                  </h3>
                </div>
                
                {/* Period Badge */}
                <div className="hidden sm:block">
                  <div className="bg-bg-primary/80 backdrop-blur-md border border-border-custom px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xl">
                    <Calendar size={14} className="text-accent-secondary" />
                    <span className="text-[10px] font-black text-text-primary font-mono">{exp.period}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Toggle Action */}
            <div className="flex items-center gap-3 w-full justify-between pt-2 border-t border-border-custom/20">
               <div className="flex gap-1.5">
                  {exp.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[9px] font-bold text-text-muted uppercase tracking-widest">#{tag}</span>
                  ))}
               </div>
               <motion.div 
                 animate={{ rotate: isOpen ? 180 : 0 }}
                 className="w-8 h-8 rounded-full bg-accent-primary text-white flex items-center justify-center shadow-lg"
               >
                 <ChevronDown size={16} />
               </motion.div>
            </div>
          </div>

          {/* Card Details Body */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-10 pt-4 bg-gradient-to-b from-bg-secondary/40 to-transparent relative z-10">
                  <div className="sm:hidden mb-6">
                    <div className="bg-bg-primary/50 border border-border-custom px-4 py-2 rounded-xl flex items-center gap-2 w-fit">
                      <Calendar size={14} className="text-accent-secondary" />
                      <span className="text-[10px] font-black text-text-primary font-mono">{exp.period}</span>
                    </div>
                  </div>

                  {/* Responsibilities list */}
                  <ul className="space-y-6">
                    {exp.responsibilities.map((resp, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-5 group/item"
                      >
                        <div className="mt-2 w-2 h-2 rounded-full bg-accent-primary/20 border-2 border-accent-primary group-hover/item:scale-125 transition-transform flex-shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        <span className="text-sm md:text-[15px] text-text-muted leading-relaxed font-medium group-hover/item:text-text-primary transition-colors">
                          {resp}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Full Tags Cloud */}
                  <div className="flex flex-wrap gap-2.5 mt-10 pt-8 border-t border-border-custom/30">
                    {exp.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-1.5 text-[10px] font-black bg-accent-primary/5 border border-accent-primary/10 text-accent-primary rounded-xl transition-all hover:bg-accent-primary hover:text-white hover:shadow-lg hover:shadow-accent-primary/20 cursor-default font-mono uppercase tracking-[0.15em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Spacer Side (Handles column sizing on desktop layout) */}
      <div className="hidden md:block md:w-[calc(50%+24px)]" />
    </div>
  );
};

export const Experience: React.FC = () => {
  const { t } = useI18n();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section id="experience" className="w-full py-32 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto border-b border-border-custom relative select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-72 h-72 bg-accent-glow blur-[140px] pointer-events-none rounded-full opacity-40" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-24 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 bg-accent-primary/10 rounded-full text-[10px] font-black tracking-[0.2em] text-accent-primary uppercase font-mono border border-accent-primary/20"
        >
          <ShieldCheck size={12} className="animate-pulse" /> {t('experience.badge')}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black tracking-tight text-text-primary uppercase"
        >
          {t('experience.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[13px] text-text-muted leading-relaxed font-medium"
        >
          {t('experience.desc')}
        </motion.p>
      </div>

      {/* Timeline track container */}
      <div className="relative w-full max-w-4xl mx-auto select-text">
        {/* Central Vertical Track Line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-border-custom to-transparent z-0" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-24" /* Increased spacing significantly */
        >
          {experienceTimeline.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} idx={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
