"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ThemeModeEnum } from "./ThemeModeEnum";
import { setSystemThemeGuess, setThemeMode } from "./themeCookie";
import { darkTheme, lightTheme } from "../../theme/theme";

type Ctx = {
  mode: ThemeModeEnum;
  isSystemInDarkMode: boolean;
  setMode: (m: ThemeModeEnum) => void;
  toggle: () => void;
};

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

const ThemeModeContext = React.createContext<Ctx | undefined>(undefined);

type ThemeModeProviderProps = {
  children: React.ReactNode;
  initialMode: ThemeModeEnum;
  initialResolvedMode: ThemeModeEnum;
};

export function ThemeModeProvider({
  children,
  initialMode,
  initialResolvedMode,
}: ThemeModeProviderProps) {
  const [mode, setModeState] = React.useState<ThemeModeEnum>(initialMode);
  const [systemPrefersDarkMode, setSystemPrefersDarkMode] = React.useState<boolean>(
    initialResolvedMode === ThemeModeEnum.DARK
  );
  const [, startTransition] = React.useTransition();

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);

    const syncSystemPreference = (matches: boolean) => {
      setSystemPrefersDarkMode(matches);
      startTransition(() => {
        setSystemThemeGuess(matches ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT);
      });
    };

    syncSystemPreference(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      syncSystemPreference(event.matches);
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
  }, [resolvedMode]);

  const setMode = React.useCallback((nextMode: ThemeModeEnum) => {
    setModeState(nextMode);
    startTransition(() => {
      setThemeMode(nextMode);
    });
  }, []);

  const value = React.useMemo<Ctx>(
    () => ({
      mode,
      isSystemInDarkMode: resolvedMode === ThemeModeEnum.DARK,
      setMode,
      toggle: () =>
        setMode(
          resolvedMode === ThemeModeEnum.DARK
            ? ThemeModeEnum.LIGHT
            : ThemeModeEnum.DARK
        ),
    }),
    [mode, resolvedMode, setMode]
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
