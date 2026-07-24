import fm from 'front-matter';

export type BlogLocale = 'en' | 'es';

interface BlogFrontmatter {
  title?: string;
  seoTitle?: string;
  kicker?: string;
  excerpt?: string;
  date?: string;
  updated?: string;
  tags?: string[];
  coverImage?: string;
  coverAlt?: string;
  featured?: boolean;
  published?: boolean;
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  locale: BlogLocale;
  availableLocales: BlogLocale[];
  translationUrls: Partial<Record<BlogLocale, string>>;
  title: string;
  seoTitle?: string;
  kicker?: string;
  excerpt: string;
  date: string;
  updated?: string;
  tags: string[];
  coverImage?: string;
  coverAlt?: string;
  featured: boolean;
  wordCount: number;
  readingTimeMinutes: number;
}

export interface BlogPostDetail extends BlogPostSummary {
  content: string;
}

interface ParsedFile {
  baseSlug: string;
  locale: BlogLocale;
  post: Omit<BlogPostDetail, 'availableLocales' | 'translationUrls'>;
}

const modules = import.meta.glob<{ default: string }>('./blog/*.md', {
  query: '?raw',
  eager: true,
});

const WORDS_PER_MINUTE = 220;

function calculateReadingTime(content: string) {
  return Math.max(1, Math.ceil(calculateWordCount(content) / WORDS_PER_MINUTE));
}

function calculateWordCount(content: string) {
  return content.trim().split(/\s+/).filter(Boolean).length;
}

function getExcerpt(body: string) {
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .filter((chunk) => !chunk.startsWith('#') && !chunk.startsWith('```'));

  return paragraphs[0]?.replace(/\s+/g, ' ').slice(0, 180) ?? '';
}

function parseFileName(filePath: string) {
  const fileName = filePath.replace('./blog/', '').replace('.md', '');
  const match = fileName.match(/^(.*?)(?:\.(en|es))?$/);

  if (!match) {
    return null;
  }

  return {
    baseSlug: match[1],
    locale: (match[2] ?? 'en') as BlogLocale,
  };
}

function buildTranslationUrls(baseSlug: string, locales: BlogLocale[]) {
  return locales.reduce<Partial<Record<BlogLocale, string>>>((accumulator, locale) => {
    accumulator[locale] = locale === 'es' ? `/${baseSlug}?lang=es` : `/${baseSlug}`;
    return accumulator;
  }, {});
}

function parseBlogPost(filePath: string, rawFile: string): ParsedFile | null {
  const parsedFileName = parseFileName(filePath);

  if (!parsedFileName) {
    return null;
  }

  const { baseSlug, locale } = parsedFileName;
  const { attributes, body } = fm<BlogFrontmatter>(rawFile);
  const title = attributes.title?.trim();

  if (attributes.published === false || !title) {
    return null;
  }

  return {
    baseSlug,
    locale,
    post: {
      id: `${baseSlug}-${locale}`,
      slug: baseSlug,
      locale,
      title,
      seoTitle: attributes.seoTitle?.trim(),
      kicker: attributes.kicker?.trim(),
      excerpt: attributes.excerpt?.trim() || getExcerpt(body),
      date: attributes.date || new Date().toISOString(),
      updated: attributes.updated,
      tags: Array.isArray(attributes.tags) ? attributes.tags : [],
      coverImage: attributes.coverImage?.trim(),
      coverAlt: attributes.coverAlt?.trim(),
      featured: Boolean(attributes.featured),
      wordCount: calculateWordCount(body),
      readingTimeMinutes: calculateReadingTime(body),
      content: body.trim(),
    },
  };
}

const parsedPosts = Object.entries(modules)
  .map(([filePath, rawModule]) => parseBlogPost(filePath, rawModule.default))
  .filter((post): post is ParsedFile => post !== null);

const groupedPosts = parsedPosts.reduce<Map<string, Map<BlogLocale, Omit<BlogPostDetail, 'availableLocales' | 'translationUrls'>>>>((accumulator, entry) => {
  const group = accumulator.get(entry.baseSlug) ?? new Map<BlogLocale, Omit<BlogPostDetail, 'availableLocales' | 'translationUrls'>>();
  group.set(entry.locale, entry.post);
  accumulator.set(entry.baseSlug, group);
  return accumulator;
}, new Map());

function enrichPost(baseSlug: string, post: Omit<BlogPostDetail, 'availableLocales' | 'translationUrls'>, locales: BlogLocale[]): BlogPostDetail {
  return {
    ...post,
    availableLocales: locales,
    translationUrls: buildTranslationUrls(baseSlug, locales),
  };
}

const BLOG_POST_GROUPS = Array.from(groupedPosts.entries())
  .map(([baseSlug, variants]) => {
    const locales = Array.from(variants.keys()).sort() as BlogLocale[];
    const enrichedVariants = new Map<BlogLocale, BlogPostDetail>();

    variants.forEach((post, locale) => {
      enrichedVariants.set(locale, enrichPost(baseSlug, post, locales));
    });

    return {
      baseSlug,
      locales,
      variants: enrichedVariants,
      sortDate: Array.from(enrichedVariants.values())[0]?.date ?? new Date().toISOString(),
    };
  })
  .sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime());

function getLocalizedVariant<T>(variants: Map<BlogLocale, T>, locale: BlogLocale) {
  return variants.get(locale) ?? variants.get('en') ?? Array.from(variants.values())[0];
}

export function getBlogPosts(locale: BlogLocale = 'en'): BlogPostSummary[] {
  return BLOG_POST_GROUPS
    .map((group) => getLocalizedVariant(group.variants, locale))
    .filter((post): post is BlogPostDetail => Boolean(post))
    .map(({ content, ...summary }) => summary);
}

export function getBlogPost(slug: string, locale: BlogLocale = 'en') {
  const group = BLOG_POST_GROUPS.find((entry) => entry.baseSlug === slug);

  if (!group) {
    return undefined;
  }

  return getLocalizedVariant(group.variants, locale);
}

export function getFeaturedBlogPost(locale: BlogLocale = 'en') {
  const posts = getBlogPosts(locale);
  return posts.find((post) => post.featured) ?? posts[0];
}

export const BLOG_POSTS = getBlogPosts('en');
