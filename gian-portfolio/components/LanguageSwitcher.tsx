import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/translations';

interface LanguageSwitcherProps {
  /**
   * When true (default) the switcher renders as its own fixed, self-positioned
   * pill (used by the blog layout). When false it renders only the inline
   * EN/ES buttons, meant to be embedded in a shared chrome cluster.
   */
  floating?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ floating = true }) => {
  const { language, setLanguage } = useLanguage();
  const reduceMotion = useReducedMotion();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'es', label: 'ES', flag: '🇪🇸' },
  ];

  // Switch immediately. The old 300ms/900ms choreography only existed to stay in
  // sync with the full-screen blur overlay, which froze every animation on the
  // page (the globe included) — that overlay is gone, so the delay is just lag.
  const handleLanguageChange = (newLang: Language) => {
    if (newLang === language) return;
    setLanguage(newLang);
  };

  const renderButton = (lang: { code: Language; label: string; flag: string }) => (
    <m.button
      key={lang.code}
      onClick={() => handleLanguageChange(lang.code)}
      className={`
        relative px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 overflow-hidden
        ${language === lang.code
          ? 'text-page'
          : 'text-text-muted hover:text-text-main hover:bg-card-hover'
        }
      `}
      whileHover={{ scale: language === lang.code ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Active background pill */}
      {language === lang.code && (
        <m.div
          layoutId={floating ? 'activeLang' : 'activeLangInline'}
          className="absolute inset-0 bg-text-main rounded-full"
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 35,
            mass: 1
          }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-1.5">
        {floating && <span className="text-sm">{lang.flag}</span>}
        <span>{lang.label}</span>
      </span>
    </m.button>
  );

  // Inline variant: just the buttons, for embedding in the shared chrome pill.
  if (!floating) {
    return <div className="flex items-center gap-0.5">{languages.map(renderButton)}</div>;
  }

  return (
    <m.div
      className="fixed z-[120] flex items-center gap-1 p-1.5 rounded-full bg-card/80 backdrop-blur-xl border border-border shadow-2xl ring-1 ring-white/10 bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-[max(1.5rem,env(safe-area-inset-left))]"
      initial={reduceMotion ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {languages.map(renderButton)}
    </m.div>
  );
};
