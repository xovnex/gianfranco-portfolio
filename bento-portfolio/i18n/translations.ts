// Translations for English and Spanish

export type Language = 'en' | 'es';

export const translations = {
  en: {
    // Intro
    availableForWork: 'Available for work',
    introBio: 'Computer Engineering student building <scalable>algorithm-driven</scalable> and <performance>full-stack</performance> projects.',

    // Socials
    letsConnect: "Let's connect",
    letsTalk: "Let's talk",
    letsTalkDesc: 'Open to freelance projects and internships.',
    currentlyAvailable: 'Currently available',
    contactMsg: 'Want to work together, or just say hi? Drop me a line.',
    emailMe: 'Email',
    emailDesc: 'The direct line for anything substantive.',
    emailAddress: 'giandelacruzlopez@gmail.com',
    linkedIn: 'LinkedIn',
    linkedInDesc: 'To connect and explore opportunities.',
    linkedInHandle: '',

    // Tech Stack
    techStackTitle: 'Tech Stack',

    // Blog
    blogTitle: 'Blog',
    blogAppTitle: 'Blog',
    readArticles: 'The latest things I have written.',
    latestPost: 'Latest post',

    // About
    aboutTitle: 'About',
    aboutPhrase: 'Obsessed with <details>algorithms</details> and <performance>clean architecture</performance>.',

    // Experience (repurposed as a "focus" card — no formal work experience yet)
    experienceTitle: 'Focus',
    technicalLead: 'Building',
    softwareDeveloper: 'Software Developer',
    fullStackDev: 'Full-stack Developer',
    focusHeadline: '3 full-stack projects',
    focusStack: 'Python · FastAPI · React',
    focusDocsTitle: 'Docs-first',
    focusDocsDesc: 'PRD, TRD & implementation plan',

    // Education
    educationTitle: 'Education',
    systemsEngineering: 'Computer Engineering & Systems',
    technologicalUniversity: 'University',

    // Contact
    contactTitle: "Let's connect.",
    connectOnLinkedIn: 'Send an email',
    open: 'Open',
    copy: 'Copy',
    copied: 'Copied',

    // Map
    basedIn: 'Based in',
    location: 'Lima, PE',

    // Footer (use {year} placeholder; replaced at runtime with current year)
    copyright: '© {year} Gianfranco De La Cruz Lopez.',
    role: 'Software Developer',

    // A11y & chrome
    skipToMainContent: 'Skip to main content',
    back: 'Back',
    sectionLoading: 'Loading section…',
    copyFailed: 'Could not copy. Please try again.',

    // Detail Views
    // About Modal
    profile: 'Profile',
    scalableArchitect: 'Solving problems with algorithms.',
    proactive: 'Proactive',
    detailOriented: 'Detail-oriented',
    problemSolver: 'Problem-solver',
    bio: 'Bio',
    bioText: 'Computer Engineering & Systems student based in Lima, Peru. I build full-stack projects with Python/FastAPI backends and React frontends, with an emphasis on algorithms and clear documentation.',
    philosophy: 'Philosophy',
    userCentricDesign: 'User-centric design',
    userCentricDesignDesc: 'Clear, intuitive interfaces with the right rhythm.',
    performanceFirst: 'Documentation-first',
    performanceFirstDesc: 'Every decision written down before the code that implements it.',

    // Experience Modal (unused — kept so no key lookup ever returns undefined)
    workExperience: 'Work Experience',
    workExperienceDesc: 'My path so far.',
    present: 'Present',
    visblDesc: '',
    visblPrevDesc: '',
    comfenalcoDesc: '',
    openSourceProject: 'Open source',
    academicProject: 'Personal project',
    projectsTitle: 'Projects',
    projectsHeadline: 'Selected work.',
    projectsSectionDesc: 'Three full-stack projects, each with a live demo and a repo you can try.',
    projectsCardHint: '3 projects — Python/FastAPI backends, React frontends',

    // Projects data
    project1Name: 'WarehouseRoute Optimizer',
    project1Desc: 'Picking-route optimizer for warehouses: computes the shortest route using Dijkstra built from scratch plus a TSP heuristic (Nearest Neighbor + 2-opt with random restarts) to decide the best visiting order.',
    project2Name: 'TimetableOptimizer',
    project2Desc: 'Conflict-free academic timetable generator, modeled as a Constraint Satisfaction Problem and solved with backtracking, forward checking, and MRV built from scratch — with a benchmark comparing naive vs. optimized search.',
    project3Name: 'TextSimilarity Detector',
    project3Desc: 'Text similarity and plagiarism detector across documents using TF-IDF and cosine similarity, with a sentence-level similarity breakdown instead of a single global score.',
    projectDemoLabel: 'Demo',
    projectRepoLabel: 'Repo',
    projectApproachLabel: 'Approach',

    // Education Modal
    academicBackground: 'Academic background.',
    educationDesc: 'Academic background and focus areas.',
    professionalDegree: 'Professional Degree',
    universityDiploma: 'University Diploma',
    technologistDegree: 'Technologist Degree',
    webAppDevelopment: 'Web Application Development',
    softwareDevTechnologist: 'Software Engineering Technologist',
    inProgress: 'In progress',

    // Stack Modal
    technicalArsenal: 'Technical Toolkit',
    technicalArsenalDesc: 'A practical toolkit: React on the frontend, Python/FastAPI on the backend, and classic algorithms underneath.',
    frontend: 'Frontend',
    backend: 'Backend',
    aiMl: 'Algorithms',
    database: 'Tools',

    // Chapter labels
    overviewSection: 'Overview',
    atAGlance: 'At a glance.',
    bentoSubline: 'A bento of work and life.',
    writingSection: 'Writing',
    writingHeadline: 'Words.',
    writingSubline: 'Notes on code, algorithms, and the craft.',

    // Hero
    scrollCue: 'Scroll',
    roleInterface: 'Full-stack development',
    roleSystems: 'Algorithms & data structures',
    roleAi: 'Python & FastAPI APIs',

    // Story
    since: 'USMP',

    // Projects
    projectLabel: 'Project',
    dictationApp: 'Full-stack project',
    platforms: 'Approach',
    license: 'License',
    builtWith: 'Built with',

    // Globe
    remoteSubline: 'Based in Lima. Open to remote work.',
    basedInBody: 'From {location}, I build full-stack projects and I am open to freelance work and internships across timezones.',
    coordinates: 'Coordinates',
    timezone: 'Timezone',

    // Outro
    writeMe: 'Write me',

    // Blog (homepage chapter)
    allPosts: 'All posts',
    readPost: 'Read post',
    minRead: 'min read',
    featured: 'Featured',

    // Blog app
    blogBackHome: 'Back to site',
    blogBackToArticles: 'Back to articles',
    blogHeroKicker: 'Writing',
    blogHeroHeadline: 'Thinking out loud.',
    blogHeroSubline: 'Notes on code, algorithms, and whatever I am currently building.',
    onThisPage: 'On this page',
    upNext: 'Up next',
    updatedLabel: 'Updated',
    aiEngineering: 'Engineering',
    latest: 'Latest',
    moreReading: 'More reading',
    articleSingular: 'article',
    articlePlural: 'articles',
    home: 'Home',
    copyLink: 'Copy link',
    linkCopied: 'Link copied',

    // Blog post shell (not found + summary strip)
    blogNotFoundTitle: 'Post not found',
    blogNotFoundDescription: "The article you're looking for doesn't exist.",
    blogReturnToBlog: 'Return to blog',
    blogSummaryNote:
      'This post focuses on the mechanics that shape real software projects: architecture, algorithms, and implementation decisions.',

    // A11y: regions / icon buttons (theme uses pair below)
    ariaBentoOverview: 'Bento overview',
    ariaGlobeChapter: 'Location and globe',
    ariaHeroIntro: 'Introduction',
    ariaGithub: 'GitHub',
    ariaLinkedin: 'LinkedIn',
    ariaGithubProfile: 'GitHub profile',
    ariaLinkedinProfile: 'LinkedIn profile',
    ariaProfilePhotoCard: 'Profile photo of the developer',
    ariaBackgroundImageCard: 'Background image',
    themeSwitchToLight: 'Switch to light theme',
    themeSwitchToDark: 'Switch to dark theme',

    // Error boundary (reads saved language; outside React provider)
    errorPageTitle: 'Something went wrong',
    errorPageDescription: 'Sorry — an unexpected error occurred.',
    errorPageReload: 'Reload page',

    // Intro loader word deck (first word stays proper name in markup)
    introLoaderDeck1: 'BUILDER',
    introLoaderDeck2: 'DEVELOPER',
    introLoaderDeck3: 'READY',
    introLoaderFooter: 'Portfolio · {year}',
  },
  es: {
    // Intro
    availableForWork: 'Disponible para trabajar',
    introBio: 'Estudiante de Ingeniería de Computación y Sistemas, construyendo proyectos <scalable>basados en algoritmos</scalable> y <performance>full-stack</performance>.',

    // Socials
    letsConnect: 'Conectemos',
    letsTalk: 'Hablemos',
    letsTalkDesc: 'Abierto a proyectos freelance y prácticas profesionales.',
    currentlyAvailable: 'Disponible ahora',
    contactMsg: '¿Quieres trabajar juntos o solo saludar? Escríbeme.',
    emailMe: 'Email',
    emailDesc: 'La vía directa para hablar de algo en serio.',
    emailAddress: 'giandelacruzlopez@gmail.com',
    linkedIn: 'LinkedIn',
    linkedInDesc: 'Para conectar y explorar oportunidades.',
    linkedInHandle: '',

    // Tech Stack
    techStackTitle: 'Tecnologías',

    // Blog
    blogTitle: 'Blog',
    blogAppTitle: 'Blog',
    readArticles: 'Lo último que he escrito.',
    latestPost: 'Último artículo',

    // About
    aboutTitle: 'Sobre mí',
    aboutPhrase: 'Obsesionado con los <details>algoritmos</details> y la <performance>arquitectura limpia</performance>.',

    // Experience (reutilizado como tarjeta de "enfoque" — aún sin experiencia laboral formal)
    experienceTitle: 'Enfoque',
    technicalLead: 'Construyendo',
    softwareDeveloper: 'Desarrollador de Software',
    fullStackDev: 'Desarrollador Full-stack',
    focusHeadline: '3 proyectos full-stack',
    focusStack: 'Python · FastAPI · React',
    focusDocsTitle: 'Documentación primero',
    focusDocsDesc: 'PRD, TRD y plan de implementación',

    // Education
    educationTitle: 'Educación',
    systemsEngineering: 'Ingeniería de Computación y Sistemas',
    technologicalUniversity: 'Universidad',

    // Contact
    contactTitle: 'Conectemos.',
    connectOnLinkedIn: 'Enviar un correo',
    open: 'Abrir',
    copy: 'Copiar',
    copied: 'Copiado',

    // Map
    basedIn: 'Ubicado en',
    location: 'Lima, PE',

    // Footer (use {year} placeholder; replaced at runtime with current year)
    copyright: '© {year} Gianfranco De La Cruz Lopez.',
    role: 'Desarrollador de Software',

    // A11y & chrome
    skipToMainContent: 'Ir al contenido principal',
    back: 'Volver',
    sectionLoading: 'Cargando sección…',
    copyFailed: 'No se pudo copiar. Inténtalo de nuevo.',

    // Detail Views
    // About Modal
    profile: 'Perfil',
    scalableArchitect: 'Resolviendo problemas con algoritmos.',
    proactive: 'Proactivo',
    detailOriented: 'Atención al detalle',
    problemSolver: 'Resolución de problemas',
    bio: 'Biografía',
    bioText: 'Estudiante de Ingeniería de Computación y Sistemas en Lima, Perú. Construyo proyectos full-stack con backends en Python/FastAPI y frontends en React, con foco en algoritmos y documentación clara.',
    philosophy: 'Filosofía',
    userCentricDesign: 'Diseño centrado en el usuario',
    userCentricDesignDesc: 'Interfaces claras, intuitivas y con buen ritmo.',
    performanceFirst: 'Documentación primero',
    performanceFirstDesc: 'Cada decisión queda documentada antes del código que la implementa.',

    // Experience Modal (sin uso — se mantienen para que ninguna clave devuelva undefined)
    workExperience: 'Experiencia Laboral',
    workExperienceDesc: 'Mi camino hasta ahora.',
    present: 'Actual',
    visblDesc: '',
    visblPrevDesc: '',
    comfenalcoDesc: '',
    openSourceProject: 'Código abierto',
    academicProject: 'Proyecto personal',
    projectsTitle: 'Proyectos',
    projectsHeadline: 'Trabajo destacado.',
    projectsSectionDesc: 'Tres proyectos full-stack, cada uno con demo en vivo y repositorio para probar.',
    projectsCardHint: '3 proyectos — backends en Python/FastAPI, frontends en React',

    // Projects data
    project1Name: 'WarehouseRoute Optimizer',
    project1Desc: 'Optimizador de rutas de picking para almacenes: calcula la ruta más corta con Dijkstra implementado desde cero y una heurística de TSP (Nearest Neighbor + 2-opt con reinicios aleatorios) para el orden óptimo de visita.',
    project2Name: 'TimetableOptimizer',
    project2Desc: 'Generador de horarios académicos sin conflictos, modelado como problema de satisfacción de restricciones (CSP) y resuelto con backtracking, forward checking y MRV implementados desde cero — con un benchmark que compara búsqueda naive vs. optimizada.',
    project3Name: 'TextSimilarity Detector',
    project3Desc: 'Detector de similitud y plagio entre documentos usando TF-IDF y similitud de coseno, con desglose de similitud a nivel de oración en vez de un solo puntaje global.',
    projectDemoLabel: 'Demo',
    projectRepoLabel: 'Repo',
    projectApproachLabel: 'Enfoque',

    // Education Modal
    academicBackground: 'Trayectoria académica.',
    educationDesc: 'Formación académica y áreas de enfoque.',
    professionalDegree: 'Título Profesional',
    universityDiploma: 'Diplomado Universitario',
    technologistDegree: 'Título de Tecnólogo',
    webAppDevelopment: 'Desarrollo de Aplicaciones Web',
    softwareDevTechnologist: 'Tecnólogo en Ingeniería de Software',
    inProgress: 'En curso',

    // Stack Modal
    technicalArsenal: 'Stack técnico',
    technicalArsenalDesc: 'Un stack práctico: React en el frontend, Python/FastAPI en el backend, y algoritmos clásicos por debajo.',
    frontend: 'Frontend',
    backend: 'Backend',
    aiMl: 'Algoritmos',
    database: 'Herramientas',

    // Chapter labels
    overviewSection: 'Resumen',
    atAGlance: 'De un vistazo.',
    bentoSubline: 'Un bento de trabajo y vida.',
    writingSection: 'Escritos',
    writingHeadline: 'Palabras.',
    writingSubline: 'Notas sobre código, algoritmos y el oficio.',

    // Hero
    scrollCue: 'Desplázate',
    roleInterface: 'Desarrollo Full-stack',
    roleSystems: 'Algoritmos y estructuras de datos',
    roleAi: 'APIs con Python y FastAPI',

    // Story
    since: 'USMP',

    // Projects
    projectLabel: 'Proyecto',
    dictationApp: 'Proyecto full-stack',
    platforms: 'Enfoque',
    license: 'Licencia',
    builtWith: 'Construido con',

    // Globe
    remoteSubline: 'Ubicado en Lima. Abierto a trabajo remoto.',
    basedInBody: 'Desde {location}, construyo proyectos full-stack y estoy abierto a freelance y prácticas en distintas zonas horarias.',
    coordinates: 'Coordenadas',
    timezone: 'Zona horaria',

    // Outro
    writeMe: 'Escríbeme',

    // Blog (homepage chapter)
    allPosts: 'Todos los artículos',
    readPost: 'Leer artículo',
    minRead: 'min de lectura',
    featured: 'Destacado',

    // Blog app
    blogBackHome: 'Volver al sitio',
    blogBackToArticles: 'Volver a los artículos',
    blogHeroKicker: 'Escritos',
    blogHeroHeadline: 'Pensando en voz alta.',
    blogHeroSubline: 'Notas sobre código, algoritmos y lo que estoy construyendo.',
    onThisPage: 'En esta página',
    upNext: 'A continuación',
    updatedLabel: 'Actualizado',
    aiEngineering: 'Ingeniería',
    latest: 'Más reciente',
    moreReading: 'Más para leer',
    articleSingular: 'artículo',
    articlePlural: 'artículos',
    home: 'Inicio',
    copyLink: 'Copiar enlace',
    linkCopied: 'Enlace copiado',

    blogNotFoundTitle: 'Artículo no encontrado',
    blogNotFoundDescription: 'El artículo que buscas no existe.',
    blogReturnToBlog: 'Volver al blog',
    blogSummaryNote:
      'Este artículo se centra en la mecánica que da forma a proyectos de software reales: arquitectura, algoritmos y decisiones de implementación.',

    ariaBentoOverview: 'Vista general del bento',
    ariaGlobeChapter: 'Ubicación y globo terráqueo',
    ariaHeroIntro: 'Introducción',
    ariaGithub: 'GitHub',
    ariaLinkedin: 'LinkedIn',
    ariaGithubProfile: 'Perfil de GitHub',
    ariaLinkedinProfile: 'Perfil de LinkedIn',
    ariaProfilePhotoCard: 'Foto de perfil del desarrollador',
    ariaBackgroundImageCard: 'Imagen de fondo',
    themeSwitchToLight: 'Cambiar a tema claro',
    themeSwitchToDark: 'Cambiar a tema oscuro',

    errorPageTitle: 'Algo salió mal',
    errorPageDescription: 'Lo sentimos: ocurrió un error inesperado.',
    errorPageReload: 'Recargar página',

    introLoaderDeck1: 'CONSTRUCTOR',
    introLoaderDeck2: 'DESARROLLADOR',
    introLoaderDeck3: 'LISTO',
    introLoaderFooter: 'Portafolio · {year}',
  }
} as const;

export type TranslationKey = keyof typeof translations.en;
