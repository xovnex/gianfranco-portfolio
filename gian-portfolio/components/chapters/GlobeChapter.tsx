import React, { Suspense, lazy, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../i18n/LanguageContext';
import type { Theme } from '../../types';

gsap.registerPlugin(ScrollTrigger);

const Globe = lazy(() => import('../Globe').then((m) => ({ default: m.Globe })));

interface GlobeChapterProps {
  theme: Theme;
}

/**
 * Location chapter. Globe sits on the right, text on the left. The globe's
 * rectangular canvas edges are softened with a radial mask so there is no
 * visible "shadow cut" against the page. Flows naturally with the page —
 * no pin, no snap.
 */
export const GlobeChapter: React.FC<GlobeChapterProps> = ({ theme }) => {
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        });
      });
    },
    { scope: rootRef }
  );

  // Radial fade — softens the square canvas edges and the Cobe base-glow
  // rectangle so the globe melts into the page background.
  const globeMaskStyle: React.CSSProperties = {
    WebkitMaskImage:
      'radial-gradient(circle at center, black 42%, rgba(0,0,0,0.6) 55%, transparent 72%)',
    maskImage:
      'radial-gradient(circle at center, black 42%, rgba(0,0,0,0.6) 55%, transparent 72%)',
  };

  return (
    <section
      ref={rootRef}
      className="relative w-full px-5 sm:px-10 lg:px-16 3xl:px-24 py-24 sm:py-32"
      aria-label={t('ariaGlobeChapter')}
    >
      <div
        ref={headingRef}
        className="max-w-[1320px] 3xl:max-w-[1500px] mx-auto mb-10 sm:mb-14"
      >
        <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-3">
          06 — {t('basedIn')}
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl 3xl:text-7xl font-black text-text-main leading-[0.9] tracking-tighter">
          {t('location')}
          <br />
          <span className="text-text-muted/25">{t('remoteSubline')}</span>
        </h2>
      </div>

      <div className="max-w-[1320px] 3xl:max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Copy */}
        <div className="md:col-span-5 order-2 md:order-1 flex flex-col gap-8">
          <p className="text-base sm:text-lg lg:text-xl text-text-muted font-medium leading-relaxed max-w-lg">
            {t('basedInBody').replace('{location}', t('location'))}
          </p>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">
                {t('coordinates')}
              </span>
              <span className="text-sm sm:text-base font-mono font-bold text-text-main">
                12.05° S
                <br />
                77.03° W
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">
                {t('timezone')}
              </span>
              <span className="text-sm sm:text-base font-mono font-bold text-text-main">
                GMT-5
                <br />
                America/Lima
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span>{t('availableForWork')}</span>
          </div>
        </div>

        {/* Globe */}
        <div className="md:col-span-7 order-1 md:order-2 relative aspect-square w-full max-w-[600px] mx-auto">
          <div
            className="absolute inset-0"
            style={globeMaskStyle}
          >
            <Suspense fallback={null}>
              <Globe theme={theme} scale={1.15} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};
