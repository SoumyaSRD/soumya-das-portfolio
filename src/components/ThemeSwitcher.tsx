import React, { useState, useEffect } from 'react';
import { Laptop, Sun, BookOpen, Moon, Compass } from 'lucide-react';

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
      name: 'Stark Slate',
      accentClass: 'bg-blue-500 border-blue-400',
      icon: <Laptop size={14} className="text-blue-400" />,
    },
    {
      id: 'enterprise',
      name: 'Nordic Frost',
      accentClass: 'bg-sky-700 border-sky-600',
      icon: <Sun size={14} className="text-sky-700 dark:text-sky-200" />,
    },
    {
      id: 'cyberpunk',
      name: 'Monochrome',
      accentClass: 'bg-zinc-800 border-zinc-700',
      icon: <Compass size={14} className="text-zinc-400" />,
    },
    {
      id: 'scandinavian',
      name: 'Warm Sage',
      accentClass: 'bg-[#5c677d] border-[#3a506b]',
      icon: <Moon size={14} className="text-[#5c677d]" />,
    },
    {
      id: 'classical',
      name: 'Burgundy',
      accentClass: 'bg-[#800020] border-[#f2eee3]',
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
    <div className="no-print flex items-center bg-bg-secondary/80 border border-border-custom px-2 py-1.5 rounded-full shadow-sm max-w-fit gap-1">
      <div className="flex gap-1">
        {themes.map((theme) => {
          const isActive = theme.id === activeTheme;
          return (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`p-2.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 relative ${
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
