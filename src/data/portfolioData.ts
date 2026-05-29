export interface Skill {
  name: string;
  level: number; // 0-100 for progress bar
  glowColor?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
  tags: string[];
  logo?: string;
}

export interface Project {
  title: string;
  tech: string[];
  description: string;
  githubUrl: string;
  demoUrl?: string;
  category: 'enterprise' | 'healthcare' | 'ecommerce' | 'learning';
  stars?: number;
  forks?: number;
  featured?: boolean;
}

export interface Certification {
  name: string;
  icon: string;
  level: string;
}

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const personalInfo = {
  name: 'Soumya Ranjan Das',
  titles: [
    'Senior Fullstack Developer',
    'Angular Architecture Expert',
    'React & Node.js Engineer',
    'Enterprise System Architect'
  ],
  bio: 'Senior Developer with 7+ years of experience building scalable enterprise web applications using Angular, React, Node.js, and NestJS.',
  detailedAbout: `I am a passionate Senior Fullstack Developer specializing in building high-performance, scalable enterprise applications. Over the last 7+ years, I have architected and delivered robust microfrontend architectures, custom Angular/React libraries, and complex monorepo configurations. My focus is on frontend craftsmanship, modern state management (NgRx/Redux), efficient API design (NestJS/Node/REST/GraphQL), and promoting high standards of code quality via automated analysis (SonarQube) and strict peer reviews. I enjoy leading and mentoring agile developer teams to successfully ship premium solutions on time.`,
  email: 'soumyarjnd@gmail.com',
  location: 'Bhubaneswar, India',
  linkedin: 'linkedin.com/in/soumyasrd',
  github: 'soumyasrd',
  stats: [
    { value: '7+', label: 'Years Experience' },
    { value: '15+', label: 'Projects Delivered' },
    { value: '25+', label: 'Tech Stack Assets' },
    { value: '10+', label: 'Engineers Mentored' }
  ]
};

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Architecture',
    skills: [
      { name: 'Angular', level: 98, glowColor: 'rgba(221, 0, 49, 0.4)' },
      { name: 'React', level: 92, glowColor: 'rgba(97, 218, 251, 0.4)' },
      { name: 'TypeScript', level: 95, glowColor: 'rgba(49, 120, 198, 0.4)' },
      { name: 'JavaScript (ES6+)', level: 96, glowColor: 'rgba(247, 223, 30, 0.4)' },
      { name: 'RxJS', level: 95, glowColor: 'rgba(227, 12, 131, 0.4)' },
      { name: 'NgRx / Redux', level: 94, glowColor: 'rgba(186, 42, 233, 0.4)' },
      { name: 'Tailwind CSS', level: 92, glowColor: 'rgba(56, 189, 248, 0.4)' },
      { name: 'Material UI & Bootstrap', level: 90, glowColor: 'rgba(0, 129, 203, 0.4)' }
    ]
  },
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'Node.js', level: 90, glowColor: 'rgba(104, 188, 12, 0.4)' },
      { name: 'Express.js', level: 88, glowColor: 'rgba(150, 150, 150, 0.4)' },
      { name: 'NestJS', level: 92, glowColor: 'rgba(224, 35, 78, 0.4)' },
      { name: 'REST APIs', level: 96, glowColor: 'rgba(34, 197, 94, 0.4)' },
      { name: 'GraphQL', level: 82, glowColor: 'rgba(229, 53, 171, 0.4)' }
    ]
  },
  {
    title: 'Databases & Performance',
    skills: [
      { name: 'MongoDB', level: 88, glowColor: 'rgba(71, 162, 72, 0.4)' },
      { name: 'PostgreSQL', level: 86, glowColor: 'rgba(51, 103, 145, 0.4)' },
      { name: 'SQL & Query Optimization', level: 87, glowColor: 'rgba(0, 117, 143, 0.4)' }
    ]
  },
  {
    title: 'DevOps & Enterprise Tools',
    skills: [
      { name: 'Jenkins & CI/CD', level: 80, glowColor: 'rgba(210, 75, 41, 0.4)' },
      { name: 'SonarQube Quality Assurance', level: 90, glowColor: 'rgba(81, 156, 219, 0.4)' },
      { name: 'Git & Monorepo Architectures', level: 95, glowColor: 'rgba(240, 80, 50, 0.4)' },
      { name: 'Jira & Agile Workflows', level: 92, glowColor: 'rgba(0, 82, 204, 0.4)' }
    ]
  },
  {
    title: 'Data Visualization & Libraries',
    skills: [
      { name: 'Apache ECharts', level: 94, glowColor: 'rgba(193, 46, 52, 0.4)' },
      { name: 'Chart.js', level: 90, glowColor: 'rgba(255, 99, 132, 0.4)' },
      { name: 'Three.js & Canvas API', level: 75, glowColor: 'rgba(255, 255, 255, 0.4)' },
      { name: 'PDF.js Integration', level: 85, glowColor: 'rgba(200, 0, 0, 0.4)' },
      { name: 'Google Maps API Tracking', level: 92, glowColor: 'rgba(66, 133, 244, 0.4)' }
    ]
  }
];

export const experienceTimeline: Experience[] = [
  {
    company: 'Enterprise System Solutions Pvt Ltd (ESSPL)',
    role: 'Senior Developer',
    period: 'Aug 2022 – Present',
    responsibilities: [
      'Architected and co-built the premium Transport Management System platform "20High", handling complex logistics mapping and fleet routing operations.',
      'Integrated advanced real-time geographical widgets using Google Maps API and visual analytics overlays utilizing Apache ECharts.',
      'Implemented clean monorepo configurations to unify core web products, promoting reusable modularity and microfrontend structures.',
      'Authored custom, reusable Angular components and library packages shared across multiple internal corporate squads.',
      'Instituted SonarQube automated code quality scanning and rigorous code review cycles, reducing tech debt and post-launch bugs by 35%.',
      'Mentored a dedicated group of junior developers, leading scrum workshops on RxJS design patterns and NgRx robust state structures.'
    ],
    tags: ['Angular', 'NgRx', 'Google Maps API', 'Apache ECharts', 'Monorepo', 'SonarQube', 'NestJS'],
    logo: '💼'
  },
  {
    company: 'Zemusi Tech Solutions',
    role: 'Fullstack Developer',
    period: 'Jan 2019 – Aug 2022',
    responsibilities: [
      'Developed high-fidelity web features in React and Angular for enterprise-grade e-commerce systems and healthcare patient platforms.',
      'Designed and deployed high-performance REST APIs using Node.js, Express.js, and NestJS backends, handling high transaction volumes.',
      'Developed and engineered highly optimized, reusable shared library elements for cross-company developers.',
      'Collaborated closely with system stakeholders and visual UI/UX designers to translate requirements into responsive, state-driven interfaces.'
    ],
    tags: ['React', 'Angular', 'Node.js', 'Express.js', 'NestJS', 'MongoDB', 'PostgreSQL'],
    logo: '⚡'
  }
];

export const suggestedProjects: Project[] = [
  {
    title: 'Transport Management System ("20High")',
    tech: ['Angular', 'NgRx', 'Google Maps', 'Apache ECharts', 'TypeScript'],
    description: 'Enterprise-grade fleet and transport management platform. Displays real-time live routing vectors and visual analytics dashboards handling massive daily shipments.',
    githubUrl: 'https://github.com/soumyasrd/transport-analytics-dashboard',
    category: 'enterprise',
    stars: 148,
    forks: 34,
    featured: true
  },
  {
    title: 'Ambulance dispatch & Emergency Workflow',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
    description: 'Real-time emergency ambulance tracking and dispatch portal. Bridges the gap between caller, emergency team, and closest hospital via live telemetry.',
    githubUrl: 'https://github.com/soumyasrd/realtime-tracking-system',
    category: 'healthcare',
    stars: 87,
    forks: 18,
    featured: true
  },
  {
    title: 'Scalable E-Commerce Engine',
    tech: ['Angular', 'NestJS', 'PostgreSQL', 'Docker', 'Redis'],
    description: 'Secure, high-concurrency e-commerce backend and frontend portal with dynamic payment integrations, full-text search, and automated inventory sync.',
    githubUrl: 'https://github.com/soumyasrd/nestjs-auth-boilerplate',
    category: 'ecommerce',
    stars: 112,
    forks: 29,
    featured: true
  },
  {
    title: 'Learning Management System (LMS)',
    tech: ['React', 'Express.js', 'MongoDB', 'Chart.js', 'Tailwind CSS'],
    description: 'Comprehensive portal for course creators and students. Features live tracking of curriculum progress, online testing engines, and dashboard statistics.',
    githubUrl: 'https://github.com/soumyasrd/react-admin-dashboard',
    category: 'learning',
    stars: 96,
    forks: 22,
    featured: false
  },
  {
    title: 'Enterprise Angular Monorepo',
    tech: ['Angular', 'Nx Monorepo', 'RxJS', 'Tailwind CSS'],
    description: 'Starter framework demonstrating bulletproof architecture, shared UI libraries, environment configurations, and independent micro-app delivery.',
    githubUrl: 'https://github.com/soumyasrd/enterprise-angular-monorepo',
    category: 'enterprise',
    stars: 153,
    forks: 41,
    featured: false
  },
  {
    title: 'NgRx State Management Dashboard',
    tech: ['Angular', 'NgRx', 'RxJS', 'Material UI'],
    description: 'Demonstrator project for building ultra-complex, stateful enterprise dashboard modules using actions, reducers, selectors, and entity adapters.',
    githubUrl: 'https://github.com/soumyasrd/ngrx-dashboard-system',
    category: 'enterprise',
    stars: 89,
    forks: 12,
    featured: false
  }
];

export const certificationsAndInterests: Certification[] = [
  { name: 'Machine Learning', icon: '🧠', level: 'Advanced Core Concepts' },
  { name: 'GraphQL & Apollo', icon: '🕸️', level: 'API Design' },
  { name: 'Flutter App Dev', icon: '📱', level: 'Cross-platform Mobile' },
  { name: 'React Native', icon: '⚛️', level: 'Native Integration' },
  { name: 'DevOps & GitOps', icon: '🔄', level: 'CI/CD Pipelines' },
  { name: 'Golang Microservices', icon: '🐹', level: 'High Concurrency APIs' }
];

export const mockBlogs: BlogItem[] = [
  {
    id: 'blog-1',
    title: 'Architecting Enterprise Angular Monorepos with Nx',
    excerpt: 'How to scale web applications from 1 developer to 50+ across separate product lines using Nx workspace boundaries, caching, and custom libraries.',
    date: 'May 12, 2026',
    readTime: '8 min read',
    tags: ['Angular', 'Nx', 'Monorepo', 'Scalability']
  },
  {
    id: 'blog-2',
    title: 'Advanced RxJS Patterns: Solving the Race Conditions',
    excerpt: 'Taming asynchronous flow in complex dashboards. Deep-diving into exhaustMap, switchMap, and concatMap to avoid state bugs in heavy user interactions.',
    date: 'Apr 24, 2026',
    readTime: '6 min read',
    tags: ['RxJS', 'Angular', 'Reactive Programming']
  },
  {
    id: 'blog-3',
    title: 'Building a High-Performance NestJS API Structure',
    excerpt: 'An architect\'s template for NestJS including Redis caching, JWT token rotation, TypeORM optimization, and clean microservice communications.',
    date: 'Mar 15, 2026',
    readTime: '11 min read',
    tags: ['NestJS', 'Node.js', 'APIs', 'PostgreSQL']
  }
];

export const simulatedChatBotResponses: Record<string, string> = {
  default: "I am Soumya's AI Agent! I can tell you about his 7+ years of experience in Angular, React, Node.js, NestJS, and Monorepo Architectures. Try asking: 'Tell me about 20High', 'What is his tech stack?', 'How does he handle code quality?', or 'Can I contact him?'",
  experience: "Soumya has over 7 years of fullstack experience. Currently, he is a Senior Developer at ESSPL (since Aug 2022) working on the enterprise Transport Management System '20High'. Previously, he worked at Zemusi Tech Solutions developing complex e-commerce and healthcare platforms.",
  angular: "Soumya is an Angular Expert! He has built complex enterprise architectures, microfrontends, reusable Angular libraries, and has advanced expertise in state management using NgRx and reactive streams using RxJS.",
  react: "Soumya is highly proficient in React. He has developed several responsive, state-driven user interfaces, dashboards, and real-time tracking systems using React, TypeScript, Redux, and modern style sheets like Tailwind CSS.",
  node: "On the backend, Soumya excels in Node.js and NestJS. He builds robust, modular APIs, implements microservices, integrates PostgreSQL and MongoDB, and sets up high-performance caching layers.",
  quality: "Soumya takes code quality very seriously. At ESSPL, he integrated SonarQube for automated quality gates, established strict monorepo rules, and successfully reduced post-release production issues by 35% through rigorous code review practices and developer mentoring.",
  contact: "You can reach Soumya directly at soumyarjnd@gmail.com. He is based in Bhubaneswar, India. His LinkedIn is linkedin.com/in/soumyasrd and his GitHub is github.com/soumyasrd. Feel free to use the contact form below to drop him a message or download his resume!",
  projects: "Soumya's standout projects include '20High' (a Transport Management System built with Angular, Google Maps, and ECharts), an Ambulance Dispatch System (built with React, Node.js, and MongoDB), and a highly scalable E-Commerce portal.",
  hobbies: "Beyond fullstack engineering, Soumya is highly interested in Machine Learning, GraphQL API design, cross-platform mobile apps with Flutter and React Native, and coding high-concurrency microservices in Golang."
};
