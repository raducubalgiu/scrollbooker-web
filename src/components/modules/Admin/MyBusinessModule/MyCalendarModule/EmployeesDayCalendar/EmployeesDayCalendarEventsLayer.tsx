"use client";

import React, { memo } from "react";
import { Box, Theme } from "@mui/material";
import dayjs from "dayjs";
import CalendarEvent from "../CalendarEvent/CalendarEvent";
import {
  CalendarEventsBusinessEmployee,
  CalendarEventsSlot,
} from "@/ts/models/booking/availability/CalendarEvents";
import { AppointmentBlockSlot } from "@/ts/models/booking/appointment/Appointment";

type EmployeesDayCalendarEventsLayerProps = {
  employees: CalendarEventsBusinessEmployee[];
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
  onToggleSelectSlot: (employeeId: number, slot: CalendarEventsSlot) => void;
  onOpenCreateModal: (employeeId: number, slot: CalendarEventsSlot) => void;
};

const EmployeesDayCalendarEventsLayerComponent = ({
  employees,
  bounds,
  currentRowHeight,
  slotDuration,
  timeStringsLength,
  selectedSlotsToBlock,
  isBlocking,
  businessShortDomain,
  onToggleSelectSlot,
  onOpenCreateModal,
}: EmployeesDayCalendarEventsLayerProps) => {
  if (!bounds || !bounds.minTime) return null;

  return (
    <>
      {employees.map((employee, employeeIndex) => {
        const colIndex = employeeIndex + 2;
        const totalContentHeight = timeStringsLength * currentRowHeight;

        return (
          <Box
            key={`events-col-${employee.id}`}
            sx={{
              gridColumn: colIndex,
              gridRowStart: 1,
              gridRowEnd: timeStringsLength + 1,
              position: "relative",
              height: `${totalContentHeight}px`,
              width: "100%",
            }}
          >
            {employee.slots.map((slot, slotIndex) => {
              const isSlotInPast = dayjs().isAfter(
                dayjs(slot.start_date_locale)
              );
              const isVacantPastSlot =
                isSlotInPast && !slot.is_booked && !slot.is_blocked;

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
                  key={`slot-${employee.id}-${slotIndex}`}
                  slot={slot}
                  isBlocking={isBlocking}
                  minTimeStr={bounds.minTime}
                  slotDuration={slotDuration}
                  rowHeight={currentRowHeight}
                  isSelected={isSlotChecked}
                  businessShortDomain={businessShortDomain}
                  onToggleSelectSlot={(s) => onToggleSelectSlot(employee.id, s)}
                  onOpenCreateModal={(s) => onOpenCreateModal(employee.id, s)}
                />
              );
            })}
          </Box>
        );
      })}
    </>
  );
};

export const EmployeesDayCalendarEventsLayer = memo(
  EmployeesDayCalendarEventsLayerComponent
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
