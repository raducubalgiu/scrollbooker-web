import React, { memo } from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import {
  CalendarEventsDay,
  CalendarEventsSlot,
} from "@/ts/models/booking/availability/CalendarEvents";
import { FrontendDayResult } from "../getFrontendDays";

type WeeklyCalendarGridBackgroundProps = {
  frontendDays: FrontendDayResult[];
  daysBackend: CalendarEventsDay[] | undefined;
  timeStrings: string[];
  rowMap: Record<string, number>;
};

const WeeklyCalendarGridBackgroundComponent = ({
  frontendDays,
  daysBackend,
  timeStrings,
  rowMap,
}: WeeklyCalendarGridBackgroundProps) => {
  return (
    <>
      {frontendDays.map((dayData, dayIndex) => {
        const colIndex = dayIndex + 2;
        const dayBackend = daysBackend?.find((d) => d.day === dayData.dateStr);

        const slotsByTime: Record<string, CalendarEventsSlot> = {};
        dayBackend?.slots.forEach((slot) => {
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
              key={`bg-${dayData.dateStr}-${time}`}
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

export const WeeklyCalendarGridBackground = memo(
  WeeklyCalendarGridBackgroundComponent
);
