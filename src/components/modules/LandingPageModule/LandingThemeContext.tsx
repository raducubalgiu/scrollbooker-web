"use client";

import { createContext, useContext, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useThemeMode } from "@/providers/ThemeContext";
import { ThemeModeEnum } from "@/providers/ThemeModeEnum";
import ForceChrome from "@/components/core/ForceChrome";
import { darkTheme, lightTheme } from "../../../../theme/theme";
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

const ForcedLandingModeContext = createContext<LandingMode | null>(null);

type LandingForcedThemeProps = {
  mode: LandingMode;
  children: React.ReactNode;
};

export function LandingForcedTheme({ mode, children }: LandingForcedThemeProps) {
  return (
    <ForcedLandingModeContext.Provider value={mode}>
      <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
        <ForceChrome scheme={mode} />
        {children}
      </ThemeProvider>
    </ForcedLandingModeContext.Provider>
  );
}

// /for-business e forțat pe light prin LandingForcedTheme; fără el (ex. landing),
// paleta urmează tema aplicației.
export function useLandingTheme(): LandingThemeValue {
  const { mode, isSystemInDarkMode } = useThemeMode();
  const forcedMode = useContext(ForcedLandingModeContext);

  const resolvedMode: LandingMode = forcedMode
    ? forcedMode
    : mode === ThemeModeEnum.SYSTEM
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
