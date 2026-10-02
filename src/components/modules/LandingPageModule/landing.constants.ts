// Paleta pentru landing/for-business/partners. Aceste pagini nu urmează
// preferința light/dark a userului din restul aplicației — au propriul
// toggle local (vezi LandingThemeContext.tsx), implicit pe "light".
export type LandingMode = "light" | "dark";

export type LandingColors = {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  beauty: string;
  medical: string;
  auto: string;
  error: string;
};

export const LANDING_COLORS_LIGHT: LandingColors = {
  background: "#FFFFFF",
  surface: "#F6F6F7",
  surfaceAlt: "#EDEDEF",
  border: "rgba(0,0,0,0.10)",
  textPrimary: "#111111",
  textSecondary: "rgba(0,0,0,0.60)",
  primary: "#FF6F00",
  primaryDark: "#E06400",
  primaryLight: "#FF8F00",
  beauty: "#9B4A55",
  medical: "#5EDAD5",
  auto: "#6FA8FF",
  error: "#F44336",
};

export const LANDING_COLORS_DARK: LandingColors = {
  background: "#000000",
  surface: "#0A0A0A",
  surfaceAlt: "#141414",
  border: "rgba(255,255,255,0.10)",
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.65)",
  primary: "#FF6F00",
  primaryDark: "#E06400",
  primaryLight: "#FF8F00",
  beauty: "#9B4A55",
  medical: "#5EDAD5",
  auto: "#6FA8FF",
  error: "#F44336",
};

// Fallback static, pentru pagini care doar împrumută paleta de brand, fără
// a avea nevoie de toggle (ex. register-business, care citește doar
// primary/primaryDark — identice în ambele variante).
export const LANDING_COLORS: LandingColors = LANDING_COLORS_LIGHT;
