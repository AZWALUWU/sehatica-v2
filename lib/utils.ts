import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  }
  return new Date(date).toLocaleDateString("id-ID", options)
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

export function truncateText(text: string, length: number) {
  if (text.length <= length) {
    return text
  }
  return text.slice(0, length) + "..."
}

export function getImageUrl(url: string | null) {
  if (!url) {
    return "/placeholder.svg?height=400&width=600"
  }
  return url
}

