import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format duration in minutes and seconds
export function formatDuration(seconds: number, short = false) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes === 0) {
    return `${remainingSeconds} ${short ? "sec" : "second"}${remainingSeconds !== 1 ? "s" : ""}`
  }

  if (short) {
    return `${minutes} min${minutes !== 1 ? "s" : ""} ${remainingSeconds} sec${remainingSeconds !== 1 ? "s" : ""}`
  }

  return `${minutes} minute${minutes !== 1 ? "s" : ""} ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

