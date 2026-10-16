"use client";

import React, { useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import {
  formatMinutesAsClock,
  generateTicks,
  hourHeight,
  minutesFromDateTimeString,
} from "./myCalendarMobileGeometry";
import { resolveMobileSlotStyle } from "./myCalendarMobileSlotStyle";
import MyCalendarMobileSlot from "./MyCalendarMobileSlot";

const GUTTER_WIDTH = 56;

type MyCalendarMobileTimelineProps = {
  dayStartMinutes: number;
  dayEndMinutes: number;
  slots: CalendarEventsSlot[];
  slotDuration: number;
  businessShortDomain: string | undefined;
  isBlocking: boolean;
  pendingBlockSlots: Set<string>;
  onSlotTap: (slot: CalendarEventsSlot) => void;
};

const MyCalendarMobileTimeline = ({
  dayStartMinutes,
  dayEndMinutes,
  slots,
  slotDuration,
  businessShortDomain,
  isBlocking,
  pendingBlockSlots,
  onSlotTap,
}: MyCalendarMobileTimelineProps) => {
  const theme = useTheme();

  const totalMinutes = Math.max(dayEndMinutes - dayStartMinutes, 0);
  const hourHeightValue = hourHeight(slotDuration);
  const dpPerMinute = hourHeightValue / 60;
  const contentHeight = dpPerMinute * totalMinutes;

  const ticks = useMemo(
    () => generateTicks(dayStartMinutes, dayEndMinutes, slotDuration),
    [dayStartMinutes, dayEndMinutes, slotDuration]
  );

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", pt: 1.5, pb: 2 }}>
      <Box
        sx={{
          position: "relative",
          width: GUTTER_WIDTH,
          height: contentHeight,
          flexShrink: 0,
        }}
      >
        {ticks.map((tick) => (
          <Typography
            key={`tick-${tick}`}
            variant="caption"
            color="text.secondary"
            sx={{
              position: "absolute",
              top: (tick - dayStartMinutes) * dpPerMinute + 2,
              left: 8,
              whiteSpace: "nowrap",
            }}
          >
            {formatMinutesAsClock(tick)}
          </Typography>
        ))}
      </Box>

      <Box
        sx={{
          position: "relative",
          flex: 1,
          minWidth: 0,
          height: contentHeight,
        }}
      >
        {ticks.map((tick) => (
          <Box
            key={`line-${tick}`}
            sx={{
              position: "absolute",
              top: (tick - dayStartMinutes) * dpPerMinute,
              left: 0,
              right: 0,
              borderTop: "1px solid",
              borderColor: "divider",
              opacity: tick % 60 === 0 ? 0.5 : 0.25,
            }}
          />
        ))}

        {slots.map((slot, index) => {
          const slotStartMinutes = minutesFromDateTimeString(slot.start_date_locale);
          const slotEndMinutes = minutesFromDateTimeString(slot.end_date_locale);
          if (slotStartMinutes === null || slotEndMinutes === null) return null;

          const startMinute = Math.max(0, slotStartMinutes - dayStartMinutes);
          const endMinute = Math.min(totalMinutes, slotEndMinutes - dayStartMinutes);
          const durationMinutes = Math.max(endMinute - startMinute, 0);
          if (durationMinutes <= 0) return null;

          const gap = 6;
          const height = dpPerMinute * durationMinutes - gap;
          const offsetY = dpPerMinute * startMinute + gap / 2;
          const style = resolveMobileSlotStyle(theme, slot, businessShortDomain);

          const isFreeSlot = !slot.is_booked && !slot.is_blocked;
          const isLocallyStaged = pendingBlockSlots.has(slot.start_date_locale);
          const isChecked = isLocallyStaged || slot.is_blocked;
          const isExternalBlock = slot.is_blocked && !!slot.info?.is_external;
          const showCheckbox =
            isBlocking && (isFreeSlot || (slot.is_blocked && !isExternalBlock));

          return (
            <MyCalendarMobileSlot
              key={`slot-${slot.start_date_locale}-${index}`}
              slot={slot}
              style={style}
              height={Math.max(height, 0)}
              offsetY={offsetY}
              isBlocking={isBlocking}
              showCheckbox={showCheckbox}
              isChecked={isChecked}
              isCheckboxEnabled={!slot.is_blocked}
              onTap={onSlotTap}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default MyCalendarMobileTimeline;
