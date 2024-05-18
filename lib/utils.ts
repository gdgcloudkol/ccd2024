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

export function extractGithubUsername(url: string): string | null {
  // Define the regex pattern to match the GitHub profile URL and capture the username
  const githubUrlPattern = /^https:\/\/github\.com\/([a-zA-Z0-9-]+)\/?$/;

  // Execute the regex pattern on the input URL
  const match = url.match(githubUrlPattern);

  // If there is a match, return the captured group (username), otherwise return null
  return match ? match[1] : null;
}

export function maskPhoneNumber(phoneNumber: string | number): string {
  // Convert the input to a string if it's not already
  const phoneStr = phoneNumber.toString();

  // Create the masked phone number
  const masked = phoneStr.slice(0, 2) + '******' + phoneStr.slice(-2);

  return masked;
}

export function isLessThan24HoursLeft(eventDateString: string) {
  const eventDate = new Date(eventDateString);

  // Get the current date and time
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = eventDate.getTime() - currentDate.getTime();

  // Convert the difference from milliseconds to hours
  const diffInHours = diffInMs / (1000 * 60 * 60);

  // Check if the difference is less than 24 hours
  return diffInHours <= 24;
}
