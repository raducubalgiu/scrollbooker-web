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

function getSystemPrefersDarkMode(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(COLOR_SCHEME_QUERY).matches;
}

function getInitialMode(): ThemeModeEnum {
  if (typeof window === "undefined") return ThemeModeEnum.SYSTEM;
  const saved = window.localStorage.getItem(
    STORAGE_KEY
  ) as ThemeModeEnum | null;

  if (
    saved === ThemeModeEnum.SYSTEM ||
    saved === ThemeModeEnum.LIGHT ||
    saved === ThemeModeEnum.DARK
  )
    return saved;

  return ThemeModeEnum.SYSTEM;
}

const ThemeModeContext = React.createContext<Ctx | undefined>(undefined);

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<ThemeModeEnum>(getInitialMode);
  const [systemPrefersDarkMode, setSystemPrefersDarkMode] =
    React.useState<boolean>(getSystemPrefersDarkMode);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemPrefersDarkMode(event.matches);
    };

    setSystemPrefersDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const resolvedMode = React.useMemo(
    () =>
      mode === ThemeModeEnum.SYSTEM
        ? systemPrefersDarkMode
          ? ThemeModeEnum.DARK
          : ThemeModeEnum.LIGHT
        : mode,
    [mode, systemPrefersDarkMode]
  );

  React.useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {}
    const html = document.documentElement;
    html.setAttribute("data-theme", resolvedMode);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const color =
        resolvedMode === ThemeModeEnum.DARK
          ? darkTheme.palette.primary.main
          : lightTheme.palette.primary.main;
      meta.setAttribute("content", color);
    }
  }, [mode, resolvedMode]);

  const value = React.useMemo<Ctx>(
    () => ({
      mode,
      isSystemInDarkMode: resolvedMode == ThemeModeEnum.DARK,
      setMode,
      toggle: () =>
        setMode((m) => {
          if (m === ThemeModeEnum.SYSTEM) {
            return systemPrefersDarkMode
              ? ThemeModeEnum.LIGHT
              : ThemeModeEnum.DARK;
          }

          return m === ThemeModeEnum.LIGHT
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
        <CssBaseline enableColorScheme={true} />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode(): Ctx {
  const ctx = React.useContext(ThemeModeContext);
  if (!ctx)
    throw new Error("useThemeMode must be used within <ThemeModeProvider>");
  return ctx;
}
