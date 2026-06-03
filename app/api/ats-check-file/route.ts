// app/api/ats-check-file/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PDFParse } from 'pdf-parse';
import { handleGeminiError } from '@/lib/gemini-error';

// Disable default body parser to allow raw file uploads
export const dynamic = 'force-dynamic';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const jobDescription = formData.get('jobDescription') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'Please upload a PDF resume file' }, { status: 400 });
    }

    if (!jobDescription || jobDescription.trim().length < 50) {
      return NextResponse.json({ error: 'Please paste a job description of at least 50 characters' }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse PDF text
    let resumeText = '';
    try {
      const path = await import('path');
      const { pathToFileURL } = await import('url');
      const workerPath = path.join(process.cwd(), 'node_modules', 'pdfjs-dist', 'legacy', 'build', 'pdf.worker.mjs');
      const workerUrl = pathToFileURL(workerPath).href;
      PDFParse.setWorker(workerUrl);

      const parser = new PDFParse({ data: new Uint8Array(buffer) });
      const parsedPdf = await parser.getText();
      resumeText = parsedPdf.text || '';
      await parser.destroy();
    } catch (parseError: any) {
      console.error('PDF parsing error:', parseError);
      return NextResponse.json({ error: 'Failed to extract text from PDF. Ensure the file is not corrupted.' }, { status: 400 });
    }

    if (!resumeText.trim()) {
      return NextResponse.json({ error: 'Could not extract text from the PDF. Is it a scanned image instead of text?' }, { status: 400 });
    }

    // Run Gemini analysis
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are an expert ATS (Applicant Tracking System) analyst and professional recruiter.
Compare the following Candidate Resume Text against the target Job Description.

Candidate Resume Text:
"""
${resumeText.slice(0, 8000)}
"""

Target Job Description:
"""
${jobDescription.slice(0, 4000)}
"""

Please perform a thorough ATS analysis.
Provide a score from 0 to 100 based on keyword match, skills relevance, experience alignment, and formatting.
Also identify key technical skills, soft skills, and tools that are matched and missing.
Provide 3-5 specific, high-impact suggestions for the candidate to improve their resume for this role.

Return ONLY a valid JSON object (no markdown, no code fences) with the following structure:
{
  "score": 85,
  "matched": ["React", "TypeScript", "Node.js"],
  "missing": ["AWS", "Docker", "CI/CD"],
  "suggestions": [
    "Quantify your achievements in your recent role, e.g., 'improved app performance by 20%'.",
    "Add Docker and CI/CD tools to your skills section since they are highly emphasized in the job description."
  ],
  "breakdown": {
    "technical": 90,
    "softSkills": 80,
    "tools": 70
  }
}

Rules:
1. Return ONLY the JSON object. Do not include markdown code block syntax (like \`\`\`json).
2. The score should reflect a realistic ATS parsing score.
3. Keep suggestions concise, professional, and actionable.`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text().trim();
    
    // Strip markdown fences if present
    const jsonText = rawText.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
    
    let analysisResult;
    try {
      analysisResult = JSON.parse(jsonText);
    } catch (jsonError) {
      console.error('JSON parsing error from Gemini output:', rawText);
      return NextResponse.json({ error: 'Failed to process ATS results' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      filename: file.name,
      analysis: analysisResult
    });

  } catch (error: any) {
    return handleGeminiError(error, 'ATS file check error');
  }
}
