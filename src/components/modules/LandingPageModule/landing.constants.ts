// Landing/for-business rulează mereu într-un singur mod fix (nu urmează
// preferința light/dark a userului) — referențiem valori fixe aici în loc
// de useTheme()/ThemeContext. LANDING_MODE e sursa de adevăr pentru orice
// cod care are nevoie să sincronizeze alte sisteme cu paleta asta (ex.
// color-scheme-ul nativ al browserului, theme-color-ul din viewport).
export const LANDING_MODE: "light" | "dark" = "light";

// Varianta dark, păstrată pentru revenire rapidă dacă e nevoie:
// export const LANDING_COLORS = {
//   background: "#000000",
//   surface: "#0A0A0A",
//   surfaceAlt: "#141414",
//   border: "rgba(255,255,255,0.10)",
//   textPrimary: "#FFFFFF",
//   textSecondary: "rgba(255,255,255,0.65)",
//   primary: "#FF6F00",
//   primaryDark: "#E06400",
//   primaryLight: "#FF8F00",
//   beauty: "#9B4A55",
//   medical: "#5EDAD5",
//   auto: "#6FA8FF",
//   error: "#F44336",
// } as const;
export const LANDING_COLORS = {
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
} as const;
