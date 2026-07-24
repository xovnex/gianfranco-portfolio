import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Code2, Github } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { projects as PROJECTS } from '../../content/portfolio';
import type { TranslationKey } from '../../i18n/translations';

gsap.registerPlugin(ScrollTrigger);

export const ProjectsChapter: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

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

        const cards = rootRef.current?.querySelectorAll<HTMLElement>('[data-project-card]') ?? [];
        cards.forEach((card) => {
          const elems = card.querySelectorAll<HTMLElement>('[data-reveal]');
          gsap.from(elems, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      });
    },
    { scope: rootRef, dependencies: [language] }
  );

  return (
    <section
      ref={rootRef}
      className="relative w-full px-5 sm:px-10 lg:px-16 3xl:px-24 py-24 sm:py-32"
      aria-label={t('projectsTitle')}
    >
      <div ref={headingRef} className="max-w-[1320px] 3xl:max-w-[1500px] mx-auto mb-12 sm:mb-16">
        <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-3">
          03 — {t('projectsTitle')}
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl 3xl:text-7xl font-black text-text-main leading-[0.9] tracking-tighter">
          {t('projectsHeadline')}
          <br />
          <span className="text-text-muted/25">{t('projectsSectionDesc')}</span>
        </h2>
      </div>

      <div className="max-w-[1320px] 3xl:max-w-[1500px] mx-auto space-y-24 sm:space-y-32">
        {PROJECTS.map((p, i) => (
          <article
            key={p.id}
            data-project-card
            className="relative"
          >
            {/* Index row */}
            <div
              data-reveal
              className="flex items-center justify-between border-t border-border pt-4 mb-10 sm:mb-14"
            >
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-text-muted">
                {t('projectLabel')} {String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-text-muted">
                {p.year} — {t(p.tagKey as TranslationKey)}
              </span>
            </div>

            <div className="flex flex-col gap-10 sm:gap-12">
              {/* Tag + giant title */}
              <div data-reveal className="flex flex-col gap-5">
                <span className="inline-flex items-center gap-2 self-start text-[10px] font-black uppercase tracking-widest text-text-main bg-card-hover border border-border px-3 py-1 rounded-full">
                  <Code2 size={11} strokeWidth={2} />
                  {t('dictationApp')}
                </span>
                <h3 className="text-5xl sm:text-7xl md:text-8xl 3xl:text-9xl font-black tracking-tighter text-text-main leading-[0.9]">
                  {t(p.titleKey as TranslationKey)}
                </h3>
              </div>

              {/* Description + meta — editorial split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start border-t border-border pt-10 sm:pt-12">
                <p
                  data-reveal
                  className="lg:col-span-7 text-base sm:text-lg lg:text-xl text-text-muted font-medium leading-relaxed max-w-2xl"
                >
                  {t(p.descKey as TranslationKey)}
                </p>

                <div
                  data-reveal
                  className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-6"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-muted">
                      {t('platforms')}
                    </span>
                    <span className="text-sm font-bold text-text-main">
                      {p.approach.join(' · ')}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-muted">
                      {t('license')}
                    </span>
                    <span className="text-sm font-bold text-text-main">{p.license}</span>
                  </div>
                  <div className="flex flex-col gap-1.5 col-span-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-muted">
                      {t('builtWith')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full border border-border bg-card-hover text-xs font-bold text-text-main"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div data-reveal className="flex flex-wrap gap-3">
                <a
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-text-main text-page text-sm font-bold hover:opacity-90 transition-all"
                >
                  {t(p.websiteLabelKey as TranslationKey)}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-card border border-border text-text-main text-sm font-bold hover:border-primary/30 hover:bg-card-hover transition-colors"
                >
                  <Github size={16} />
                  {t(p.repoLabelKey as TranslationKey)}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
