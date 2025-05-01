import { createTheme } from "@mui/material/styles";

// !!!IMPORTANT: Modules need to be declared in TS to create custom theming variables
declare module "@mui/material/styles" {
	interface PaletteColor {
		100?: string;
		200?: string;
		300?: string;
		400?: string;
		500?: string;
		600?: string;
		700?: string;
		800?: string;
		900?: string;
	}

	interface SimplePaletteColorOptions {
		100?: string;
		200?: string;
		300?: string;
		400?: string;
		500?: string;
		600?: string;
		700?: string;
		800?: string;
		900?: string;
	}

	interface Palette {
		neutral: Palette["primary"];
		surface: Palette["primary"];
		border: Palette["primary"];
	}

	interface PaletteOptions {
		neutral?: PaletteOptions["primary"];
		surface?: PaletteOptions["primary"];
		border: PaletteOptions["primary"];
	}

	interface TypographyVariants {
		xxl: React.CSSProperties;
		xl: React.CSSProperties;
		lg: React.CSSProperties;
		md: React.CSSProperties;
		base: React.CSSProperties;
		sm: React.CSSProperties;
		xs: React.CSSProperties;
	}

	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		xxl?: React.CSSProperties;
		xl?: React.CSSProperties;
		lg?: React.CSSProperties;
		md?: React.CSSProperties;
		base?: React.CSSProperties;
		sm?: React.CSSProperties;
		xs?: React.CSSProperties;
	}
}

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		xxl: true;
		xl: true;
		lg: true;
		md: true;
		base: true;
		sm: true;
		xs: true;
	}
}

declare module "@mui/material/Button" {
	interface ButtonPropsVariantOverrides {
		secondary: true;
	}
}

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#FF6F00",
			100: "#FF8F00",
			200: "#F0B90B",
			300: "#3A2305",
		},
		secondary: {
			main: "#D32F2F",
			100: "#364045",
			200: "#FFFDF9",
		},
		neutral: {
			100: "#FFFFFF",
			200: "#F1F5FA",
			300: "#D9E1ED",
			400: "#C2CEE0",
			500: "#7F8DA3",
			600: "#46526A",
			700: "#2F3E59",
			800: "#0C1830",
			900: "#838383",
		},
		surface: {
			main: "#121212",
			100: "#262626",
			200: "#212121",
			//300: "#B1B1B1",
			//400: "#E2EEE2",
		},
		error: {
			main: "#d32f2f",
			light: "#ef5350",
			dark: "#c62828",
		},
		success: {
			main: "#2e7d32",
			light: "#4caf50",
			dark: "#1b5e20",
		},
		info: {
			main: "#0288d1",
			light: "#03a9f4",
			dark: "#01579b",
		},
		warning: {
			main: "#ed6c02",
			light: "#ff9800",
			dark: "#e65100",
		},
		text: {
			primary: "#fff",
			secondary: "rgba(255, 255, 255, 0.7)",
			disabled: "rgba(255, 255, 255, 0.5)",
		},
		border: {
			main: "rgba(81, 81, 81, 1)",
		},
	},
	typography: {
		//fontFamily: montserrat.style.fontFamily,
		xxl: {
			fontSize: "48px",
			lineHeight: "56px",
		},
		xl: {
			fontSize: "38px",
			lineHeight: "50px",
		},
		lg: {
			fontSize: "24px",
			lineHeight: "34px",
		},
		md: {
			fontSize: "22px",
			lineHeight: "28px",
		},
		base: {
			fontSize: "18px",
			lineHeight: "24px",
		},
		sm: {
			fontSize: "16px",
			lineHeight: "24px",
		},
		xs: {
			fontSize: "14px",
			lineHeight: "24px",
		},
	},

	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: "#212121",
				},
			},
		},
		MuiGrid2: {
			styleOverrides: {
				root: {
					backgroundColor: "#212121",
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				root: {
					backgroundColor: "#212121",
				},
			},
		},
		MuiDrawer: {
			styleOverrides: {
				paper: {
					backgroundColor: "#121212",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: { color: "#FFFFFF" },
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					boxShadow: "none",
					backgroundColor: "#121212",
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					"&.Mui-selected": {
						backgroundColor: "#FF6F00",
						"&:hover": {
							backgroundColor: "#FF6F00",
						},
					},
				},
			},
		},
	},
});

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#FF6F00",
			100: "#FF8F00",
			200: "#F0B90B",
		},
		secondary: {
			main: "#D32F2F",
			100: "#364045",
			200: "#FFFDF9",
		},
		neutral: {
			100: "#FFFFFF",
			200: "#F1F5FA",
			300: "#D9E1ED",
			400: "#C2CEE0",
			500: "#7F8DA3",
			600: "#46526A",
			700: "#2F3E59",
			800: "#0C1830",
			900: "#838383",
		},
		surface: {
			main: "#121212",
			200: "#262626",
			//300: "#B1B1B1",
			//400: "#E2EEE2",
		},
		error: {
			main: "#d32f2f",
			light: "#ef5350",
			dark: "#c62828",
		},
		success: {
			main: "#2e7d32",
			light: "#4caf50",
			dark: "#1b5e20",
		},
		info: {
			main: "#0288d1",
			light: "#03a9f4",
			dark: "#01579b",
		},
		warning: {
			main: "#ed6c02",
			light: "#ff9800",
			dark: "#e65100",
		},
		border: {
			main: "rgba(81, 81, 81, 1)",
		},
	},
	typography: {
		//fontFamily: montserrat.style.fontFamily,
		xxl: {
			fontSize: "48px",
			lineHeight: "56px",
		},
		xl: {
			fontSize: "38px",
			lineHeight: "50px",
		},
		lg: {
			fontSize: "24px",
			lineHeight: "34px",
		},
		md: {
			fontSize: "22px",
			lineHeight: "28px",
		},
		base: {
			fontSize: "18px",
			lineHeight: "24px",
		},
		sm: {
			fontSize: "16px",
			lineHeight: "24px",
		},
		xs: {
			fontSize: "14px",
			lineHeight: "24px",
		},
	},

	components: {
		MuiDrawer: {
			styleOverrides: {
				paper: {
					//backgroundColor: "#FF6F00",
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					boxShadow: "none",
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					"&.Mui-selected": {
						backgroundColor: "#FF6F00",
						"&:hover": {
							backgroundColor: "#FF6F00",
						},
					},
				},
			},
		},
	},
});
