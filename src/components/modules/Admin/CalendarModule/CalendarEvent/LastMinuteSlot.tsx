import dayjs from "@/lib/dayjs";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import React from "react";

type LastMinuteSlotProps = {
  slot: CalendarEventsSlot;
  globalSx: SxProps<Theme>;
};

const LastMinuteSlot = ({ slot, globalSx }: LastMinuteSlotProps) => {
  return (
    <Box
      sx={[
        ...(Array.isArray(globalSx) ? globalSx : [globalSx]),
        styles.container,
      ]}
    >
      <Typography variant="caption" color="text.secondary" fontWeight={600}>
        {dayjs(slot.start_date_locale).format("HH:mm")} -{" "}
        {dayjs(slot.end_date_locale).format("HH:mm")}
      </Typography>
      <Box sx={{ overflow: "hidden", mt: 0.5 }}>
        <Typography
          variant="caption"
          sx={{ color: "success.main", fontWeight: "bold", fontSize: "10px" }}
        >
          -{slot.last_minute_discount}% OFF
        </Typography>
      </Box>
    </Box>
  );
};

export default LastMinuteSlot;

const styles = {
  container: (theme: Theme) => ({
    backgroundColor:
      theme.palette.mode === "light"
        ? `color-mix(in srgb, ${theme.palette.lastMinute.main} 12%, #ffffff)`
        : `color-mix(in srgb, ${theme.palette.lastMinute.main} 5%, #1e1e1e)`,
    color: theme.palette.error.dark,
    p: 1,
    borderRadius: 1,
    borderLeft: 3,
    borderColor: theme.palette.lastMinute.main,
    display: "flex",
    flexDirection: "column",
  }),
};
