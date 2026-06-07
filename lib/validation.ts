// lib/validation.ts

/**
 * Validates if an email is in a valid format.
 */
export function validateEmail(email: string): boolean {
  if (!email) return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
}

/**
 * Validates basic phone formats (supporting international, dashes, spaces, and parentheses).
 */
export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  // Allows digits, spaces, parentheses, dashes, plus sign
  const regex = /^\+?[0-9\s\-()]{7,20}$/;
  return regex.test(phone.trim());
}

/**
 * Validates LinkedIn profile URL format.
 */
export function validateLinkedIn(url: string): boolean {
  if (!url) return false;
  const cleanUrl = url.trim().toLowerCase();
  return (
    cleanUrl.includes('linkedin.com/in/') ||
    cleanUrl.startsWith('linkedin.com/') ||
    cleanUrl.startsWith('www.linkedin.com/')
  );
}

/**
 * Validates GitHub profile URL format.
 */
export function validateGitHub(url: string): boolean {
  if (!url) return false;
  const cleanUrl = url.trim().toLowerCase();
  return (
    cleanUrl.includes('github.com/') ||
    cleanUrl.startsWith('github.com/') ||
    cleanUrl.startsWith('www.github.com/')
  );
}

/**
 * Validates a standard HTTP/HTTPS portfolio website URL format.
 */
export function validateWebsite(url: string): boolean {
  if (!url) return false;
  try {
    const cleanUrl = url.trim();
    // Prepend http if not present to allow URL constructor validation
    const urlToTest = /^https?:\/\//i.test(cleanUrl) ? cleanUrl : `https://${cleanUrl}`;
    const parsed = new URL(urlToTest);
    return parsed.hostname.includes('.');
  } catch (error) {
    return false;
  }
}

/**
 * Validates a dictionary of required fields and returns the keys that are empty.
 */
export function getMissingRequiredFields(
  data: Record<string, any>,
  requiredKeys: string[]
): string[] {
  const missing: string[] = [];
  for (const key of requiredKeys) {
    const value = data[key];
    if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
      missing.push(key);
    }
  }
  return missing;
}
