# Changelog

All notable changes to this project. This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- `AGENTS.md`, `CONTRIBUTING.md`, `ARCHITECTURE.md`, `CHANGELOG.md`, `LICENSE`.
- Blog UI/UX parity with the main portfolio:
  - `SmoothScroll` and `Grain` inside `BlogLayout`.
  - `ReadingProgress` fixed top bar for articles.
  - GSAP SplitText reveals on blog hero + post titles.
  - Editorial redesign of `BlogHome` with featured post + scroll-staggered list.
  - Active Table of Contents scrollspy via `IntersectionObserver`.
  - "Up next" related posts on article pages.
- `BlogLink` — persistent top-right pill linking to the blog.
- `BlogChapter` (06) on the homepage — featured + recent posts with language-preserving links.
- Full i18n coverage for new/existing hardcoded strings (`latest`, `moreReading`, `articleSingular/Plural`, `home`, `blogHeroKicker`, `onThisPage`, `upNext`, `writeMe`, `since`, `coordinates`, `timezone`, `remoteSubline`, `basedInBody`, …).
- Smooth scroll on TOC clicks via `lenis.scrollTo` with pre-reveal of hidden prose.

### Changed
- **Homepage overhaul** to a GSAP + Lenis scroll narrative:
  - New chapters: Hero, Bento, Story, Timeline, Projects, Blog, Stack, Globe, Outro.
  - `IntroLoader` cinematic first-paint reveal with session-storage gating.
  - Replaced Framer-Motion-only animation with GSAP for scroll work (Framer Motion kept for discrete UI).
- **Globe chapter** redesigned: removed pinning + scale scrub; added radial mask to eliminate edge "shadow cuts".
- **Timeline chapter** redesigned: vertical progress line + individual reveals (fixes prior flicker from pinned horizontal scrub).
- **Projects chapter** redesigned: editorial layout, no gradients, no console preview.
- **Outro chapter**: email as primary CTA with subtle magnetic hover + copy button; name marquee rewritten as time-based GSAP loop to remove scrub stutter.
- **BlogHome**: swapped "AI Engineering" tag for live "Latest · &lt;date&gt;" indicator.
- Blog headline copy: `Words on engineering.` → `Thinking out loud.` (EN) / `Pensando en voz alta.` (ES).

### Fixed
- **Font descender clipping** across display headlines:
  - Dropped `SplitText { mask: ... }` from Hero, Story, Outro, BlogHome, BlogPost.
  - Relaxed `leading-[0.82]` / `leading-[0.85]` on Hero + Outro to `0.92` / `0.95` with `pb-[0.08em]` safety.
- **Sticky TOC not engaging** — `overflow-x-hidden` on the layout root was silently establishing a scroll container. Swapped to `overflow-x-clip` on `App.tsx`, `BlogLayout.tsx`, `HeroChapter`, `StoryChapter`, `OutroChapter`, `StackChapter`.
- **TOC navigation stutter** — killing pending ScrollTriggers and snapping prose to final state before `lenis.scrollTo` removes dozens of concurrent tweens competing with the scroll animation.
- **Marquee stutter** in the Outro name strip — replaced `scrub`-linked animation with a continuous time-based loop and kinetic `timeScale` modulation.
- Removed `prefers-reduced-motion`-bypassing marquee in `StackChapter`.
- PostCSS `@import must precede all other statements` — moved Lenis CSS import to the top of `index.css`.

## [1.0.0] — 2026-03-08

Initial public release: bento-grid portfolio with Framer Motion, Cobe globe, EN/ES i18n, light/dark theme, Markdown blog.
