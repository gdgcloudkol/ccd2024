import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Pronouns } from "./constants/generic";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const debounce = (callback: any, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
export function convertTimeFormat(timeString: string) {
  let currentTime = new Date(timeString);
  let convertedtimeString = currentTime.toLocaleTimeString('en-IN', { timeStyle: "short", hour12: true });
  return convertedtimeString;
}

export function maskEmail(email: string): string {
  // Split the email into username and domain parts
  const [username, domain] = email.split('@');

  // Check if the email format is valid
  if (!username || !domain) {
    throw new Error('Invalid email format');
  }

  // If the username is less than 3 characters, return it unchanged
  if (username.length < 3) {
    return email;
  }

  // Create the masked username
  const maskedUsername = username[0] + '*'.repeat(username.length - 2) + username[username.length - 1];

  // Combine the masked username with the domain
  return `${maskedUsername}@${domain}`;
}

export function getPronoun(dbPronoun: string, fallback?: string | undefined) {
  if (Pronouns.hasOwnProperty(dbPronoun)) {
    return dbPronoun;
  } else {
    return fallback;
  }
}
export function getPronounLabel(dbPronoun: string, fallback?: string | undefined) {
  if (Pronouns.hasOwnProperty(dbPronoun)) {
    return Pronouns[dbPronoun as keyof typeof Pronouns];
  } else {
    return fallback;
  }
}