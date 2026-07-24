import React, { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { getBlogPosts, type BlogLocale, type BlogPostSummary } from '../../content/blog';

gsap.registerPlugin(ScrollTrigger);

/**
 * Writing chapter — surfaces blog posts on the homepage and links out to the
 * blog app at `/blog` (same domain, no subdomain in this deployment).
 * Featured post is the big hero card; the rest render as a grid.
 */
export const BlogChapter: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const { featured, rest, allPostsHref, postHref } = useMemo(() => {
    const locale = language as BlogLocale;
    const posts = getBlogPosts(locale);
    const [first, ...tail] = posts;
    const isEs = locale === 'es';
    return {
      featured: first as BlogPostSummary | undefined,
      rest: tail.slice(0, 2),
      allPostsHref: isEs ? '/blog?lang=es' : '/blog',
      postHref: (slug: string) => (isEs ? `/blog/${slug}?lang=es` : `/blog/${slug}`),
    };
  }, [language]);

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

        const cards = rootRef.current?.querySelectorAll<HTMLElement>('[data-blog-card]') ?? [];
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    },
    { scope: rootRef, dependencies: [language] }
  );

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  if (!featured) {
    return null;
  }

  return (
    <section
      ref={rootRef}
      className="relative w-full px-5 sm:px-10 lg:px-16 3xl:px-24 py-24 sm:py-32"
      aria-label={t('writingSection')}
    >
      <div
        ref={headingRef}
        className="max-w-[1320px] 3xl:max-w-[1500px] mx-auto mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
      >
        <div>
          <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-3">
            05 — {t('writingSection')}
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl 3xl:text-7xl font-black text-text-main leading-[0.9] tracking-tighter">
            {t('writingHeadline')}
            <br />
            <span className="text-text-muted/25">{t('writingSubline')}</span>
          </h2>
        </div>

        <a
          href={allPostsHref}
          className="group inline-flex items-center gap-2 h-11 px-5 rounded-full border border-border bg-card-hover text-text-main text-xs font-bold uppercase tracking-[0.2em] hover:bg-text-main hover:text-page transition-colors self-start sm:self-auto"
        >
          {t('allPosts')}
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      <div className="max-w-[1320px] 3xl:max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Featured */}
        <a
          data-blog-card
          href={postHref(featured.slug)}
          className="group relative lg:col-span-7 flex flex-col justify-between rounded-[28px] border border-border bg-card p-7 sm:p-10 overflow-hidden transition-colors duration-300 hover:bg-card-hover min-h-[320px] sm:min-h-[420px]"
        >
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-text-muted">
            <span className="inline-flex items-center gap-2 bg-card-hover border border-border px-3 py-1 rounded-full text-text-main">
              <BookOpen size={11} strokeWidth={2} />
              {t('featured')}
            </span>
            <span className="flex items-center gap-3">
              <time dateTime={featured.date}>{formatDate(featured.date)}</time>
              <span className="h-px w-6 bg-border hidden sm:inline-block" />
              <span className="hidden sm:inline">
                {featured.readingTimeMinutes} {t('minRead')}
              </span>
            </span>
          </div>

          <div className="mt-10 sm:mt-12 flex flex-col gap-5">
            {featured.kicker && (
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                {featured.kicker}
              </span>
            )}
            <h3 className="text-3xl sm:text-4xl md:text-5xl 3xl:text-6xl font-black tracking-tighter text-text-main leading-[0.95]">
              {featured.title}
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-text-muted font-medium leading-relaxed max-w-2xl">
              {featured.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-text-main">
                {t('readPost')}
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
              {featured.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full border border-border bg-card-hover text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </a>

        {/* Rest */}
        <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
          {rest.length > 0 ? (
            rest.map((post) => (
              <a
                key={post.id}
                data-blog-card
                href={postHref(post.slug)}
                className="group relative flex-1 flex flex-col justify-between rounded-[24px] border border-border bg-card p-6 sm:p-8 transition-colors duration-300 hover:bg-card-hover min-h-[180px]"
              >
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-text-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="h-px w-4 bg-border" />
                  <span>
                    {post.readingTimeMinutes} {t('minRead')}
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-text-main leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-muted font-medium leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full border border-border bg-card-hover text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-text-main transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </a>
            ))
          ) : (
            <a
              data-blog-card
              href={allPostsHref}
              className="group relative flex-1 flex flex-col justify-center items-start gap-3 rounded-[24px] border border-dashed border-border bg-card/40 p-8 transition-colors duration-300 hover:bg-card-hover"
            >
              <BookOpen size={24} strokeWidth={1.5} className="text-text-main" />
              <span className="text-lg font-black tracking-tight text-text-main">
                {t('allPosts')}
              </span>
              <span className="text-sm text-text-muted">{t('writingSubline')}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
