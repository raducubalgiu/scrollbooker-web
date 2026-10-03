import React, { memo } from "react";
import { Box, Theme } from "@mui/material";

type WeeklyCalendarGridBackgroundProps = {
  frontendDays: any[];
  timeStrings: string[];
  rowMap: Record<string, number>;
};

const WeeklyCalendarGridBackgroundComponent = ({
  frontendDays,
  timeStrings,
  rowMap,
}: WeeklyCalendarGridBackgroundProps) => {
  return (
    <>
      {frontendDays.map((dayData, dayIndex) => {
        const colIndex = dayIndex + 2;

        return timeStrings.map((time) => {
          const baseRow = rowMap[time];
          if (baseRow === undefined) return null;
          const currentRow = baseRow - 1;

          let isOutsideSchedule = true;

          if (
            dayData.schedule &&
            dayData.schedule.start_time &&
            dayData.schedule.end_time
          ) {
            const startWorkStr = dayData.schedule.start_time;
            const endWorkStr = dayData.schedule.end_time;
            const currentCellStr = time;
            if (currentCellStr >= startWorkStr && currentCellStr < endWorkStr) {
              isOutsideSchedule = false;
            }
          }

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
                backgroundColor: isOutsideSchedule
                  ? "background.default"
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

export const WeeklyCalendarGridBackground = memo(
  WeeklyCalendarGridBackgroundComponent
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
