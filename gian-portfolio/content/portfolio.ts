export const techStack = {
  row1: [
    { label: "React", hoverColor: "#61DAFB" },
    { label: "Vite", hoverColor: "#646CFF" },
    { label: "JavaScript", hoverColor: "#F7DF1E" },
    { label: "HTML5", hoverColor: "#E34F26" },
  ],
  row2: [
    { label: "Python", hoverColor: "#3776AB" },
    { label: "FastAPI", hoverColor: "#009688" },
    { label: "Pydantic", hoverColor: "#E92063" },
    { label: "SQLAlchemy", hoverColor: "#D71F00" },
  ],
  row3: [
    { label: "scikit-learn", hoverColor: "#F7931E" },
    { label: "NumPy", hoverColor: "#4DABCF" },
    { label: "NetworkX", hoverColor: "#11557C" },
    { label: "pytest", hoverColor: "#0A9EDC" },
  ],
  row4: [
    { label: "Git", hoverColor: "#F05032" },
    { label: "GitHub Actions", hoverColor: "#2088FF" },
    { label: "SQLite", hoverColor: "#003B57" },
    { label: "Vercel", hoverColor: "#FFFFFF" },
    { label: "Render", hoverColor: "#46E3B7" },
  ],
};

export interface PortfolioProject {
  id: string;
  titleKey: string;
  descKey: string;
  tagKey: string;
  website: string;
  repo: string;
  websiteLabelKey: string;
  repoLabelKey: string;
  year: string;
  approach: string[];
  stack: string[];
  license: string;
}

export const projects: PortfolioProject[] = [
  {
    id: 'warehouse-route-optimizer',
    titleKey: 'project1Name',
    descKey: 'project1Desc',
    tagKey: 'academicProject',
    website: 'https://warehouse-route-optimizer-with-git.vercel.app',
    repo: 'https://github.com/xovnex/warehouse-route-optimizer-with-git_1',
    websiteLabelKey: 'projectDemoLabel',
    repoLabelKey: 'projectRepoLabel',
    year: '2026',
    approach: ['PRD', 'TRD', 'Plan de implementación'],
    stack: ['Python', 'FastAPI', 'NetworkX', 'React'],
    license: 'MIT',
  },
  {
    id: 'timetable-optimizer',
    titleKey: 'project2Name',
    descKey: 'project2Desc',
    tagKey: 'academicProject',
    website: 'https://timetable-optimizer-project.vercel.app',
    repo: 'https://github.com/xovnex/TimetableOptimizer_project',
    websiteLabelKey: 'projectDemoLabel',
    repoLabelKey: 'projectRepoLabel',
    year: '2026',
    approach: ['PRD', 'TRD', 'Plan de implementación'],
    stack: ['Python', 'FastAPI', 'Pydantic', 'React'],
    license: '—',
  },
  {
    id: 'text-similarity-detector',
    titleKey: 'project3Name',
    descKey: 'project3Desc',
    tagKey: 'academicProject',
    website: 'https://text-similarity-detector.vercel.app',
    repo: 'https://github.com/xovnex/text-similarity-detector',
    websiteLabelKey: 'projectDemoLabel',
    repoLabelKey: 'projectRepoLabel',
    year: '2026',
    approach: ['PRD', 'TRD', 'Plan de implementación'],
    stack: ['Python', 'FastAPI', 'scikit-learn', 'React'],
    license: 'MIT',
  },
];
