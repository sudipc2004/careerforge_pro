// app/api/cover-letter/pdf/route.ts
// Puppeteer PDF generation service for Cover Letters

import { NextRequest, NextResponse } from 'next/server';
import { ResumeData } from '@/lib/resume-schema';

/**
 * Generates an A4 PDF for a given Cover Letter.
 * Employs headless Puppeteer (Chrome) to compile and render a professional HTML structure.
 * The output style (primary, accent, margins) changes dynamically based on the template 
 * (Modern, Executive, Minimal) specified inside the resume context payload.
 *
 * @param {NextRequest} req - The Next.js request object containing cover letter body, subject line, and base resume metadata.
 * @returns {Promise<NextResponse>} Binary application/pdf response stream with direct download headers.
 */
export async function POST(req: NextRequest) {
  let browser = null;
  try {
    const { coverLetter, subject, resume } = await req.json() as {
      coverLetter: string;
      subject: string;
      resume: ResumeData;
    };

    const template = resume?.template || 'modern';
    const contact = resume?.contact || { fullName: 'Applicant', email: '', phone: '' };

    const colors = {
      modern: { primary: '#4f46e5', accent: '#10b981', text: '#1e293b', muted: '#64748b' },
      executive: { primary: '#1e3a5f', accent: '#c9a84c', text: '#1a1a1a', muted: '#555555' },
      minimal: { primary: '#111827', accent: '#6b7280', text: '#111827', muted: '#6b7280' },
    }[template];

    // Format paragraphs
    const paragraphs = coverLetter
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const formattedParagraphsHtml = paragraphs
      .map(p => `<p class="paragraph">${p.replace(/\n/g, '<br />')}</p>`)
      .join('');

    const todayDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    // Create the HTML template for the Cover Letter
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cover Letter - ${contact.fullName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: ${colors.text};
      background: white;
    }
    @page { size: A4; margin: 0.6in 0.8in; }
    .page { max-width: 100%; }

    /* Header */
    .header {
      border-bottom: 2px solid ${colors.primary};
      padding-bottom: 12px;
      margin-bottom: 24px;
    }
    .name {
      font-size: 24pt;
      font-weight: 700;
      color: ${colors.primary};
      letter-spacing: -0.5px;
    }
    .contact-info {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 16px;
      margin-top: 6px;
      font-size: 9pt;
      color: ${colors.muted};
    }

    /* Date and Subject */
    .date-row {
      margin-bottom: 18px;
      color: ${colors.muted};
      font-size: 10pt;
    }
    .subject-row {
      font-weight: 700;
      margin-bottom: 24px;
      color: ${colors.primary};
    }

    /* Letter Body */
    .paragraph {
      margin-bottom: 18px;
      text-align: justify;
    }
    .signature {
      margin-top: 36px;
    }
    .signature-name {
      font-weight: 600;
      margin-top: 6px;
      color: ${colors.primary};
    }
  </style>
</head>
<body>
<div class="page">
  <!-- Header -->
  <div class="header">
    <div class="name">${contact.fullName || 'Your Name'}</div>
    <div class="contact-info">
      ${contact.email ? `<span>Email: ${contact.email}</span>` : ''}
      ${contact.phone ? `<span>Phone: ${contact.phone}</span>` : ''}
      ${contact.location ? `<span>Location: ${contact.location}</span>` : ''}
      ${contact.linkedIn ? `<span>LinkedIn: ${contact.linkedIn}</span>` : ''}
    </div>
  </div>

  <!-- Date -->
  <div class="date-row">${todayDate}</div>

  <!-- Subject -->
  ${subject ? `<div class="subject-row">RE: ${subject}</div>` : ''}

  <!-- Body -->
  <div class="body-content">
    ${formattedParagraphsHtml}
  </div>

  <!-- Signature -->
  <div class="signature">
    <p>Sincerely,</p>
    <div class="signature-name">${contact.fullName}</div>
  </div>
</div>
</body>
</html>`;

    // Dynamic import of puppeteer
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
        top: '0.6in',
        bottom: '0.6in',
        left: '0.8in',
        right: '0.8in',
      },
      preferCSSPageSize: false,
    });

    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${contact.fullName.replace(/\s+/g, '_')}_Cover_Letter.pdf"`,
      },
    });
  } catch (error) {
    console.error('Cover letter PDF generation error:', error);
    return NextResponse.json(
      { error: 'PDF generation failed. Make sure Puppeteer is installed.' },
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close();
  }
}
