import React, { useState } from 'react';
import { skillCategories } from '../data/portfolioData';
import { Terminal as TermIcon, Brain } from 'lucide-react';
import { useI18n } from '../context/I18nContext';

export const Skills: React.FC = () => {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <section id="skills" className="w-full py-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-border-custom relative select-none">
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-accent-glow blur-[140px] pointer-events-none rounded-full" />
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-primary/10 rounded-full text-[10px] font-bold tracking-widest text-accent-primary uppercase font-mono">
          <Brain size={11} className="animate-pulse" /> {t('skills.badge')}
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-text-primary uppercase">
          {t('skills.title')}
        </h2>
        <p className="text-xs text-text-muted leading-relaxed">
          {t('skills.desc')}
        </p>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {skillCategories.map((cat, idx) => {
          const isActive = idx === activeCategory;
          return (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-accent-primary text-white border-transparent shadow-sm'
                  : 'bg-bg-secondary hover:bg-border-custom text-text-muted hover:text-text-primary border-border-custom'
              }`}
            >
              {cat.title}
            </button>
          );
        })}
      </div>

      {/* Active Category Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 select-text">
        {skillCategories[activeCategory].skills.map((skill, idx) => {
          // Fallback glow color if not provided
          const glowColor = skill.glowColor || 'rgba(59, 130, 246, 0.2)';

          return (
            <div
              key={idx}
              className="glass-panel p-4 sm:p-5 md:p-6 border border-border-custom relative overflow-hidden group select-none hover:-translate-y-1.5 transition-all duration-300"
              style={{
                borderRadius: 'var(--card-radius)',
              }}
            >
              {/* Electromagnetic radial glow layer on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 75%)`,
                }}
              />

              {/* Glowing card border on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0 border border-solid"
                style={{
                  borderColor: glowColor,
                  borderRadius: 'var(--card-radius)',
                }}
              />

              {/* Core Info (Centered!) */}
              <div className="relative z-10 space-y-4 text-center flex flex-col items-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-text-primary uppercase tracking-wide">
                    {skill.name}
                  </span>
                  <span className="text-[9px] font-bold text-accent-primary font-mono bg-accent-primary/10 px-2 py-0.5 rounded mt-0.5">
                    {skill.level}%
                  </span>
                </div>

                {/* Animated Slider Bar Container */}
                <div className="w-full h-1.5 bg-bg-secondary border border-border-custom rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${skill.level}%`,
                      boxShadow: `0 0 8px ${glowColor}`,
                    }}
                  />
                </div>

                {/* Tiny Badge */}
                <div className="text-[9px] text-text-muted flex items-center justify-center gap-1 font-mono uppercase tracking-wider">
                  <TermIcon size={9} className="text-text-muted/60" /> {t('skills.verified')}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};
