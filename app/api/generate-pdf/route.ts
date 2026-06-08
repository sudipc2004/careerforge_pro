// app/api/generate-pdf/route.ts
// Puppeteer PDF generation service

import { NextRequest, NextResponse } from 'next/server';
import { ResumeData } from '@/lib/resume-schema';
import { generateResumeHTML } from '@/lib/resume-html-generator';

export async function POST(req: NextRequest) {
  let browser = null;
  try {
    const { resume } = await req.json() as { resume: ResumeData };

    const html = generateResumeHTML(resume);

    // Dynamic import to avoid issues with edge runtime
    const puppeteer = await import('puppeteer');
    browser = await puppeteer.default.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.4in',
        bottom: '0.4in',
        left: '0.5in',
        right: '0.5in',
      },
      preferCSSPageSize: false,
    });

    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resume.contact.fullName || 'resume'}-careerforge.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'PDF generation failed. Make sure Puppeteer is installed.' },
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close();
  }
}
