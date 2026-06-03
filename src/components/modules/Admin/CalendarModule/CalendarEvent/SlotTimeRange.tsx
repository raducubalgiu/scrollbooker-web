import React from "react";
import { Typography, SxProps, Theme } from "@mui/material";
import dayjs from "dayjs";

interface SlotTimeRangeProps {
  startLocale: string;
  endLocale: string;
  sx?: SxProps<Theme>;
}

export const SlotTimeRange = ({
  startLocale,
  endLocale,
  sx = {},
}: SlotTimeRangeProps) => {
  return (
    <Typography
      variant="caption"
      sx={{
        color: "text.secondary",
        fontWeight: 600,
        ...sx,
      }}
    >
      {dayjs(startLocale).format("HH:mm")} - {dayjs(endLocale).format("HH:mm")}
    </Typography>
  );
};
