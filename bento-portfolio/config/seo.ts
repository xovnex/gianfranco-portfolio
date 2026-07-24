export const SITE_URL = 'https://gianfranco-portfolio.vercel.app';
export const BLOG_URL = `${SITE_URL}/blog`;
export const SITE_NAME = 'Gianfranco De La Cruz Lopez';
export const SITE_TITLE = 'Gianfranco De La Cruz Lopez | Software Developer';
export const SITE_DESCRIPTION =
  'Portfolio of Gianfranco De La Cruz Lopez, a Computer Engineering & Systems student from Lima, Peru building full-stack projects with Python, FastAPI, and React.';
export const SITE_TWITTER = '';
export const SITE_EMAIL = 'giandelacruzlopez@gmail.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/profile.png`;
export const DEFAULT_OG_IMAGE_ALT = 'Portrait of Gianfranco De La Cruz Lopez';
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

/** Stable @id used across schemas to link Person entities. */
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const DEFAULT_KEYWORDS = [
  'Gianfranco De La Cruz Lopez',
  'Gianfranco De La Cruz portfolio',
  'software developer',
  'React developer',
  'Python developer',
  'FastAPI developer',
  'computer engineering student',
  'software developer Peru',
  'Lima software developer',
];

export const BLOG_KEYWORDS = [
  'software engineering blog',
  'algorithms',
  'Python',
  'web development',
  'system design',
];

export function absoluteUrl(path = '/') {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function blogAbsoluteUrl(path = '/') {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${BLOG_URL}${normalizedPath}`;
}

export function getLocale(language: 'en' | 'es' = 'en') {
  return language === 'es' ? 'es_PE' : 'en_US';
}

export function buildBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

/**
 * Canonical Person schema. Uses a stable `@id` so other schemas can
 * reference it via { "@id": PERSON_ID } instead of duplicating data.
 */
export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    givenName: 'Gianfranco',
    familyName: 'De La Cruz Lopez',
    alternateName: 'xovnex',
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    email: `mailto:${SITE_EMAIL}`,
    jobTitle: 'Software Developer',
    description: SITE_DESCRIPTION,
    nationality: { '@type': 'Country', name: 'Peru' },
    knowsLanguage: ['es', 'en'],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Developer',
      occupationLocation: { '@type': 'City', name: 'Lima, Peru' },
      skills:
        'React, JavaScript, Vite, Python, FastAPI, Pydantic, SQLAlchemy, scikit-learn, NumPy, NetworkX, SQLite, Git',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Universidad de San Martín de Porres',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lima',
        addressCountry: 'Peru',
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lima',
      addressCountry: 'Peru',
    },
    sameAs: [
      'https://github.com/xovnex',
    ],
    knowsAbout: [
      'React',
      'JavaScript',
      'Vite',
      'Python',
      'FastAPI',
      'Pydantic',
      'SQLAlchemy',
      'scikit-learn',
      'NumPy',
      'NetworkX',
      'Algorithms',
      'Full-Stack Development',
    ],
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    alternateName: 'Gianfranco De La Cruz Lopez Portfolio',
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: ['en', 'es'],
    publisher: { '@id': PERSON_ID },
    author: { '@id': PERSON_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildJobPostingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Software Developer',
    description: SITE_DESCRIPTION,
    datePosted: '2026-07-01',
    validThrough: '2026-12-31',
    hiringOrganization: {
      '@type': 'Organization',
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lima',
        addressCountry: 'Peru',
      },
    },
    skills: DEFAULT_KEYWORDS.join(', '),
  };
}

/**
 * BlogPosting / Article schema for an individual post. Uses a stable @id
 * that references the canonical URL + `#article` fragment.
 */
export interface ArticleSchemaInput {
  url: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  wordCount?: number;
  readingTimeMinutes?: number;
  language: 'en' | 'es';
  section?: string;
}

export function buildArticleSchema(input: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${input.url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
    headline: input.title,
    name: input.title,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: input.language === 'es' ? 'es-PE' : 'en-US',
    ...(input.image && {
      image: {
        '@type': 'ImageObject',
        url: input.image.startsWith('http') ? input.image : absoluteUrl(input.image),
        ...(input.imageAlt && { caption: input.imageAlt }),
      },
    }),
    ...(input.keywords && input.keywords.length > 0 && {
      keywords: input.keywords.join(', '),
    }),
    ...(input.wordCount && { wordCount: input.wordCount }),
    ...(input.readingTimeMinutes && {
      timeRequired: `PT${Math.max(1, Math.round(input.readingTimeMinutes))}M`,
    }),
    ...(input.section && { articleSection: input.section }),
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };
}

/**
 * FAQ schema — useful on pages answering discrete questions. Accepts an array
 * of {question, answer} pairs and emits a FAQPage JSON-LD object.
 */
export function buildFaqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  };
}
