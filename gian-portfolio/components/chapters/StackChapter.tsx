import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { techStack } from '../../content/portfolio';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const ALL_ROWS = [techStack.row1, techStack.row2, techStack.row3, techStack.row4];

interface MarqueeRowProps {
  items: { label: string; hoverColor: string }[];
  reverse?: boolean;
  speed?: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, reverse = false, speed = 50 }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current;
        if (!track) return;

        const distance = track.scrollWidth / 2;
        if (distance <= 0) return;

        const tween = gsap.to(track, {
          x: reverse ? 0 : -distance,
          duration: distance / speed,
          ease: 'none',
          repeat: -1,
        });

        if (reverse) gsap.set(track, { x: -distance });
        tweenRef.current = tween;

        return () => {
          tween.kill();
          gsap.set(track, { clearProps: 'x' });
        };
      });
    },
    { scope: trackRef }
  );

  const pause = () => tweenRef.current?.timeScale(0.05);
  const resume = () => tweenRef.current?.timeScale(1);

  // Duplicate the list for seamless wrap-around.
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div
        ref={trackRef}
        className="flex gap-4 sm:gap-6 whitespace-nowrap will-change-transform"
      >
        {doubled.map((t, i) => (
          <span
            key={`${t.label}-${i}`}
            className="group relative inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-border bg-card/60 backdrop-blur-xl text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-text-main transition-colors"
            style={{ ['--hover-color' as string]: t.hoverColor }}
          >
            <span className="h-2 w-2 rounded-full bg-text-muted group-hover:bg-[color:var(--hover-color)] transition-colors" />
            <span className="group-hover:text-[color:var(--hover-color)] transition-colors">
              {t.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export const StackChapter: React.FC = () => {
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

  return (
    <section
      ref={rootRef}
      className="relative w-full py-24 sm:py-32 overflow-clip"
      aria-label={t('technicalArsenal')}
    >
      <div
        ref={headingRef}
        className="max-w-[1320px] 3xl:max-w-[1500px] mx-auto px-5 sm:px-10 lg:px-16 3xl:px-24 mb-10 sm:mb-14"
      >
        <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-3">
          06 — {t('techStackTitle')}
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl 3xl:text-7xl font-black text-text-main leading-[0.9] tracking-tighter">
          {t('technicalArsenal')}
          <br />
          <span className="text-text-muted/25">{t('technicalArsenalDesc')}</span>
        </h2>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {ALL_ROWS.map((row, idx) => (
          <MarqueeRow key={idx} items={row} reverse={idx % 2 === 1} speed={40 + idx * 8} />
        ))}
      </div>
    </section>
  );
};
