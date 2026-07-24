import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { Copy, Check, Github, Mail, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Closing chapter — oversized headline, email as the hero CTA (magnetic on
 * hover), social row, and a scroll-driven name marquee in the background.
 */
export const OutroChapter: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const emailInnerRef = useRef<HTMLSpanElement>(null);
  const { t, language } = useLanguage();
  const [copied, setCopied] = React.useState(false);
  const emailAddress = t('emailAddress');
  const atIndex = emailAddress.indexOf('@');
  const localPart = atIndex === -1 ? emailAddress : emailAddress.slice(0, atIndex + 1);
  const domain = atIndex === -1 ? '' : emailAddress.slice(atIndex + 1);
  const lastDotIndex = domain.lastIndexOf('.');
  const domainName = lastDotIndex === -1 ? domain : domain.slice(0, lastDotIndex);
  const domainSuffix = lastDotIndex === -1 ? '' : domain.slice(lastDotIndex);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Continuous time-based loop. Using scroll-linked scrub on a giant
        // full-row element while Lenis is also smoothing scroll caused
        // double-smoothing jitter — this RAF-driven tween never stutters.
        const track = marqueeRef.current;
        let marqueeTween: gsap.core.Tween | null = null;
        let marqueeSt: ScrollTrigger | null = null;
        let resetTimeout: number | undefined;

        if (track) {
          const distance = track.scrollWidth / 2;
          if (distance > 0) {
            marqueeTween = gsap.to(track, {
              x: -distance,
              duration: distance / 40,
              ease: 'none',
              repeat: -1,
            });

            // Kinetic touch: flip direction when the user scrolls up, nudge
            // speed with scroll velocity, settle back to base speed when idle.
            marqueeSt = ScrollTrigger.create({
              trigger: rootRef.current,
              start: 'top bottom',
              end: 'bottom top',
              onUpdate: (self) => {
                if (!marqueeTween) return;
                const velocityBoost = Math.min(Math.abs(self.getVelocity()) / 800, 3);
                marqueeTween.timeScale(self.direction + velocityBoost * self.direction);
                window.clearTimeout(resetTimeout);
                resetTimeout = window.setTimeout(() => {
                  if (marqueeTween) {
                    gsap.to(marqueeTween, { timeScale: 1, duration: 0.6, overwrite: true });
                  }
                }, 180);
              },
            });
          }
        }

        let headlineSplit: SplitText | null = null;
        if (headlineRef.current) {
          headlineSplit = new SplitText(headlineRef.current, { type: 'words' });
          gsap.from(headlineSplit.words, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' },
          });
        }

        // Magnetic email — subtle follow on hover.
        const link = emailRef.current;
        const inner = emailInnerRef.current;
        let removeMagnetic: (() => void) | undefined;
        if (link && inner) {
          const xTo = gsap.quickTo(link, 'x', { duration: 0.6, ease: 'power3.out' });
          const yTo = gsap.quickTo(link, 'y', { duration: 0.6, ease: 'power3.out' });
          const ixTo = gsap.quickTo(inner, 'x', { duration: 0.7, ease: 'power3.out' });
          const iyTo = gsap.quickTo(inner, 'y', { duration: 0.7, ease: 'power3.out' });

          const handleMove = (e: MouseEvent) => {
            const rect = link.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            xTo(dx * 0.08);
            yTo(dy * 0.2);
            ixTo(dx * 0.04);
            iyTo(dy * 0.1);
          };
          const handleLeave = () => {
            xTo(0);
            yTo(0);
            ixTo(0);
            iyTo(0);
          };

          link.addEventListener('mousemove', handleMove);
          link.addEventListener('mouseleave', handleLeave);
          removeMagnetic = () => {
            link.removeEventListener('mousemove', handleMove);
            link.removeEventListener('mouseleave', handleLeave);
          };
        }

        return () => {
          headlineSplit?.revert();
          removeMagnetic?.();
          window.clearTimeout(resetTimeout);
          marqueeSt?.kill();
          marqueeTween?.kill();
        };
      });
    },
    { scope: rootRef, dependencies: [language] }
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      key={language}
      ref={rootRef}
      className="relative w-full overflow-clip pt-32 sm:pt-40 pb-10 sm:pb-14"
      aria-label={t('contactTitle')}
    >
      <div className="px-5 sm:px-10 lg:px-16 3xl:px-24 max-w-[1320px] 3xl:max-w-[1500px] mx-auto">
        <div className="flex items-center justify-between mb-6 3xl:mb-10">
          <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em]">
            07 — {t('letsConnect')}
          </p>
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {t('availableForWork')}
          </div>
        </div>

        <h2
          ref={headlineRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] 3xl:text-[12rem] font-black text-text-main leading-[0.95] tracking-tighter mb-10 sm:mb-14 pb-[0.08em]"
        >
          {t('contactTitle')}
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-text-muted font-medium max-w-2xl mb-14 sm:mb-20">
          {t('contactMsg')}
        </p>

        {/* Email as the hero CTA */}
        <div className="border-t border-border pt-8 sm:pt-10 flex flex-col gap-6">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-text-muted">
            {t('writeMe')}
          </span>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <a
              ref={emailRef}
              href={`mailto:${emailAddress}`}
              className="group relative flex w-full min-w-0 items-start will-change-transform sm:inline-flex sm:w-auto sm:items-center"
            >
              <span
                ref={emailInnerRef}
                className="flex w-full min-w-0 flex-col items-start gap-2 text-[clamp(1.55rem,7.6vw,2.9rem)] font-black leading-[0.95] tracking-tighter text-text-main sm:inline-flex sm:w-auto sm:flex-row sm:items-center sm:gap-5 sm:text-5xl md:text-6xl lg:text-7xl 3xl:text-8xl"
              >
                <span className="max-w-full pb-[0.08em] underline decoration-2 decoration-text-muted/30 underline-offset-[0.18em] transition-colors group-hover:decoration-text-main">
                  {localPart}
                  {domainName && <wbr />}
                  {domainName}
                  {domainSuffix && <wbr />}
                  {domainSuffix}
                </span>
                <ArrowUpRight
                  className="shrink-0 self-end transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:self-auto"
                  size={32}
                  strokeWidth={1.5}
                />
              </span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border bg-card-hover text-text-main text-xs font-bold uppercase tracking-[0.2em] hover:bg-card transition-colors"
              aria-label={t('copy')}
            >
              {copied ? (
                <>
                  <Check size={14} strokeWidth={2.5} />
                  {t('copied')}
                </>
              ) : (
                <>
                  <Copy size={14} strokeWidth={2} />
                  {t('copy')}
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <a
              href="https://github.com/xovnex"
              target="_blank"
              rel="noreferrer"
              aria-label={t('ariaGithub')}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border bg-card-hover text-text-main text-xs font-bold uppercase tracking-[0.2em] hover:bg-text-main hover:text-page transition-colors"
            >
              <Github size={14} />
              GitHub
            </a>
            <a
              href="mailto:giandelacruzlopez@gmail.com"
              aria-label={t('emailMe')}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border bg-card-hover text-text-main text-xs font-bold uppercase tracking-[0.2em] hover:bg-text-main hover:text-page transition-colors"
            >
              <Mail size={14} />
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Oversized scrolling marquee */}
      <div className="mt-20 sm:mt-28 pointer-events-none">
        <div
          ref={marqueeRef}
          className="whitespace-nowrap text-[22vw] sm:text-[18vw] font-black tracking-tighter leading-none text-text-main/5 will-change-transform"
        >
          <span className="pr-16">Gianfranco De La Cruz</span>
          <span className="pr-16">Gianfranco De La Cruz</span>
          <span className="pr-16">Gianfranco De La Cruz</span>
          <span className="pr-16">Gianfranco De La Cruz</span>
        </div>
      </div>

      <div className="mt-16 sm:mt-20 px-5 sm:px-10 lg:px-16 3xl:px-24 max-w-[1320px] 3xl:max-w-[1500px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-text-muted text-xs font-medium uppercase tracking-wider">
        <p>{t('copyright').replace('{year}', String(new Date().getFullYear()))}</p>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <p>{t('role')}</p>
        </div>
      </div>
    </section>
  );
};
