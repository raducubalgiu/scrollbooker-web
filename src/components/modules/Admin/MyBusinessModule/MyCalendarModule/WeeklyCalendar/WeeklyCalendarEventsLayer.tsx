"use client";

import React, { memo } from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import CalendarEvent from "../CalendarEvent/CalendarEvent";
import { FrontendDayResult } from "../getFrontendDays";
import {
  CalendarEventsDay,
  CalendarEventsSlot,
} from "@/ts/models/booking/availability/CalendarEvents";
import { AppointmentBlockSlot } from "@/ts/models/booking/appointment/Appointment";

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
  selectedSlotsToBlock: AppointmentBlockSlot[];
  isBlocking: boolean;
  businessShortDomain: string;
  onToggleSelectSlot: (slot: CalendarEventsSlot) => void;
  onOpenCreateModal: (slot: CalendarEventsSlot) => void;
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
  onToggleSelectSlot,
  onOpenCreateModal,
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
            {dayBackend.slots.map((slot: CalendarEventsSlot, slotIndex: number) => {
              const isVacantPastSlot =
                dayjs().isAfter(dayjs(slot.start_date_locale)) &&
                !slot.is_booked &&
                !slot.is_blocked;

              if (isVacantPastSlot) return null;

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
                  onToggleSelectSlot={onToggleSelectSlot}
                  onOpenCreateModal={onOpenCreateModal}
                />
              );
            })}
          </Box>
        );
      })}
    </>
  );
};

export const WeeklyCalendarEventsLayer = memo(WeeklyCalendarEventsLayerComponent);
