import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const StoryChapter: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const bodySplit = new SplitText(bodyRef.current, { type: 'words' });
        const headingSplit = new SplitText(headingRef.current, { type: 'lines' });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 65%',
          },
          defaults: { ease: 'power3.out' },
        });

        tl.from(kickerRef.current, { opacity: 0, y: 20, duration: 0.6 })
          .from(headingSplit.lines, { y: 40, opacity: 0, duration: 0.9, stagger: 0.1 }, '-=0.3')
          .from(bodySplit.words, { opacity: 0, y: 14, duration: 0.4, stagger: 0.015 }, '-=0.5')
          .from(
            tagsRef.current?.querySelectorAll('[data-tag]') ?? [],
            { opacity: 0, y: 10, duration: 0.5, stagger: 0.06 },
            '-=0.3'
          );

        // Parallax portrait.
        const parallax = gsap.to(imageRef.current, {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        return () => {
          bodySplit.revert();
          headingSplit.revert();
          parallax.scrollTrigger?.kill();
        };
      });
    },
    { scope: rootRef, dependencies: [language] }
  );

  return (
    <section
      key={language}
      ref={rootRef}
      className="relative w-full px-5 sm:px-10 lg:px-16 3xl:px-24 py-32 sm:py-40 overflow-clip"
      aria-label={t('aboutTitle')}
    >
      <div className="max-w-[1320px] 3xl:max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
        {/* Portrait */}
        <div className="md:col-span-5 relative aspect-[3/4] overflow-hidden rounded-[24px] sm:rounded-[32px] border border-border bg-card-hover">
          <div
            ref={imageRef}
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: "url('/profile.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-page/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">
            <span>{t('location')}</span>
            <span>{t('since')}</span>
          </div>
        </div>

        {/* Copy */}
        <div className="md:col-span-7">
          <p
            ref={kickerRef}
            className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4 3xl:mb-6"
          >
            02 — {t('aboutTitle')}
          </p>
          <h2
            ref={headingRef}
            className="text-3xl sm:text-5xl md:text-6xl 3xl:text-7xl font-black text-text-main leading-[0.95] tracking-tighter mb-6 3xl:mb-10"
          >
            {t('systemsEngineering')}
            <br />
            <span className="text-text-muted/25">{t('scalableArchitect')}</span>
          </h2>

          <p
            ref={bodyRef}
            className="text-base sm:text-lg lg:text-xl 3xl:text-2xl text-text-muted leading-relaxed font-medium max-w-2xl mb-8"
          >
            {t('bioText')}
          </p>

          <div ref={tagsRef} className="flex flex-wrap gap-3">
            {[t('proactive'), t('detailOriented'), t('problemSolver'), t('userCentricDesign'), t('performanceFirst')].map(
              (tag) => (
                <span
                  key={tag}
                  data-tag
                  className="px-5 py-2.5 rounded-full bg-card-hover border border-border text-text-main text-xs font-bold shadow-sm transition-transform hover:scale-105"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
