"use client";

import React, { memo } from "react";
import { Box } from "@mui/material";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { CalendarNow, timeToMinutes } from "../calendarSlots";
import {
  getCalendarPageBg,
  getCalendarTableBg,
} from "../calendarSurfaceColors";

export type DesktopGridColumn = {
  key: string;
  date: string;
  slots: CalendarEventsSlot[];
};

type DesktopGridBackgroundProps = {
  columns: DesktopGridColumn[];
  timeStrings: string[];
  slotDuration: number;
  now: CalendarNow;
};

const slotMinutes = (locale: string) =>
  timeToMinutes(locale.split("T")[1] ?? "00:00");

const DesktopGridBackgroundComponent = ({
  columns,
  timeStrings,
  slotDuration,
  now,
}: DesktopGridBackgroundProps) => {
  return (
    <>
      {columns.map((column, columnIndex) => {
        const colIndex = columnIndex + 2;

        return timeStrings.map((time, timeIndex) => {
          const rowStart = timeToMinutes(time);
          const rowEnd = rowStart + slotDuration;

          const isPastRow =
            column.date < now.date ||
            (column.date === now.date && rowEnd <= now.minutes);

          const hasFreeSlot = column.slots.some(
            (slot) =>
              !slot.is_booked &&
              !slot.is_blocked &&
              slotMinutes(slot.start_date_locale) < rowEnd &&
              slotMinutes(slot.end_date_locale) > rowStart
          );

          return (
            <Box
              key={`bg-${column.key}-${time}`}
              sx={{
                gridColumn: colIndex,
                gridRow: timeIndex + 1,
                borderBottom: "1px solid",
                borderLeft: "1px solid",
                borderColor: "divider",
                position: "relative",
                boxSizing: "border-box",
                backgroundColor:
                  isPastRow || !hasFreeSlot ? getCalendarPageBg : getCalendarTableBg,
              }}
            />
          );
        });
      })}
    </>
  );
};

export const DesktopGridBackground = memo(DesktopGridBackgroundComponent);
