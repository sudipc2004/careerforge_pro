// app/api/ats-score/route.ts
// ATS Score calculation API route

import { NextRequest, NextResponse } from 'next/server';
import { calculateATSScore } from '@/lib/ats-scorer';
import { ResumeData } from '@/lib/resume-schema';

export async function POST(req: NextRequest) {
  try {
    const { resume, keywords } = await req.json() as {
      resume: ResumeData;
      keywords: string[];
    };

    const result = calculateATSScore(resume, keywords);

    return NextResponse.json(result);
  } catch (error) {
    console.error('ATS score error:', error);
    return NextResponse.json({ error: 'Failed to calculate ATS score' }, { status: 500 });
  }
}
