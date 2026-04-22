export function formatRating(
  value: number | string | null | undefined
): string {
  const numericValue =
    value == null ? NaN : typeof value === "string" ? Number(value) : value;

  if (Number.isNaN(numericValue)) {
    return "0,0";
  }

  const rounded = Math.round((numericValue + Number.EPSILON) * 10) / 10;

  return rounded.toLocaleString("ro-RO", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}
