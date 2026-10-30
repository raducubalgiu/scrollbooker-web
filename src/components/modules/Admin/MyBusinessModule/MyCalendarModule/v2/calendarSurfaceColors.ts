import { Theme } from "@mui/material";

export const getCalendarPageBg = (theme: Theme) =>
  theme.palette.mode === "dark"
    ? theme.palette.background.default
    : theme.palette.background.paper;

export const getCalendarTableBg = (theme: Theme) =>
  theme.palette.mode === "dark"
    ? theme.palette.background.paper
    : theme.palette.background.default;
