"use client";

import { useEffect } from "react";
import { useThemeMode } from "@/providers/ThemeContext";

export default function ForceDarkChrome() {
  const { pushChromeOverride } = useThemeMode();

  useEffect(() => {
    const { style: htmlStyle } = document.documentElement;
    const { style: bodyStyle } = document.body;

    const previousHtmlBg = htmlStyle.backgroundColor;
    const previousBodyBg = bodyStyle.backgroundColor;

    htmlStyle.backgroundColor = "#000000";
    bodyStyle.backgroundColor = "#000000";

    const popOverride = pushChromeOverride({
      themeColor: "#000000",
      colorScheme: "dark",
    });

    return () => {
      htmlStyle.backgroundColor = previousHtmlBg;
      bodyStyle.backgroundColor = previousBodyBg;
      popOverride();
    };
  }, [pushChromeOverride]);

  return null;
}
