"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ThemeModeEnum } from "./ThemeModeEnum";
import { darkTheme, lightTheme } from "../../theme/theme";

type Ctx = {
  mode: ThemeModeEnum;
  isSystemInDarkMode: boolean;
  setMode: (m: ThemeModeEnum) => void;
  toggle: () => void;
};

const STORAGE_KEY = "sb-ui-color-mode";
const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

const ThemeModeContext = React.createContext<Ctx | undefined>(undefined);

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<ThemeModeEnum>(ThemeModeEnum.SYSTEM);
  const [systemPrefersDarkMode, setSystemPrefersDarkMode] =
    React.useState<boolean>(false);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    const saved = window.localStorage.getItem(
      STORAGE_KEY
    ) as ThemeModeEnum | null;

    const nextMode =
      saved === ThemeModeEnum.SYSTEM ||
      saved === ThemeModeEnum.LIGHT ||
      saved === ThemeModeEnum.DARK
        ? saved
        : ThemeModeEnum.SYSTEM;

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);

    const syncSystemMode = (matches: boolean) => {
      setSystemPrefersDarkMode(matches);
    };

    setMode(nextMode);
    syncSystemMode(mediaQuery.matches);
    setIsHydrated(true);

    const handleChange = (event: MediaQueryListEvent) => {
      syncSystemMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const resolvedMode = React.useMemo(() => {
    if (mode === ThemeModeEnum.SYSTEM) {
      return systemPrefersDarkMode ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT;
    }

    return mode;
  }, [mode, systemPrefersDarkMode]);

  React.useLayoutEffect(() => {
    if (!isHydrated) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {}

    const html = document.documentElement;
    html.setAttribute("data-theme", resolvedMode);
    html.style.colorScheme = resolvedMode;

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const color =
        resolvedMode === ThemeModeEnum.DARK
          ? darkTheme.palette.primary.main
          : lightTheme.palette.primary.main;
      meta.setAttribute("content", color);
    }
  }, [isHydrated, mode, resolvedMode]);

  const value = React.useMemo<Ctx>(
    () => ({
      mode,
      isSystemInDarkMode: resolvedMode === ThemeModeEnum.DARK,
      setMode,
      toggle: () =>
        setMode((currentMode) => {
          if (currentMode === ThemeModeEnum.SYSTEM) {
            return systemPrefersDarkMode
              ? ThemeModeEnum.LIGHT
              : ThemeModeEnum.DARK;
          }

          return currentMode === ThemeModeEnum.LIGHT
            ? ThemeModeEnum.DARK
            : ThemeModeEnum.LIGHT;
        }),
    }),
    [mode, resolvedMode, systemPrefersDarkMode]
  );

  const theme = React.useMemo(
    () => (resolvedMode === ThemeModeEnum.DARK ? darkTheme : lightTheme),
    [resolvedMode]
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode(): Ctx {
  const ctx = React.useContext(ThemeModeContext);

  if (!ctx) {
    throw new Error("useThemeMode must be used within <ThemeModeProvider>");
  }

  return ctx;
}
