/** Format a course price, showing "Free" for zero. */
export function formatPrice(value) {
  const num = Number(value ?? 0);
  if (num === 0) return "Free";
  return `$${num.toFixed(2)}`;
}

/** Format a rating to one decimal place, or null when missing. */
export function formatRating(value) {
  if (value === null || value === undefined || value === "") return null;
  return Number(value).toFixed(1);
}

/** Return a readable duration, or a placeholder when missing. */
export function formatDuration(value) {
  return value ? value : "—";
}

/** Build a fallback gradient for a course thumbnail based on its title. */
export function thumbnailGradient(title) {
  const gradients = [
    "from-navy-600 to-brand-600",
    "from-brand-600 to-navy-500",
    "from-navy-700 to-brand-500",
    "from-brand-700 to-navy-500",
    "from-navy-500 to-brand-700",
    "from-brand-500 to-navy-700",
  ];
  const index =
    (title
      ? title.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
      : 0) % gradients.length;
  return gradients[index];
}
