import React, { Suspense, lazy, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BentoCard } from '../BentoCard';
import {
  IntroContent,
  SocialsContent,
  TechStackContent,
  AboutContent,
  ExperienceContent,
  ProjectsContent,
  EducationContent,
} from '../cards';
import { bentoItems } from '../../config/layout';
import type { Theme } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const MapContent = lazy(() => import('../Globe').then((m) => ({ default: m.MapContent })));

interface BentoChapterProps {
  theme: Theme;
  onOpenSection: (sectionType: string) => void;
}

export const BentoChapter: React.FC<BentoChapterProps> = ({ theme, onOpenSection }) => {
  const rootRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Headline entrance
        gsap.from(headlineRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
          },
        });

        // Batch-reveal cards as they enter the viewport.
        const cards = gridRef.current?.querySelectorAll<HTMLElement>('.bento-card') ?? [];
        if (cards.length) {
          gsap.set(cards, { opacity: 0, y: 40, scale: 0.96 });
          ScrollTrigger.batch(Array.from(cards), {
            start: 'top 88%',
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.07,
                ease: 'power3.out',
                overwrite: true,
              }),
          });
        }
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const cards = gridRef.current?.querySelectorAll<HTMLElement>('.bento-card') ?? [];
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
      });
    },
    { scope: rootRef }
  );

  /**
   * Renders the appropriate content component based on the card item ID.
   */
  const renderCardContent = (itemId: string) => {
    switch (itemId) {
      case 'intro':
        return <IntroContent />;
      case 'socials':
        return <SocialsContent />;
      case 'stack':
        return <TechStackContent />;
      case 'about':
        return <AboutContent />;
      case 'experience':
        return <ExperienceContent />;
      case 'projects':
        return <ProjectsContent />;
      case 'education':
        return <EducationContent />;
      case 'map':
        return (
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center text-text-muted">
                <div className="w-6 h-6 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
              </div>
            }
          >
            <MapContent theme={theme} />
          </Suspense>
        );
      default:
        return null;
    }
  };

  const getCardTitle = (itemId: string) => {
    switch (itemId) {
      case 'stack':
        return t('techStackTitle');
      case 'about':
        return t('aboutTitle');
      case 'experience':
        return t('experienceTitle');
      case 'projects':
        return t('projectsTitle');
      case 'education':
        return t('educationTitle');
      default:
        return undefined;
    }
  };

  return (
    <section
      ref={rootRef}
      className="relative w-full px-5 sm:px-10 lg:px-16 3xl:px-24 py-24 sm:py-32"
      aria-label={t('ariaBentoOverview')}
    >
      <div ref={headlineRef} className="max-w-[1320px] 3xl:max-w-[1500px] mx-auto mb-10 sm:mb-14">
        <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-3">
          01 — {t('overviewSection')}
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl 3xl:text-7xl font-black text-text-main leading-[0.9] tracking-tighter">
          {t('atAGlance')}
          <br />
          <span className="text-text-muted/25">{t('bentoSubline')}</span>
        </h2>
      </div>

      <div
        ref={gridRef}
        className="w-full max-w-[1320px] 3xl:max-w-[1500px] mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 3xl:gap-6 auto-rows-[152px] sm:auto-rows-[190px] md:auto-rows-[237px] 3xl:auto-rows-[280px] grid-flow-row-dense"
      >
        {bentoItems.map((item) => (
          <BentoCard
            key={item.id}
            dataId={item.id}
            className={`${item.colSpan} ${item.rowSpan || ''} h-full`}
            title={getCardTitle(item.id)}
            backgroundImage={item.bgImage}
            hasArrow={item.hasArrow}
            onClick={item.onClickModal ? () => onOpenSection(item.onClickModal!) : undefined}
            noPadding={item.noPadding}
          >
            {renderCardContent(item.id)}
          </BentoCard>
        ))}
      </div>
    </section>
  );
};
