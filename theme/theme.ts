import { alpha, createTheme } from "@mui/material/styles";

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
    table: Palette["primary"];
    slotBlocked: Palette["primary"];
    slotBookedOwnClient: Palette["primary"];
    slotBookedScrollBooker: Palette["primary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
    surface?: PaletteOptions["primary"];
    table?: PaletteOptions["primary"];
    slotBlocked?: PaletteOptions["primary"];
    slotBookedOwnClient?: PaletteOptions["primary"];
    slotBookedScrollBooker?: PaletteOptions["primary"];
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
    },
    secondary: {
      main: "#1C1C1C",
      100: "#364045",
      200: "#FFFDF9",
    },
    background: {
      default: "#121212",
      paper: "#262626",
    },
    table: {
      main: "#1E1E1E",
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
          borderRadius: 0,
          backgroundColor: theme.palette.background.paper,
          backgroundImage: "none",
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: 0,
          backgroundColor: theme.palette.background.default,
        }),
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          "&:not(.Mui-expanded)": {
            borderRadius: 10,
          },
          "&.Mui-Expanded": {
            borderRadius: 10,
          },
          "&::before": {
            display: "none",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 10,
          backgroundColor: theme.palette.background.paper,
          backgroundImage: "none",
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          borderRadius: 50,
          "&.Mui-disabled": {
            pointerEvents: "auto",
          },
        },
        sizeLarge: {
          padding: "10px 20px",
          minHeight: 44,
        },
        containedPrimary: ({ theme }) => ({
          color: theme.palette.common.white,
        }),
        containedSecondary: ({ theme }) => ({
          color: theme.palette.text.secondary,
        }),
        outlinedPrimary: ({ theme }) => ({
          color: theme.palette.text.primary,
          "&:hover": {
            color: theme.palette.text.primary + "90",
          },
        }),
        outlinedSecondary: ({ theme }) => ({
          borderColor: theme.palette.divider,
          color: theme.palette.text.primary,
          "&:hover": {
            color: theme.palette.text.primary + "90",
            borderColor: theme.palette.divider,
          },
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary,
          },
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          padding: "6px 0",
          minWidth: 230,
          backgroundColor: theme.palette.background.paper,
          backgroundImage: "none",
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: "16px 24px",
          gap: 8,
          minHeight: 50,
          alignItems: "center",
          borderRadius: 8,
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
          },
          "&.Mui-selected": {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
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
      main: "#F1F1F1",
    },
    background: {
      default: "#f1f1f1",
      paper: "#FFFFFF",
    },
    table: {
      main: "#FFFFFF",
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
          borderRadius: 0,
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
          borderRadius: 0,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
          "&:not(.Mui-expanded)": {
            borderRadius: 10,
          },
          "&.Mui-Expanded": {
            borderRadius: 10,
          },
          "&::before": {
            display: "none",
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
          borderRadius: 10,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          borderRadius: 50,
          "&.Mui-disabled": {
            pointerEvents: "auto",
          },
        },
        sizeLarge: {
          padding: "10px 20px",
          minHeight: 44,
        },
        containedPrimary: ({ theme }) => ({
          color: theme.palette.common.white,
        }),
        containedSecondary: ({ theme }) => ({
          color: theme.palette.text.secondary,
        }),
        outlinedPrimary: ({ theme }) => ({
          color: theme.palette.text.primary,
          borderWidth: 2,
          "&:hover": {
            color: theme.palette.text.primary + "90",
          },
        }),
        outlinedSecondary: ({ theme }) => ({
          borderColor: theme.palette.grey[500],
          color: theme.palette.text.primary,
          "&:hover": {
            color: theme.palette.text.primary + "90",
            borderColor: theme.palette.grey[300],
          },
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary,
          },
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          padding: "6px 0",
          minWidth: 230,
          backgroundColor: theme.palette.background.paper,
          backgroundImage: "none",
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: "12px 16px",
          gap: 8,
          minHeight: 50,
          alignItems: "center",
          borderRadius: 8,
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
          },
          "&.Mui-selected": {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
          },
        }),
      },
    },
  },
});
