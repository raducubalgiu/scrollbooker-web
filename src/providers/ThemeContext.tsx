import React, {
	createContext,
	useMemo,
	useState,
	useContext,
	ReactNode,
	useEffect,
} from "react";
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "../../theme/theme";

type ThemeMode = 'light' | 'dark'

interface ThemeContextProps {
	mode: ThemeMode;
	toggleTheme: () => void;
	setTheme: (m: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
const STORAGE_KEY = 'sb_theme_mode'

export const useCustomTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useCustomTheme must be used within a CustomProvider");
	}
	return context;
};

function resolveInitialMode(): ThemeMode {
	if(typeof window === 'undefined') return 'light'
	const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
	if(stored === 'light' || stored === 'dark') return stored

	const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
	return prefersDark ? 'dark' : 'light'

}

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
	const [mode, setMode] = useState<ThemeMode>("light");

	// setează din storage / preferința OS la mount
	useEffect(() => {
		setMode(resolveInitialMode());
	}, []);

	// scrie în localStorage când se schimbă
	useEffect(() => {
		try {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(STORAGE_KEY, mode);
		}
		} catch {
			/* ignore write errors (private mode, etc.) */
		}
	}, [mode]);

	useEffect(() => {
		const onStorage = (e: StorageEvent) => {
			if (e.key === STORAGE_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
		setMode(e.newValue);
		}
	};
		window.addEventListener('storage', onStorage);
		return () => window.removeEventListener('storage', onStorage);
	}, []);

	useEffect(() => {
		const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
		if (!mq) return;
		const handler = (evt: MediaQueryListEvent) => {

		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (!stored) setMode(evt.matches ? 'dark' : 'light');
	};
		mq.addEventListener?.('change', handler);
		return () => mq.removeEventListener?.('change', handler);
	}, []);

	const toggleTheme = () => setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
	const setTheme = (m: ThemeMode) => setMode(m);

	const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

	return (
		<ThemeContext.Provider value={{ toggleTheme, mode, setTheme }}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	);
};
