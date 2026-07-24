import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fm from 'front-matter';

const SITE_URL = 'https://gianfranco-portfolio.vercel.app';
const BLOG_URL = 'https://gianfranco-portfolio.vercel.app/blog';
const SITE_NAME = 'Gianfranco De La Cruz Lopez';
const BLOG_TITLE = `${SITE_NAME} Blog`;
const SUPPORTED_LOCALES = ['en', 'es'];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'content', 'blog');
const publicDir = path.join(rootDir, 'public');

function absoluteUrl(inputPath = '/') {
  return `${SITE_URL}${inputPath.startsWith('/') ? inputPath : `/${inputPath}`}`;
}

function blogAbsoluteUrl(inputPath = '/') {
  return `${BLOG_URL}${inputPath.startsWith('/') ? inputPath : `/${inputPath}`}`;
}

function xmlEscape(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function cdata(value = '') {
  return `<![CDATA[${value.replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;
}

function readPosts() {
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.md'));

  const variants = files
    .map((fileName) => {
      const filePath = path.join(contentDir, fileName);
      const rawFile = fs.readFileSync(filePath, 'utf8');
      const { attributes, body } = fm(rawFile);
      const title = attributes.title?.trim();

      if (!title || attributes.published === false) {
        return null;
      }

      const stem = fileName.replace(/\.md$/, '');
      const match = stem.match(/^(.*?)(?:\.(en|es))?$/);

      if (!match) {
        return null;
      }

      const slug = match[1];
      const locale = match[2] ?? 'en';
      const excerpt = attributes.excerpt?.trim() ?? body.trim().split(/\n\s*\n/)[0]?.trim() ?? '';
      const publishedDate = attributes.date || new Date().toISOString().slice(0, 10);
      const modifiedDate = attributes.updated || publishedDate;

      return {
        slug,
        locale,
        title,
        excerpt,
        publishedDate,
        modifiedDate,
        body: body.trim(),
        tags: Array.isArray(attributes.tags) ? attributes.tags : [],
        coverImage: attributes.coverImage?.trim(),
      };
    })
    .filter(Boolean);

  const groups = new Map();

  variants.forEach((variant) => {
    const group = groups.get(variant.slug) ?? new Map();
    group.set(variant.locale, variant);
    groups.set(variant.slug, group);
  });

  return Array.from(groups.entries())
    .map(([slug, locales]) => {
      const primary = locales.get('en') ?? Array.from(locales.values())[0];
      const availableLocales = Array.from(locales.keys()).filter((locale) => SUPPORTED_LOCALES.includes(locale));

      return {
        slug,
        availableLocales,
        primary,
        locales,
      };
    })
    .sort((a, b) => new Date(b.primary.publishedDate).getTime() - new Date(a.primary.publishedDate).getTime());
}

function generateSitemap(posts) {
  const latestDate = posts[0]?.primary.modifiedDate ?? new Date().toISOString().slice(0, 10);
  const urls = [
    {
      loc: absoluteUrl('/'),
      lastmod: latestDate,
      changefreq: 'weekly',
      priority: '1.0',
    },
    {
      loc: absoluteUrl('/?lang=es'),
      lastmod: latestDate,
      changefreq: 'weekly',
      priority: '0.9',
    },
    {
      loc: blogAbsoluteUrl('/'),
      lastmod: latestDate,
      changefreq: 'weekly',
      priority: '0.8',
    },
    {
      loc: blogAbsoluteUrl('/?lang=es'),
      lastmod: latestDate,
      changefreq: 'weekly',
      priority: '0.7',
    },
    ...posts.flatMap((post) => post.availableLocales.map((locale) => {
      const variant = post.locales.get(locale) ?? post.primary;

      return {
      loc: blogAbsoluteUrl(locale === 'es' ? `/${post.slug}?lang=es` : `/${post.slug}`),
      lastmod: variant.modifiedDate,
      changefreq: 'monthly',
      priority: '0.7',
      image: variant.coverImage ? absoluteUrl(variant.coverImage) : null,
      title: variant.title,
    }; })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map((entry) => `  <url>
    <loc>${xmlEscape(entry.loc)}</loc>
    <lastmod>${xmlEscape(entry.lastmod)}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
${entry.image ? `    <image:image>
      <image:loc>${xmlEscape(entry.image)}</image:loc>
      <image:title>${xmlEscape(entry.title)}</image:title>
    </image:image>
` : ''}  </url>`)
  .join('\n')}
</urlset>
`;
}

function generateRss(posts) {
  const latestDate = posts[0]?.primary.modifiedDate ?? new Date().toUTCString();
  const englishPosts = posts.map((post) => post.locales.get('en') ?? post.primary);

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(BLOG_TITLE)}</title>
    <link>${xmlEscape(blogAbsoluteUrl('/'))}</link>
    <description>${xmlEscape('Notes on algorithms, Python, FastAPI, React, and software engineering.')}</description>
    <language>en-us</language>
    <lastBuildDate>${xmlEscape(new Date(latestDate).toUTCString())}</lastBuildDate>
    <atom:link href="${xmlEscape(blogAbsoluteUrl('/rss.xml'))}" rel="self" type="application/rss+xml" />
${englishPosts
  .map((post) => `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${xmlEscape(blogAbsoluteUrl(`/${post.slug}`))}</link>
      <guid isPermaLink="true">${xmlEscape(blogAbsoluteUrl(`/${post.slug}`))}</guid>
      <pubDate>${xmlEscape(new Date(post.publishedDate).toUTCString())}</pubDate>
      <description>${cdata(post.excerpt)}</description>
    </item>`)
  .join('\n')}
  </channel>
</rss>
`;
}

/**
 * Build the full GEO-optimized content dump — every post concatenated as plain
 * Markdown with a stable header. Consumed by LLM crawlers (see /llms.txt).
 */
function generateLlmsFull(posts) {
  const englishPosts = posts.map((post) => post.locales.get('en') ?? post.primary);
  const lastUpdated = new Date().toISOString().slice(0, 10);

  const header = `# Gianfranco De La Cruz Lopez — Full Content Archive

> Every blog post by Gianfranco De La Cruz Lopez, concatenated as plain Markdown for LLM consumption. For the curated site map, see /llms.txt. For the HTML site, see https://gianfranco-portfolio.vercel.app.

- Site: https://gianfranco-portfolio.vercel.app
- Blog: https://gianfranco-portfolio.vercel.app/blog
- Author: Gianfranco De La Cruz Lopez (software developer, Lima, Peru)
- Contact: giandelacruzlopez@gmail.com
- Last updated: ${lastUpdated}

---

`;

  const body = englishPosts
    .map((post) => {
      const url = blogAbsoluteUrl(`/${post.slug}`);
      const tagLine = post.tags.length > 0 ? `\n- Tags: ${post.tags.join(', ')}` : '';
      return `# ${post.title}

- URL: ${url}
- Published: ${post.publishedDate}
- Updated: ${post.modifiedDate}${tagLine}
- Summary: ${post.excerpt}

${post.body}

---
`;
    })
    .join('\n');

  return header + body;
}

const posts = readPosts();

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateSitemap(posts), 'utf8');
fs.writeFileSync(path.join(publicDir, 'rss.xml'), generateRss(posts), 'utf8');
fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), generateLlmsFull(posts), 'utf8');
