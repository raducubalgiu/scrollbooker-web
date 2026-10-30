"use client";

import React, { useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import {
  formatMinutesAsClock,
  generateTicks,
  minutesFromDateTimeString,
} from "./mobileGeometry";
import { resolveMobileSlotStyle } from "./mobileSlotStyle";
import MobileSlot from "./MobileSlot";

const GUTTER_WIDTH = 56;
export const ROW_HEIGHT = 128;
const SLOT_GAP = 4;

type MobileTimelineProps = {
  currentTimeMinutes: number | null;
  dayStartMinutes: number;
  dayEndMinutes: number;
  slots: CalendarEventsSlot[];
  slotDuration: number;
  businessShortDomain: string | undefined;
  isBlocking: boolean;
  pendingBlockSlots: Set<string>;
  onSlotTap: (slot: CalendarEventsSlot) => void;
};

const MobileTimeline = ({
  currentTimeMinutes,
  dayStartMinutes,
  dayEndMinutes,
  slots,
  slotDuration,
  businessShortDomain,
  isBlocking,
  pendingBlockSlots,
  onSlotTap,
}: MobileTimelineProps) => {
  const theme = useTheme();

  const pixelsPerMinute = ROW_HEIGHT / slotDuration;
  const totalMinutes = Math.max(dayEndMinutes - dayStartMinutes, 0);
  const contentHeight = pixelsPerMinute * totalMinutes;

  const ticks = useMemo(
    () => generateTicks(dayStartMinutes, dayEndMinutes, slotDuration),
    [dayStartMinutes, dayEndMinutes, slotDuration]
  );

  return (
    <Box sx={styles.root}>
      <Box sx={{ ...styles.gutter, height: contentHeight }}>
        {ticks.map((tick) => (
          <Typography
            key={`tick-${tick}`}
            variant="caption"
            color="text.secondary"
            sx={{ ...styles.tickLabel, top: (tick - dayStartMinutes) * pixelsPerMinute }}
          >
            {formatMinutesAsClock(tick)}
          </Typography>
        ))}
      </Box>

      <Box sx={{ ...styles.track, height: contentHeight }}>
        {ticks.map((tick) => (
          <Box
            key={`line-${tick}`}
            sx={{
              ...styles.line,
              top: (tick - dayStartMinutes) * pixelsPerMinute,
              opacity: tick % 60 === 0 ? 0.6 : 0.3,
            }}
          />
        ))}

        {slots.map((slot) => {
          const slotStart = minutesFromDateTimeString(slot.start_date_locale);
          const slotEnd = minutesFromDateTimeString(slot.end_date_locale);
          if (slotStart === null || slotEnd === null) return null;

          const startMinute = Math.max(0, slotStart - dayStartMinutes);
          const endMinute = Math.min(totalMinutes, slotEnd - dayStartMinutes);
          if (endMinute <= startMinute) return null;

          const height = (endMinute - startMinute) * pixelsPerMinute - SLOT_GAP;
          const offsetY = startMinute * pixelsPerMinute + SLOT_GAP / 2;

          const isFreeSlot = !slot.is_booked && !slot.is_blocked;
          const isChecked = pendingBlockSlots.has(slot.start_date_locale) || slot.is_blocked;
          const isExternalBlock = slot.is_blocked && !!slot.info?.is_external;

          return (
            <MobileSlot
              key={`slot-${slot.start_date_utc}-${slot.id ?? "free"}`}
              slot={slot}
              style={resolveMobileSlotStyle(theme, slot, businessShortDomain)}
              height={Math.max(height, 0)}
              offsetY={offsetY}
              isBlocking={isBlocking}
              showCheckbox={isBlocking && (isFreeSlot || (slot.is_blocked && !isExternalBlock))}
              isChecked={isChecked}
              isCheckboxEnabled={!slot.is_blocked}
              onTap={onSlotTap}
            />
          );
        })}

        {currentTimeMinutes !== null &&
          currentTimeMinutes >= dayStartMinutes &&
          currentTimeMinutes <= dayEndMinutes && (
            <Box
              sx={{
                ...styles.nowLine,
                top: (currentTimeMinutes - dayStartMinutes) * pixelsPerMinute,
              }}
            >
              <Box sx={styles.nowDot} />
            </Box>
          )}
      </Box>
    </Box>
  );
};

export default MobileTimeline;

const styles = {
  root: {
    display: "flex",
    alignItems: "flex-start",
    pt: 1.5,
    pb: 2,
  },
  gutter: {
    position: "relative",
    width: GUTTER_WIDTH,
    flexShrink: 0,
  },
  tickLabel: {
    position: "absolute",
    left: 8,
    transform: "translateY(-50%)",
    whiteSpace: "nowrap",
  },
  track: {
    position: "relative",
    flex: 1,
    minWidth: 0,
  },
  nowLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: "2px",
    bgcolor: "error.main",
    zIndex: 6,
    pointerEvents: "none",
  },
  nowDot: {
    position: "absolute",
    left: -4,
    top: "50%",
    transform: "translateY(-50%)",
    width: 8,
    height: 8,
    borderRadius: "50%",
    bgcolor: "error.main",
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTop: "1px solid",
    borderColor: "divider",
  },
} as const;
