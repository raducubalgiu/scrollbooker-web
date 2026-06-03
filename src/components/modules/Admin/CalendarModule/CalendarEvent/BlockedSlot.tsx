import dayjs from "@/lib/dayjs";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { Box, SxProps, Typography, Theme } from "@mui/material";
import React from "react";

type BlockedSlotProps = {
  slot: CalendarEventsSlot;
  globalSx: SxProps<Theme>;
};

const BlockedSlot = ({ slot, globalSx }: BlockedSlotProps) => {
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

      <Typography variant="caption" sx={styles.message}>
        {slot.info?.message || "Slot Blocat"}
      </Typography>
    </Box>
  );
};

export default BlockedSlot;

const styles = {
  container: (theme: Theme) => ({
    backgroundColor:
      theme.palette.mode === "light"
        ? `color-mix(in srgb, ${theme.palette.error.main} 12%, #ffffff)`
        : `color-mix(in srgb, ${theme.palette.error.main} 5%, #1e1e1e)`,
    color: theme.palette.error.dark,
    p: 1,
    borderRadius: 1,
    borderLeft: 3,
    borderColor: "error.main",
    display: "flex",
    flexDirection: "column",
  }),
  message: {
    display: "block",
    fontWeight: 700,
    color: "error.dark",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    mt: 0.5,
  },
};
