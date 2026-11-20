export const formatNumber = (value) => new Intl.NumberFormat("fa-IR").format(Number(value || 0));
export function formatPrice(value) {
  const number = Number(value ?? 0);
  return number === 0 ? "رایگان" : `${formatNumber(number)} تومان`;
}
export function formatRating(value) {
  return value == null || value === "" ? null : new Intl.NumberFormat("fa-IR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(Number(value));
}
export function formatDuration(value) {
  if (!value) return "—";
  return value.replace(/(\d+)h/g, (_, n) => `${formatNumber(n)} ساعت`).replace(/(\d+)m/g, (_, n) => Number(n) ? `${formatNumber(n)} دقیقه` : "").trim();
}
export function thumbnailGradient(title) {
  const gradients = ["from-navy-600 to-brand-600", "from-brand-600 to-navy-500", "from-navy-700 to-brand-500"];
  return gradients[(title || "").split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % gradients.length];
}
