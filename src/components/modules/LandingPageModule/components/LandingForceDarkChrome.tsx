"use client";

import { useEffect } from "react";
import { LANDING_COLORS } from "../landing.constants";

// `theme-color` (viewport export în page.tsx) singur nu e suficient pe iOS
// Safari — <body> e colorat de CssBaseline pe baza temei active (light pe
// telefonul userului), și Safari pare să țină cont de fundalul real al
// paginii pentru status bar / bara de jos, nu doar de meta tag. Body-ul e
// randat o singură dată în layout-ul rădăcină (comun tuturor rutelor), deci
// nu poate fi colorat condiționat doar din CSS per-rută — setăm direct,
// imperativ, cât timp landing page-ul e montat, și revenim la curățare.
export default function LandingForceDarkChrome() {
  useEffect(() => {
    const { style: htmlStyle } = document.documentElement;
    const { style: bodyStyle } = document.body;

    const previousHtmlBg = htmlStyle.backgroundColor;
    const previousBodyBg = bodyStyle.backgroundColor;
    const previousColorScheme = htmlStyle.colorScheme;

    htmlStyle.backgroundColor = LANDING_COLORS.background;
    bodyStyle.backgroundColor = LANDING_COLORS.background;
    htmlStyle.colorScheme = "dark";

    return () => {
      htmlStyle.backgroundColor = previousHtmlBg;
      bodyStyle.backgroundColor = previousBodyBg;
      htmlStyle.colorScheme = previousColorScheme;
    };
  }, []);

  return null;
}
