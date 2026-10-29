"use client";

import { ThemeProvider } from "@mui/material/styles";
import ForceChrome from "@/components/core/ForceChrome";
import { darkTheme, lightTheme } from "../../../../theme/theme";

type LandingForcedThemeProps = {
  mode: "light" | "dark";
  children: React.ReactNode;
};

export function LandingForcedTheme({ mode, children }: LandingForcedThemeProps) {
  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <ForceChrome scheme={mode} />
      {children}
    </ThemeProvider>
  );
}
