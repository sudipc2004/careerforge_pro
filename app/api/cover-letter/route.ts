// app/api/cover-letter/route.ts
// AI Cover Letter Generator

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResumeData } from '@/lib/resume-schema';
import { handleGeminiError } from '@/lib/gemini-error';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Handles AI-powered cover letter generation requests.
 * Connects to Google Gemini AI to analyze candidate background details (resume context)
 * against a job description, matching key technical or soft skills, and outputting
 * a tailored subject line, body draft, and key skill alignments.
 *
 * @param {NextRequest} req - The Next.js request object containing resume context, job description, and tone.
 * @returns {Promise<NextResponse>} JSON response containing the draft cover letter, recommended subject, and matches.
 */
export async function POST(req: NextRequest) {
  try {
    const { resume, jobDescription, tone = 'professional' } = await req.json() as {
      resume: ResumeData;
      jobDescription: string;
      tone: string;
    };

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const topExperience = resume.experience[0];
    const topSkills = resume.skills.flatMap(g => g.skills.map(s => s.name)).slice(0, 10).join(', ');

    const prompt = `You are an expert cover letter writer. Write a compelling, personalized cover letter.

Candidate Information:
- Name: ${resume.contact.fullName}
- Current/Recent Role: ${topExperience?.position || 'Professional'} at ${topExperience?.company || ''}
- Key Skills: ${topSkills}
- Professional Summary: ${resume.summary}

Job Description:
${jobDescription}

Requirements:
1. Tone: ${tone} (professional/enthusiastic/confident)
2. Length: 3-4 paragraphs (250-350 words)
3. Structure: Opening hook → Relevant experience → Key skills match → Enthusiastic close
4. Naturally incorporate keywords from the job description
5. Include specific examples from the candidate's background
6. Address the company's needs directly

Return ONLY valid JSON (no markdown):
{
  "coverLetter": "the full cover letter text with \\n\\n between paragraphs",
  "subject": "suggested email subject line",
  "keyMatches": ["skill1 matched", "skill2 matched"]
}`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text().trim();
    const jsonText = rawText.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
    const parsed = JSON.parse(jsonText);

    return NextResponse.json({ ...parsed, success: true });
  } catch (error) {
    return handleGeminiError(error, 'Failed to generate cover letter');
  }
}
