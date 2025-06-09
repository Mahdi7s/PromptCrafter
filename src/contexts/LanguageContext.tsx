
'use client';

import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import type { SupportedLanguage, Translations, LocaleMessages } from '@/types';
import enMessages from '@/locales/en';
import faMessages from '@/locales/fa';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: Dispatch<SetStateAction<SupportedLanguage>>;
  translations: LocaleMessages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const messages: Record<SupportedLanguage, LocaleMessages> = {
  en: enMessages,
  fa: faMessages,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [currentTranslations, setCurrentTranslations] = useState<LocaleMessages>(messages.en);

  useEffect(() => {
    const storedLang = localStorage.getItem('aipromptoimage_lang') as SupportedLanguage | null;
    if (storedLang && (storedLang === 'en' || storedLang === 'fa')) {
      setLanguage(storedLang);
      setCurrentTranslations(messages[storedLang]);
      document.documentElement.lang = storedLang;
      document.documentElement.dir = storedLang === 'fa' ? 'rtl' : 'ltr';
    } else {
      // Default to English if no valid language is stored or if it's the first visit
      localStorage.setItem('aipromptoimage_lang', 'en');
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
      setCurrentTranslations(messages.en);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aipromptoimage_lang', language);
    setCurrentTranslations(messages[language]);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
