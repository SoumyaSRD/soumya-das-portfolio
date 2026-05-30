import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '../data/portfolioData';
import { useI18n } from '../context/I18nContext';

export const Testimonials: React.FC = () => {
  const { t } = useI18n();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="testimonials" className="w-full py-32 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-border-custom relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-glow blur-[160px] pointer-events-none rounded-full opacity-30" />
      <div className="text-center max-w-2xl mx-auto mb-24 space-y-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-1 bg-accent-primary/10 rounded-full text-[10px] font-black tracking-[0.2em] text-accent-primary uppercase font-mono border border-accent-primary/20 shadow-2xl">
          <Quote size={12} className="animate-pulse" /> {t('testimonials.badge')}
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-black tracking-tight text-text-primary uppercase">{t('testimonials.title')}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-[13.5px] text-text-muted leading-relaxed font-medium">{t('testimonials.desc')}</motion.p>
      </div>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="creative-card p-12 flex flex-col items-center text-center justify-between group min-h-[400px] shadow-2xl"
          >
            <div className="absolute top-8 right-8 text-accent-primary/10 group-hover:text-accent-primary/20 transition-colors transform group-hover:rotate-12 duration-500">
              <Quote size={80} />
            </div>
            
            <div className="space-y-12 relative flex flex-col items-center w-full">
              <p className="text-[17px] text-text-muted leading-relaxed font-medium italic group-hover:text-text-primary transition-colors duration-500">
                "{testimonial.content}"
              </p>
              
              <div className="flex flex-col items-center gap-5">
                <div className="w-20 h-20 rounded-[24px] overflow-hidden border-2 border-accent-primary/20 p-0.5 bg-gradient-to-tr from-accent-primary to-accent-secondary shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <img
                    src={testimonial.avatar || `https://i.pravatar.cc/150?u=${testimonial.name}`}
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-[22px]"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-black text-text-primary uppercase tracking-[0.1em]">
                    {testimonial.name}
                  </h4>
                  <p className="text-[11px] text-accent-primary font-black uppercase tracking-[0.4em] mt-2 font-mono opacity-80">
                    {testimonial.role} @ {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
