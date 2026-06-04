// lib/utils.ts

/**
 * A lightweight utility to conditionally combine class names.
 * Filters out falsey values and merges strings.
 */
export function cn(...classes: (string | undefined | null | boolean | number)[]) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats ISO date strings or year-month strings (e.g., '2023-01') into a readable format (e.g., 'Jan 2023').
 * If the date is invalid or empty, returns the original string or 'Present' if current is true.
 */
export function formatDate(dateString: string, current: boolean = false): string {
  if (current) return 'Present';
  if (!dateString) return '';

  try {
    // Check if it's YYYY-MM format
    if (/^\d{4}-\d{2}$/.test(dateString)) {
      const [year, month] = dateString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch (error) {
    return dateString;
  }
}

/**
 * Formats decimal currency values (e.g., 15) to USD currency formats (e.g., '$15.00').
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Truncates a string to a specific length and appends ellipses if it exceeds the limit.
 */
export function truncate(str: string, length: number): string {
  if (!str) return '';
  return str.length > length ? `${str.substring(0, length)}...` : str;
}
