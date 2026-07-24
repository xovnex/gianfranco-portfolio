import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { getBlogPosts, getFeaturedBlogPost, type BlogLocale } from '../../content/blog';
import { SEO } from '../../components/SEO';
import {
  BLOG_KEYWORDS,
  absoluteUrl,
  blogAbsoluteUrl,
  buildBreadcrumbSchema,
  SITE_NAME,
} from '../../config/seo';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function BlogHome() {
  const { language, t } = useLanguage();
  const blogLocale = language as BlogLocale;
  const isSpanish = blogLocale === 'es';
  const posts = getBlogPosts(blogLocale);
  const featuredPost = getFeaturedBlogPost(blogLocale);
  const remainingPosts = posts.filter((post) => post.slug !== featuredPost?.slug);

  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (headingRef.current) {
          const split = new SplitText(headingRef.current, { type: 'words' });
          gsap.from(split.words, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            stagger: 0.06,
            ease: 'power3.out',
            delay: 0.1,
          });
        }

        gsap.from('[data-blog-meta]', {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.4,
        });

        gsap.from('[data-blog-featured]', {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.6,
        });

        const tiles = rootRef.current?.querySelectorAll<HTMLElement>('[data-blog-tile]') ?? [];
        if (tiles.length) {
          gsap.from(tiles, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: tiles[0],
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });
    },
    { scope: rootRef, dependencies: [language] }
  );

  const blogUrl = blogAbsoluteUrl(isSpanish ? '/?lang=es' : '/');
  const blogDescription = t('blogHeroSubline');
  const blogKeywords = Array.from(new Set([...BLOG_KEYWORDS, ...posts.flatMap((post) => post.tags)]));
  const uiTitle = t('blogAppTitle');
  const siteBlogName = uiTitle;
  const articleHref = (slug: string) => (isSpanish ? `/${slug}?lang=es` : `/${slug}`);
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(isSpanish ? 'es-ES' : 'en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  const blogSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `${SITE_NAME} ${siteBlogName}`,
      description: blogDescription,
      url: blogUrl,
      inLanguage: isSpanish ? 'es' : 'en',
      author: { '@type': 'Person', name: SITE_NAME, url: absoluteUrl('/') },
      publisher: { '@type': 'Person', name: SITE_NAME, url: absoluteUrl('/') },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${uiTitle} | ${SITE_NAME}`,
      description: blogDescription,
      url: blogUrl,
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: absoluteUrl('/') },
    },
    buildBreadcrumbSchema([
      { name: t('home'), item: absoluteUrl(isSpanish ? '/?lang=es' : '/') },
      { name: t('blogTitle'), item: blogUrl },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: blogAbsoluteUrl(isSpanish ? `/${post.slug}?lang=es` : `/${post.slug}`),
        name: post.title,
      })),
    },
  ];

  return (
    <div key={language} ref={rootRef} className="w-full">
      <SEO
        title={uiTitle}
        description={blogDescription}
        canonical={blogUrl}
        locale={isSpanish ? 'es_PE' : 'en_US'}
        alternateLocales={isSpanish ? ['en_US'] : ['es_PE']}
        keywords={blogKeywords}
        ogImage={featuredPost?.coverImage ? absoluteUrl(featuredPost.coverImage) : undefined}
        ogImageAlt={featuredPost?.coverAlt}
        twitterCard={featuredPost?.coverImage ? 'summary_large_image' : 'summary'}
        rssFeed={blogAbsoluteUrl('/rss.xml')}
        alternates={[
          { hrefLang: 'en', href: blogAbsoluteUrl('/') },
          { hrefLang: 'es', href: blogAbsoluteUrl('/?lang=es') },
          { hrefLang: 'x-default', href: blogAbsoluteUrl('/') },
        ]}
        schemaData={blogSchemas}
      />

      {/* Hero */}
      <section className="w-full mb-16 sm:mb-24">
        <div
          data-blog-meta
          className="flex items-center justify-between mb-6 sm:mb-10"
        >
          <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em]">
            {t('blogHeroKicker')} / {posts.length} {posts.length === 1 ? t('articleSingular') : t('articlePlural')}
          </p>
          {posts[0] && (
            <p className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {t('latest')} · {formatDate(posts[0].date)}
            </p>
          )}
        </div>

        <h1
          ref={headingRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] 3xl:text-[11rem] font-black text-text-main leading-[1] tracking-tighter"
        >
          {t('blogHeroHeadline')}
        </h1>

        <p
          data-blog-meta
          className="mt-8 sm:mt-12 max-w-2xl text-base sm:text-lg lg:text-xl text-text-muted font-medium leading-relaxed"
        >
          {t('blogHeroSubline')}
        </p>
      </section>

      {/* Featured */}
      {featuredPost && (
        <section
          data-blog-featured
          className="w-full mb-16 sm:mb-24 border-t border-border pt-10 sm:pt-14"
        >
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-main bg-card-hover border border-border px-3 py-1 rounded-full">
              <BookOpen size={11} strokeWidth={2} />
              {t('featured')}
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-text-muted">
              {formatDate(featuredPost.date)} · {featuredPost.readingTimeMinutes} {t('minRead')}
            </span>
          </div>

          <Link
            to={articleHref(featuredPost.slug)}
            className="group block"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-8">
                {featuredPost.kicker && (
                  <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
                    {featuredPost.kicker}
                  </span>
                )}
                <h2 className="text-3xl sm:text-5xl md:text-6xl 3xl:text-7xl font-black tracking-tighter text-text-main leading-[0.95] group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="mt-6 max-w-2xl text-base sm:text-lg text-text-muted font-medium leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-5">
                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full border border-border bg-card-hover text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-text-main">
                  {t('readPost')}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Rest */}
      {remainingPosts.length > 0 && (
        <section className="w-full border-t border-border pt-10 sm:pt-14">
          <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-8 sm:mb-10">
            {t('moreReading')}
          </p>

          <div className="divide-y divide-border">
            {remainingPosts.map((post, index) => (
              <Link
                key={post.id}
                data-blog-tile
                to={articleHref(post.slug)}
                className="group flex flex-col gap-5 py-8 sm:py-10 first:pt-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                  <div className="lg:col-span-1 flex lg:flex-col gap-2 items-baseline lg:items-start">
                    <span className="text-xl sm:text-2xl font-black tracking-tighter text-text-main">
                      {String(index + 2).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="lg:col-span-7">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-text-main leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-4 text-sm sm:text-base text-text-muted font-medium leading-relaxed max-w-2xl line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-text-muted">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="h-px w-6 bg-border hidden sm:inline-block" />
                      <span>
                        {post.readingTimeMinutes} {t('minRead')}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full border border-border bg-card-hover text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-text-main">
                      {t('readPost')}
                      <ArrowUpRight
                        size={13}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
