import { useState, useEffect, useCallback } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { DetailView } from './components/DetailView';
import { AnimatePresence, m, LazyMotion, domAnimation, useReducedMotion } from "framer-motion";
import { Sun, Moon } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

import { LanguageSwitcher } from './components/LanguageSwitcher';
import { BlogLink } from './components/BlogLink';
import { SEO } from './components/SEO';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { SmoothScroll, useSmoothScroll } from './components/SmoothScroll';
import { IntroLoader } from './components/IntroLoader';
import { Grain } from './components/Grain';
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildPersonSchema,
  buildWebsiteSchema,
  DEFAULT_KEYWORDS,
  getLocale,
  PERSON_ID,
  WEBSITE_ID,
} from './config/seo';

import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

// Chapters
import { HeroChapter } from './components/chapters/HeroChapter';
import { BentoChapter } from './components/chapters/BentoChapter';
import { StoryChapter } from './components/chapters/StoryChapter';
import { ProjectsChapter } from './components/chapters/ProjectsChapter';
import { BlogChapter } from './components/chapters/BlogChapter';
import { StackChapter } from './components/chapters/StackChapter';
import { GlobeChapter } from './components/chapters/GlobeChapter';
import { OutroChapter } from './components/chapters/OutroChapter';

// ----- MAIN APP CONTENT -----

function AppContent() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const { stop, start } = useSmoothScroll();

  const { t, language } = useLanguage();
  const isSpanish = language === 'es';

  const homepageTitle = isSpanish
    ? 'Gianfranco De La Cruz Lopez | Desarrollador de Software'
    : 'Gianfranco De La Cruz Lopez | Software Developer';
  const homepageSeoTitle = isSpanish ? 'Desarrollador de Software' : 'Software Developer';
  const homepageDescription = isSpanish
    ? 'Portfolio de Gianfranco De La Cruz Lopez, estudiante de Ingeniería de Computación y Sistemas en Lima, Perú. Construye proyectos full-stack con Python, FastAPI y React.'
    : 'Portfolio of Gianfranco De La Cruz Lopez, a Computer Engineering & Systems student in Lima, Peru. Builds full-stack projects with Python, FastAPI, and React.';
  const homepageKeywords = isSpanish
    ? [...DEFAULT_KEYWORDS, 'desarrollador de software', 'portfolio desarrollador', 'desarrollador react']
    : [...DEFAULT_KEYWORDS, 'software developer', 'developer portfolio', 'react developer'];
  const homepageCanonical = absoluteUrl(isSpanish ? '/?lang=es' : '/');
  const homepageAlternates = [
    { hrefLang: 'en', href: absoluteUrl('/') },
    { hrefLang: 'es', href: absoluteUrl('/?lang=es') },
    { hrefLang: 'x-default', href: absoluteUrl('/') },
  ];
  const homepageFaq = isSpanish
    ? [
        {
          question: '¿Quién es Gianfranco De La Cruz Lopez?',
          answer:
            'Gianfranco De La Cruz Lopez es un estudiante de Ingeniería de Computación y Sistemas en la Universidad de San Martín de Porres, basado en Lima, Perú. Construye proyectos full-stack con backends en Python/FastAPI y frontends en React, con foco en algoritmos.',
        },
        {
          question: '¿Está disponible para trabajo freelance o prácticas?',
          answer:
            'Sí. Gianfranco está abierto a proyectos freelance y prácticas profesionales, trabajando desde Lima (UTC−5).',
        },
        {
          question: '¿En qué tecnologías se especializa?',
          answer:
            'Frontend con React y Vite. Backend con Python, FastAPI, Pydantic y SQLAlchemy. Algoritmos como Dijkstra, heurísticas de TSP, satisfacción de restricciones (CSP) y similitud de texto con TF-IDF, usando scikit-learn, NumPy y NetworkX.',
        },
        {
          question: '¿Dónde puedo leer sus escritos?',
          answer:
            'El blog está en https://gianfranco-portfolio.vercel.app/blog, listo para futuros artículos sobre algoritmos e ingeniería de software.',
        },
      ]
    : [
        {
          question: 'Who is Gianfranco De La Cruz Lopez?',
          answer:
            'Gianfranco De La Cruz Lopez is a Computer Engineering & Systems student at Universidad de San Martín de Porres, based in Lima, Peru. He builds full-stack projects with Python/FastAPI backends and React frontends, with an emphasis on algorithms.',
        },
        {
          question: 'Is Gianfranco available for freelance work or internships?',
          answer:
            'Yes. Gianfranco is open to freelance projects and internships, working from Lima (UTC−5).',
        },
        {
          question: 'What technologies does he specialize in?',
          answer:
            'Frontend with React and Vite. Backend with Python, FastAPI, Pydantic, and SQLAlchemy. Algorithms such as Dijkstra, TSP heuristics, constraint satisfaction (CSP), and TF-IDF text similarity, using scikit-learn, NumPy, and NetworkX.',
        },
        {
          question: 'Where can I read his writing?',
          answer:
            'His blog lives at https://gianfranco-portfolio.vercel.app/blog, set up and ready for upcoming posts on algorithms and software engineering.',
        },
      ];

  const homepageSchemas = [
    buildPersonSchema(),
    buildWebsiteSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${homepageCanonical}#profile`,
      name: homepageTitle,
      description: homepageDescription,
      url: homepageCanonical,
      inLanguage: isSpanish ? 'es-PE' : 'en-US',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
      mainEntity: { '@id': PERSON_ID },
    },
    buildFaqSchema(homepageFaq),
    buildBreadcrumbSchema([{ name: t('home'), item: absoluteUrl(isSpanish ? '/?lang=es' : '/') }]),
  ];

  // Freeze Lenis while a detail modal is open to prevent background drift.
  useEffect(() => {
    if (activeSection) {
      stop();
    } else if (loaderDone) {
      start();
    }
  }, [activeSection, loaderDone, stop, start]);

  const closeSection = useCallback(() => {
    setActiveSection(null);
  }, []);

  const openSection = useCallback((sectionType: string) => {
    setActiveSection(sectionType);
  }, []);

  return (
    <div className="relative min-h-screen bg-page text-text-main font-sans selection:bg-primary selection:text-primary-fg transition-colors duration-500 overflow-x-clip">
      <a href="#main-content" className="skip-to-main">
        {t('skipToMainContent')}
      </a>
      <SEO
        title={homepageSeoTitle}
        description={homepageDescription}
        canonical={homepageCanonical}
        locale={getLocale(language)}
        alternateLocales={['en_US', 'es_PE']}
        keywords={homepageKeywords}
        alternates={homepageAlternates}
        schemaData={homepageSchemas}
      />

      <IntroLoader onComplete={() => setLoaderDone(true)} />

      <BlogLink />

      {/* One quiet chrome cluster (language + theme), a single hairline pill in one corner. */}
      <m.div
        className="fixed z-[120] flex items-center gap-1 p-1 rounded-full bg-card/80 backdrop-blur-md border border-border bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))]"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.6, ease: 'easeOut' }}
      >
        <LanguageSwitcher floating={false} />
        <span aria-hidden className="h-5 w-px bg-border" />
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? t('themeSwitchToLight') : t('themeSwitchToDark')}
          className="p-2 rounded-full text-text-main hover:bg-card-hover transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === 'dark' ? (
              <m.span key="sun" className="block" initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                <Sun size={18} />
              </m.span>
            ) : (
              <m.span key="moon" className="block" initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                <Moon size={18} />
              </m.span>
            )}
          </AnimatePresence>
        </button>
      </m.div>

      <Grain />

      <main
        id="main-content"
        tabIndex={-1}
        className="relative w-full outline-none"
      >
        <HeroChapter />
        <BentoChapter theme={theme} onOpenSection={openSection} />
        <StoryChapter />
        <ProjectsChapter />
        <BlogChapter />
        <StackChapter />
        <GlobeChapter theme={theme} />
        <OutroChapter />
      </main>

      {/* Detail view modal (opened from bento cards) */}
      <AnimatePresence>
        {activeSection && (
          <m.div
            key={`section-${activeSection}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-page/80 backdrop-blur-xl"
            onClick={closeSection}
          >
            <div
              className="w-full max-w-[1320px] 3xl:max-w-[1500px] h-full max-h-[calc(100vh-2rem)] sm:max-h-[88vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <DetailView onClose={closeSection} type={activeSection} />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ----- MAIN APP WITH PROVIDER -----

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider>
          <LazyMotion features={domAnimation}>
            <SmoothScroll>
              <AppContent />
              <Analytics />
            </SmoothScroll>
          </LazyMotion>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
