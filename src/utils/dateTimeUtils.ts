/**
 * Centralized Date & Time utilities for standardized formatting
 * Standard format: "YYYY-MM-DD HH:mm:ss" (e.g. "2026-09-09 09:09:00")
 */

export const padTwo = (n: number): string => String(n).padStart(2, '0');

/**
 * Formats a Date object or date + time strings to standard "YYYY-MM-DD HH:mm:ss" format.
 */
export const formatToStandardDateTime = (
  dateInput?: Date | string | null,
  timeInput?: string | null
): string => {
  if (!dateInput) return '';

  if (dateInput instanceof Date) {
    if (isNaN(dateInput.getTime())) return '';
    const yyyy = dateInput.getFullYear();
    const mm = padTwo(dateInput.getMonth() + 1);
    const dd = padTwo(dateInput.getDate());
    const hh = padTwo(dateInput.getHours());
    const min = padTwo(dateInput.getMinutes());
    const ss = padTwo(dateInput.getSeconds());
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  }

  const cleanDate = String(dateInput).trim().split('T')[0].split(' ')[0];
  if (!cleanDate) return '';

  if (!timeInput || !timeInput.trim()) {
    // Check if dateInput itself already contains time
    const str = String(dateInput).trim();
    if (str.includes(' ') || str.includes('T')) {
      const parts = str.replace('T', ' ').split(' ');
      if (parts[1]) {
        return formatToStandardDateTime(parts[0], parts[1]);
      }
    }
    return `${cleanDate} 00:00:00`;
  }

  const rawTime = timeInput.trim().toUpperCase();

  // Handle 12-hour AM/PM format (e.g., "10:00 PM", "09:30 AM")
  if (rawTime.includes('AM') || rawTime.includes('PM')) {
    const isPM = rawTime.includes('PM');
    const timeOnly = rawTime.replace(/[AP]M/, '').trim();
    const parts = timeOnly.split(':');
    let hours = parseInt(parts[0] || '0', 10);
    const minutes = parseInt(parts[1] || '0', 10);
    const seconds = parseInt(parts[2] || '0', 10);

    if (isPM && hours < 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;

    const hh = padTwo(hours);
    const mm = padTwo(minutes);
    const ss = padTwo(seconds);
    return `${cleanDate} ${hh}:${mm}:${ss}`;
  }

  // Handle 24-hour format (e.g., "22:00", "22:00:00")
  const parts = rawTime.split(':');
  const hours = padTwo(parseInt(parts[0] || '0', 10));
  const minutes = padTwo(parseInt(parts[1] || '0', 10));
  const seconds = padTwo(parseInt(parts[2] || '0', 10));
  return `${cleanDate} ${hours}:${minutes}:${seconds}`;
};

/**
 * Parses any incoming date-time string ("YYYY-MM-DD HH:mm:ss", ISO string, etc.)
 * into standardized components for form fields and pickers.
 */
export const parseStandardDateTime = (
  dateTimeStr?: string | null
): {
  dateStr: string;
  time12h: string;
  time24h: string;
  dateObj: Date | null;
} => {
  if (!dateTimeStr || !String(dateTimeStr).trim()) {
    return { dateStr: '', time12h: '', time24h: '', dateObj: null };
  }

  try {
    const raw = String(dateTimeStr).trim();
    const cleanStr = raw.replace(/Z/g, '').split('+')[0].replace(' ', 'T');
    const d = new Date(cleanStr);

    if (!isNaN(d.getTime())) {
      const yyyy = d.getFullYear();
      const mm = padTwo(d.getMonth() + 1);
      const dd = padTwo(d.getDate());
      const dateStr = `${yyyy}-${mm}-${dd}`;

      const rawH = d.getHours();
      const min = padTwo(d.getMinutes());
      const sec = padTwo(d.getSeconds());

      const period = rawH >= 12 ? 'PM' : 'AM';
      const h12 = rawH % 12 || 12;
      const time12h = `${padTwo(h12)}:${min} ${period}`;
      const time24h = `${padTwo(rawH)}:${min}:${sec}`;

      return { dateStr, time12h, time24h, dateObj: d };
    }
  } catch {
    // Ignore fallback
  }

  // Fallback for simple "YYYY-MM-DD" or similar strings
  const parts = String(dateTimeStr).trim().split(/[T ]/);
  return {
    dateStr: parts[0] || '',
    time12h: parts[1] ? `${parts[1]} AM` : '',
    time24h: parts[1] || '00:00:00',
    dateObj: null,
  };
};

/**
 * Formats a date-time string or Date for friendly display.
 */
export const formatDisplayDateTime = (
  dateTimeInput?: Date | string | null
): string => {
  if (!dateTimeInput) return '---';
  const { dateObj } = typeof dateTimeInput === 'string'
    ? parseStandardDateTime(dateTimeInput)
    : { dateObj: dateTimeInput };

  if (!dateObj || isNaN(dateObj.getTime())) return '---';

  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) + ' • ' + dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
