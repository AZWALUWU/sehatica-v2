// Format date to a readable string
export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Check if a user is an admin
export function isAdmin(user: any) {
  return user?.user_metadata?.is_admin === true
}

// Generate a slug from a string
export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
}

