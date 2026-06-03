import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { SlotTimeRange } from "./SlotTimeRange";

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
      <SlotTimeRange
        startLocale={slot.start_date_locale}
        endLocale={slot.end_date_locale}
      />
      <Stack direction="row" gap={1} alignItems="center" mt={0.5}>
        <Box sx={{ overflow: "hidden" }}>
          <Typography variant="caption" sx={styles.lastMinuteText}>
            Last Minute
          </Typography>
          <Typography variant="caption" sx={styles.discountLabel}>
            Reducere (-{slot.last_minute_discount}%)
          </Typography>
        </Box>
      </Stack>
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
  lastMinuteText: {
    fontWeight: 600,
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: 1.1,
    color: "text.primary",
  },
  discountLabel: {
    fontSize: "10px",
    opacity: 0.8,
    display: "block",
    mt: 0.25,
    color: "error.main",
    fontWeight: 700,
  },
};
