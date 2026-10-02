"use client";

import { useEffect } from "react";

// Pentru ecranele cu video full-bleed (Explore, detaliu video) — browser-ul
// trebuie să deseneze și status bar-ul/bara de jos în negru, nu doar
// conținutul paginii. `theme-color`/CssBaseline singure nu sunt suficiente
// pe iOS Safari — vezi același motiv documentat inițial pe landing page,
// înainte ca acela să fie reconectat la tema reală a aplicației. Setăm
// direct, imperativ, cât timp ecranul e montat, și revenim la curățare.
export default function ForceDarkChrome() {
  useEffect(() => {
    const { style: htmlStyle } = document.documentElement;
    const { style: bodyStyle } = document.body;

    const previousHtmlBg = htmlStyle.backgroundColor;
    const previousBodyBg = bodyStyle.backgroundColor;
    const previousColorScheme = htmlStyle.colorScheme;

    htmlStyle.backgroundColor = "#000000";
    bodyStyle.backgroundColor = "#000000";
    htmlStyle.colorScheme = "dark";

    const meta = document.querySelector('meta[name="theme-color"]');
    const previousThemeColor = meta?.getAttribute("content") ?? null;
    meta?.setAttribute("content", "#000000");

    return () => {
      htmlStyle.backgroundColor = previousHtmlBg;
      bodyStyle.backgroundColor = previousBodyBg;
      htmlStyle.colorScheme = previousColorScheme;
      if (meta && previousThemeColor !== null) {
        meta.setAttribute("content", previousThemeColor);
      }
    };
  }, []);

  return null;
}
