export const formatPrice = (
  value: number | string | null | undefined
): string => {
  if (value == null) return "";

  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) return "";

  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
};
