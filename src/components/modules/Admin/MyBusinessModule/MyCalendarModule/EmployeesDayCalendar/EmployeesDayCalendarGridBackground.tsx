import React, { memo } from "react";
import { alpha, Box, Theme } from "@mui/material";
import dayjs from "dayjs";
import {
  CalendarEventsBusinessEmployee,
  CalendarEventsSlot,
} from "@/ts/models/booking/availability/CalendarEvents";

type EmployeesDayCalendarGridBackgroundProps = {
  employees: CalendarEventsBusinessEmployee[];
  timeStrings: string[];
  rowMap: Record<string, number>;
};

const EmployeesDayCalendarGridBackgroundComponent = ({
  employees,
  timeStrings,
  rowMap,
}: EmployeesDayCalendarGridBackgroundProps) => {
  return (
    <>
      {employees.map((employee, employeeIndex) => {
        const colIndex = employeeIndex + 2;
        const slotsByTime: Record<string, CalendarEventsSlot> = {};
        employee.slots.forEach((slot) => {
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
              key={`bg-${employee.id}-${time}`}
              sx={{
                gridColumn: colIndex,
                gridRow: currentRow,
                borderBottom: "1px solid",
                borderLeft: "1px solid",
                borderColor: "divider",
                position: "relative",
                boxSizing: "border-box",
                backgroundColor: isUnavailable
                  ? "action.disabledBackground"
                  : "transparent",
              }}
            >
              {isUnavailable && <Box sx={styles.unavailable} />}
            </Box>
          );
        });
      })}
    </>
  );
};

export const EmployeesDayCalendarGridBackground = memo(
  EmployeesDayCalendarGridBackgroundComponent
);

const styles = {
  unavailable: (theme: Theme) => {
    const strokeColor = alpha(theme.palette.text.secondary, 0.22);
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
    };
  },
};
