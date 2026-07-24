import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fm from 'front-matter';

const SITE_URL = 'https://gianfranco-portfolio.vercel.app';
const BLOG_URL = 'https://gianfranco-portfolio.vercel.app/blog';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'content', 'blog');
const distDir = path.join(rootDir, 'dist');

function absoluteUrl(inputPath = '/') {
  return `${SITE_URL}${inputPath.startsWith('/') ? inputPath : `/${inputPath}`}`;
}

function blogAbsoluteUrl(inputPath = '/') {
  return `${BLOG_URL}${inputPath.startsWith('/') ? inputPath : `/${inputPath}`}`;
}

function readPosts() {
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.md'));

  const variants = files
    .map((fileName) => {
      const filePath = path.join(contentDir, fileName);
      const rawFile = fs.readFileSync(filePath, 'utf8');
      const { attributes, body } = fm(rawFile);
      const title = attributes.title?.trim();

      if (!title || attributes.published === false) return null;

      const stem = fileName.replace(/\.md$/, '');
      const match = stem.match(/^(.*?)(?:\.(en|es))?$/);
      if (!match) return null;

      const slug = match[1];
      const locale = match[2] ?? 'en';
      const excerpt = attributes.excerpt?.trim() ?? body.trim().split(/\n\s*\n/)[0]?.trim() ?? '';

      return {
        slug,
        locale,
        title,
        seoTitle: attributes.seoTitle?.trim() || title,
        excerpt,
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
      return { slug, primary };
    });
}

function prerender() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html not found. Run "npm run build" first.');
    return;
  }
  
  const templateHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  const posts = readPosts();

  posts.forEach(({ slug, primary }) => {
    const postUrl = blogAbsoluteUrl(`/${slug}`);
    const postImage = primary.coverImage ? absoluteUrl(primary.coverImage) : absoluteUrl('/profile.png');
    const postTitle = primary.seoTitle || primary.title;
    const postDesc = primary.excerpt;

    let postHtml = templateHtml;
    
    // Replace title
    postHtml = postHtml.replace(/<title>.*?<\/title>/, `<title>${postTitle}</title>`);
    postHtml = postHtml.replace(/<meta name="title" content=".*?"\s*\/>/, `<meta name="title" content="${postTitle}" />`);
    
    // Replace description
    postHtml = postHtml.replace(/<meta name="description" content=".*?"\s*\/>/, `<meta name="description" content="${postDesc}" />`);
    
    // Replace Open Graph
    postHtml = postHtml.replace(/<meta property="og:url" content=".*?"\s*\/>/, `<meta property="og:url" content="${postUrl}" />`);
    postHtml = postHtml.replace(/<meta property="og:title" content=".*?"\s*\/>/, `<meta property="og:title" content="${postTitle}" />`);
    postHtml = postHtml.replace(/<meta property="og:description" content=".*?"\s*\/>/, `<meta property="og:description" content="${postDesc}" />`);
    postHtml = postHtml.replace(/<meta property="og:image" content=".*?"\s*\/>/, `<meta property="og:image" content="${postImage}" />`);
    postHtml = postHtml.replace(/<meta property="og:image:alt" content=".*?"\s*\/>/, `<meta property="og:image:alt" content="${postTitle}" />`);
    
    // Replace Twitter
    postHtml = postHtml.replace(/<meta name="twitter:url" content=".*?"\s*\/>/, `<meta name="twitter:url" content="${postUrl}" />`);
    postHtml = postHtml.replace(/<meta name="twitter:title" content=".*?"\s*\/>/, `<meta name="twitter:title" content="${postTitle}" />`);
    postHtml = postHtml.replace(/<meta name="twitter:description" content=".*?"\s*\/>/, `<meta name="twitter:description" content="${postDesc}" />`);
    postHtml = postHtml.replace(/<meta name="twitter:image" content=".*?"\s*\/>/, `<meta name="twitter:image" content="${postImage}" />`);
    postHtml = postHtml.replace(/<meta name="twitter:image:alt" content=".*?"\s*\/>/, `<meta name="twitter:image:alt" content="${postTitle}" />`);
    postHtml = postHtml.replace(/<meta name="twitter:card" content=".*?"\s*\/>/, `<meta name="twitter:card" content="summary_large_image" />`);

    // Replace Canonical
    postHtml = postHtml.replace(/<link rel="canonical" href=".*?"\s*\/>/, `<link rel="canonical" href="${postUrl}" />`);

    const slugDir = path.join(distDir, slug);
    if (!fs.existsSync(slugDir)) {
      fs.mkdirSync(slugDir, { recursive: true });
    }
    fs.writeFileSync(path.join(slugDir, 'index.html'), postHtml, 'utf8');
    console.log(`Generated pre-rendered HTML for /${slug}`);
  });
}

prerender();
