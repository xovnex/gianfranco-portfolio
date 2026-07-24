import type { Language } from './translations';

/** Same rules as `LanguageProvider` initial state (query → localStorage → browser). */
export function readInitialPortfolioLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang') as Language | null;
  if (langParam === 'en' || langParam === 'es') {
    return langParam;
  }

  try {
    const saved = localStorage.getItem('portfolio-language') as Language | null;
    if (saved === 'en' || saved === 'es') {
      return saved;
    }
  } catch {
    /* ignore */
  }

  if (navigator.language.toLowerCase().startsWith('es')) {
    return 'es';
  }

  return 'en';
}
