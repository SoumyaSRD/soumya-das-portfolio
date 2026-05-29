import React, { createContext, useContext, useState } from 'react';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('srd-portfolio-lang');
      if (saved && (saved === 'en' || saved === 'hi' || saved === 'fr' || saved === 'ja' || saved === 'or')) {
        return saved as Language;
      }
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('srd-portfolio-lang', lang);
    }
  };

  const t = (key: string): string => {
    // Attempt translation in active language
    const val = translations[language]?.[key];
    if (val !== undefined) return val;

    // Fallback to English
    const fallbackVal = translations['en']?.[key];
    if (fallbackVal !== undefined) return fallbackVal;

    // Fallback to key itself
    return key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
