"use client";

import React from "react";
import { CssBaseline } from "@mui/material";
import NextAppDirEmotionCacheProvider from "../../theme/EmotionCache";
import { CustomThemeProvider } from "./ThemeContext";

export default function MUIProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
			<CustomThemeProvider>
				<CssBaseline enableColorScheme={true} />
				{children}
			</CustomThemeProvider>
		</NextAppDirEmotionCacheProvider>
	);
}
