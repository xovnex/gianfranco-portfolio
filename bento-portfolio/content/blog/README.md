# Blog Authoring Standard

This directory stores blog articles as Markdown files with frontmatter.

The blog now supports **language variants per article**, with English as the default base version and Spanish as the translation target.

## File naming

Use one shared base slug for every article, then add a locale suffix.

```text
my-article.en.md
my-article.es.md
```

Rules:

- The part before the locale is the shared article slug.
- `.en.md` is the English version.
- `.es.md` is the Spanish translation.
- Both files should describe the same article, just localized.
- If an article only exists in English for now, you can publish just the `.en.md` file.

## Frontmatter

Use this shape for both the English and Spanish files:

```yaml
---
title: "Your article title"
seoTitle: "Optional longer SEO title"
kicker: "Optional short label"
date: "2026-03-08"
updated: "2026-03-08"
excerpt: "Short summary used in cards and SEO."
tags: ["AI", "Engineering"]
coverImage: "/blog/example-cover.svg"
coverAlt: "Accessible description of the cover image"
featured: false
published: true
---
```

## Frontmatter notes

- `title` is required. Files without a real title do not render as posts.
- `seoTitle` is optional and only used in metadata.
- `excerpt` is optional; if omitted, the app derives one from the first body paragraph.
- `updated` is optional but recommended when revising an article.
- `coverImage` and `coverAlt` are optional, but useful for social sharing metadata.
- `featured: true` marks the article as the featured post on the blog homepage.
- `published: false` hides the file from the site.

## Translation workflow

When you publish a new article, use this order:

1. Write the English base article first as `slug.en.md`.
2. Create the Spanish version as `slug.es.md`.
3. Keep the same shared slug and overall article structure.
4. Translate the meaning, not just the words.
5. Localize the title, excerpt, examples, and headings naturally.
6. Keep dates aligned unless the translation was updated later.

## Translation rules

- The Spanish article should feel written for Spanish readers, not machine-translated.
- Keep the same depth, examples, and quality as the English version.
- Preserve major section structure so both variants stay easy to maintain.
- If you adjust examples heavily in one language, make sure the core meaning still matches.
- Tags can be localized if that improves readability on the rendered page.
- Keep each file fully in its own language:
  - `.en.md` should be fully English.
  - `.es.md` should be fully Spanish.
- Avoid mixed-language prompts in examples; localize prompt/code-block text too when it is natural language.

## Writing conventions

- Use `##` headings for major sections. These power the article table of contents.
- Use `###` headings for subsection detail.
- Prefer fenced code blocks with a language label when possible.
- Keep paragraphs tight; the blog styling is optimized for long-form technical writing.
- Use examples generously, especially for abstract AI topics.

## Tone

- Write like an experienced engineer talking to an intelligent person, not like a textbook.
- Keep the tone casual, clear, and conversational.
- Avoid empty hype, vague futurism, and overly academic phrasing.
- Explain domain concepts with confidence, but make them easy to relate to through normal user examples.
- Prefer "here is what is actually happening" over performative complexity.
- Sound like you know the field well, but never like you are trying to impress the reader.

## SEO notes

- Keep `title` readable and human-first.
- Use `seoTitle` only when a longer search-focused title adds value.
- Write excerpts that can stand alone in search results and social previews.
- If a Spanish translation exists, the site will expose it as the `?lang=es` version of the same article URL.
