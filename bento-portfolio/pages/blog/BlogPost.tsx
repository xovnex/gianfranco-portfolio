import { isValidElement, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import {
  getBlogPost,
  getBlogPosts,
  type BlogLocale,
  type BlogPostSummary,
} from '../../content/blog';
import { SEO } from '../../components/SEO';
import {
  absoluteUrl,
  blogAbsoluteUrl,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildPersonSchema,
  buildWebsiteSchema,
} from '../../config/seo';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSmoothScroll } from '../../components/SmoothScroll';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[`*_~]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function extractText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return extractText(node.props.children);
  return '';
}

function extractToc(content: string): TocItem[] {
  const matches = content.matchAll(/^(##)\s+(.+)$/gm);
  return Array.from(matches).map((match) => ({
    id: slugifyHeading(match[2].trim()),
    text: match[2].trim(),
    depth: 2 as const,
  }));
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const blogLocale = language as BlogLocale;
  const isSpanish = blogLocale === 'es';
  const post = slug ? getBlogPost(slug, blogLocale) : undefined;
  const toc = useMemo(() => (post ? extractToc(post.content) : []), [post]);

  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeTocId, setActiveTocId] = useState<string | null>(null);
  const { lenis } = useSmoothScroll();

  const handleTocClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();

    // Kill all pending prose ScrollTriggers and snap content to visible before
    // the programmatic scroll — otherwise dozens of tweens fire as we skim past,
    // stuttering the main thread during Lenis's scrollTo.
    const proseNodes = rootRef.current?.querySelectorAll<HTMLElement>('[data-prose] > *');
    if (proseNodes && proseNodes.length) {
      ScrollTrigger.getAll().forEach((st) => {
        const trig = st.trigger as HTMLElement | null;
        if (trig && trig.closest('[data-prose]')) {
          gsap.killTweensOf(trig);
          st.kill();
        }
      });
      gsap.set(proseNodes, { opacity: 1, y: 0, clearProps: 'transform' });
    }

    const offset = -88;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 0.7, easing: (t) => 1 - Math.pow(1 - t, 3) });
    } else {
      const y = target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    if (typeof window !== 'undefined' && window.history.replaceState) {
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  // Sister posts for the "up next" block.
  const sisterPosts = useMemo(() => {
    if (!post) return [] as BlogPostSummary[];
    const all = getBlogPosts(blogLocale);
    return all.filter((p) => p.slug !== post.slug).slice(0, 2);
  }, [post, blogLocale]);

  useGSAP(
    () => {
      if (!post) return;
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (titleRef.current) {
          const split = new SplitText(titleRef.current, { type: 'words' });
          gsap.from(split.words, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            stagger: 0.06,
            ease: 'power3.out',
            delay: 0.1,
          });
        }

        gsap.from('[data-hero-meta]', {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.4,
        });

        gsap.from('[data-hero-excerpt]', {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.55,
        });

        gsap.from('[data-hero-tags] > *', {
          opacity: 0,
          y: 10,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.7,
        });

        // Reveal prose sections as the user scrolls through.
        // Per-element triggers with `once` so jumping via the TOC still reveals
        // anything that enters the viewport (batch onEnter can miss fast skips).
        const proseChildren =
          rootRef.current?.querySelectorAll<HTMLElement>('[data-prose] > *') ?? [];
        if (proseChildren.length) {
          gsap.set(proseChildren, { opacity: 0, y: 20 });
          proseChildren.forEach((child) => {
            gsap.to(child, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: child,
                start: 'top bottom',
                once: true,
              },
            });
          });
        }

        // Up-next cards stagger in.
        const upNextCards = rootRef.current?.querySelectorAll<HTMLElement>('[data-upnext]') ?? [];
        if (upNextCards.length) {
          gsap.from(upNextCards, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: upNextCards[0],
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const proseChildren =
          rootRef.current?.querySelectorAll<HTMLElement>('[data-prose] > *') ?? [];
        gsap.set(proseChildren, { opacity: 1, y: 0 });
      });
    },
    { scope: rootRef, dependencies: [post?.slug, language] }
  );

  // TOC scrollspy using IntersectionObserver — lighter than a scroll handler
  // and synchronizes with the smooth scroll naturally.
  useEffect(() => {
    if (!post || toc.length === 0) return;
    const headings = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);
        if (visible[0]) {
          setActiveTocId((visible[0].target as HTMLElement).id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [post, toc]);

  const markdownComponents = useMemo<Components>(
    () => ({
      h2: ({ children, ...props }) => {
        const text = extractText(children);
        const id = slugifyHeading(text);
        return (
          <h2
            id={id}
            className="mt-20 mb-6 scroll-mt-28 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-text-main leading-tight"
            {...props}
          >
            {children}
          </h2>
        );
      },
      h3: ({ children, ...props }) => {
        const text = extractText(children);
        const id = slugifyHeading(text);
        return (
          <h3
            id={id}
            className="mt-14 mb-4 scroll-mt-28 text-xl sm:text-2xl font-bold tracking-tight text-text-main"
            {...props}
          >
            {children}
          </h3>
        );
      },
      p: ({ ...props }) => (
        <p
          className="text-[17px] sm:text-lg leading-[1.85] text-text-muted font-medium my-6"
          {...props}
        />
      ),
      strong: ({ ...props }) => (
        <strong className="font-bold text-text-main" {...props} />
      ),
      a: ({ href, ...props }) => (
        <a
          href={href}
          className="font-semibold text-text-main underline decoration-border decoration-2 underline-offset-[0.2em] transition-colors hover:decoration-text-main"
          target={href?.startsWith('http') ? '_blank' : undefined}
          rel={href?.startsWith('http') ? 'noreferrer' : undefined}
          {...props}
        />
      ),
      ul: ({ ...props }) => (
        <ul
          className="my-8 space-y-3 pl-6 text-[17px] sm:text-lg leading-[1.85] text-text-muted font-medium marker:text-text-main"
          {...props}
        />
      ),
      ol: ({ ...props }) => (
        <ol
          className="my-8 space-y-3 pl-6 text-[17px] sm:text-lg leading-[1.85] text-text-muted font-medium marker:font-black marker:text-text-main"
          {...props}
        />
      ),
      li: ({ ...props }) => <li className="pl-1" {...props} />,
      blockquote: ({ ...props }) => (
        <blockquote
          className="my-12 border-l-2 border-text-main pl-6 sm:pl-8 py-2 text-lg sm:text-xl leading-[1.7] font-medium text-text-main italic"
          {...props}
        />
      ),
      hr: ({ ...props }) => <hr className="my-16 border-border" {...props} />,
      table: ({ ...props }) => (
        <div className="not-prose my-10 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="min-w-full border-collapse text-left text-sm text-text-muted" {...props} />
        </div>
      ),
      thead: ({ ...props }) => <thead className="bg-card-hover text-text-main" {...props} />,
      th: ({ ...props }) => (
        <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.16em]" {...props} />
      ),
      td: ({ ...props }) => (
        <td className="border-t border-border px-4 py-3 align-top leading-7" {...props} />
      ),
      code: ({ className, children, ...props }) => {
        const isInline = !className;
        if (isInline) {
          return (
            <code
              className="rounded-md border border-border bg-card-hover px-1.5 py-0.5 font-mono text-[0.9em] text-text-main"
              {...props}
            >
              {children}
            </code>
          );
        }
        return (
          <code className="font-mono text-sm leading-7 text-slate-100" {...props}>
            {children}
          </code>
        );
      },
      pre: ({ ...props }) => (
        <pre
          className="not-prose my-10 overflow-x-auto rounded-2xl border border-white/10 bg-[#0f1117] px-5 py-5 sm:px-6 sm:py-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]"
          {...props}
        />
      ),
    }),
    []
  );

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <SEO title={t('blogNotFoundTitle')} description={t('blogNotFoundDescription')} noindex />
        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4 text-text-main">
          {t('blogNotFoundTitle')}
        </h1>
        <p className="text-text-muted mb-8 text-lg">{t('blogNotFoundDescription')}</p>
        <Link
          to={isSpanish ? '/?lang=es' : '/'}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-text-main text-page text-sm font-bold hover:opacity-90 transition-opacity"
        >
          {t('blogReturnToBlog')}
          <ArrowUpRight size={16} />
        </Link>
      </div>
    );
  }

  const articleUrl = blogAbsoluteUrl(isSpanish ? `/${post.slug}?lang=es` : `/${post.slug}`);
  const articleImage = post.coverImage ? absoluteUrl(post.coverImage) : absoluteUrl('/profile.png');
  const formatDate = (iso: string, opts?: Intl.DateTimeFormatOptions) =>
    new Date(iso).toLocaleDateString(
      isSpanish ? 'es-ES' : 'en-US',
      opts ?? { month: 'long', day: 'numeric', year: 'numeric' }
    );

  const sisterHref = (s: string) => (isSpanish ? `/${s}?lang=es` : `/${s}`);

  const articleSchemas = [
    buildPersonSchema(),
    buildWebsiteSchema(),
    buildArticleSchema({
      url: articleUrl,
      title: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      image: articleImage,
      imageAlt: post.coverAlt,
      keywords: post.tags,
      wordCount: post.wordCount,
      readingTimeMinutes: post.readingTimeMinutes,
      language: isSpanish ? 'es' : 'en',
      section: t('aiEngineering'),
    }),
    buildBreadcrumbSchema([
      { name: t('home'), item: absoluteUrl(isSpanish ? '/?lang=es' : '/') },
      { name: t('blogTitle'), item: blogAbsoluteUrl(isSpanish ? '/?lang=es' : '/') },
      { name: post.title, item: articleUrl },
    ]),
  ];

  return (
    <article key={`${post.slug}-${language}`} ref={rootRef} className="w-full">
      <SEO
        title={post.seoTitle ?? post.title}
        description={post.excerpt}
        ogType="article"
        ogImage={articleImage}
        ogImageAlt={post.coverAlt}
        locale={isSpanish ? 'es_PE' : 'en_US'}
        alternateLocales={isSpanish ? ['en_US'] : ['es_PE']}
        publishedTime={post.date}
        modifiedTime={post.updated ?? post.date}
        tags={post.tags}
        section={t('aiEngineering')}
        keywords={post.tags}
        twitterCard={post.coverImage ? 'summary_large_image' : 'summary'}
        canonical={articleUrl}
        alternates={[
          ...(post.translationUrls.en
            ? [{ hrefLang: 'en', href: blogAbsoluteUrl(post.translationUrls.en) }]
            : []),
          ...(post.translationUrls.es
            ? [{ hrefLang: 'es', href: blogAbsoluteUrl(post.translationUrls.es) }]
            : []),
          { hrefLang: 'x-default', href: blogAbsoluteUrl(post.translationUrls.en ?? `/${post.slug}`) },
        ]}
        schemaData={articleSchemas}
      />

      {/* Hero */}
      <header ref={heroRef} className="w-full mb-16 sm:mb-24">
        <div
          data-hero-meta
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-text-muted mb-8 sm:mb-12"
        >
          <span className="text-primary">{t('aiEngineering')}</span>
          {post.kicker && (
            <>
              <span className="h-px w-8 bg-border" />
              <span className="text-text-main">{post.kicker}</span>
            </>
          )}
          <span className="h-px w-8 bg-border" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="h-px w-8 bg-border" />
          <span>
            {post.readingTimeMinutes} {t('minRead')}
          </span>
          {post.updated && (
            <>
              <span className="h-px w-8 bg-border" />
              <span>
                {t('updatedLabel')} {formatDate(post.updated, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </>
          )}
        </div>

        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl 3xl:text-[9rem] font-black text-text-main leading-[1.02] tracking-tighter max-w-[1100px]"
        >
          {post.title}
        </h1>

        <p
          data-hero-excerpt
          className="mt-8 sm:mt-12 max-w-2xl text-base sm:text-lg lg:text-xl text-text-muted font-medium leading-relaxed"
        >
          {post.excerpt}
        </p>

        {post.tags.length > 0 && (
          <div
            data-hero-tags
            className="mt-8 sm:mt-10 flex flex-wrap gap-2"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full border border-border bg-card-hover text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Body + TOC */}
      <div className="grid gap-10 lg:gap-16 xl:grid-cols-[minmax(0,1fr)_260px] border-t border-border pt-12 sm:pt-16">
        <div data-prose className="max-w-[720px] 3xl:max-w-[820px] min-w-0">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {post.content}
          </ReactMarkdown>
        </div>

        {toc.length > 0 && (
          <aside className="hidden xl:block">
            <div className="sticky top-32">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted mb-5">
                {t('onThisPage')}
              </p>
              <nav>
                <ul className="flex flex-col gap-3 border-l border-border pl-5">
                  {toc.map((item) => {
                    const isActive = activeTocId === item.id;
                    return (
                      <li key={item.id} className="relative">
                        {isActive && (
                          <span className="absolute -left-[21px] top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-full bg-text-main" />
                        )}
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => handleTocClick(e, item.id)}
                          className={`block text-sm leading-snug transition-colors ${
                            isActive
                              ? 'text-text-main font-bold'
                              : 'text-text-muted hover:text-text-main'
                          }`}
                        >
                          {item.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <p className="mt-8 pt-6 border-t border-border text-xs leading-6 text-text-muted">
                {t('blogSummaryNote')}
              </p>
            </div>
          </aside>
        )}
      </div>

      {/* Up next */}
      {sisterPosts.length > 0 && (
        <section className="w-full mt-24 sm:mt-32 border-t border-border pt-12 sm:pt-16">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em]">
              {t('upNext')}
            </p>
            <Link
              to={isSpanish ? '/?lang=es' : '/'}
              className="group inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-text-main"
            >
              {t('allPosts')}
              <ArrowUpRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {sisterPosts.map((sister) => (
              <Link
                key={sister.id}
                data-upnext
                to={sisterHref(sister.slug)}
                className="group relative rounded-[24px] border border-border bg-card p-6 sm:p-8 transition-colors duration-300 hover:bg-card-hover flex flex-col gap-4 min-h-[200px]"
              >
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-text-muted">
                  <time dateTime={sister.date}>{formatDate(sister.date)}</time>
                  <span className="h-px w-4 bg-border" />
                  <span>
                    {sister.readingTimeMinutes} {t('minRead')}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-text-main leading-tight flex-1">
                  {sister.title}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {sister.tags.slice(0, 2).map((tag) => (
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
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
