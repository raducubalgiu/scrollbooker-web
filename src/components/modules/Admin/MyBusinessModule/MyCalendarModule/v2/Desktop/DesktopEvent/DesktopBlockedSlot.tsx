import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { Box, SxProps, Typography, Theme } from "@mui/material";
import React, { memo } from "react";
import { DesktopSlotTimeRange } from "./DesktopSlotTimeRange";
import { alpha } from "@mui/system";

type DesktopBlockedSlotProps = {
  slot: CalendarEventsSlot;
  globalSx: SxProps<Theme>;
};

const DesktopBlockedSlot = ({ slot, globalSx }: DesktopBlockedSlotProps) => {
  return (
    <Box
      sx={[
        ...(Array.isArray(globalSx) ? globalSx : [globalSx]),
        styles.container,
      ]}
    >
      <DesktopSlotTimeRange
        startLocale={slot.start_date_locale}
        endLocale={slot.end_date_locale}
      />

      <Typography variant="caption" sx={styles.message}>
        {slot.info?.blocked_message || "Slot Blocat"}
      </Typography>
    </Box>
  );
};

export default memo(DesktopBlockedSlot);

const styles = {
  container: (theme: Theme) => ({
    backgroundColor:
      theme.palette.mode === "light"
        ? `color-mix(in srgb, ${theme.palette.error.main} 22%, #ffffff)`
        : `color-mix(in srgb, ${theme.palette.error.main} 18%, #1e1e1e)`,
    color: theme.palette.error.dark,
    p: 1,
    borderRadius: 1,
    borderLeft: 3,
    borderColor: alpha(theme.palette.error.main, 0.6),
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
    mt: 1,
  },
};
