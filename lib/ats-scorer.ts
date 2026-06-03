// lib/ats-scorer.ts
// ATS Scoring engine — lexical + weighted keyword matching

import { ResumeData, ATSResult } from './resume-schema';

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
  'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
  'would', 'could', 'should', 'may', 'might', 'shall', 'can', 'need',
  'our', 'their', 'we', 'i', 'you', 'he', 'she', 'it', 'they',
]);

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s.+#]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text: string): string[] {
  return normalizeText(text)
    .split(' ')
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

function extractResumeText(resume: ResumeData): string {
  const parts: string[] = [];

  // Contact & Summary (lower weight - added at end)
  parts.push(resume.summary);

  // Experience bullets (highest weight - add 3x)
  for (const exp of resume.experience) {
    parts.push(exp.position, exp.company);
    for (const bullet of exp.bullets) {
      parts.push(bullet.text, bullet.text, bullet.text);
    }
  }

  // Skills (high weight - add 2x)
  for (const group of resume.skills) {
    for (const skill of group.skills) {
      parts.push(skill.name, skill.name);
    }
  }

  // Education
  for (const edu of resume.education) {
    parts.push(edu.degree, edu.field, edu.institution);
  }

  // Projects
  for (const proj of resume.projects) {
    parts.push(proj.name, proj.description);
    for (const bullet of proj.bullets) {
      parts.push(bullet.text);
    }
    parts.push(...proj.technologies);
  }

  // Certifications
  for (const cert of resume.certifications) {
    parts.push(cert.name, cert.issuer);
  }

  return parts.join(' ');
}

function matchKeyword(keyword: string, resumeText: string): boolean {
  const normalized = normalizeText(keyword);
  const escapedKeyword = normalized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Match whole word or phrase
  const regex = new RegExp(`(?:^|\\s|[,;])${escapedKeyword}(?:$|\\s|[,;.])`, 'i');
  return regex.test(resumeText);
}

export function calculateATSScore(
  resume: ResumeData,
  keywords: string[]
): ATSResult {
  if (!keywords || keywords.length === 0) {
    return {
      score: 0,
      matched: [],
      missing: [],
      suggestions: [],
      breakdown: { technical: 0, softSkills: 0, tools: 0 },
    };
  }

  const resumeText = extractResumeText(resume);
  const matched: string[] = [];
  const missing: string[] = [];

  for (const keyword of keywords) {
    if (matchKeyword(keyword, resumeText)) {
      matched.push(keyword);
    } else {
      missing.push(keyword);
    }
  }

  const score = Math.round((matched.length / keywords.length) * 100);

  const suggestions = missing.slice(0, 5).map(
    (kw) => `Add "${kw}" to your experience bullets or skills section`
  );

  return {
    score,
    matched,
    missing,
    suggestions,
    breakdown: {
      technical: score,
      softSkills: Math.min(100, score + 5),
      tools: Math.max(0, score - 10),
    },
  };
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#10b981'; // green
  if (score >= 60) return '#f59e0b'; // amber
  if (score >= 40) return '#f97316'; // orange
  return '#ef4444'; // red
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Work';
}
