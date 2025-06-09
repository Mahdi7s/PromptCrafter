
'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import type { LocaleMessages } from '@/types';

// Helper function to get nested values from the translation object
function getNestedValue(obj: any, path: string): string | undefined {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}


export function useTranslation() {
  const { translations } = useLanguage();

  const t = (key: keyof LocaleMessages | string, params?: Record<string, string | number>): string => {
    let translation = getNestedValue(translations, key);
    
    if (translation === undefined) {
      console.warn(`Translation key "${key}" not found.`);
      return key; // Return the key itself if not found
    }

    if (params) {
      Object.keys(params).forEach((paramKey) => {
        const regex = new RegExp(`{${paramKey}}`, 'g');
        translation = translation!.replace(regex, String(params[paramKey]));
      });
    }
    return translation!;
  };

  return { t };
}
