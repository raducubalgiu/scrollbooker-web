"use client";

import { useMemo } from "react";
import { useThemeMode } from "@/providers/ThemeContext";
import { ThemeModeEnum } from "@/providers/ThemeModeEnum";
import {
  LANDING_COLORS_DARK,
  LANDING_COLORS_LIGHT,
  type LandingColors,
  type LandingMode,
} from "./landing.constants";

type LandingThemeValue = {
  mode: LandingMode;
  colors: LandingColors;
};

// Landing/for-business/partners nu mai au propriul sistem de temă — folosesc
// exact ThemeModeProvider-ul deja montat la root layout (cookie-based,
// urmărește system preference via matchMedia când mode === SYSTEM), ca tot
// restul aplicației. Hook-ul de aici doar traduce rezultatul în paleta
// LANDING_COLORS_LIGHT/DARK folosită de secțiunile acestor pagini.
export function useLandingTheme(): LandingThemeValue {
  const { mode, isSystemInDarkMode } = useThemeMode();

  const resolvedMode: LandingMode =
    mode === ThemeModeEnum.SYSTEM
      ? isSystemInDarkMode
        ? "dark"
        : "light"
      : (mode as LandingMode);

  const colors = useMemo(
    () => (resolvedMode === "dark" ? LANDING_COLORS_DARK : LANDING_COLORS_LIGHT),
    [resolvedMode]
  );

  return { mode: resolvedMode, colors };
}

export function useLandingColors(): LandingColors {
  return useLandingTheme().colors;
}
