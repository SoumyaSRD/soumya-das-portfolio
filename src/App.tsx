import { useState, useEffect, useCallback } from 'react';
import { BackgroundParticles } from './components/BackgroundParticles';
import { TerminalIntro } from './components/TerminalIntro';
import { ChatBot } from './components/ChatBot';
import { CommandPalette } from './components/CommandPalette';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useI18n } from './context/I18nContext';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Testimonials } from './components/Testimonials';
import { GitHubActivity } from './components/GitHubActivity';
import { certificationsAndInterests, mockBlogs, personalInfo } from './data/portfolioData';
import { Terminal as TermIcon, FileText, ChevronUp, Github, Linkedin, Mail, MessageSquarePlus } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const { t } = useI18n();
  const [hasBooted, setHasBooted] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const handleBootComplete = useCallback(() => {
    setHasBooted(true);
  }, []);

  // 1. Mouse Spotlight Glow position tracking
  useEffect(() => {
    const updateMousePos = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePos);
    return () => window.removeEventListener('mousemove', updateMousePos);
  }, []);

  // 2. Scroll event tracker (Active section indicator and scroll to top button)
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Section highlighters
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'github', 'testimonials', 'certifications', 'blog', 'contact'];
      let current = 'hero';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render Full Screen Kernel bootloading screen on startup
  if (!hasBooted) {
    return <TerminalIntro onComplete={handleBootComplete} />;
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center text-text-primary bg-bg-primary overflow-x-hidden font-sans">
      
      {/* Dynamic Cursor Spotlight Radial Glow Bubble (Highly Premium!) */}
      <div
        className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-30 opacity-20 bg-gradient-to-r from-accent-primary to-accent-secondary blur-[100px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 hidden md:block"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* Optimized Canvas Background Particles (Theme-adaptive) */}
      <BackgroundParticles />

      {/* ----------------------------------------------------
         NAVIGATION HEADER (Sticky, Blur Glassmorphism)
         ---------------------------------------------------- */}
      <header className="no-print sticky top-0 w-full z-40 bg-bg-primary/75 backdrop-blur-md border-b border-border-custom transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-4 flex items-center justify-between">
          
          {/* Logo Brand */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 cursor-pointer font-mono font-black text-xs md:text-sm tracking-wider uppercase text-text-primary hover:text-accent-primary transition-all group"
          >
            <TermIcon size={16} className="text-accent-primary animate-pulse group-hover:rotate-12 transition-transform" />
            <span>{t('nav.brand')}</span>
          </button>

          {/* Center Navigation Anchors */}
          <nav className="hidden lg:flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider font-sans">
            {[
              { id: 'about', label: t('nav.about') },
              { id: 'skills', label: t('nav.skills') },
              { id: 'experience', label: t('nav.timeline') },
              { id: 'projects', label: t('nav.showroom') },
              { id: 'github', label: t('nav.github') },
              { id: 'testimonials', label: t('nav.testimonials') },
              { id: 'contact', label: t('nav.contact') },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`transition-colors cursor-pointer select-none ${
                  activeSection === link.id
                    ? 'text-accent-primary font-black'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Command Menu Finder & Theme switcher widgets */}
          <div className="flex items-center gap-4">
            <CommandPalette />
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>

        </div>
      </header>

      {/* ----------------------------------------------------
         MAIN PORTFOLIO WRAPPER
         ---------------------------------------------------- */}
      <main className="relative z-10 w-full flex flex-col items-center gap-32">
        {/* 1. Hero Introduction */}
        <Hero />

        {/* 2. Embedded Command-Line terminal shell widget */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="no-print w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-12 select-none"
        >
          <div className="text-center mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-secondary font-mono mb-2">
              [ Interactive Developer Shell ]
            </p>
            <p className="text-[12px] text-text-muted font-medium">
              Want a real developer experience? Type commands in the terminal shell below.
            </p>
          </div>
          <TerminalIntro onComplete={() => {}} isEmbedded={true} />
        </motion.div>

        {/* 3. Detailed Career Story */}
        <About />

        {/* 4. Skills Progress Dashboard */}
        <Skills />

        {/* 5. Career Timelines (ESSPL & Zemusi) */}
        <Experience />

        {/* 6. Projects showcase showroom and Git integration */}
        <Projects />

        {/* 6.1 GitHub Activity & Testimonials */}
        <GitHubActivity />
        <Testimonials />

        {/* 7. Certifications & Floating Secondary Interests Section */}
        <section id="certifications" className="w-full py-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-border-custom relative select-none">
          <div className="absolute top-10 left-10 w-48 h-48 bg-accent-glow blur-[100px] pointer-events-none rounded-full" />
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-primary/10 rounded-full text-[10px] font-bold tracking-widest text-accent-primary uppercase font-mono">
              <FileText size={11} className="animate-pulse" /> {t('certifications.badge')}
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-text-primary uppercase">
              {t('certifications.title')}
            </h2>
            <p className="text-xs text-text-muted leading-relaxed">
              {t('certifications.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {certificationsAndInterests.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -10, rotateZ: idx % 2 === 0 ? 2 : -2 }}
                className="creative-card p-8 flex flex-col items-center text-center justify-center relative overflow-hidden group cursor-default h-[200px]"
                style={{
                  boxShadow: 'var(--theme-glow-style)',
                }}
              >
                <div className="w-16 h-16 rounded-3xl bg-accent-primary/5 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform border border-accent-primary/10 shadow-2xl relative">
                  {cert.icon}
                  <div className="absolute inset-0 bg-accent-primary/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-[12px] font-black text-text-primary uppercase tracking-[0.1em] truncate max-w-full">
                  {cert.name}
                </h4>
                <p className="text-[9px] text-accent-primary mt-2 uppercase font-black tracking-[0.2em] opacity-60">
                  {cert.level}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 8. Pinned Knowledge & Blog placeholder cards */}
        <section id="blog" className="w-full py-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-border-custom relative select-none">
          <div className="absolute bottom-10 right-1/4 w-52 h-52 bg-accent-glow blur-[120px] pointer-events-none rounded-full" />
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-primary/10 rounded-full text-[10px] font-bold tracking-widest text-accent-primary uppercase font-mono">
              <MessageSquarePlus size={11} className="animate-pulse" /> {t('blog.badge')}
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-text-primary uppercase">
              {t('blog.title')}
            </h2>
            <p className="text-xs text-text-muted leading-relaxed">
              {t('blog.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 select-text">
            {mockBlogs.map((blog) => (
              <article
                key={blog.id}
                className="glass-panel p-6 border border-border-custom flex flex-col justify-between hover:border-accent-primary/30 transition-all duration-300 relative group"
                style={{
                  borderRadius: 'var(--card-radius)',
                }}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-mono font-bold text-text-muted uppercase">
                    <span>{blog.date}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-text-primary uppercase tracking-wide group-hover:text-accent-primary transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-6">
                  {blog.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 text-[9px] font-bold bg-bg-secondary text-text-primary rounded font-mono">
                      #{t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 9. Contact communications dashboard and slots planner */}
        <Contact />
      </main>

      {/* ----------------------------------------------------
         GLOBAL RECRUITER AI CHATBOT DRAWER
         ---------------------------------------------------- */}
      <ChatBot />

      {/* ----------------------------------------------------
         PAGE FOOTER (Corporate dashboard standard)
         ---------------------------------------------------- */}
      <footer className="w-full bg-bg-secondary border-t border-border-custom py-12 px-6 relative z-10 select-none">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-text-primary">
              Soumya Ranjan Das
            </h3>
            <p className="text-[10px] text-text-muted leading-relaxed">
              © {new Date().getFullYear()} - {t('footer.role')}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`https://github.com/${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-primary transition-colors"
            >
              <Github size={16} />
            </a>
            <a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-primary transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-text-muted hover:text-accent-primary transition-colors"
            >
              <Mail size={16} />
            </a>
          </div>

          <div className="text-center md:text-right text-[10px] font-mono text-text-muted uppercase tracking-wider">
            Built with React, Vite & Tailwind CSS v4.0
          </div>

        </div>
      </footer>

      {/* ----------------------------------------------------
         SCROLL TO TOP MICRO-ACTION FLOATER
         ---------------------------------------------------- */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="no-print fixed bottom-24 right-6 w-10 h-10 rounded-xl bg-bg-secondary hover:bg-accent-primary hover:text-white text-text-primary border border-border-custom flex items-center justify-center cursor-pointer shadow-md transition-all hover:scale-105 active:scale-95 z-40"
        >
          <ChevronUp size={16} />
        </button>
      )}

      {/* ----------------------------------------------------
         PRINT ONLY RESUME FORMAT
         (High-Fidelity single-column CV format optimized for PDF printouts and 90%+ ATS parsing scores)
         ---------------------------------------------------- */}
      <div className="hidden print-only p-10 font-sans max-w-4xl mx-auto text-gray-900 bg-white">
        
        {/* Contact Info Header block */}
        <div className="text-center border-b-2 border-blue-900 pb-5">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{personalInfo.name}</h1>
          <p className="text-base font-bold text-blue-800 uppercase tracking-widest mt-1">
            Senior Fullstack Developer | Enterprise Systems Architect
          </p>
          <div className="text-[11px] text-gray-600 mt-3 flex justify-center gap-x-4 gap-y-1.5 flex-wrap font-mono">
            <span><strong>Email:</strong> {personalInfo.email}</span>
            <span>•</span>
            <span><strong>Location:</strong> {personalInfo.location}</span>
            <span>•</span>
            <span><strong>LinkedIn:</strong> {personalInfo.linkedin}</span>
            <span>•</span>
            <span><strong>GitHub:</strong> github.com/{personalInfo.github}</span>
          </div>
        </div>

        {/* 1. Professional Summary (ATS Keyword Rich) */}
        <div className="mt-6 space-y-2">
          <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-blue-900 border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-[12px] text-gray-700 leading-relaxed text-justify">
            Results-driven **Senior Fullstack Developer** and **Enterprise Architect** with **7+ years of experience** spearheading high-fidelity web systems, modular microfrontends, and highly scalable API architectures. Proven expertise architecting complex monorepos (Nx) and building custom, reusable shared component libraries that streamline features development for cross-functional squads. Specialized in **Angular**, **React**, **TypeScript**, and **RxJS/NgRx reactive state management**, combined with robust backend engineering utilizing **Node.js**, **NestJS**, **Express**, **PostgreSQL**, and **MongoDB**. Demonstrated track record implementing automated code quality scans (SonarQube) to eliminate technical debt and reduce production bug rates by 35%. Dedicated to leading squad sprints, conducting rigorous peer reviews, and mentoring agile software engineering teams.
          </p>
        </div>

        {/* 2. Core Technical Profile (Categorized skills) */}
        <div className="mt-6 space-y-2">
          <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-blue-900 border-b border-gray-300 pb-1">
            Technical Expertise
          </h2>
          <div className="space-y-1 text-[11px] text-gray-800 leading-relaxed font-sans">
            <div><strong>Frontend Engineering & Architecture:</strong> Angular, React, TypeScript, JavaScript (ES6+), RxJS, NgRx, Redux State, Tailwind CSS, Material UI, Microfrontends, Nx Monorepos, Custom Library Packages, HTML5, CSS3, DOM Manipulation.</div>
            <div><strong>Backend & APIs Design:</strong> Node.js, NestJS, Express.js, RESTful APIs, GraphQL, Microservices Architecture, REST Web Services, JSON payloads, WebSockets (Socket.io).</div>
            <div><strong>Databases & Caching:</strong> PostgreSQL, MongoDB, SQL, Redis Caching, Database Schema Design, Query Optimization, Transaction Handling.</div>
            <div><strong>DevOps & Engineering Tools:</strong> Jenkins, CI/CD Pipeline Automation, SonarQube, Git, GitHub Actions, Docker Containers, Jira, Agile/Scrum Sprints, Unit Testing (Jest, Karma, Jasmine).</div>
          </div>
        </div>

        {/* 3. Professional Experience (Action Verbs and quantitative achievements) */}
        <div className="mt-6 space-y-4">
          <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-blue-900 border-b border-gray-300 pb-1">
            Professional Employment History
          </h2>
          <div className="space-y-5">
            
            {/* Experience 1: ESSPL */}
            <div>
              <div className="flex justify-between items-baseline text-[12px] font-bold text-gray-900">
                <span>Enterprise System Solutions Pvt Ltd (ESSPL)</span>
                <span>August 2022 – Present</span>
              </div>
              <div className="flex justify-between items-baseline text-[11px] text-blue-800 font-semibold italic">
                <span>Senior Fullstack Developer & Angular Architect</span>
                <span>Bhubaneswar, Odisha, India</span>
              </div>
              <ul className="list-disc pl-5 mt-1.5 text-[11.5px] text-gray-700 space-y-1.5 leading-relaxed">
                <li>
                  <strong>Architected and co-built</strong> the premium corporate Transport Management System platform <strong>"20High"</strong>, handling complex real-time logistics mapping, fleet routing vector calculations, and geofencing systems.
                </li>
                <li>
                  <strong>Engineered and integrated</strong> advanced real-time geographical widgets using the <strong>Google Maps API</strong> and responsive visual analytics overlays utilizing <strong>Apache ECharts</strong> to map heavy daily shipments.
                </li>
                <li>
                  <strong>Designed and implemented</strong> clean, scalable <strong>Nx monorepo configurations</strong> to unify core enterprise web products, reducing build duplication and introducing highly reusable microfrontend structures.
                </li>
                <li>
                  <strong>Authored custom, shared Angular library packages</strong> and reusable component elements, reducing feature delivery times by 25% across 4 internal developer squads.
                </li>
                <li>
                  <strong>Instituted SonarQube automated quality gates</strong> and strict linting constraints into CI/CD pipelines, driving down post-release production bug counts by 35%.
                </li>
                <li>
                  <strong>Mentored and guided</strong> a team of 10+ junior/mid-level software engineers, hosting masterclass workshops on reactive streams with <strong>RxJS</strong> and state architectures with <strong>NgRx</strong>.
                </li>
              </ul>
            </div>

            {/* Experience 2: Zemusi */}
            <div>
              <div className="flex justify-between items-baseline text-[12px] font-bold text-gray-900">
                <span>Zemusi Tech Solutions</span>
                <span>January 2019 – August 2022</span>
              </div>
              <div className="flex justify-between items-baseline text-[11px] text-blue-800 font-semibold italic">
                <span>Fullstack Web Developer</span>
                <span>Bhubaneswar, Odisha, India</span>
              </div>
              <ul className="list-disc pl-5 mt-1.5 text-[11.5px] text-gray-700 space-y-1.5 leading-relaxed">
                <li>
                  <strong>Developed and deployed</strong> high-performance, customer-facing web applications in <strong>React</strong> and <strong>Angular</strong> for major enterprise e-commerce portals and healthcare patient tracking dashboards.
                </li>
                <li>
                  <strong>Designed and optimized</strong> high-concurrency <strong>RESTful APIs</strong> utilizing <strong>Node.js, Express.js, and NestJS</strong> backends, managing high transaction rates and secure JWT authentication cycles.
                </li>
                <li>
                  <strong>Engineered highly optimized shared component libraries</strong> and custom React hooks, boosting code reusability across multiple cross-functional developer squads.
                </li>
                <li>
                  <strong>Collaborated closely</strong> with visual UI/UX designers and enterprise stakeholders to translate complex wireframes into responsive, state-driven user interfaces.
                </li>
                <li>
                  <strong>Managed database operations</strong> and schema optimizations in <strong>MongoDB</strong> and <strong>PostgreSQL</strong>, improving query execution times by 20% through index fine-tuning.
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 4. Flagship Projects Showcase (ATS Parsable highlights) */}
        <div className="mt-6 space-y-2">
          <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-blue-900 border-b border-gray-300 pb-1">
            Flagship Project Deployments
          </h2>
          <div className="space-y-2 text-[11px] text-gray-700 leading-relaxed font-sans">
            <div>
              <strong>Transport Management System ("20High"):</strong> Enterprise fleet logistics platform featuring live Google Maps telemetry tracking and dynamic ECharts analytics. <em>(Technologies: Angular, NgRx, RxJS, Google Maps API, ECharts).</em>
            </div>
            <div>
              <strong>Ambulance Dispatch & Emergency Tracker:</strong> Real-time emergency ambulance tracking and dispatch portal bridging callers, dispatchers, and hospitals via live socket pipelines. <em>(Technologies: React, Node.js, Express, MongoDB, Socket.io, Tailwind CSS).</em>
            </div>
          </div>
        </div>

        {/* 5. Education & Credentials */}
        <div className="mt-6 space-y-2">
          <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-blue-900 border-b border-gray-300 pb-1">
            Education & Certifications
          </h2>
          <div className="flex justify-between items-baseline text-[11px] font-bold text-gray-900">
            <span>Biju Patnaik University of Technology (BPUT)</span>
            <span>Bhubaneswar, India</span>
          </div>
          <div className="flex justify-between items-baseline text-[11px] text-gray-700 italic">
            <span>Bachelor of Technology (B.Tech) in Computer Science & Engineering</span>
            <span>Graduated July 2018</span>
          </div>
          <div className="text-[11px] text-gray-700 mt-2 font-mono">
            <strong>Key Focus Certifications:</strong> Machine Learning Specialist • GraphQL & Apollo API Design • Cross-Platform Mobile Dev (Flutter & React Native) • Go Lang Concurrency
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;
