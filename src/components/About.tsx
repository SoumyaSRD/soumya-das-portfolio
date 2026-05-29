import React, { useEffect, useState, useRef } from 'react';
import { personalInfo } from '../data/portfolioData';
import { ShieldCheck, Users, Layers, Award } from 'lucide-react';

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
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1200; // ms
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
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

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
  return (
    <section id="about" className="w-full py-20 px-6 max-w-6xl mx-auto border-b border-border-custom relative select-none">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-accent-glow blur-[120px] pointer-events-none rounded-full" />

      {/* Main Content Centered */}
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 select-text">
        <div className="inline-block text-[10px] font-bold tracking-widest text-accent-primary uppercase font-mono px-3 py-1 bg-accent-primary/10 rounded-full">
          About Soumya
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight uppercase leading-tight">
          7+ Years of Fullstack Crafts
        </h2>
        
        <p className="text-sm md:text-base leading-relaxed text-text-muted max-w-3xl mx-auto">
          {personalInfo.detailedAbout}
        </p>

        {/* perfectly centered stats counters */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto pt-6 select-none">
          {personalInfo.stats.map((stat, idx) => (
            <StatCounter key={idx} endVal={stat.value} label={stat.label} />
          ))}
        </div>
      </div>

      {/* Capabilities Symmetrical Card Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-16 relative z-10 select-none">
        
        {/* Core Capability 1 */}
        <div className="flex flex-col items-center text-center p-6 border border-border-custom rounded-2xl bg-bg-secondary/40 hover:bg-bg-secondary transition-colors duration-200">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4 flex-shrink-0">
            <Layers size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Frontend Architecture</h4>
            <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
              Specialist in monorepo structures (Nx), shared component libraries, microfrontends, and optimized lazy loaded module streams.
            </p>
          </div>
        </div>

        {/* Core Capability 2 */}
        <div className="flex flex-col items-center text-center p-6 border border-border-custom rounded-2xl bg-bg-secondary/40 hover:bg-bg-secondary transition-colors duration-200">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4 flex-shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Code Quality</h4>
            <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
              Leveraging SonarQube quality gates, strict testing frameworks, and modular design patterns to drive zero-bug delivery rates.
            </p>
          </div>
        </div>

        {/* Core Capability 3 */}
        <div className="flex flex-col items-center text-center p-6 border border-border-custom rounded-2xl bg-bg-secondary/40 hover:bg-bg-secondary transition-colors duration-200">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 flex-shrink-0">
            <Users size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Scrum Mentorship</h4>
            <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
              Leading sprints, organizing peer reviews, and hosting RxJS & NgRx masterclasses to guide junior/mid-level squad members.
            </p>
          </div>
        </div>

        {/* Core Capability 4 */}
        <div className="flex flex-col items-center text-center p-6 border border-border-custom rounded-2xl bg-bg-secondary/40 hover:bg-bg-secondary transition-colors duration-200">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4 flex-shrink-0">
            <Award size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Backend Scalability</h4>
            <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
              Architecting resilient microservices utilizing NestJS, Node API routes, caching, and complex relational or document databases.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
