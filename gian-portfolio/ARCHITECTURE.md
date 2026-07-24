# Architecture

A map of how the codebase fits together. Read [`AGENTS.md`](./AGENTS.md) for conventions; this file explains the *shape*.

## Two apps, one bundle

```
index.html
   │
   └─ index.tsx ── decides based on URL
         │
         ├─ /              → <App />         (portfolio single-page)
         └─ /blog/*        → <BlogApp />     (React Router)
```

Both share:
- `ThemeProvider` (light/dark)
- `LanguageProvider` (EN/ES)
- `SmoothScroll` (Lenis)
- `Grain` overlay
- `SEO` via `react-helmet-async`

But they render different root trees so you can tune chrome, routing, and animation budget independently.

## The portfolio scroll narrative

`App.tsx` renders chapters in order. Each chapter is a self-contained animation unit.

```
IntroLoader         → first-paint curtain reveal
┌─────────────────┐
│ HeroChapter     │ 01  Hero name + roles, scrubbed to scroll
│ BentoChapter    │ 02  Bento-grid with ScrollTrigger.batch entrance
│ StoryChapter    │ 03  About — SplitText lines, parallax portrait
│ TimelineChapter │ 04  Vertical timeline with animated progress line
│ ProjectsChapter │ 05  Editorial project reveals
│ BlogChapter     │ 06  Featured + recent posts — links to /blog
│ StackChapter    │ 07  Two opposing marquees, hover-to-pause
│ GlobeChapter    │ 08  Cobe globe — remote-first message
│ OutroChapter    │ 09  Email CTA + kinetic name marquee
└─────────────────┘
```

Global chrome (fixed):
- `BlogLink` — top-right pill to the blog
- Language switcher — top-left
- Theme toggle — bottom-right

## Animation stack

```
         ┌──────────────────────┐
User →   │  Lenis (smooth wheel)│
wheel    └──────────┬───────────┘
                    │ scroll event
                    ▼
         ┌──────────────────────┐
         │ ScrollTrigger.update │ ← fired each Lenis tick
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │ GSAP timelines       │ — per-chapter reveals, scrubs, pins
         └──────────────────────┘
```

`SmoothScroll.tsx` is the single place where Lenis and GSAP ticker are wired. It:
1. Creates `new Lenis(...)` (unless `prefers-reduced-motion`).
2. Feeds Lenis time via `gsap.ticker.add`.
3. Calls `ScrollTrigger.update()` on every Lenis `'scroll'` event.
4. Exposes `{ lenis, stop, start }` via context so `IntroLoader` and `DetailView` can pause scroll.

`useGSAP` is used over `useLayoutEffect` everywhere for React Strict Mode safety and scoped cleanup.

## Blog pipeline

```
content/posts/*.md
   │
   │ at build time:
   ├─────────────► scripts/generate-seo.mjs ─► public/sitemap.xml, rss.xml, meta JSON
   │
   │ at runtime:
   ├─────────────► content/blog.ts ─► getBlogPosts(), getBlogPost()
   │
   │ at post-build:
   └─────────────► scripts/prerender-seo.mjs ─► injects SSR HTML into dist/index.html
```

`content/blog.ts`:
- Imports every `.md` in `content/posts/` via Vite's `import.meta.glob`.
- Parses frontmatter with `front-matter`.
- Detects language from filename suffix: `my-post.md` (EN) / `my-post.es.md` (ES).
- Sorts by `date` descending.
- Computes `readingTimeMinutes` from word count.

`BlogPost.tsx`:
- Renders Markdown via `react-markdown` + `remark-gfm`.
- Extracts `##` headings for the TOC.
- Uses `IntersectionObserver` for active-TOC scrollspy.
- `ReadingProgress` bar reads `document.documentElement.scrollHeight`.
- Clicking a TOC entry routes through Lenis (`lenis.scrollTo`) with a pre-reveal of any hidden prose.

## i18n

Single source of truth: [`i18n/translations.ts`](./i18n/translations.ts).

```
translations: { en: { ... }, es: { ... } }
       │
       │ typed as const
       ▼
TranslationKey = keyof translations.en
       │
       ▼
useLanguage() → { t, language, setLanguage }
```

TypeScript enforces parity between locales because `t(key)` is typed against `TranslationKey` (which is EN's key set). A key missing from ES won't fail `tsc` but fails sanity — keep both in lockstep.

Language persists in `localStorage` and drives URL query (`?lang=es`) for share-ability.

## Theming

```
index.css
   ├─ :root        → light theme CSS variables (--page, --text-main, …)
   ├─ .dark        → dark theme overrides
   └─ @layer base  → global element styles

tailwind.config.js
   └─ colors: {
        page: 'var(--page)',
        'text-main': 'var(--text-main)',
        ...
      }
```

`ThemeContext` toggles the `.dark` class on `<html>`. System preference is read once at mount.

## SEO

- `config/seo.ts` → `SITE_NAME`, `absoluteUrl`, `blogAbsoluteUrl`, `buildBreadcrumbSchema`, `BLOG_KEYWORDS`.
- `components/SEO.tsx` → thin wrapper around `react-helmet-async` that handles Open Graph, Twitter Card, canonical, `hreflang` alternates, JSON-LD.
- Build-time scripts produce `sitemap.xml`, `rss.xml`, and per-post prerendered HTML so crawlers see content without JS.

## Folder → responsibility cheat sheet

| Folder | Owns |
|---|---|
| `components/chapters/` | Scroll-narrative sections (homepage) |
| `components/cards/` | Bento-grid cards |
| `components/sections/` | Detail-view content sections |
| `components/` | Shared primitives |
| `pages/blog/` | Blog routes and templates |
| `content/` | Blog source + loader |
| `config/` | Site-wide constants |
| `i18n/` | Copy + language state |
| `scripts/` | Build-time Node scripts |
| `theme/` | Material-web color tokens |
| `types/` | Shared TypeScript types |
| `utils/` | Pure helpers |

## What we deliberately don't do

- **No Redux / Zustand / Jotai.** The state fits in three contexts (theme, language, smooth-scroll).
- **No CSS-in-JS.** Tailwind + CSS variables cover everything.
- **No SSR framework.** Vite SPA with targeted prerendering is enough for this surface area.
- **No testing framework (yet).** Visual QA + `tsc` + deploy-preview-per-PR. Introduce Vitest + Playwright when the surface grows.
