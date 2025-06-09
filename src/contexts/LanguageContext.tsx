
'use client';

import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import type { SupportedLanguage, LocaleMessages } from '@/types';
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

// Helper function to safely get the initial language from localStorage
const getInitialStoredLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') {
    return 'en'; // Default for SSR or pre-client rendering
  }
  const storedLang = localStorage.getItem('aipromptoimage_lang') as SupportedLanguage | null;
  if (storedLang && (storedLang === 'en' || storedLang === 'fa')) {
    return storedLang;
  }
  // If no valid language is stored, default to English and save it.
  localStorage.setItem('aipromptoimage_lang', 'en');
  return 'en';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize language state directly using the helper
  const [language, setLanguage] = useState<SupportedLanguage>(getInitialStoredLanguage);
  
  // Initialize translations based on this initial language
  const [currentTranslations, setCurrentTranslations] = useState<LocaleMessages>(() => messages[getInitialStoredLanguage()]);

  // This effect runs when the 'language' state changes (e.g., user selects a new language)
  useEffect(() => {
    localStorage.setItem('aipromptoimage_lang', language);
    setCurrentTranslations(messages[language]);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
  }, [language]);

  // This effect runs once on mount to ensure document attributes are correctly set
  // after hydration, matching the initial language. This is mostly a safeguard.
  useEffect(() => {
    const initialLang = getInitialStoredLanguage();
    document.documentElement.lang = initialLang;
    document.documentElement.dir = initialLang === 'fa' ? 'rtl' : 'ltr';
    // If the language state somehow diverged from localStorage by the time this effect runs
    // (e.g. localStorage changed in another tab before this component hydrated fully), resync.
    if (language !== initialLang) {
        setLanguage(initialLang);
        // The above setLanguage will trigger the other useEffect to update currentTranslations
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs once on mount

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
