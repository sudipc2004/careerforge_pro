// app/api/analyze-jd/route.ts
// JD Analysis Agent — extracts and ranks keywords from a Job Description using Gemini

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { handleGeminiError } from '@/lib/gemini-error';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { jobDescription } = await req.json();

    if (!jobDescription || jobDescription.trim().length < 50) {
      return NextResponse.json(
        { error: 'Job description must be at least 50 characters' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are an expert ATS (Applicant Tracking System) analyst and resume consultant.

Analyze the following Job Description and extract the most critical keywords, organized by category.

Return ONLY a valid JSON object (no markdown, no code fences) with this exact structure:
{
  "technical": ["skill1", "skill2"],
  "softSkills": ["skill1", "skill2"],
  "tools": ["tool1", "tool2"],
  "mustHave": ["keyword1", "keyword2"],
  "niceToHave": ["keyword1", "keyword2"],
  "rawKeywords": ["all", "unique", "keywords", "combined"],
  "jobTitle": "detected job title",
  "industry": "detected industry",
  "experienceLevel": "Junior/Mid/Senior/Lead"
}

Rules:
- "mustHave": qualifications explicitly marked required, or appearing 2+ times
- "technical": programming languages, frameworks, methodologies
- "tools": specific software, platforms, services
- "softSkills": leadership, communication, teamwork, etc.
- "rawKeywords": all unique keywords from all categories combined (max 30)
- Keep keywords as they appear in the JD (preserve casing like "React.js", "AWS", "Python")

Job Description:
${jobDescription}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Strip markdown fences if present
    const jsonText = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
    const analysis = JSON.parse(jsonText);

    return NextResponse.json({ analysis, success: true });
  } catch (error) {
    return handleGeminiError(error, 'Failed to analyze job description');
  }
}
