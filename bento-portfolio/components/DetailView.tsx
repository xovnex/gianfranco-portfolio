import React, { useEffect, useRef, Suspense, lazy, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

// Lazy load section components
const AboutSection = lazy(() => import('./sections/AboutSection').then(m => ({ default: m.AboutSection })));
const EducationSection = lazy(() => import('./sections/EducationSection').then(m => ({ default: m.EducationSection })));
const TechStackSection = lazy(() => import('./sections/TechStackSection').then(m => ({ default: m.TechStackSection })));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection').then(m => ({ default: m.ProjectsSection })));

interface DetailViewProps {
  onClose: () => void;
  type: string;
}

/**
 * A wrapper that notifies when its children have mounted.
 */
const MountNotifier: React.FC<{ onMount: () => void; children: React.ReactNode }> = ({ onMount, children }) => {
  useEffect(() => {
    // Small delay to ensure browser has painted the content
    const timer = setTimeout(onMount, 50);
    return () => clearTimeout(timer);
  }, [onMount]);
  return <>{children}</>;
};

function DetailSectionFallback() {
  const { t } = useLanguage();
  return (
    <div className="px-5 sm:px-10 lg:px-16 3xl:px-24 py-6" role="status" aria-busy="true">
      <span className="sr-only">{t('sectionLoading')}</span>
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse" aria-hidden>
        <div className="h-3 w-24 bg-border rounded-md mx-auto sm:mx-0" />
        <div className="h-10 sm:h-12 w-3/4 max-w-md bg-border rounded-lg" />
        <div className="h-20 w-full bg-border/60 rounded-2xl" />
        <div className="h-20 w-full bg-border/60 rounded-2xl" />
      </div>
    </div>
  );
}

export const DetailView: React.FC<DetailViewProps> = ({ onClose, type }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus management
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement;
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      if (previousFocus) {
        previousFocus.focus();
      }
    };
  }, []);

  const renderSection = () => {
    switch (type) {
      case 'about':
        return <AboutSection />;
      case 'education':
        return <EducationSection />;
      case 'stack':
        return <TechStackSection />;
      case 'projects':
        return <ProjectsSection />;
      default:
        return null;
    }
  };

  return (
    <m.div
      ref={modalRef}
      layout
      className="relative w-full min-h-[calc(100vh-8rem)] sm:min-h-[70vh] max-h-[calc(100vh-8rem)] sm:max-h-[82vh] 3xl:max-h-[88vh] bg-card rounded-[24px] sm:rounded-[40px] border border-border overflow-hidden flex flex-col shadow-2xl ring-1 ring-white/10 transform-gpu will-change-[transform,height,opacity] flex-1"
      tabIndex={-1}
      role="region"
      aria-labelledby={`section-title-${type}`}
      initial={reduceMotion ? { y: 0, opacity: 1 } : { y: 12, opacity: 0 }}
      animate={{ 
        y: reduceMotion ? 0 : (isReady ? 0 : 8), 
        opacity: reduceMotion ? 1 : (isReady ? 1 : 0) 
      }}
      exit={reduceMotion ? { opacity: 0 } : { y: 8, opacity: 0 }}
      transition={{ 
        duration: reduceMotion ? 0.15 : 0.5, 
        ease: [0.16, 1, 0.3, 1],
        layout: { 
          type: "spring",
          stiffness: 180,
          damping: 28,
          mass: 1
        }
      }}
    >
      <AnimatePresence>
        {isReady && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 z-40 px-4 py-4 sm:px-8 sm:py-6 flex items-center justify-between pointer-events-none"
          >
            <button
              type="button"
              onClick={onClose}
              className="group h-10 px-4 rounded-full bg-card/60 hover:bg-text-main hover:text-page flex items-center gap-2 text-text-main transition-all active:scale-95 border border-border shadow-lg backdrop-blur-xl pointer-events-auto"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-xs sm:text-sm font-bold tracking-tight uppercase tracking-[0.1em]">{t('back')}</span>
            </button>
          </m.div>
        )}
      </AnimatePresence>

      <div
        data-lenis-prevent
        className="flex flex-col w-full min-h-0 flex-1 overflow-y-auto overscroll-contain touch-pan-y relative z-10 modal-scroll pt-16 sm:pt-20 lg:pt-24 3xl:pt-32 pb-8 sm:pb-10 lg:pb-12 3xl:pb-24"
      >
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
        <Suspense fallback={<DetailSectionFallback />}>
          <MountNotifier onMount={() => setIsReady(true)}>
            <m.div
              initial={{ opacity: reduceMotion ? 1 : 0, filter: reduceMotion ? "blur(0px)" : "blur(4px)" }}
              animate={{ 
                opacity: isReady ? 1 : 0,
                filter: isReady || reduceMotion ? "blur(0px)" : "blur(4px)"
              }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
            >
              {renderSection()}
            </m.div>
          </MountNotifier>
        </Suspense>
      </div>
    </m.div>
  );
};
