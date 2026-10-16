"use client";

import React, { memo } from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";

export type CalendarGridColumn = {
  key: string;
  date: string;
  slots: CalendarEventsSlot[];
};

type CalendarGridBackgroundProps = {
  columns: CalendarGridColumn[];
  timeStrings: string[];
  rowMap: Record<string, number>;
};

const CalendarGridBackgroundComponent = ({
  columns,
  timeStrings,
  rowMap,
}: CalendarGridBackgroundProps) => {
  return (
    <>
      {columns.map((column, columnIndex) => {
        const colIndex = columnIndex + 2;

        return timeStrings.map((time) => {
          const baseRow = rowMap[time];
          if (baseRow === undefined) return null;
          const currentRow = baseRow - 1;

          const rowStart = dayjs(`${column.date}T${time}`);
          const slot = column.slots.find((s) => {
            const slotStart = dayjs(s.start_date_locale);
            const slotEnd = dayjs(s.end_date_locale);
            return !rowStart.isBefore(slotStart) && rowStart.isBefore(slotEnd);
          });

          const isUnavailable = dayjs().isAfter(rowStart) || !slot;

          return (
            <Box
              key={`bg-${column.key}-${time}`}
              sx={{
                gridColumn: colIndex,
                gridRow: currentRow,
                borderBottom: "1px solid",
                borderLeft: "1px solid",
                borderColor: "divider",
                position: "relative",
                boxSizing: "border-box",
                backgroundColor: isUnavailable
                  ? "background.paper"
                  : "transparent",
              }}
            />
          );
        });
      })}
    </>
  );
};

export const CalendarGridBackground = memo(CalendarGridBackgroundComponent);
