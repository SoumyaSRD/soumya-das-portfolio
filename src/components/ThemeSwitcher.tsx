import React, { useState, useEffect } from 'react';
import { Monitor, Sun, Moon, Laptop, Rocket, BookOpen } from 'lucide-react';

interface ThemeOption {
  id: string;
  name: string;
  accentClass: string;
  icon: React.ReactNode;
}

export const ThemeSwitcher: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<string>('dark-dev');

  const themes: ThemeOption[] = [
    {
      id: 'dark-dev',
      name: 'Dark Dev',
      accentClass: 'bg-blue-500 border-blue-400',
      icon: <Laptop size={14} className="text-blue-400" />,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      accentClass: 'bg-slate-800 border-slate-700',
      icon: <Sun size={14} className="text-slate-800 dark:text-slate-200" />,
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk',
      accentClass: 'bg-pink-500 border-pink-400',
      icon: <Rocket size={14} className="text-pink-500 animate-pulse" />,
    },
    {
      id: 'scandinavian',
      name: 'Scandinavian',
      accentClass: 'bg-[#607065] border-[#8fa095]',
      icon: <Moon size={14} className="text-[#607065]" />,
    },
    {
      id: 'classical',
      name: 'Classical',
      accentClass: 'bg-[#800020] border-[#d0c9bc]',
      icon: <BookOpen size={14} className="text-[#800020]" />,
    },
  ];

  // Load and apply initial theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('srd-portfolio-theme') || 'dark-dev';
    setActiveTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (themeId: string) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('srd-portfolio-theme', themeId);

    // Micro-animation event - dispatch to other listening elements if needed
    const event = new CustomEvent('theme-changed', { detail: themeId });
    window.dispatchEvent(event);
  };

  return (
    <div className="no-print flex items-center bg-bg-secondary/80 border border-border-custom px-2 py-1.5 rounded-full shadow-sm max-w-fit">
      <div className="hidden lg:flex items-center gap-1 text-[9px] uppercase tracking-wider font-extrabold text-text-muted px-2.5 select-none font-mono">
        <Monitor size={10} className="text-text-muted" /> Theme
      </div>
      <div className="flex gap-1">
        {themes.map((theme) => {
          const isActive = theme.id === activeTheme;
          return (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all duration-300 relative ${
                isActive
                  ? 'bg-bg-primary text-text-primary border border-border-custom shadow-sm scale-105'
                  : 'hover:bg-bg-primary/40 text-text-muted hover:text-text-primary border border-transparent'
              }`}
              title={`Switch to ${theme.name}`}
            >
              {/* Theme color indicator */}
              <span className={`w-2.5 h-2.5 rounded-full border ${theme.accentClass} flex-shrink-0`} />
              <span className="hidden sm:inline text-[11px] font-sans">{theme.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
