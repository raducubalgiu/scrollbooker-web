"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ThemeModeEnum } from "./ThemeModeEnum";
import { setSystemThemeGuess, setThemeMode } from "./themeCookie";
import { darkTheme, lightTheme } from "../../theme/theme";

type ChromeOverride = {
  themeColor: string;
  colorScheme?: "dark" | "light";
};

type Ctx = {
  mode: ThemeModeEnum;
  isSystemInDarkMode: boolean;
  setMode: (m: ThemeModeEnum) => void;
  toggle: () => void;
  pushChromeOverride: (override: ChromeOverride) => () => void;
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

  // Ecrane precum feed-ul video (vezi ForceDarkChrome) trebuie să forțeze
  // bara browser-ului (status bar Android, chrome-ul iOS) la o culoare
  // fixă, indiferent de tema curentă — nu doar "la montare": dacă
  // resolvedMode se recalculează cât timp un asemenea ecran e activ (ex.
  // corecția ghicirii de temă System după hidratare), efectul de mai jos
  // rulează din nou și, fără acest stack, ar rescrie peste override cu
  // culoarea temei. Stack-ul (nu un singur slot) susține corect cazul în
  // care două asemenea ecrane se suprapun la tranziție.
  const overrideIdRef = React.useRef(0);
  const [chromeOverrides, setChromeOverrides] = React.useState<
    { id: number; override: ChromeOverride }[]
  >([]);

  const pushChromeOverride = React.useCallback(
    (override: ChromeOverride) => {
      const id = ++overrideIdRef.current;
      setChromeOverrides((prev) => [...prev, { id, override }]);
      return () => {
        setChromeOverrides((prev) => prev.filter((o) => o.id !== id));
      };
    },
    []
  );

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

    const activeOverride = chromeOverrides[chromeOverrides.length - 1]?.override;

    html.style.colorScheme = activeOverride?.colorScheme ?? resolvedMode;

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const color =
        activeOverride?.themeColor ??
        (resolvedMode === ThemeModeEnum.DARK
          ? darkTheme.palette.background.default
          : lightTheme.palette.background.default);
      meta.setAttribute("content", color);
    }
  }, [resolvedMode, chromeOverrides]);

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
      pushChromeOverride,
    }),
    [mode, resolvedMode, setMode, pushChromeOverride]
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
