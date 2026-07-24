import { Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTheme } from '../../components/ThemeContext';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage } from '../../i18n/LanguageContext';
import { SmoothScroll, useSmoothScroll } from '../../components/SmoothScroll';
import { Grain } from '../../components/Grain';
import { ReadingProgress } from '../../components/ReadingProgress';

function BlogLayoutContent() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { language, t } = useLanguage();
  const { lenis } = useSmoothScroll();
  const isBlogHome = location.pathname === '/';
  const isSpanish = language === 'es';
  const backLabel = isBlogHome ? t('blogBackHome') : t('blogBackToArticles');

  // Jump to top on route change. Uses Lenis if available so smooth-scroll
  // users don't see a jarring snap; falls back to window.scrollTo otherwise.
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, lenis]);

  const getHomeHref = () => {
    if (typeof window === 'undefined') return '/';

    const host = window.location.host;
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const langQuery = language === 'es' ? '?lang=es' : '';

    if (hostname.startsWith('blog.')) {
      const mainHost = host.replace(/^blog\./, '');
      return `${protocol}//${mainHost}/${langQuery}`;
    }

    return `/${langQuery}`;
  };

  const homeHref = getHomeHref();
  const blogHomeHref = isSpanish ? '/?lang=es' : '/';

  const BackPill = (
    <m.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed z-[120] top-[max(1.5rem,env(safe-area-inset-top))] left-[max(1.5rem,env(safe-area-inset-left))]"
    >
      {isBlogHome ? (
        <a
          href={homeHref}
          aria-label={backLabel}
          className="group inline-flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-card/80 backdrop-blur-xl border border-border shadow-2xl ring-1 ring-white/10 text-text-main text-xs font-bold uppercase tracking-[0.2em] hover:bg-text-main hover:text-page transition-colors"
        >
          <ArrowLeft
            size={14}
            strokeWidth={2}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          <span>{backLabel}</span>
        </a>
      ) : (
        <Link
          to={blogHomeHref}
          aria-label={backLabel}
          className="group inline-flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-card/80 backdrop-blur-xl border border-border shadow-2xl ring-1 ring-white/10 text-text-main text-xs font-bold uppercase tracking-[0.2em] hover:bg-text-main hover:text-page transition-colors"
        >
          <ArrowLeft
            size={14}
            strokeWidth={2}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          <span>{backLabel}</span>
        </Link>
      )}
    </m.div>
  );

  return (
    <div className="relative min-h-screen bg-page text-text-main font-sans selection:bg-primary selection:text-primary-fg transition-colors duration-500 overflow-x-clip flex flex-col items-center">
      {!isBlogHome && <ReadingProgress />}

      <Grain />

      {BackPill}

      <LanguageSwitcher />

      <m.button
        className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-[120] p-4 rounded-full bg-card/80 backdrop-blur-xl border border-border shadow-2xl text-text-main hover:bg-card-hover transition-colors ring-1 ring-white/10"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? t('themeSwitchToLight') : t('themeSwitchToDark')}
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <m.div key="sun" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
              <Sun size={24} />
            </m.div>
          ) : (
            <m.div key="moon" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }}>
              <Moon size={24} />
            </m.div>
          )}
        </AnimatePresence>
      </m.button>

      <main className="w-full max-w-[1320px] 3xl:max-w-[1500px] mx-auto px-5 sm:px-10 lg:px-16 3xl:px-24 pt-24 sm:pt-28 pb-20 sm:pb-28 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export function BlogLayout() {
  return (
    <LanguageProvider>
      <LazyMotion features={domAnimation}>
        <SmoothScroll>
          <BlogLayoutContent />
        </SmoothScroll>
      </LazyMotion>
    </LanguageProvider>
  );
}
