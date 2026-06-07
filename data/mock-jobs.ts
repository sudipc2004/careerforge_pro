// data/mock-jobs.ts

export interface MockJobDescription {
  id: string;
  title: string;
  company: string;
  industry: string;
  description: string;
  keywords: string[];
}

export const MOCK_JOB_DESCRIPTIONS: MockJobDescription[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer (React/Next.js)',
    company: 'NextSaaS Corp',
    industry: 'Technology',
    description: `We are looking for a Senior Frontend Engineer to join our growing core platform team. You will be responsible for architecting and building highly scalable, performant, and accessible user interfaces.

Requirements:
- 5+ years of software engineering experience.
- Expert-level knowledge of React, Next.js, and TypeScript.
- Strong experience with Tailwind CSS, responsive design, and CSS variables.
- Passion for performance optimization, initial load times, and search engine optimization (SEO).
- Familiarity with Cypress, Jest, and Playwright automated testing tools.
- Understanding of WCAG AA accessibility rules.`,
    keywords: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Performance Optimization', 'SEO', 'Playwright', 'Jest', 'Cypress', 'Accessibility', 'WCAG AA'],
  },
  {
    id: 'job-2',
    title: 'Technical Product Manager',
    company: 'StripeSphere',
    industry: 'Fintech',
    description: `StripeSphere is seeking a Technical Product Manager to oversee our merchant dashboard platform. You will lead cross-functional squads to define product requirements, construct product roadmaps, and ship billing integration utilities.

Requirements:
- 4+ years of product management experience.
- Strong technical background with APIs, Stripe Connect, and analytics.
- Proven experience with agile/scrum methodologies, Jira, and Amplitude.
- Track record of driving customer retention and user conversion growth.
- Excellent communication and qualitative merchant/user research skills.`,
    keywords: ['Roadmapping', 'Agile', 'Scrum', 'Stripe Connect', 'APIs', 'Jira', 'Amplitude', 'Customer Retention', 'Conversion Growth', 'User Research'],
  },
  {
    id: 'job-3',
    title: 'Lead Data Analyst',
    company: 'InsightFlow',
    industry: 'Data & Analytics',
    description: `As a Lead Data Analyst, you will lead the charge in converting raw transaction telemetry into interactive visual business reports. You will partner with operations and executives to identify optimization opportunities.

Requirements:
- 5+ years of experience in business analysis or data science.
- Masterful skills in SQL, database querying, and data formatting.
- Experience building dashboards in Tableau, PowerBI, or Mixpanel.
- Solid understanding of data warehouse schemas and telemetry collections.
- Ability to convey complex findings to non-technical stakeholders.`,
    keywords: ['SQL', 'Tableau', 'Mixpanel', 'Data Science', 'Data Analytics', 'Dashboards', 'Telemetry', 'Database Querying', 'Business Analysis'],
  },
];
