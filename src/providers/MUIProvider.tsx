"use client";

import React from "react";
import { ThemeModeProvider } from "./ThemeContext";
import { ThemeModeEnum } from "./ThemeModeEnum";

type MUIProviderProps = {
	children: React.ReactNode;
	initialMode: ThemeModeEnum;
	initialResolvedMode: ThemeModeEnum;
};

export default function MUIProvider({
	children,
	initialMode,
	initialResolvedMode,
}: MUIProviderProps) {
	return (
		<ThemeModeProvider
			initialMode={initialMode}
			initialResolvedMode={initialResolvedMode}
		>
			{children}
		</ThemeModeProvider>
	);
}
