import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Github, Star, GitFork, BookOpen, Activity } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useI18n } from '../context/I18nContext';

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  top_languages: { name: string; color: string }[];
}

export const GitHubActivity: React.FC = () => {
  const { t } = useI18n();
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${personalInfo.github}`);
        if (!userRes.ok) throw new Error('User not found');
        const userData = await userRes.json();
        const reposRes = await fetch(`https://api.github.com/users/${personalInfo.github}/repos?per_page=100`);
        if (!reposRes.ok) throw new Error('Repos not found');
        const reposData = await reposRes.json();
        if (!Array.isArray(reposData)) throw new Error('Invalid repos data');
        const totalStars = reposData.reduce((acc: number, repo: { stargazers_count: number }) => acc + (repo.stargazers_count || 0), 0);
        const languages = [
          { name: 'TypeScript', color: '#3178c6' },
          { name: 'JavaScript', color: '#f7df1e' },
          { name: 'Angular', color: '#dd0031' },
          { name: 'React', color: '#61dafb' }
        ];
        setStats({
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          total_stars: totalStars,
          top_languages: languages
        });
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGitHubData();
  }, []);

  return (
    <section id="github" className="w-full py-32 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-border-custom relative">
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-accent-glow blur-[160px] pointer-events-none rounded-full opacity-20" />
      <div className="text-center max-w-2xl mx-auto mb-24 space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-1 bg-accent-primary/10 rounded-full text-[10px] font-black tracking-[0.2em] text-accent-primary uppercase font-mono border border-accent-primary/20 shadow-2xl">
          <Activity size={12} className="animate-pulse" /> {t('github.badge')}
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary uppercase">{t('github.title')}</h2>
        <p className="text-[13.5px] text-text-muted leading-relaxed font-medium">{t('github.desc')}</p>
      </div>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {loading ? (
          Array(4).fill(0).map((_, i) => ( <div key={i} className="glass-panel p-10 border border-border-custom animate-pulse h-48 rounded-[30px]" /> ))
        ) : stats ? (
          <>
            {[
              { icon: <BookOpen size={28} />, val: stats.public_repos, label: 'Public Repositories', color: 'accent-primary' },
              { icon: <Star size={28} />, val: stats.total_stars, label: 'Total Stars Earned', color: 'accent-secondary' },
              { icon: <GitFork size={28} />, val: stats.followers, label: 'Github Followers', color: 'accent-primary' },
              { icon: <Github size={28} />, val: stats.following, label: 'Following', color: 'accent-secondary' }
            ].map((stat, i) => (
              <motion.div key={i} variants={cardVariants} whileHover={{ y: -8, transition: { duration: 0.2 } }} className="creative-card p-10 flex flex-col items-center justify-center text-center group min-h-[220px] shadow-2xl">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-2xl ${stat.color === 'accent-primary' ? 'bg-accent-primary/10 text-accent-primary' : 'bg-accent-secondary/10 text-accent-secondary'}`}>
                   {stat.icon}
                </div>
                <h3 className="text-3xl font-black text-text-primary font-mono tracking-tighter">{stat.val}</h3>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mt-3 opacity-70 group-hover:text-accent-primary transition-colors">{stat.label}</p>
              </motion.div>
            ))}
          </>
        ) : (
          <div className="col-span-full text-center text-text-muted py-10 font-mono text-xs">Unable to fetch real-time activity. Please check your connection.</div>
        )}
      </motion.div>
      {!loading && stats && (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-20 flex flex-wrap justify-center gap-6">
          {stats.top_languages.map((lang, idx) => (
            <span key={idx} className="px-8 py-3 bg-bg-secondary/90 backdrop-blur-xl border border-border-custom rounded-[20px] text-[12px] font-black text-text-primary uppercase tracking-[0.3em] font-mono flex items-center gap-4 shadow-2xl hover:border-accent-primary transition-all cursor-default">
              <span className="w-3 h-3 rounded-full shadow-[0_0_15px_inherit]" style={{ backgroundColor: lang.color, boxShadow: `0 0 15px ${lang.color}` }} />
              {lang.name}
            </span>
          ))}
        </motion.div>
      )}
    </section>
  );
};
