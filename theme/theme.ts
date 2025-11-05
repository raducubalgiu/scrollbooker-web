import { createTheme } from "@mui/material/styles";

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
		slotBlocked: Palette["primary"];
		slotBookedOwnClient: Palette["primary"];
		slotBookedScrollBooker: Palette["primary"];
	}

	interface PaletteOptions {
		neutral?: PaletteOptions["primary"];
		surface?: PaletteOptions["primary"];
		slotBlocked: PaletteOptions["primary"];
		slotBookedOwnClient: PaletteOptions["primary"];
		slotBookedScrollBooker: PaletteOptions["primary"];
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
			300: "#EF8D2A",
		},
		secondary: {
			main: "#D32F2F",
			100: "#364045",
			200: "#FFFDF9",
		},
		background: {
			default: "#121212",
			paper: "#1B1B1B"
		},
		slotBlocked: {
			main: "#3b1111",
		},
		slotBookedOwnClient: {
			main: "#1B4D1F",
		},
		slotBookedScrollBooker: {
			main: "#C06020",
		},
	},

	components: {
		MuiAppBar: {
			styleOverrides: {
				root: ({theme}) => ({
					borderRadius: 0,
					backgroundColor: theme.palette.background.paper
				})
			}
		},
		MuiDrawer: {
			styleOverrides: {
				paper: ({theme}) => ({
					borderRadius: 0,
					backgroundColor: theme.palette.background.default
				}),
			},
		},
		MuiAccordion: {
			styleOverrides: {
				root: {
					borderRadius: 10,
					'&:not(.Mui-expanded)': {
						borderRadius: 10,
					},
					'&.Mui-Expanded': {
						borderRadius: 10,
					},
					'&::before': {
						display: 'none'
					}
				}
			}
		},
		MuiPaper: {
			styleOverrides: {
				root: ({theme}) => ({
					borderRadius: 10,
					backgroundColor: theme.palette.background.paper
				})
			}
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontWeight: "bold",
					color: "#fff",
					borderRadius: 50
				},
			}
		},
		MuiListItemButton: {
			styleOverrides: {
				root: ({theme}) => ({
					"&.Mui-selected": {
						backgroundColor: theme.palette.primary,
					},
				}),
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
		background: {
			default: "#f1f1f1",
			paper: "#fff"
		},
		slotBlocked: {
			main: "#3b1111",
		},
		slotBookedOwnClient: {
			main: "#1B4D1F",
		},
		slotBookedScrollBooker: {
			main: "#C06020",
		},
	},

	components: {
		MuiAppBar: {
			styleOverrides: {
				root: ({ theme }) => ({
					backgroundColor: theme.palette.background.paper,
					boxShadow: "none",
					borderRadius: 0
				}),
			},
		},
		MuiDrawer: {
			styleOverrides: {
				paper: {
					boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
					borderRadius: 0
				},
			},
		},
		MuiAccordion: {
			styleOverrides: {
				root: {
					borderRadius: 10,
					boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
					'&:not(.Mui-expanded)': {
						borderRadius: 10,
					},
					'&.Mui-Expanded': {
						borderRadius: 10,
					},
					'&::before': {
						display: 'none'
					}
				}
			}
		},
		MuiPaper: {
			defaultProps: {
				elevation: 0
			},
			styleOverrides: {
				root: {
					boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
					borderRadius: 10
				},
			}
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontWeight: "bold",
					color: "#fff",
					borderRadius: 50
				},
			}
		},
		MuiListItemButton: {
			styleOverrides: {
				root: ({theme}) => ({
					"&.Mui-selected": {
						backgroundColor: theme.palette.primary,
					},
				}),
			},
		},
	},
});
