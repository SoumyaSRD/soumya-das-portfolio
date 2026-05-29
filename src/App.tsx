import { useState, useEffect } from 'react';
import { BackgroundParticles } from './components/BackgroundParticles';
import { TerminalIntro } from './components/TerminalIntro';
import { ChatBot } from './components/ChatBot';
import { CommandPalette } from './components/CommandPalette';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { certificationsAndInterests, mockBlogs, personalInfo } from './data/portfolioData';
import { Terminal as TermIcon, FileText, ChevronUp, Github, Linkedin, Mail, MessageSquarePlus } from 'lucide-react';

function App() {
  const [hasBooted, setHasBooted] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

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
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'certifications', 'blog', 'contact'];
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
    return <TerminalIntro onComplete={() => setHasBooted(true)} />;
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
            <span>srd.OS</span>
          </button>

          {/* Center Navigation Anchors */}
          <nav className="hidden lg:flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider font-sans">
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'experience', label: 'Timeline' },
              { id: 'projects', label: 'Showroom' },
              { id: 'certifications', label: 'Interests' },
              { id: 'blog', label: 'Blog' },
              { id: 'contact', label: 'Contact' },
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
            <ThemeSwitcher />
          </div>

        </div>
      </header>

      {/* ----------------------------------------------------
         MAIN PORTFOLIO WRAPPER
         ---------------------------------------------------- */}
      <main className="relative z-10 w-full flex flex-col items-center">
        {/* 1. Hero Introduction */}
        <Hero />

        {/* 2. Embedded Command-Line terminal terminal shell widget */}
        <div className="no-print w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-12 py-10 select-none">
          <div className="text-center mb-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent-secondary font-mono">
              [ Interactive Developer Shell ]
            </p>
            <p className="text-[11px] text-text-muted mt-1">
              Want a real developer experience? Type commands in the terminal shell below.
            </p>
          </div>
          <TerminalIntro onComplete={() => {}} isEmbedded={true} />
        </div>

        {/* 3. Detailed Career Story */}
        <About />

        {/* 4. Skills Progress Dashboard */}
        <Skills />

        {/* 5. Career Timelines (ESSPL & Zemusi) */}
        <Experience />

        {/* 6. Projects showcase showroom and Git integration */}
        <Projects />

        {/* 7. Certifications & Floating Secondary Interests Section */}
        <section id="certifications" className="w-full py-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-border-custom relative select-none">
          <div className="absolute top-10 left-10 w-48 h-48 bg-accent-glow blur-[100px] pointer-events-none rounded-full" />
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-primary/10 rounded-full text-[10px] font-bold tracking-widest text-accent-primary uppercase font-mono">
              <FileText size={11} className="animate-pulse" /> Domain Versatility
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-text-primary uppercase">
              Certifications & Interests
            </h2>
            <p className="text-xs text-text-muted leading-relaxed">
              Explore dynamic float cards representing secondary capabilities and certifications that enrich my fullstack vision.
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {certificationsAndInterests.map((cert, idx) => (
              <div
                key={idx}
                className="glass-panel p-4 sm:p-5 border border-border-custom flex flex-col items-center text-center justify-center relative overflow-hidden group hover:-translate-y-1.5 transition-all duration-300 select-none cursor-default"
                style={{
                  borderRadius: 'var(--card-radius)',
                  boxShadow: 'var(--theme-glow-style)',
                }}
              >
                <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {cert.icon}
                </div>
                <h4 className="text-[11px] font-bold text-text-primary uppercase tracking-wide truncate max-w-full">
                  {cert.name}
                </h4>
                <p className="text-[9px] text-text-muted mt-1.5 uppercase font-mono tracking-widest">
                  {cert.level}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Pinned Knowledge & Blog placeholder cards */}
        <section id="blog" className="w-full py-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-border-custom relative select-none">
          <div className="absolute bottom-10 right-1/4 w-52 h-52 bg-accent-glow blur-[120px] pointer-events-none rounded-full" />
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-primary/10 rounded-full text-[10px] font-bold tracking-widest text-accent-primary uppercase font-mono">
              <MessageSquarePlus size={11} className="animate-pulse" /> Engineering Insights
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-text-primary uppercase">
              Technical Blog Pinned
            </h2>
            <p className="text-xs text-text-muted leading-relaxed">
              Sharing software engineering and system architecture thinking from years of code delivery.
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
              Senior Fullstack Developer & Angular Architect. © {new Date().getFullYear()} All rights reserved.
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
         (Dynamic formatted layout optimized for PDF prints)
         ---------------------------------------------------- */}
      <div className="hidden print-only p-8 space-y-6 font-sans max-w-4xl mx-auto text-black">
        <div className="text-center border-b pb-4">
          <h1 className="text-3xl font-extrabold tracking-tight">{personalInfo.name}</h1>
          <p className="text-sm font-semibold text-gray-700 mt-1">{personalInfo.titles[0]}</p>
          <p className="text-xs text-gray-500 mt-2">
            Email: {personalInfo.email} | Location: {personalInfo.location} | LinkedIn: {personalInfo.linkedin}
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b">Professional Bio</h2>
          <p className="text-xs text-gray-600 leading-relaxed">{personalInfo.detailedAbout}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b">Employment Timeline</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold">
                <span>Enterprise System Solutions Pvt Ltd (ESSPL)</span>
                <span>Aug 2022 - Present</span>
              </div>
              <p className="text-xs italic text-gray-600">Senior Fullstack Developer</p>
              <ul className="list-disc pl-4 text-xs text-gray-600 mt-1 space-y-1">
                <li>Architected transport system fleet routing platform "20High".</li>
                <li>Integrated ECharts and Google Maps widgets.</li>
                <li>Developed reusable shared Angular library elements and monorepo configurations.</li>
                <li>Leveraged SonarQube automated gates reducing bug rates.</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold">
                <span>Zemusi Tech Solutions</span>
                <span>Jan 2019 - Aug 2022</span>
              </div>
              <p className="text-xs italic text-gray-600">Fullstack Web Developer</p>
              <ul className="list-disc pl-4 text-xs text-gray-600 mt-1 space-y-1">
                <li>Built React and Angular customer-facing applications for e-commerce and health.</li>
                <li>Developed Rest APIs using NestJS, Node.js and Express databases.</li>
                <li>Engineered shared component libraries.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b">Technical Profile</h2>
          <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
            <div><strong>Frontend:</strong> Angular, React, TypeScript, JavaScript, RxJS, NgRx, Tailwind CSS</div>
            <div><strong>Backend:</strong> Node.js, Express, NestJS, REST, GraphQL</div>
            <div><strong>Databases:</strong> MongoDB, PostgreSQL, SQL</div>
            <div><strong>Tools:</strong> Jenkins, SonarQube, Git, Nx Monorepo, Jira</div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
