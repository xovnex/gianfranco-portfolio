import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Opening chapter. Massive split-text name, role "deck" that cycles,
 * subtle parallax on the role block as you scroll away from the hero.
 */
export const HeroChapter: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const surnameRef = useRef<HTMLSpanElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const nameSplit = new SplitText(nameRef.current, { type: 'chars' });
        const surnameSplit = new SplitText(surnameRef.current, { type: 'chars' });

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.from(nameSplit.chars, {
          yPercent: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.03,
        })
          .from(
            surnameSplit.chars,
            { yPercent: 60, opacity: 0, duration: 0.9, stagger: 0.025 },
            '-=0.7'
          )
          .from(
            kickerRef.current,
            { opacity: 0, y: 20, duration: 0.8 },
            '-=0.6'
          )
          .from(
            rolesRef.current?.querySelectorAll('[data-role]') ?? [],
            { opacity: 0, y: 14, duration: 0.6, stagger: 0.08 },
            '-=0.5'
          )
          .from(
            scrollCueRef.current,
            { opacity: 0, y: 10, duration: 0.6 },
            '-=0.3'
          );

        // Cycle active role index bound to scroll progress across hero.
        const roleEls = rolesRef.current?.querySelectorAll<HTMLElement>('[data-role]') ?? [];
        if (roleEls.length) {
          const st = ScrollTrigger.create({
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              const idx = Math.min(
                roleEls.length - 1,
                Math.floor(self.progress * roleEls.length * 0.999)
              );
              roleEls.forEach((el, i) => {
                el.style.opacity = i === idx ? '1' : '0.2';
              });
            },
          });

          // Subtle parallax drift on the hero content.
          const parallax = gsap.to(nameRef.current, {
            yPercent: -12,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });

          return () => {
            st.kill();
            parallax.scrollTrigger?.kill();
            nameSplit.revert();
            surnameSplit.revert();
          };
        }

        return () => {
          nameSplit.revert();
          surnameSplit.revert();
        };
      });
    },
    { scope: rootRef, dependencies: [language] }
  );

  return (
    <section
      key={language}
      ref={rootRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between px-5 sm:px-10 lg:px-16 3xl:px-24 pt-28 sm:pt-32 3xl:pt-40 pb-10 sm:pb-14 overflow-clip"
      aria-label={t('ariaHeroIntro')}
    >
      {/* Kicker */}
      <div
        ref={kickerRef}
        className="flex items-center gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-text-muted"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        <span>{t('availableForWork')}</span>
        <span className="h-px w-12 bg-border" />
        <span>{t('location')}</span>
      </div>

      {/* Name */}
      <div className="flex flex-col justify-center flex-1 py-10">
        <h1 className="font-black tracking-tighter leading-[0.92] text-text-main text-[18vw] sm:text-[15vw] md:text-[13vw] lg:text-[12vw] pb-[0.08em]">
          <span ref={nameRef} className="block">
            Gianfranco
          </span>
          <span
            ref={surnameRef}
            className="block text-text-muted/30"
          >
            De La Cruz.
          </span>
        </h1>
      </div>

      {/* Roles + cue row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div
          ref={rolesRef}
          className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-bold uppercase tracking-[0.2em]"
        >
          <span
            data-role
            className="transition-opacity duration-300 text-text-main"
          >
            {t('role')}
          </span>
          <span className="h-1 w-1 rounded-full bg-text-muted/40" />
          <span data-role className="transition-opacity duration-300 text-text-main opacity-20">
            {t('roleInterface')}
          </span>
          <span className="h-1 w-1 rounded-full bg-text-muted/40" />
          <span data-role className="transition-opacity duration-300 text-text-main opacity-20">
            {t('roleSystems')}
          </span>
          <span className="h-1 w-1 rounded-full bg-text-muted/40" />
          <span data-role className="transition-opacity duration-300 text-text-main opacity-20">
            {t('roleAi')}
          </span>
        </div>

        <div
          ref={scrollCueRef}
          className="flex items-center gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-text-muted"
        >
          <span className="relative h-8 w-5 rounded-full border border-border overflow-hidden">
            <span className="absolute left-1/2 top-1.5 -translate-x-1/2 h-1.5 w-[2px] rounded-full bg-text-main animate-[bounce_1.4s_ease-in-out_infinite]" />
          </span>
          <span>{t('scrollCue')}</span>
        </div>
      </div>
    </section>
  );
};
