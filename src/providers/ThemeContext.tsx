import React, {
	createContext,
	useMemo,
	useState,
	useContext,
	ReactNode,
} from "react";
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "../../theme/theme";

interface ThemeContextProps {
	toggleTheme: () => void;
	mode: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useCustomTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useCustomTheme must be used within a CustomProvider");
	}
	return context;
};

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
	const [mode, setMode] = useState<"light" | "dark">("dark");

	const theme = useMemo(
		() => (mode === "dark" ? darkTheme : lightTheme),
		[mode]
	);

	const toggleTheme = () => {
		setMode(prev => (prev == "dark" ? "light" : "dark"));
	};

	return (
		<ThemeContext.Provider value={{ toggleTheme, mode }}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	);
};
