import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, CheckCircle2 } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { useI18n } from '../context/I18nContext';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const { t } = useI18n();

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-primary/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-bg-secondary border border-border-custom shadow-2xl overflow-hidden flex flex-col md:flex-row"
            style={{ borderRadius: 'var(--card-radius)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-bg-primary/50 text-text-primary hover:bg-accent-primary hover:text-white transition-all shadow-md"
            >
              <X size={20} />
            </button>

            {/* Left: Project Image & Basic Info */}
            <div className="w-full md:w-1/2 relative h-64 md:h-auto border-b md:border-b-0 md:border-r border-border-custom">
              <img
                src={project.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000'}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent md:hidden" />
              
              <div className="absolute bottom-6 left-6 right-6 md:hidden">
                <span className="px-2 py-0.5 bg-accent-primary text-white text-[9px] font-bold uppercase tracking-widest rounded mb-2 inline-block">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-text-primary uppercase tracking-wide">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Right: Detailed Info */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[70vh] md:max-h-[85vh]">
              <div className="space-y-6">
                <div className="hidden md:block">
                  <span className="px-2 py-0.5 bg-accent-primary/20 text-accent-primary text-[10px] font-bold uppercase tracking-widest rounded mb-2 inline-block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-black text-text-primary uppercase tracking-tight leading-tight">
                    {project.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-text-muted leading-relaxed italic border-l-4 border-accent-primary pl-4">
                    {project.description}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                {project.features && (
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-text-primary uppercase tracking-widest font-mono flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-accent-primary" /> Key Features
                    </h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-text-muted">
                          <CheckCircle2 size={14} className="text-accent-primary mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-text-primary uppercase tracking-widest font-mono flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-accent-primary" /> Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-bg-primary border border-border-custom text-text-primary text-[9px] font-bold uppercase rounded font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-8 mt-auto">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2.5 bg-bg-primary hover:bg-accent-primary text-text-primary hover:text-white border border-border-custom hover:border-accent-primary text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded-xl"
                >
                  <Github size={14} /> {t('projects.source')}
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 bg-accent-primary text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded-xl shadow-lg shadow-accent-primary/20 hover:scale-105"
                  >
                    <ExternalLink size={14} /> {t('projects.demo')}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
