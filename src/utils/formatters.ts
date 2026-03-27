export function formatRating(value: number): string {
  const rounded = Math.round((value + Number.EPSILON) * 10) / 10;
  return rounded.toLocaleString("ro-RO", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}
