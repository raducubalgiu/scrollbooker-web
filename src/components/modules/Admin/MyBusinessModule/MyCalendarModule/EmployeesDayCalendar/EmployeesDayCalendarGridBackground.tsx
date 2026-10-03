import React, { memo } from "react";
import { Box, Theme } from "@mui/material";
import { CalendarEventsBusinessEmployee } from "@/ts/models/booking/availability/CalendarEvents";

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
        const firstSlot = employee.slots[0];
        const lastSlot = employee.slots[employee.slots.length - 1];
        const empStart = firstSlot?.start_date_locale.split("T")[1];
        const empEnd = lastSlot?.end_date_locale.split("T")[1];

        return timeStrings.map((time) => {
          const baseRow = rowMap[time];
          if (baseRow === undefined) return null;
          const currentRow = baseRow - 1;

          const isOutsideSchedule =
            !empStart || !empEnd || time < empStart || time >= empEnd;

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
                backgroundColor: isOutsideSchedule
                  ? "background.paper"
                  : "transparent",
              }}
            >
              {isOutsideSchedule && <Box sx={styles.outsideSchedule} />}
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
