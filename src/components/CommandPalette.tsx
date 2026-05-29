import React, { useState, useEffect, useRef } from 'react';
import { Search, Compass, Palette, Sparkles, Terminal as TermIcon, FileDown } from 'lucide-react';

interface PaletteItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'navigation' | 'themes' | 'actions';
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const togglePalette = () => {
    setIsOpen(!isOpen);
    setSearchQuery('');
    setSelectedIndex(0);
  };

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        togglePalette();
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle outside click to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Change theme helper
  const changeTheme = (themeName: string) => {
    document.documentElement.setAttribute('data-theme', themeName);
    setIsOpen(false);
  };

  // Define commands
  const items: PaletteItem[] = [
    // 1. Navigation category
    {
      id: 'nav-hero',
      title: 'Jump to Home / Intro',
      subtitle: 'Scroll to the top hero introduction',
      category: 'navigation',
      icon: <Compass className="text-blue-400" size={16} />,
      action: () => scrollToSection('hero'),
    },
    {
      id: 'nav-about',
      title: 'Jump to About Section',
      subtitle: 'Read details of my professional profile & experience summary',
      category: 'navigation',
      icon: <Compass className="text-purple-400" size={16} />,
      action: () => scrollToSection('about'),
    },
    {
      id: 'nav-skills',
      title: 'Jump to Skill Dashboard',
      subtitle: 'Inspect specific ratings for frontend, backend & tools',
      category: 'navigation',
      icon: <Compass className="text-emerald-400" size={16} />,
      action: () => scrollToSection('skills'),
    },
    {
      id: 'nav-experience',
      title: 'Jump to Experience Timeline',
      subtitle: 'Review vertical timeline (ESSPL, Zemusi)',
      category: 'navigation',
      icon: <Compass className="text-rose-400" size={16} />,
      action: () => scrollToSection('experience'),
    },
    {
      id: 'nav-projects',
      title: 'Jump to Project Showroom',
      subtitle: 'Explore transport tracking, healthcare & LMS apps',
      category: 'navigation',
      icon: <Compass className="text-amber-400" size={16} />,
      action: () => scrollToSection('projects'),
    },
    {
      id: 'nav-certifications',
      title: 'Jump to Interests & Certifications',
      subtitle: 'View secondary domains, golang, flutter & devops cards',
      category: 'navigation',
      icon: <Compass className="text-sky-400" size={16} />,
      action: () => scrollToSection('certifications'),
    },
    {
      id: 'nav-contact',
      title: 'Jump to Contact Panel',
      subtitle: 'Drop an email, view booking calendar or locations',
      category: 'navigation',
      icon: <Compass className="text-indigo-400" size={16} />,
      action: () => scrollToSection('contact'),
    },

    // 2. Themes category
    {
      id: 'theme-dev',
      title: 'Activate Dark Developer Theme',
      subtitle: 'Neon blue/purple accents, black code background',
      category: 'themes',
      icon: <Palette className="text-violet-400" size={16} />,
      action: () => changeTheme('dark-dev'),
    },
    {
      id: 'theme-enterprise',
      title: 'Activate Enterprise Professional Theme',
      subtitle: 'Clean white background, sharp slate executive layout',
      category: 'themes',
      icon: <Palette className="text-slate-400" size={16} />,
      action: () => changeTheme('enterprise'),
    },
    {
      id: 'theme-cyber',
      title: 'Activate Cyberpunk Futuristic Theme',
      subtitle: 'Hot neon pink glows, glowing grids and holograms',
      category: 'themes',
      icon: <Palette className="text-pink-400" size={16} />,
      action: () => changeTheme('cyberpunk'),
    },
    {
      id: 'theme-scandinavian',
      title: 'Activate Minimal Scandinavian Theme',
      subtitle: 'Soft warm beige colors, elegant spacing, forest sage tones',
      category: 'themes',
      icon: <Palette className="text-green-600" size={16} />,
      action: () => changeTheme('scandinavian'),
    },
    {
      id: 'theme-classical',
      title: 'Activate Classical Editorial Theme',
      subtitle: 'Warm parchment background, burgundy accents, elegant serif typography',
      category: 'themes',
      icon: <Palette className="text-red-800" size={16} />,
      action: () => changeTheme('classical'),
    },

    // 3. Actions category
    {
      id: 'action-resume',
      title: 'Download / Print Professional Resume',
      subtitle: 'Triggers high-fidelity printer styles directly in the browser',
      category: 'actions',
      shortcut: '⌘P',
      icon: <FileDown className="text-yellow-400" size={16} />,
      action: () => {
        setIsOpen(false);
        window.print();
      },
    },
    {
      id: 'action-chatbot',
      title: 'Summon AI Recruiter Chatbot',
      subtitle: 'Open the floating smart AI interactive dialog',
      category: 'actions',
      shortcut: '⌘A',
      icon: <Sparkles className="text-purple-400" size={16} />,
      action: () => {
        setIsOpen(false);
        // Find Chatbot button and simulate click or dispatch event
        const botBtn = document.querySelector('.no-print button');
        if (botBtn) (botBtn as HTMLButtonElement).click();
      },
    },
  ];

  // Filtering
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Key navigation for items
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [isOpen, filteredItems, selectedIndex]);

  // Adjust selected index on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  if (!isOpen) {
    return (
      <button
        onClick={togglePalette}
        className="no-print flex items-center gap-2 px-2.5 py-1.5 md:px-3 bg-bg-secondary hover:bg-border-custom border border-border-custom rounded-xl text-text-muted hover:text-text-primary text-xs transition-all duration-200 cursor-pointer shadow-sm select-none"
        title="Open Command Menu"
      >
        <Search size={13} className="text-text-muted" />
        <span className="hidden md:inline">Command Menu</span>
        <kbd className="hidden md:inline-flex px-1.5 py-0.5 bg-bg-primary border border-border-custom rounded-md text-[9px] font-bold">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-start justify-center pt-24 z-50 no-print px-4 animate-in fade-in duration-200">
      <div
        ref={containerRef}
        className="w-full max-w-[600px] glass-panel overflow-hidden border flex flex-col shadow-2xl animate-in slide-in-from-top-4 duration-300"
        style={{
          boxShadow: 'var(--theme-glow-style)',
          borderRadius: 'var(--card-radius)',
        }}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border-custom bg-bg-secondary/40">
          <Search size={18} className="text-text-muted animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder-text-muted text-sm font-sans"
            placeholder="Type a command or search sections, themes, or actions..."
          />
          <button
            onClick={togglePalette}
            className="px-2 py-1 rounded bg-bg-secondary text-text-muted hover:text-text-primary text-[10px] uppercase font-bold border border-border-custom transition-all duration-150 cursor-pointer"
          >
            esc
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[350px] overflow-y-auto p-2 space-y-1 bg-bg-primary/25">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-text-muted font-sans flex flex-col items-center gap-2">
              <TermIcon size={24} className="text-accent-secondary" />
              <span>No commands or items matched your query.</span>
            </div>
          ) : (
            // Group by category helper (we'll just render linear with category label if it changes)
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              const prevItem = index > 0 ? filteredItems[index - 1] : null;
              const showCategoryHeader = !prevItem || prevItem.category !== item.category;

              return (
                <div key={item.id}>
                  {showCategoryHeader && (
                    <div className="px-3 py-1.5 text-[9px] font-bold text-accent-primary uppercase tracking-wider select-none font-sans mt-2 first:mt-0">
                      {item.category}
                    </div>
                  )}
                  <button
                    onClick={item.action}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-150 cursor-pointer font-sans ${
                      isSelected
                        ? 'bg-accent-primary text-white'
                        : 'hover:bg-bg-secondary text-text-primary'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                          isSelected ? 'bg-white/20 border-white/20' : 'bg-bg-secondary border-border-custom'
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-text-primary'}`}>
                          {item.title}
                        </div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-white/70' : 'text-text-muted'}`}>
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    {item.shortcut && (
                      <kbd
                        className={`px-1.5 py-0.5 text-[9px] rounded font-bold border ${
                          isSelected
                            ? 'bg-white/20 border-white/10 text-white'
                            : 'bg-bg-primary border-border-custom text-text-muted'
                        }`}
                      >
                        {item.shortcut}
                      </kbd>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Keyboard hints footer */}
        <div className="bg-bg-secondary px-4 py-2 border-t border-border-custom flex justify-between items-center text-[10px] text-text-muted select-none">
          <div className="flex items-center gap-3">
            <span>↑↓ to Navigate</span>
            <span>↵ to Select</span>
          </div>
          <div>
            <span>Press <kbd className="px-1 py-0.2 bg-bg-secondary rounded border border-border-custom">⌘K</kbd> to toggle</span>
          </div>
        </div>
      </div>
    </div>
  );
};
