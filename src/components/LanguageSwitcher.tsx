import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { languages } from '../data/translations';
import type { Language } from '../data/translations';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages[language];

  return (
    <div className="no-print relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 sm:px-3 sm:py-2 rounded-full border border-border-custom bg-bg-secondary/80 backdrop-blur-md text-text-primary text-xs font-semibold hover:bg-bg-primary/50 transition-all duration-300 shadow-sm cursor-pointer"
        aria-label="Select Language"
      >
        <Globe size={13} className="text-text-muted animate-pulse" />
        <span className="flex items-center gap-1.5 font-sans">
          <span className="text-xs sm:text-sm">{currentLang.flag}</span>
          <span className="hidden sm:inline text-[11px] font-sans">{currentLang.name}</span>
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border-custom bg-bg-secondary/95 backdrop-blur-xl shadow-xl z-50 overflow-hidden py-1 transition-all duration-200">
          <div className="px-3 py-1.5 text-[9px] uppercase tracking-wider text-text-muted border-b border-border-custom font-bold">
            Select Language
          </div>
          <div className="flex flex-col max-h-64 overflow-y-auto">
            {(Object.keys(languages) as Language[]).map((langKey) => {
              const lang = languages[langKey];
              const isSelected = langKey === language;
              return (
                <button
                  key={langKey}
                  onClick={() => {
                    setLanguage(langKey);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 text-xs font-sans hover:bg-bg-primary/60 transition-colors duration-200 text-left cursor-pointer w-full ${
                    isSelected ? 'text-text-primary bg-bg-primary/40 font-bold' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{lang.flag}</span>
                    <span className="text-[11px] font-sans">{lang.name}</span>
                  </span>
                  {isSelected && <Check size={12} className="text-accent-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
