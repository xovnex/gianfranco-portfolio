# Contributing

Thanks for your interest. This doc is lightweight on purpose — the full conventions live in [`AGENTS.md`](./AGENTS.md).

## Setup

```bash
pnpm install
pnpm dev
```

Requires Node 18+ and pnpm 8+.

## Workflow

1. **Branch off `main`** using one of:
   - `feat/<summary>` — new capability
   - `fix/<summary>` — bug fix
   - `docs/<summary>` — docs only
   - `refactor/<summary>` — non-behavioral change
   - `chore/<summary>` — tooling, deps
2. **Keep PRs scoped.** One concern per PR.
3. **Run `pnpm lint`** before pushing — it must exit 0.
4. **Screenshot any visual change** in the PR description.

## Code standards

Read [`AGENTS.md`](./AGENTS.md) once. Highlights:

- No hardcoded UI copy — everything goes through `i18n/translations.ts`.
- Use design tokens (`text-text-main`, `bg-page`, …), not raw hex.
- `overflow-clip`, not `overflow-hidden`, on sticky ancestors.
- Respect `prefers-reduced-motion`.
- GSAP owns scroll; Framer Motion owns discrete UI.

## Commits

[Conventional commits](https://www.conventionalcommits.org/):

```
feat: add reading progress bar to blog posts
fix: stop TOC links from clipping prose reveals
docs: rewrite README for the 2026 architecture
refactor: extract SmoothScroll provider
chore: bump gsap to 3.15
```

Subject ≤ 50 chars. Body explains **why** only when the diff doesn't.

## Bug reports

Open an issue with:
- What you expected
- What happened
- Minimal repro (URL or steps)
- Browser + OS
- Screenshot / clip if visual

## Questions

Open a **Discussion**, not an issue. Issues are for actionable work.
