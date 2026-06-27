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
    rating: Palette["primary"];
    border: Palette["primary"];
    lastMinute: Palette["primary"];
    beauty: Palette["primary"];
    auto: Palette["primary"];
    medical: Palette["primary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
    surface?: PaletteOptions["primary"];
    rating?: PaletteOptions["primary"];
    border?: PaletteOptions["primary"];
    lastMinute: PaletteOptions["primary"];
    beauty?: PaletteOptions["primary"];
    medical?: PaletteOptions["primary"];
    auto?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    secondary: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    fontWeightSemiBold: number;
  }

  interface TypographyVariantsOptions {
    fontWeightSemiBold?: number;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    rating: true;
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    rating: true;
  }
}

const defaultTheme = createTheme();

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
      default: "#1C1B1F",
      paper: "#262626",
    },
    rating: {
      main: "#FAAF00",
    },
    lastMinute: {
      main: "#06B0CA",
    },
    beauty: {
      main: "#9B4A55",
    },
    medical: {
      main: "#5EDAD5",
    },
    auto: {
      main: "#6FA8FF",
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,

    // --- TITLURI RESPONSIVE ---
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.2,
      [defaultTheme.breakpoints.up("md")]: {
        fontSize: "3rem",
      },
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 700,
      lineHeight: 1.2,
      [defaultTheme.breakpoints.up("md")]: {
        fontSize: "2.25rem",
      },
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
      [defaultTheme.breakpoints.up("md")]: {
        fontSize: "1.875rem",
      },
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      [defaultTheme.breakpoints.up("md")]: {
        fontSize: "1.5rem",
      },
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      [defaultTheme.breakpoints.up("md")]: {
        fontSize: "0.95rem",
      },
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 0,
          backgroundColor: theme.palette.background.default,
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
          textTransform: "none",
          "&.Mui-disabled": {
            pointerEvents: "auto",
          },
        },
        sizeLarge: ({ theme }) => ({
          padding: "6px 16px",
          minHeight: 38,
          fontSize: "0.875rem",

          [theme.breakpoints.up("lg")]: {
            padding: "14px 20px",
            minHeight: 44,
            fontSize: "1rem",
          },
        }),
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
          borderColor: theme.palette.grey[700],
          color: theme.palette.text.primary,
          "&:hover": {
            color: theme.palette.text.primary + "90",
            borderColor: theme.palette.grey[500],
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
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        "textarea, .MuiTextareaAutosize-root": {
          backgroundColor: theme.palette.secondary.main,
          borderRadius: 8,
          padding: "12px 16px",
          boxSizing: "border-box",
          minHeight: 44,
          color: theme.palette.text.primary,
          transition: theme.transitions.create(
            ["background-color", "box-shadow"],
            {
              duration: theme.transitions.duration.short,
            }
          ),
          "&:not(.Mui-disabled):hover": {
            backgroundColor: alpha(
              theme.palette.common.white,
              theme.palette.mode === "dark" ? 0.02 : 0.04
            ),
          },
          "&:focus, &:focus-visible": {
            outline: "none",
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.12)}`,
          },
          "&:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
            boxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
            WebkitTextFillColor: theme.palette.text.primary,
            transition: "background-color 5000s ease-in-out 0s",
          },
          "&:-webkit-autofill:focus": {
            WebkitBoxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
            boxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
            WebkitTextFillColor: theme.palette.text.primary,
          },
        },
      }),
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: "none",
        },
        root: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.main,
          borderRadius: 8,
          transition: theme.transitions.create(
            ["background-color", "box-shadow"],
            {
              duration: theme.transitions.duration.short,
            }
          ),
          "&:not(.Mui-disabled):hover": {
            backgroundColor: alpha(
              theme.palette.common.white,
              theme.palette.mode === "dark" ? 0.02 : 0.04
            ),
          },
          "&:not(.Mui-disabled).Mui-focused": {
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.12)}`,
            backgroundColor: theme.palette.secondary.main,
          },
          "&:not(.Mui-disabled).Mui-focusVisible": {
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.16)}`,
          },
          "& input:-webkit-autofill, & textarea:-webkit-autofill, & select:-webkit-autofill":
            {
              WebkitBoxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
              boxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
              WebkitTextFillColor: theme.palette.text.primary,
              transition: "background-color 5000s ease-in-out 0s",
            },
          "& input:-webkit-autofill:focus, & textarea:-webkit-autofill:focus, & select:-webkit-autofill:focus":
            {
              WebkitBoxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
              boxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
              WebkitTextFillColor: theme.palette.text.primary,
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
      default: "#F1F1F1",
      paper: "#FFFFFF",
    },
    rating: {
      main: "#FAAF00",
    },
    lastMinute: {
      main: "#06B0CA",
    },
    beauty: {
      main: "#7A2E3A",
    },
    medical: {
      main: "#36CFC9",
    },
    auto: {
      main: "#3A86FF",
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,

    // --- TITLURI RESPONSIVE ---
    h1: {
      fontSize: "2rem", // Dimensiune Mobile (XS)
      fontWeight: 700,
      lineHeight: 1.2,
      [defaultTheme.breakpoints.up("md")]: {
        fontSize: "3rem", // Dimensiune Desktop (MD+)
      },
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 700,
      lineHeight: 1.2,
      [defaultTheme.breakpoints.up("md")]: {
        fontSize: "2.25rem",
      },
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
      [defaultTheme.breakpoints.up("md")]: {
        fontSize: "1.875rem",
      },
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      [defaultTheme.breakpoints.up("md")]: {
        fontSize: "1.5rem",
      },
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
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
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          backgroundImage: "none",
          borderRadius: 0,
        }),
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
          fontWeight: 600,
          borderRadius: 50,
          textTransform: "none",
          fontSize: "1rem",
          "&.Mui-disabled": {
            pointerEvents: "auto",
          },
        },
        sizeLarge: ({ theme }) => ({
          padding: "6px 16px",
          minHeight: 38,
          fontSize: "0.875rem",

          [theme.breakpoints.up("lg")]: {
            padding: "14px 20px",
            minHeight: 44,
            fontSize: "1rem",
          },
        }),
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
          borderWidth: 1.25,
          borderColor: theme.palette.grey[400],
          color: theme.palette.text.primary,
          "&:hover": {
            color: theme.palette.text.primary + "90",
            borderColor: theme.palette.grey[500],
            backgroundColor: alpha(theme.palette.grey[400], 0.2),
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
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        "textarea, .MuiTextareaAutosize-root": {
          backgroundColor: theme.palette.secondary.main,
          borderRadius: 8,
          padding: "12px 16px",
          boxSizing: "border-box",
          minHeight: 44,
          color: theme.palette.text.primary,
          transition: theme.transitions.create(
            ["background-color", "box-shadow"],
            {
              duration: theme.transitions.duration.short,
            }
          ),
          "&:not(.Mui-disabled):hover": {
            backgroundColor: alpha(theme.palette.common.black, 0.02),
          },
          "&:focus, &:focus-visible": {
            outline: "none",
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.12)}`,
          },
          "&:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
            boxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
            WebkitTextFillColor: theme.palette.text.primary,
            transition: "background-color 5000s ease-in-out 0s",
          },
          "&:-webkit-autofill:focus": {
            WebkitBoxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
            boxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
            WebkitTextFillColor: theme.palette.text.primary,
          },
        },
      }),
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: "none",
        },
        root: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.main,
          borderRadius: 8,
          transition: theme.transitions.create(
            ["background-color", "box-shadow"],
            {
              duration: theme.transitions.duration.short,
            }
          ),
          "&:not(.Mui-disabled):hover": {
            backgroundColor: alpha(theme.palette.common.black, 0.02),
          },

          ":not(.Mui-disabled).Mui-focused": {
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.12)}`,
            backgroundColor: theme.palette.secondary.main,
          },
          ":not(.Mui-disabled).Mui-focusVisible": {
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.16)}`,
          },
          "& input:-webkit-autofill, & textarea:-webkit-autofill, & select:-webkit-autofill":
            {
              WebkitBoxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
              boxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
              WebkitTextFillColor: theme.palette.text.primary,
              transition: "background-color 5000s ease-in-out 0s",
            },
          "& input:-webkit-autofill:focus, & textarea:-webkit-autofill:focus, & select:-webkit-autofill:focus":
            {
              WebkitBoxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
              boxShadow: `0 0 0 1000px ${theme.palette.secondary.main} inset`,
              WebkitTextFillColor: theme.palette.text.primary,
            },
        }),
      },
    },
  },
});
