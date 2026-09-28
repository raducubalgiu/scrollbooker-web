// Culorile brandului, preluate direct din theme/theme.ts (darkTheme) — landing
// page-ul rămâne intenționat mereu dark (aceeași logică ca BottomBar.isDarkPage
// pentru "/"), deci referențiem valorile fixe în loc de useTheme()/ThemeContext,
// care urmează preferința de light/dark mode a userului.
export const LANDING_COLORS = {
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
} as const;
