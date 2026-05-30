import React, { useEffect, useState, useRef } from 'react';
import { personalInfo } from '../data/portfolioData';
import { ShieldCheck, Users, Layers, Award } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface CounterProps {
  endVal: string;
  label: string;
}

const StatCounter: React.FC<CounterProps> = ({ endVal, label }) => {
  const [count, setCount] = useState<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const numericVal = parseInt(endVal.replace(/\D/g, '')) || 0;
  const suffix = endVal.replace(/\d/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1200;
          const stepTime = Math.max(Math.floor(duration / numericVal), 15);
          const timer = setInterval(() => {
            start += 1;
            if (start >= numericVal) {
              setCount(numericVal);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, stepTime);
        }
      }, { threshold: 0.1 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [numericVal, hasAnimated]);

  return (
    <div ref={elementRef} className="glass-panel p-4 sm:p-5 md:p-6 text-center border border-border-custom relative group select-none flex-1">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-inherit" />
      <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-accent-primary tracking-tight font-mono">
        {hasAnimated ? `${count}${suffix}` : '0'}
      </div>
      <div className="text-[10px] sm:text-[11px] font-bold text-text-muted mt-2 uppercase tracking-widest font-sans">
        {label}
      </div>
    </div>
  );
};

export const About: React.FC = () => {
  const { t } = useI18n();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="about" className="w-full py-32 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-border-custom relative select-none">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-glow blur-[160px] pointer-events-none rounded-full opacity-30" />
      <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10 mb-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-block text-[10px] font-black tracking-[0.3em] text-accent-primary uppercase font-mono px-4 py-1.5 bg-accent-primary/10 rounded-full border border-accent-primary/20 shadow-2xl">{t('about.badge')}</motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-black text-text-primary uppercase leading-none">{t('about.heading')}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-[15px] md:text-lg leading-relaxed text-text-muted max-w-3xl mx-auto font-medium">{t('hero.bio')}</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-6 max-w-4xl mx-auto pt-10 select-none">
          {personalInfo.stats.map((stat, idx) => ( <StatCounter key={idx} endVal={stat.value} label={stat.label} /> ))}
        </motion.div>
      </div>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-16 relative z-10 select-none">
        {[
          { icon: <Layers size={32} />, accent: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', title: 'about.cap.fe.title', desc: 'about.cap.fe.desc' },
          { icon: <ShieldCheck size={32} />, accent: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20', title: 'about.cap.qa.title', desc: 'about.cap.qa.desc' },
          { icon: <Users size={32} />, accent: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', title: 'about.cap.scrum.title', desc: 'about.cap.scrum.desc' },
          { icon: <Award size={32} />, accent: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20', title: 'about.cap.be.title', desc: 'about.cap.be.desc' }
        ].map((cap, i) => (
          <motion.div key={i} variants={cardVariants} whileHover={{ y: -10, transition: { duration: 0.3 } }} className="creative-card p-12 group flex flex-col items-center text-center justify-between min-h-[350px]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[var(--card-radius)]" />
            <div className={`relative w-24 h-24 rounded-[32px] ${cap.bg} flex items-center justify-center ${cap.accent} mb-10 transition-transform group-hover:scale-110 group-hover:rotate-3 border ${cap.border} shadow-2xl`}>
              {cap.icon}
              <div className="absolute -inset-4 bg-inherit opacity-20 blur-xl rounded-full" />
            </div>
            <div className="relative space-y-6">
              <h4 className="text-lg font-black text-text-primary uppercase tracking-[0.1em]">{t(cap.title)}</h4>
              <p className="text-sm text-text-muted leading-relaxed font-medium group-hover:text-text-primary transition-colors">{t(cap.desc)}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
