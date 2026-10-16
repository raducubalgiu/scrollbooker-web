import { Theme } from "@mui/material";

export const getDomainColor = (
  theme: Theme,
  businessShortDomain: string | undefined
): string => {
  const key = businessShortDomain?.toLowerCase();

  if (key === "beauty") return theme.palette.beauty.main;
  if (key === "auto") return theme.palette.auto.main;
  if (key === "medical") return theme.palette.medical.main;

  return theme.palette.text.secondary;
};
