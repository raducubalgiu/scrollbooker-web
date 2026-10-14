"use client";

import { useEffect } from "react";
import { useThemeMode } from "@/providers/ThemeContext";

// Pentru ecranele cu video full-bleed (Explore, detaliu video) — browser-ul
// trebuie să deseneze și status bar-ul/bara de jos în negru, nu doar
// conținutul paginii. `theme-color`/CssBaseline singure nu sunt suficiente
// pe iOS Safari — vezi același motiv documentat inițial pe landing page,
// înainte ca acela să fie reconectat la tema reală a aplicației. Setăm
// direct, imperativ, cât timp ecranul e montat, și revenim la curățare.
//
// theme-color/color-scheme trec prin pushChromeOverride (ThemeContext), nu
// direct pe DOM — altfel efectul propriu al ThemeModeProvider (care rescrie
// aceleași atribute la orice recalculare a resolvedMode, ex. corecția
// ghicirii de temă System după hidratare) le-ar suprascrie oricând, lăsând
// bara browser-ului pe culoarea temei în loc de negru.
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
