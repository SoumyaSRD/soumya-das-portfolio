import React, { useState } from 'react';
import { skillCategories } from '../data/portfolioData';
import { Terminal as TermIcon, Brain } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

export const Skills: React.FC = () => {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "circOut" } },
  };

  return (
    <section id="skills" className="w-full py-32 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-border-custom relative select-none">
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-glow blur-[160px] pointer-events-none rounded-full opacity-30" />
      <div className="text-center max-w-2xl mx-auto mb-24 space-y-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-primary/10 rounded-full text-[10px] font-black tracking-[0.3em] text-accent-primary uppercase font-mono border border-accent-primary/20 shadow-2xl">
          <Brain size={12} className="animate-pulse" /> {t('skills.badge')}
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-black tracking-tight text-text-primary uppercase">{t('skills.title')}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-[15px] text-text-muted leading-relaxed font-medium">{t('skills.desc')}</motion.p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mb-20">
        {skillCategories.map((cat, idx) => {
          const isActive = idx === activeCategory;
          return (
            <button key={idx} onClick={() => setActiveCategory(idx)} className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl border transition-all duration-500 cursor-pointer font-mono ${isActive ? 'bg-accent-primary text-white border-transparent shadow-xl scale-105' : 'bg-bg-secondary/50 hover:bg-border-custom text-text-muted hover:text-text-primary border-border-custom backdrop-blur-md'}`}>{cat.title}</button>
          );
        })}
      </div>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 select-text">
        <AnimatePresence mode="wait">
          {skillCategories[activeCategory].skills.map((skill) => {
            const glowColor = skill.glowColor || 'rgba(59, 130, 246, 0.2)';
            return (
              <motion.div
                key={`${activeCategory}-${skill.name}`}
                variants={cardVariants}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="creative-card p-10 group select-none h-full flex flex-col items-center text-center justify-between shadow-2xl"
              >
                {/* Visual Brain Icon Backdrop */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Brain size={60} style={{ color: glowColor }} />
                </div>

                {/* Info Section */}
                <div className="relative z-10 space-y-6 w-full flex flex-col items-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[17px] font-black text-text-primary uppercase tracking-tight group-hover:text-accent-primary transition-colors">
                      {skill.name}
                    </span>
                    <div className="bg-accent-primary/10 border border-accent-primary/20 px-3 py-1 rounded-lg w-fit">
                       <span className="text-[11px] font-black text-accent-primary font-mono">
                         {skill.level}%
                       </span>
                    </div>
                  </div>

                  <div className="space-y-3 w-full max-w-[200px]">
                    {/* Animated Slider Bar Container */}
                    <div className="w-full h-2.5 bg-bg-primary/80 border border-border-custom rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_auto] animate-gradient"
                        style={{
                          boxShadow: `0 0 15px ${glowColor}`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Detail */}
                <div className="relative z-10 mt-10 pt-6 border-t border-border-custom/50 flex flex-col items-center gap-4 w-full">
                  <div className="text-[10px] font-black text-text-muted flex items-center gap-2 font-mono uppercase tracking-[0.3em]">
                    <TermIcon size={12} className="text-accent-primary animate-pulse" /> VERIFIED
                  </div>
                  <div className="flex gap-2.5">
                    {[1, 2, 3].map(i => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full transition-all duration-700 ${i <= Math.floor(skill.level/30) ? 'bg-accent-primary shadow-[0_0_10px_var(--accent-primary)]' : 'bg-border-custom'}`} 
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
