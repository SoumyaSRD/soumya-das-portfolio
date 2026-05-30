import React, { useState, useEffect, useRef } from 'react';
import { Palette, Check, Sparkles, Monitor, Sun, Moon, Terminal, Cloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  accentColor: string;
  icon: React.ReactNode;
}

export const ThemeSwitcher: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<string>(() => {
    try {
      return localStorage.getItem('srd-portfolio-theme') || 'dark-dev';
    } catch (e) {
      return 'dark-dev';
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themes: ThemeOption[] = [
    {
      id: 'dark-dev',
      name: 'Stark Slate',
      description: 'The default developer experience',
      accentColor: '#3b82f6',
      icon: <Monitor size={14} />,
    },
    {
      id: 'enterprise',
      name: 'Nordic Frost',
      description: 'Clean, corporate & high-contrast',
      accentColor: '#1d3557',
      icon: <Sun size={14} />,
    },
    {
      id: 'scandinavian',
      name: 'Warm Sage',
      description: 'Organic tones & soft interfaces',
      accentColor: '#3a506b',
      icon: <Cloud size={14} />,
    },
    {
      id: 'classical',
      name: 'Royal Editorial',
      description: 'Elegant serif & burgundy accents',
      accentColor: '#8b0000',
      icon: <Sparkles size={14} />,
    },
    {
      id: 'cyberpunk',
      name: 'Pure Zinc',
      description: 'Minimalist monochrome obsidian',
      accentColor: '#ffffff',
      icon: <Moon size={14} />,
    },
    {
      id: 'nebula',
      name: 'Midnight Nebula',
      description: 'Deep space purple & neon glows',
      accentColor: '#c084fc',
      icon: <Sparkles size={14} />,
    },
    {
      id: 'retro',
      name: 'Retro Terminal',
      description: 'Classic green CRT aesthetic',
      accentColor: '#10b981',
      icon: <Terminal size={14} />,
    },
    {
      id: 'gold',
      name: 'Midnight Gold',
      description: 'Premium obsidian & liquid gold',
      accentColor: '#fbbf24',
      icon: <Sparkles size={14} />,
    },
    {
      id: 'prism',
      name: 'Glass Prism',
      description: 'Translucent crystal reflections',
      accentColor: '#6366f1',
      icon: <Cloud size={14} />,
    },
  ];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (themeId: string) => {
    setActiveTheme(themeId);
    localStorage.setItem('srd-portfolio-theme', themeId);
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: themeId }));
  };

  const currentTheme = themes.find(t => t.id === activeTheme) || themes[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-custom bg-bg-secondary/80 backdrop-blur-md text-text-primary text-xs font-bold hover:bg-bg-primary/50 transition-all duration-300 shadow-xl group"
      >
        <Palette size={14} className="text-accent-primary group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline uppercase tracking-wider">{currentTheme.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="ml-1 opacity-50"
        >
          <Check size={10} className="rotate-90" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-3 w-64 rounded-2xl border border-border-custom bg-bg-secondary/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden p-2"
          >
            <div className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-1">
              Select Interface Mode
            </div>
            <div className="space-y-1">
              {themes.map((theme) => {
                const isActive = theme.id === activeTheme;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                      isActive 
                        ? 'bg-accent-primary/10 border border-accent-primary/20' 
                        : 'hover:bg-bg-primary/60 border border-transparent'
                    }`}
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${theme.accentColor}20`, color: theme.accentColor }}
                    >
                      {theme.icon}
                    </div>
                    <div className="text-left flex-1">
                      <div className={`text-xs font-bold ${isActive ? 'text-accent-primary' : 'text-text-primary'}`}>
                        {theme.name}
                      </div>
                      <div className="text-[9px] text-text-muted font-medium line-clamp-1">
                        {theme.description}
                      </div>
                    </div>
                    {isActive && (
                      <motion.div layoutId="active-theme-check">
                        <Check size={14} className="text-accent-primary" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
