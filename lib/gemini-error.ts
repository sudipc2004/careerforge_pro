import { NextResponse } from 'next/server';

/**
 * Parses errors returned by the Google Generative AI SDK (Gemini)
 * and returns an appropriate Next.js Response with descriptive errors.
 */
export function handleGeminiError(error: unknown, defaultMessage: string) {
  console.error(`${defaultMessage} details:`, error);

  const errObj = error && typeof error === 'object' ? (error as Record<string, unknown>) : null;

  const errorMessage = errObj && 'message' in errObj
    ? String(errObj.message)
    : String(error);

  const status = errObj && 'status' in errObj
    ? Number(errObj.status)
    : 500;

  const isQuotaError = 
    status === 429 || 
    /429|quota|limit|too many requests/i.test(errorMessage);

  if (isQuotaError) {
    return NextResponse.json(
      { 
        error: 'Gemini AI API quota exceeded. The free tier has daily and per-minute request limits. Please wait a minute before retrying, configure billing in Google AI Studio, or update your GEMINI_API_KEY in .env.local.' 
      },
      { status: 429 }
    );
  }

  const isAuthError = 
    status === 401 || 
    status === 403 || 
    /API_KEY_INVALID|API key not valid|invalid api key|key is disabled/i.test(errorMessage);

  if (isAuthError) {
    return NextResponse.json(
      { 
        error: 'Invalid or deactivated Gemini API key. Please check the GEMINI_API_KEY in .env.local and make sure it is configured correctly.' 
      },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { error: `${defaultMessage}. Details: ${errorMessage || 'Unknown error'}` },
    { status: status || 500 }
  );
}
