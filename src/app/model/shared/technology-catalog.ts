export type TechnologyCategory =
  | 'frontend'
  | 'backend'
  | 'language'
  | 'database'
  | 'cloud'
  | 'tooling'
  | 'other';

export interface TechnologyOption {
  readonly id: string;
  readonly label: string;
  readonly category: TechnologyCategory;
  readonly aliases: readonly string[];
  readonly brandColor: `#${string}`;
  readonly iconPath: string;
}

export const TECHNOLOGY_CATEGORY_LABELS: Readonly<Record<TechnologyCategory, string>> = {
  frontend: 'Front-end',
  backend: 'Back-end',
  language: 'Linguagem',
  database: 'Banco de dados',
  cloud: 'Cloud e plataforma',
  tooling: 'Ferramenta',
  other: 'Outros',
};

// Para ampliar o seletor, adicione o SVG local e uma entrada abaixo. Como o
// Firebase publica SVGs com cache imutavel, uma revisao visual deve usar um
// novo nome de arquivo (por exemplo, angular-v2.svg) em vez de sobrescrever o atual.

export const TECHNOLOGY_CATALOG = [
  {
    id: 'angular',
    label: 'Angular',
    category: 'frontend',
    aliases: ['angular', 'angularjs', 'angular 2+'],
    brandColor: '#DD0031',
    iconPath: 'assets/icons/technologies/angular.svg',
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    category: 'language',
    aliases: ['typescript', 'type script', 'ts'],
    brandColor: '#3178C6',
    iconPath: 'assets/icons/technologies/typescript.svg',
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    category: 'language',
    aliases: ['javascript', 'java script', 'js', 'ecmascript'],
    brandColor: '#F7DF1E',
    iconPath: 'assets/icons/technologies/javascript.svg',
  },
  {
    id: 'html5',
    label: 'HTML5',
    category: 'frontend',
    aliases: ['html', 'html5', 'html 5'],
    brandColor: '#E34F26',
    iconPath: 'assets/icons/technologies/html5.svg',
  },
  {
    id: 'css3',
    label: 'CSS3',
    category: 'frontend',
    aliases: ['css', 'css3', 'css 3'],
    brandColor: '#1572B6',
    iconPath: 'assets/icons/technologies/css3.svg',
  },
  {
    id: 'sass',
    label: 'Sass',
    category: 'frontend',
    aliases: ['sass', 'scss'],
    brandColor: '#CC6699',
    iconPath: 'assets/icons/technologies/sass.svg',
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    category: 'backend',
    aliases: ['node', 'node.js', 'nodejs'],
    brandColor: '#339933',
    iconPath: 'assets/icons/technologies/nodejs.svg',
  },
  {
    id: 'firebase',
    label: 'Firebase',
    category: 'cloud',
    aliases: ['firebase', 'firestore', 'firebase hosting'],
    brandColor: '#FFCA28',
    iconPath: 'assets/icons/technologies/firebase.svg',
  },
  {
    id: 'git',
    label: 'Git',
    category: 'tooling',
    aliases: ['git'],
    brandColor: '#F05032',
    iconPath: 'assets/icons/technologies/git.svg',
  },
  {
    id: 'github',
    label: 'GitHub',
    category: 'tooling',
    aliases: ['github', 'github actions'],
    brandColor: '#181717',
    iconPath: 'assets/icons/technologies/github.svg',
  },
  {
    id: 'react',
    label: 'React',
    category: 'frontend',
    aliases: ['react', 'react.js', 'reactjs'],
    brandColor: '#61DAFB',
    iconPath: 'assets/icons/technologies/react.svg',
  },
  {
    id: 'vuejs',
    label: 'Vue.js',
    category: 'frontend',
    aliases: ['vue', 'vue.js', 'vuejs'],
    brandColor: '#4FC08D',
    iconPath: 'assets/icons/technologies/vuejs.svg',
  },
  {
    id: 'java',
    label: 'Java',
    category: 'language',
    aliases: ['java'],
    brandColor: '#E76F00',
    iconPath: 'assets/icons/technologies/java.svg',
  },
  {
    id: 'spring-boot',
    label: 'Spring Boot',
    category: 'backend',
    aliases: ['spring', 'spring boot', 'springboot'],
    brandColor: '#6DB33F',
    iconPath: 'assets/icons/technologies/spring-boot.svg',
  },
  {
    id: 'python',
    label: 'Python',
    category: 'language',
    aliases: ['python', 'py'],
    brandColor: '#3776AB',
    iconPath: 'assets/icons/technologies/python.svg',
  },
  {
    id: 'docker',
    label: 'Docker',
    category: 'tooling',
    aliases: ['docker', 'container', 'containers'],
    brandColor: '#2496ED',
    iconPath: 'assets/icons/technologies/docker.svg',
  },
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    category: 'database',
    aliases: ['postgresql', 'postgres', 'pgsql'],
    brandColor: '#4169E1',
    iconPath: 'assets/icons/technologies/postgresql.svg',
  },
  {
    id: 'mysql',
    label: 'MySQL',
    category: 'database',
    aliases: ['mysql', 'my sql'],
    brandColor: '#4479A1',
    iconPath: 'assets/icons/technologies/mysql.svg',
  },
  {
    id: 'mongodb',
    label: 'MongoDB',
    category: 'database',
    aliases: ['mongodb', 'mongo', 'mongo db'],
    brandColor: '#47A248',
    iconPath: 'assets/icons/technologies/mongodb.svg',
  },
  {
    id: 'generic',
    label: 'Outra tecnologia',
    category: 'other',
    aliases: ['generic', 'other', 'outra', 'outro'],
    brandColor: '#64748B',
    iconPath: 'assets/icons/technologies/generic.svg',
  },
] as const satisfies readonly TechnologyOption[];

export type TechnologyId = (typeof TECHNOLOGY_CATALOG)[number]['id'];

export const DEFAULT_TECHNOLOGY_ID: TechnologyId = 'generic';

const TECHNOLOGY_BY_ID = new Map<string, TechnologyOption>(
  TECHNOLOGY_CATALOG.map((technology) => [technology.id, technology] as const),
);

export function getTechnologyById(id?: string | null): TechnologyOption | undefined {
  const normalizedId = id?.trim().toLowerCase();

  return normalizedId ? TECHNOLOGY_BY_ID.get(normalizedId) : undefined;
}

export function getTechnologyCategoryLabel(category: TechnologyCategory): string {
  return TECHNOLOGY_CATEGORY_LABELS[category];
}

export function resolveTechnologyIcon(
  id?: string | null,
  legacyUrl?: string | null,
): string {
  const technology = getTechnologyById(id);

  if (technology) {
    return technology.iconPath;
  }

  const normalizedLegacyUrl = legacyUrl?.trim();

  if (normalizedLegacyUrl) {
    return normalizedLegacyUrl;
  }

  return getTechnologyById(DEFAULT_TECHNOLOGY_ID)!.iconPath;
}
