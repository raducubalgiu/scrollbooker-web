"use client";

import React, { memo } from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";

export type CalendarGridColumn = {
  key: string;
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

        const slotsByTime: Record<string, CalendarEventsSlot> = {};
        column.slots.forEach((slot) => {
          slotsByTime[slot.start_date_locale.split("T")[1] ?? ""] = slot;
        });

        return timeStrings.map((time) => {
          const baseRow = rowMap[time];
          if (baseRow === undefined) return null;
          const currentRow = baseRow - 1;

          const slot = slotsByTime[time];
          const isUnavailable =
            !slot ||
            (!slot.is_booked &&
              !slot.is_blocked &&
              dayjs().isAfter(dayjs(slot.start_date_locale)));

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
