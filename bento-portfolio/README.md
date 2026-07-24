# Gianfranco De La Cruz Lopez — Portfolio

A single-page, GSAP + Lenis scroll narrative paired with a Markdown-driven blog. Built with React 19, TypeScript, Vite, and Tailwind.

Based on the [bento-portfolio](https://github.com/andermendz/bento-portfolio) template by [andermendz](https://github.com/andermendz).

Live: TBD once deployed on Vercel · Blog: `/blog` (template ready, no posts published yet)

## Highlights

- **Cinematic intro loader** → hero name reveal → pinned chapters → kinetic outro
- **Lenis smooth scroll** wired to GSAP ScrollTrigger via `scrollerProxy`
- **Markdown blog** with Table of Contents scrollspy, reading progress bar, related posts
- **Full i18n** (English + Spanish) with smooth language transitions
- **Light / dark theme** with system preference detection
- **Prerendered SEO** for every blog post (JSON-LD, Open Graph, `hreflang`, RSS)
- **A11y-first**: respects `prefers-reduced-motion`, semantic landmarks, focus styles
- **Awwwards-grade polish** — grain texture, SplitText reveals, magnetic CTAs, 3D globe

## Tech Stack

| Layer | Library |
|---|---|
| Framework | **React 19** + **TypeScript** + **Vite 6** |
| Animation | **GSAP 3** (`ScrollTrigger`, `SplitText`, `useGSAP`), **Framer Motion 11** |
| Smooth scroll | **Lenis** |
| Styling | **Tailwind CSS 3** + `@tailwindcss/typography` |
| 3D Globe | **Cobe** (WebGL) |
| Routing | **React Router 7** (blog subdomain only) |
| Content | **react-markdown** + `remark-gfm` + `front-matter` |
| SEO | **react-helmet-async** + custom prerender script |
| Icons | **lucide-react** |

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm 8+ (recommended) or npm

### Install & run
```bash
pnpm install
pnpm dev          # http://localhost:5173
```

### Scripts
| Command | What it does |
|---|---|
| `pnpm dev` | Vite dev server with HMR |
| `pnpm build` | Type-check → SEO pre-generate → Vite build → post-build prerender |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | `tsc --noEmit` type check |
| `pnpm seo:generate` | Regenerate SEO data from blog posts |

The full build pipeline runs in this order:
```
prebuild (seo:generate) → tsc → vite build → postbuild (prerender-seo)
```

## Project Structure

```
├── App.tsx                   # Portfolio shell (chapters + chrome)
├── BlogApp.tsx               # Blog subroute entry (React Router)
├── index.tsx                 # Root — hydrates App or BlogApp based on URL
├── index.css                 # Tailwind + global styles + Lenis CSS
├── components/
│   ├── chapters/             # Full-bleed scroll chapters (Hero, Story, Timeline, …)
│   ├── cards/                # Bento-grid cards used inside BentoChapter
│   ├── sections/             # Legacy detail sections rendered inside DetailView
│   ├── BentoCard.tsx         # 3D-tilt card shell
│   ├── BlogLink.tsx          # Fixed top-right pill → /blog
│   ├── DetailView.tsx        # Modal overlay (pauses Lenis on open)
│   ├── Globe.tsx             # Cobe globe wrapper
│   ├── Grain.tsx             # SVG `feTurbulence` noise overlay
│   ├── IntroLoader.tsx       # Cinematic first-paint loader
│   ├── LanguageSwitcher.tsx  # EN / ES toggle
│   ├── LanguageTransition.tsx# Transition wrapper for i18n swap
│   ├── ReadingProgress.tsx   # Fixed top progress bar (blog posts)
│   ├── SEO.tsx               # react-helmet-async wrapper
│   ├── SmoothScroll.tsx      # Lenis provider + ScrollTrigger bridge
│   └── ThemeContext.tsx      # Light/dark provider
├── pages/blog/
│   ├── BlogLayout.tsx        # Blog shell (shared chrome + SmoothScroll)
│   ├── BlogHome.tsx          # Post index (featured + list)
│   └── BlogPost.tsx          # Article template (TOC, progress, up-next)
├── content/
│   ├── blog.ts               # Loader + enrichment for Markdown files
│   └── posts/                # *.md blog sources (EN + ES variants)
├── i18n/
│   ├── LanguageContext.tsx   # t(), language, setLanguage
│   └── translations.ts       # All EN + ES copy (single source of truth)
├── config/
│   └── seo.ts                # Site name, canonical URLs, schema helpers
├── scripts/
│   ├── generate-seo.mjs      # Pre-build: emits sitemap.xml, rss.xml, meta JSON
│   └── prerender-seo.mjs     # Post-build: injects SSR HTML for blog posts
├── theme/                    # Material-web theme tokens
├── types/                    # Shared TS types
└── public/                   # Static assets
```

## Writing a Blog Post

1. Drop a Markdown file into `content/posts/` with a `.md` extension. Filename = slug.
2. Add frontmatter:
   ```yaml
   ---
   title: Your Title Here
   date: 2026-04-22
   excerpt: One-line preview shown in the index and meta.
   tags: [ai, tools]
   kicker: Optional eyebrow text
   coverImage: /covers/your-cover.jpg
   coverAlt: Descriptive alt text
   featured: false
   ---
   ```
3. Write the body in standard Markdown (GFM supported). Use `##` for top-level sections — these become the TOC entries.
4. (Optional) add a Spanish variant with the same slug plus `.es.md` — e.g. `my-post.md` (EN) + `my-post.es.md` (ES).
5. `pnpm build` — SEO, sitemap, RSS, and prerendered HTML are regenerated automatically.

## Internationalization

All user-facing copy lives in [`i18n/translations.ts`](i18n/translations.ts) as a single `translations` object keyed by language.

```tsx
import { useLanguage } from '../i18n/LanguageContext';

function Greeting() {
  const { t, language, setLanguage } = useLanguage();
  return <h1>{t('availableForWork')}</h1>;
}
```

Rules:
- **Never hardcode user-visible strings.** Add a key to both `en` and `es` and use `t('key')`.
- TypeScript enforces key presence via `TranslationKey`.
- Language persists in `localStorage`.
- Blog posts are localized by filename convention (see above).

## Animation System

Two libraries coexist on purpose:

- **GSAP (+ Lenis)** drives the scroll narrative — chapter reveals, SplitText, ScrollTrigger, marquees, scrub-linked 3D transforms. See `components/SmoothScroll.tsx` for the Lenis ↔ ScrollTrigger bridge.
- **Framer Motion** drives discrete UI transitions — modal opens, theme toggle, language swap. It doesn't own scroll.

### Patterns to follow
- Gate non-essential animation behind `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`.
- Prefer `y` + `opacity` reveals over `yPercent` + `mask` for display type (masks clip descenders).
- Avoid `overflow-hidden` on sticky ancestors — use `overflow-clip` instead. It clips visually without establishing a scroll container.
- Kill `ScrollTrigger`s on route change inside `useGSAP({ scope, dependencies })`.
- For anchor navigation, use `lenis.scrollTo(target, { offset, duration })` and pre-reveal any `ScrollTrigger`-hidden content before scrolling.

## Theming

CSS custom properties are defined per theme in `index.css` and picked up by Tailwind via `tailwind.config.js` (`colors.page`, `colors.text-main`, etc.). Toggle is managed by `components/ThemeContext.tsx`.

## SEO & GEO

**SEO**
- `config/seo.ts` owns site-wide constants, canonical URLs, and typed JSON-LD schema builders (`buildPersonSchema`, `buildWebsiteSchema`, `buildArticleSchema`, `buildBreadcrumbSchema`, `buildFaqSchema`).
- `components/SEO.tsx` wraps `react-helmet-async` with Open Graph, Twitter Card, `hreflang`, canonical, image dimensions, and per-page JSON-LD injection.
- `scripts/generate-seo.mjs` (prebuild) emits `public/sitemap.xml` and `public/rss.xml` from `content/blog/*.md` frontmatter.
- `scripts/prerender-seo.mjs` (postbuild) injects per-post critical HTML into the static `index.html` so crawlers see real content without executing JavaScript.
- Every blog post emits `Person` + `WebSite` + `BlogPosting` + `BreadcrumbList` schemas with stable `@id` references, word count, reading time, and `hreflang` alternates.

**GEO (Generative Engine Optimization)**
- `public/llms.txt` — curated site map in the [proposed `/llms.txt` format](https://llmstxt.org/). Points LLMs at the highest-signal pages.
- `public/llms-full.txt` — every blog post concatenated as plain Markdown, regenerated each build. Optimized for LLM ingestion and retrieval.
- `public/robots.txt` — explicit allowlist for major AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`, …) alongside traditional search engines.
- Homepage includes a `FAQPage` schema answering common questions about Gianfranco's availability, focus, and blog so assistants can quote attributable facts.
- Person schema exposes structured occupation, languages, skills, and social `sameAs` links so LLMs can attribute quotes and build a reliable knowledge graph entry.

## Deployment

Deployed on **Vercel**. The static `dist/` folder is the build output; `vercel.json` handles rewrites for the blog subroute.

Any static host works:
```bash
pnpm build
# Upload dist/
```

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md). TL;DR: branch off `main`, keep PRs scoped, no hardcoded strings, run `pnpm lint` before pushing.

Also read [`AGENTS.md`](./AGENTS.md) if you're an AI agent or unfamiliar contributor — it encodes the project's conventions.

## License

MIT. See [`LICENSE`](./LICENSE).

## Acknowledgments

- [GSAP](https://gsap.com/) + [Lenis](https://lenis.darkroom.engineering/) — the scroll backbone
- [Cobe](https://cobe.vercel.app/) — WebGL globe
- [Framer Motion](https://www.framer.com/motion/) — UI transitions
- [Tailwind](https://tailwindcss.com/) + [Lucide](https://lucide.dev/)
