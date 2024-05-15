import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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
