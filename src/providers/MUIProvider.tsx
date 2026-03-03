"use client";

import React from "react";
import NextAppDirEmotionCacheProvider from "../../theme/EmotionCache";
import { ThemeModeProvider } from "./ThemeContext";

export default function MUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeModeProvider>{children}</ThemeModeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
