export type RowHeightLevel = "small" | "medium" | "large";

export const ROW_HEIGHT_LEVELS: Record<RowHeightLevel, number> = {
  small: 80,
  medium: 140,
  large: 200,
};

export const ROW_HEIGHT_LEVEL_LABELS: Record<RowHeightLevel, string> = {
  small: "Compact",
  medium: "Mediu",
  large: "Spațios",
};

export const ROW_HEIGHT_LEVEL_ORDER: RowHeightLevel[] = [
  "small",
  "medium",
  "large",
];
