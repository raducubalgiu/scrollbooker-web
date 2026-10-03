import React from "react";
import { Box, Skeleton } from "@mui/material";
import { getCalendarTableBg } from "../calendarSurfaceColors";

const SKELETON_DAYS = 7;
const SKELETON_ROWS = 8;

export const WeeklyCalendarSkeleton = () => {
  const gridTemplateColumns = `90px repeat(${SKELETON_DAYS}, minmax(130px, 1fr))`;

  return (
    <Box>
      <Box sx={{ ...styles.daysHeader, gridTemplateColumns }}>
        <Box sx={styles.axisHeaderCell} />
        {Array.from({ length: SKELETON_DAYS }).map((_, index) => (
          <Box key={index} sx={styles.dayHeaderCell}>
            <Skeleton variant="text" width={50} height={16} />
            <Skeleton variant="circular" width={32} height={32} />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          ...styles.grid,
          gridTemplateColumns,
          gridTemplateRows: `repeat(${SKELETON_ROWS}, 80px)`,
        }}
      >
        {Array.from({ length: SKELETON_ROWS }).map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <Box sx={{ ...styles.axisCell, gridRow: rowIndex + 1 }}>
              <Skeleton variant="text" width={40} height={16} />
            </Box>

            {Array.from({ length: SKELETON_DAYS }).map((__, dayIndex) => (
              <Box
                key={dayIndex}
                sx={{
                  ...styles.slotCell,
                  gridRow: rowIndex + 1,
                  gridColumn: dayIndex + 2,
                }}
              >
                {(rowIndex + dayIndex) % 3 === 0 && (
                  <Skeleton variant="rounded" width="90%" height="70%" />
                )}
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

const styles = {
  daysHeader: {
    display: "grid",
    gridTemplateRows: "100px",
    backgroundColor: getCalendarTableBg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTop: "1px solid",
    borderLeft: "1px solid",
    borderRight: "1px solid",
    borderColor: "divider",
  },
  axisHeaderCell: {
    gridColumn: 1,
    backgroundColor: getCalendarTableBg,
    borderBottom: "1px solid",
    borderColor: "divider",
  },
  dayHeaderCell: {
    p: 1,
    backgroundColor: getCalendarTableBg,
    borderBottom: "1px solid",
    borderLeft: "1px solid",
    borderColor: "divider",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  grid: {
    display: "grid",
    backgroundColor: getCalendarTableBg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderLeft: "1px solid",
    borderRight: "1px solid",
    borderBottom: "1px solid",
    borderColor: "divider",
  },
  axisCell: {
    gridColumn: 1,
    p: 1,
    textAlign: "right",
    borderBottom: "1px solid",
    borderColor: "divider",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  slotCell: {
    p: 1,
    borderBottom: "1px solid",
    borderLeft: "1px solid",
    borderColor: "divider",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
