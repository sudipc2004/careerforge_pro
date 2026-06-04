// data/mock-resumes.ts
import { ResumeData } from '@/lib/resume-schema';

export const MOCK_RESUME_FRONTEND: ResumeData = {
  id: 'mock-frontend-id',
  name: 'Senior Frontend Engineer Template',
  template: 'modern',
  contact: {
    fullName: 'Alex Morgan',
    email: 'alex.morgan@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedIn: 'linkedin.com/in/alexmorgan',
    website: 'alexmorgan.dev',
    github: 'github.com/alexmorgan',
  },
  summary: 'Results-driven Senior Frontend Engineer with 6+ years of experience building responsive, accessible, and high-performing web applications. Expert in React, Next.js, and TypeScript with a proven track record of optimizing page load speed by 40% and leading cross-functional teams to deliver enterprise-grade SaaS products.',
  experience: [
    {
      id: 'exp-1',
      company: 'TechForge Solutions',
      position: 'Senior Frontend Engineer',
      location: 'San Francisco, CA',
      startDate: '2023-01',
      endDate: '',
      current: true,
      bullets: [
        {
          id: 'b-1-1',
          text: 'Architected and built a reusable React component library used across 4 product lines, improving developer efficiency by 35% and ensuring full WCAG AA accessibility compliance.',
        },
        {
          id: 'b-1-2',
          text: 'Led a team of 4 engineers in migrating a legacy codebase to Next.js 14 and App Router, reducing initial load times by 42% and increasing organic SEO traffic by 18%.',
        },
        {
          id: 'b-1-3',
          text: 'Implemented automated end-to-end testing utilizing Cypress and Playwright, increasing code coverage from 45% to 88% and eliminating critical production release bugs.',
        },
      ],
    },
    {
      id: 'exp-2',
      company: 'PixelPerfect Web Co.',
      position: 'Software Engineer (Frontend)',
      location: 'Oakland, CA',
      startDate: '2020-05',
      endDate: '2022-12',
      current: false,
      bullets: [
        {
          id: 'b-2-1',
          text: 'Optimized state management and database fetching strategies using TanStack Query, resulting in a 50% decrease in API latency and smoother client transitions.',
        },
        {
          id: 'b-2-2',
          text: 'Collaborated closely with design team to construct fully responsive grid layouts and dashboard components utilizing Tailwind CSS, boosting user engagement by 22%.',
        },
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2016-09',
      endDate: '2020-05',
      gpa: '3.8/4.0',
    },
  ],
  skills: [
    {
      id: 'sk-gp-1',
      category: 'Languages',
      skills: [
        { id: 's-1', name: 'JavaScript' },
        { id: 's-2', name: 'TypeScript' },
        { id: 's-3', name: 'HTML5/CSS3' },
        { id: 's-4', name: 'SQL' },
      ],
    },
    {
      id: 'sk-gp-2',
      category: 'Frameworks & Libraries',
      skills: [
        { id: 's-5', name: 'React.js' },
        { id: 's-6', name: 'Next.js' },
        { id: 's-7', name: 'Redux Toolkit' },
        { id: 's-8', name: 'Tailwind CSS' },
        { id: 's-9', name: 'Node.js' },
      ],
    },
    {
      id: 'sk-gp-3',
      category: 'Tools & DevOps',
      skills: [
        { id: 's-10', name: 'Git & GitHub' },
        { id: 's-11', name: 'Webpack / Vite' },
        { id: 's-12', name: 'Docker' },
        { id: 's-13', name: 'CI/CD Pipelines' },
        { id: 's-14', name: 'Jest / Playwright' },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OpenSource UI Kit',
      description: 'A modular, headless, and accessible React UI toolkit optimized for fast prototyping and high customizability.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
      github: 'github.com/alexmorgan/opensource-ui-kit',
      bullets: [
        {
          id: 'b-p-1',
          text: 'Grew the repository to over 1,200+ stars on GitHub and collaborated with 15+ international open-source contributors.',
        },
      ],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2024-03',
    },
  ],
  lastModified: new Date().toISOString(),
  atsScore: 92,
};

export const MOCK_RESUME_PRODUCT_MANAGER: ResumeData = {
  id: 'mock-pm-id',
  name: 'Senior Product Manager Template',
  template: 'executive',
  contact: {
    fullName: 'Jordan Sterling',
    email: 'jordan.sterling@email.com',
    phone: '+1 (555) 987-6543',
    location: 'Seattle, WA',
    linkedIn: 'linkedin.com/in/jordansterling',
    website: 'jordanpm.com',
    github: '',
  },
  summary: 'Strategic Senior Product Manager with 7+ years of experience leading cross-functional teams to ship market-disrupting SaaS features. Skilled in data-driven prioritization, market analysis, and user research. Successfully grew active user count by 150% and managed products generating $12M+ ARR.',
  experience: [
    {
      id: 'exp-pm-1',
      company: 'GrowthFlow Analytics',
      position: 'Senior Product Manager',
      location: 'Seattle, WA',
      startDate: '2022-08',
      endDate: '',
      current: true,
      bullets: [
        {
          id: 'b-pm-1-1',
          text: 'Owned the roadmap and execution for the Core Analytics dashboard, resulting in a 40% increase in Day-30 customer retention rate.',
        },
        {
          id: 'b-pm-1-2',
          text: 'Analyzed user behavior telemetry to restructure the trial signup funnel, converting free trials to paid memberships at a 15% higher rate.',
        },
        {
          id: 'b-pm-1-3',
          text: 'Facilitated agile ceremonies, defined precise PRDs, and collaborated with a team of 12 engineers, 2 UX designers, and 3 marketers to launch 5 core features ahead of schedule.',
        },
      ],
    },
    {
      id: 'exp-pm-2',
      company: 'AppSphere Inc.',
      position: 'Product Manager',
      location: 'Seattle, WA',
      startDate: '2019-06',
      endDate: '2022-07',
      current: false,
      bullets: [
        {
          id: 'b-pm-2-1',
          text: 'Conducted 50+ qualitative user interviews to identify usability gaps, leading to a redesigned navigation system that decreased client support tickets by 30%.',
        },
        {
          id: 'b-pm-2-2',
          text: 'Partnered with sales and marketing teams to establish go-to-market strategies for self-serve payment flows, driving $2.5M in incremental revenue in Q3.',
        },
      ],
    },
  ],
  education: [
    {
      id: 'edu-pm-1',
      institution: 'University of Washington',
      degree: 'Master of Business Administration (MBA)',
      field: 'Technology Management',
      location: 'Seattle, WA',
      startDate: '2017-09',
      endDate: '2019-06',
    },
  ],
  skills: [
    {
      id: 'sk-gp-pm-1',
      category: 'Product Strategy',
      skills: [
        { id: 's-pm-1', name: 'Roadmapping' },
        { id: 's-pm-2', name: 'Agile/Scrum Methodologies' },
        { id: 's-pm-3', name: 'A/B Testing' },
        { id: 's-pm-4', name: 'SQL & Data Analytics' },
        { id: 's-pm-5', name: 'Market Analysis' },
      ],
    },
    {
      id: 'sk-gp-pm-2',
      category: 'Tools',
      skills: [
        { id: 's-pm-6', name: 'Jira & Confluence' },
        { id: 's-pm-7', name: 'Amplitude / Mixpanel' },
        { id: 's-pm-8', name: 'Figma' },
        { id: 's-pm-9', name: 'Tableau' },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-pm-1',
      name: 'Startup Launchpad API',
      description: 'Defined the product strategy and MVP feature list for a developer portal enabling fast third-party integrations.',
      technologies: ['API Management', 'Developer Experience', 'Stripe Connect'],
      bullets: [
        {
          id: 'b-pm-p-1',
          text: 'Grew active developer ecosystem from 0 to 450+ api integrations in less than 9 months.',
        },
      ],
    },
  ],
  certifications: [
    {
      id: 'cert-pm-1',
      name: 'Certified Scrum Product Owner (CSPO)',
      issuer: 'Scrum Alliance',
      date: '2021-11',
    },
  ],
  lastModified: new Date().toISOString(),
  atsScore: 89,
};

export const MOCK_RESUMES = [MOCK_RESUME_FRONTEND, MOCK_RESUME_PRODUCT_MANAGER];
