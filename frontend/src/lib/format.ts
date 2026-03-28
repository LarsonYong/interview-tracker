export function formatCurrency(value?: number | null) {
  if (!value) return "No salary listed";
  return `$${value.toLocaleString()}`;
}

export function formatDate(value?: string | null) {
  if (!value) return "No interview date";
  return new Date(value).toLocaleDateString();
}