"use client";

import React from "react";
import { ThemeModeProvider } from "./ThemeContext";

export default function MUIProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ThemeModeProvider>{children}</ThemeModeProvider>;
}
