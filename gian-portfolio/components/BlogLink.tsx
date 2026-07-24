import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * Persistent fixed shortcut to the blog. Lives at the top-right of the page
 * so the blog is one click away from any chapter, not just the Writing
 * section. Preserves the active language via a `?lang=es` query param.
 */
export const BlogLink: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const { language, t } = useLanguage();
  const href = language === 'es' ? '/blog?lang=es' : '/blog';

  return (
    <m.a
      href={href}
      aria-label={t('blogTitle')}
      className="group fixed z-[120] flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-card/80 backdrop-blur-xl border border-border shadow-2xl ring-1 ring-white/10 text-text-main text-xs font-bold uppercase tracking-[0.2em] hover:bg-text-main hover:text-page transition-colors top-[max(1.5rem,env(safe-area-inset-top))] right-[max(1.5rem,env(safe-area-inset-right))]"
      initial={
        reduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: -20 }
      }
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
    >
      <BookOpen size={14} strokeWidth={2} />
      <span>{t('blogTitle')}</span>
      <ArrowUpRight
        size={14}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </m.a>
  );
};
