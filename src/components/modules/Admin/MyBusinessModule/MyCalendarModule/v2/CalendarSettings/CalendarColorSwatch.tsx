import React from "react";
import { Box, Theme } from "@mui/material";
import { CalendarColorEnum } from "@/ts/enums/CalendarColorEnum";

type CalendarColorSwatchProps = {
  color: CalendarColorEnum | null;
  size?: number;
};

const CalendarColorSwatch = ({ color, size = 18 }: CalendarColorSwatchProps) => (
  <Box
    sx={{
      width: size,
      height: size,
      borderRadius: "50%",
      flexShrink: 0,
      border: 1,
      borderColor: color ? "transparent" : "divider",
      bgcolor: (theme: Theme) =>
        color ? theme.palette.calendar[color] : theme.palette.background.default,
    }}
  />
);

export default CalendarColorSwatch;
