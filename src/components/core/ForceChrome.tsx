"use client";

import { useEffect } from "react";
import { useThemeMode } from "@/providers/ThemeContext";
import { darkTheme, lightTheme } from "../../../theme/theme";

type ForceChromeProps = {
  scheme: "dark" | "light";
};

export default function ForceChrome({ scheme }: ForceChromeProps) {
  const { pushChromeOverride } = useThemeMode();

  useEffect(() => {
    const color = (scheme === "dark" ? darkTheme : lightTheme).palette
      .background.default;
    const { style: htmlStyle } = document.documentElement;
    const { style: bodyStyle } = document.body;

    const previousHtmlBg = htmlStyle.backgroundColor;
    const previousBodyBg = bodyStyle.backgroundColor;

    htmlStyle.backgroundColor = color;
    bodyStyle.backgroundColor = color;

    const popOverride = pushChromeOverride({
      themeColor: color,
      colorScheme: scheme,
    });

    return () => {
      htmlStyle.backgroundColor = previousHtmlBg;
      bodyStyle.backgroundColor = previousBodyBg;
      popOverride();
    };
  }, [scheme, pushChromeOverride]);

  return null;
}
