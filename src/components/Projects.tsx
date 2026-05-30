import React, { useState, useEffect } from 'react';
import { suggestedProjects, personalInfo } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { Star, GitFork, Grid } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [projectsList, setProjectsList] = useState(suggestedProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const reposRes = await fetch(`https://api.github.com/users/${personalInfo.github}/repos?per_page=10&sort=updated`);
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          if (Array.isArray(reposData)) {
            const updated = suggestedProjects.map((proj) => {
              const matchingRepo = reposData.find((r: { html_url: string, name: string, stargazers_count: number, forks_count: number }) =>
                r.html_url.toLowerCase().includes(proj.githubUrl.replace('https://github.com/', '').toLowerCase()) ||
                r.name.toLowerCase().includes(proj.title.toLowerCase().replace(/[^a-z0-9]/g, ''))
              );
              if (matchingRepo) return { ...proj, stars: matchingRepo.stargazers_count, forks: matchingRepo.forks_count };
              return proj;
            });
            setProjectsList(updated);
          }
        }
      } catch (err) { console.warn('GitHub API error fallback used.', err); }
    };
    fetchGitHubData();
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'enterprise', label: 'Enterprise Platforms' },
    { id: 'healthcare', label: 'Healthcare & Dispatch' },
    { id: 'ecommerce', label: 'E-Commerce Engines' },
  ];

  const filteredProjects = projectsList.filter((p) => activeFilter === 'all' || p.category === activeFilter);
  const openProjectDetails = (project: Project) => { setSelectedProject(project); setIsModalOpen(true); };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section id="projects" className="w-full py-32 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-border-custom relative select-none">
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-accent-glow blur-[150px] pointer-events-none rounded-full opacity-30" />
      <div className="text-center max-w-2xl mx-auto mb-24 space-y-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-1 bg-accent-primary/10 rounded-full text-[10px] font-black tracking-[0.2em] text-accent-primary uppercase font-mono border border-accent-primary/20 shadow-2xl">
          <Grid size={12} className="animate-pulse" /> {t('projects.badge')}
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-black tracking-tight text-text-primary uppercase">{t('projects.title')}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-[13px] text-text-muted leading-relaxed font-medium">{t('projects.desc')}</motion.p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mb-20">
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setActiveFilter(cat.id)} className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl border transition-all duration-500 cursor-pointer font-mono ${activeFilter === cat.id ? 'bg-accent-primary text-white border-transparent shadow-xl scale-105' : 'bg-bg-secondary/50 hover:bg-border-custom text-text-muted hover:text-text-primary border-border-custom backdrop-blur-md'}`}>{cat.label}</button>
        ))}
      </div>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 select-text">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => (
            <motion.div layout variants={cardVariants} key={proj.title} exit={{ opacity: 0, scale: 0.9 }} whileHover={{ y: -8 }} className="creative-card group flex flex-col min-h-[550px]">
              <div className="relative h-64 overflow-hidden rounded-t-[var(--card-radius)]">
                <img src={proj.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000'} alt={proj.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent opacity-90" />
                <div className="absolute top-5 left-5 flex gap-2"><div className="bg-bg-primary/95 backdrop-blur-xl px-3.5 py-1.5 rounded-2xl border border-white/10 flex items-center gap-2 shadow-2xl"><Star size={13} className="text-amber-400 fill-amber-400" /><span className="text-[12px] font-black text-text-primary font-mono">{proj.stars || 0}</span></div></div>
                <div className="absolute top-5 right-5"><div className="bg-accent-primary/90 backdrop-blur-xl px-4 py-1.5 rounded-2xl text-[9px] font-black text-white uppercase tracking-[0.2em] shadow-2xl border border-white/10">{proj.category}</div></div>
                <div className="absolute bottom-6 left-8 right-8"><h3 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">{proj.title}</h3></div>
              </div>
              <div className="p-10 flex flex-col flex-grow bg-gradient-to-b from-bg-secondary/40 to-transparent items-center text-center">
                <div className="space-y-8 flex-grow flex flex-col items-center">
                  <p className="text-[14.5px] text-text-muted leading-relaxed font-medium group-hover:text-text-primary transition-colors duration-500 max-w-[280px]">{proj.description}</p>
                  <div className="flex flex-wrap gap-2.5 justify-center">{proj.tech.map((t, idx) => ( <span key={idx} className="px-4 py-1.5 text-[10px] font-black bg-bg-primary/50 border border-border-custom text-text-primary rounded-xl font-mono uppercase tracking-[0.15em] transition-all hover:border-accent-primary hover:text-accent-primary">{t}</span> ))}</div>
                </div>
                <div className="mt-12 pt-8 border-t border-border-custom/30 flex flex-col items-center gap-6 w-full no-print">
                   <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-[11px] font-black text-text-muted uppercase tracking-[0.2em] font-mono"><GitFork size={16} className="text-accent-secondary" /><span>{proj.forks || 0} FORKS</span></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-border-custom" />
                      <div className="flex items-center gap-2 text-[11px] font-black text-text-muted uppercase tracking-[0.2em] font-mono"><Star size={16} className="text-amber-400" /><span>{proj.stars || 0} STARS</span></div>
                   </div>
                  <button onClick={() => openProjectDetails(proj)} className="group/btn relative px-10 py-4 bg-text-primary text-bg-primary rounded-[22px] font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all overflow-hidden w-full sm:w-auto"><span className="relative z-10">Expand Project</span><div className="absolute inset-0 bg-accent-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
