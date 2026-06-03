"use client";

import React, { memo } from "react";
import { Box, Theme } from "@mui/material";
import dayjs from "dayjs";
import CalendarEvent from "../CalendarEvent/CalendarEvent";
import { FrontendDayResult } from "../getFrontendDays";
import { CalendarEventsDay } from "@/ts/models/booking/availability/CalendarEvents";

type WeeklyCalendarEventsLayerProps = {
  daysBackend: CalendarEventsDay[] | undefined;
  frontendDays: FrontendDayResult[];
  bounds: {
    minTime: string | undefined;
    maxTime: string | undefined;
  } | null;
  currentRowHeight: number;
  slotDuration: number;
  timeStringsLength: number;
  selectedSlotsToBlock: any[];
  isBlocking: boolean;
  businessShortDomain: string;
  handleToggleSelectSlot: (slot: any) => void;
  handleOpenCreateModal: (slot: any) => void;
};

const WeeklyCalendarEventsLayerComponent = ({
  daysBackend,
  frontendDays,
  bounds,
  currentRowHeight,
  slotDuration,
  timeStringsLength,
  selectedSlotsToBlock,
  isBlocking,
  businessShortDomain,
  handleToggleSelectSlot,
  handleOpenCreateModal,
}: WeeklyCalendarEventsLayerProps) => {
  if (!daysBackend || !bounds || !bounds.minTime) return null;

  return (
    <>
      {daysBackend.map((dayBackend) => {
        const targetFrontendIndex = frontendDays.findIndex(
          (d) => d.dateStr === dayBackend.day
        );

        if (targetFrontendIndex === -1) return null;

        const colIndex = targetFrontendIndex + 2;
        const totalContentHeight = timeStringsLength * currentRowHeight;

        return (
          <Box
            key={`events-col-${dayBackend.day}`}
            sx={{
              gridColumn: colIndex,
              gridRowStart: 1,
              gridRowEnd: timeStringsLength + 1,
              position: "relative",
              height: `${totalContentHeight}px`,
              width: "100%",
            }}
          >
            {dayBackend.slots.map((slot: any, slotIndex: number) => {
              const isSlotInPast = dayjs().isAfter(
                dayjs(slot.start_date_locale)
              );
              const isVacantPastSlot =
                isSlotInPast && !slot.is_booked && !slot.is_blocked;

              // Calculul precis în pixeli pentru așezare milimetrică
              const startOnlyStr = slot.start_date_locale.split("T")[1];
              const endOnlyStr = slot.end_date_locale.split("T")[1];

              const globalStart = dayjs(`2026-01-01T${bounds.minTime}`);
              const eventStart = dayjs(`2026-01-01T${startOnlyStr}`);
              const eventEnd = dayjs(`2026-01-01T${endOnlyStr}`);

              const pixelsPerMinute = currentRowHeight / slotDuration;
              const minutesFromGlobalStart = eventStart.diff(
                globalStart,
                "minute"
              );

              const topPositionPixels =
                minutesFromGlobalStart * pixelsPerMinute;
              const eventDurationMinutes = eventEnd.diff(eventStart, "minute");
              const heightPixels = eventDurationMinutes * pixelsPerMinute;

              if (isVacantPastSlot) {
                return (
                  <Box
                    key={`past-vacant-${slot.start_date_utc || slotIndex}`}
                    sx={[
                      styles.outsideSchedule,
                      {
                        position: "absolute",
                        top: `${topPositionPixels}px`,
                        height: `${heightPixels}px`,
                        left: 0,
                        right: 0,
                        overflow: "hidden",
                      },
                    ]}
                  />
                );
              }

              const isSlotChecked = selectedSlotsToBlock.some(
                (item) => item.start_date === slot.start_date_utc
              );

              return (
                <CalendarEvent
                  key={`slot-${dayBackend.day}-${slotIndex}`}
                  slot={slot}
                  isBlocking={isBlocking}
                  minTimeStr={bounds.minTime}
                  slotDuration={slotDuration}
                  rowHeight={currentRowHeight}
                  isSelected={isSlotChecked}
                  businessShortDomain={businessShortDomain}
                  onToggleSelectSlot={handleToggleSelectSlot}
                  onSelectFreeSlot={(
                    startLocale,
                    endLocale,
                    startUtc,
                    endUtc
                  ) => {
                    if (!startLocale || !endLocale || !startUtc || !endUtc)
                      return;
                    handleOpenCreateModal({
                      startLocale,
                      endLocale,
                      startUtc,
                      endUtc,
                    });
                  }}
                />
              );
            })}
          </Box>
        );
      })}
    </>
  );
};

export const WeeklyCalendarEventsLayer = memo(
  WeeklyCalendarEventsLayerComponent
);

const styles = {
  outsideSchedule: (theme: Theme) => {
    const strokeColor = theme.palette.text.secondary;
    return {
      width: "100%",
      height: "100%",
      backgroundImage: `repeating-linear-gradient(
        45deg, 
        transparent, 
        transparent 5px, 
        ${strokeColor} 5px, 
        ${strokeColor} 6px
      )`,
      mixBlendMode: theme.palette.mode === "light" ? "multiply" : "screen",
      opacity: 0.15,
    };
  },
};
