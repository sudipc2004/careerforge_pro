// lib/resume-schema.ts
// Complete TypeScript interfaces for the CareerForge Pro resume data model

export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  website: string;
  github: string;
}

export interface BulletPoint {
  id: string;
  text: string;
  isRewritten?: boolean;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: BulletPoint[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  bullets: BulletPoint[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

export type ResumeTemplate = 'modern' | 'executive' | 'minimal';

export interface ResumeData {
  id: string;
  name: string; // resume name for dashboard
  template: ResumeTemplate;
  contact: ContactInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: SkillGroup[];
  projects: Project[];
  certifications: Certification[];
  lastModified: string;
  atsScore?: number;
  customColors?: {
    primary: string;
    accent: string;
  };
}

export interface JDAnalysis {
  technical: string[];
  softSkills: string[];
  tools: string[];
  mustHave: string[];
  niceToHave: string[];
  rawKeywords: string[];
  jobTitle?: string;
  industry?: string;
  experienceLevel?: string;
}

export interface ATSResult {
  score: number;
  matched: string[];
  missing: string[];
  suggestions: string[];
  breakdown: {
    technical: number;
    softSkills: number;
    tools: number;
  };
}

export const createDefaultResume = (): ResumeData => ({
  id: crypto.randomUUID(),
  name: 'My Resume',
  template: 'modern',
  contact: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    website: '',
    github: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  lastModified: new Date().toISOString(),
  atsScore: 0,
});

export const createDefaultExperience = (): WorkExperience => ({
  id: crypto.randomUUID(),
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  bullets: [{ id: crypto.randomUUID(), text: '' }],
});

export const createDefaultEducation = (): Education => ({
  id: crypto.randomUUID(),
  institution: '',
  degree: '',
  field: '',
  location: '',
  startDate: '',
  endDate: '',
  gpa: '',
  honors: '',
});

export const createDefaultSkillGroup = (): SkillGroup => ({
  id: crypto.randomUUID(),
  category: '',
  skills: [],
});

export const createDefaultProject = (): Project => ({
  id: crypto.randomUUID(),
  name: '',
  description: '',
  technologies: [],
  bullets: [{ id: crypto.randomUUID(), text: '' }],
});

export type CoverLetterTone = 'professional' | 'enthusiastic' | 'confident';

export interface CoverLetterToneOption {
  id: CoverLetterTone;
  label: string;
}

export const COVER_LETTER_TONES: CoverLetterToneOption[] = [
  { id: 'professional', label: 'Professional' },
  { id: 'enthusiastic', label: 'Enthusiastic' },
  { id: 'confident', label: 'Confident' },
];
