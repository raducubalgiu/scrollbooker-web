import React, { memo } from "react";
import { Box, Theme, Typography } from "@mui/material";
import dayjs from "dayjs";

type WeeklyCalendarDaysHeaderProps = {
  frontendDays: any[];
};

const WeeklyCalendarDaysHeaderComponent = ({
  frontendDays,
}: WeeklyCalendarDaysHeaderProps) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.grid} />
      {frontendDays?.map((dayData, index) => {
        const isToday = dayjs().format("YYYY-MM-DD") === dayData.dateStr;

        return (
          <Box
            key={dayData.dateStr}
            sx={{
              gridColumn: index + 2,
              ...styles.day,
            }}
          >
            <Typography variant="subtitle2" sx={styles.dayName}>
              {dayData.dayName}
            </Typography>

            <Typography
              variant="h3"
              noWrap
              sx={{
                ...styles.dayFormattedBase,
                ...(isToday && styles.dayFormattedToday),
              }}
            >
              {dayData.dayFormatted}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export const WeeklyCalendarDaysHeader = memo(WeeklyCalendarDaysHeaderComponent);

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: `90px repeat(7, minmax(130px, 1fr))`,
    gridTemplateRows: `100px`,
    backgroundColor: "background.paper",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTop: "1px solid",
    borderLeft: "1px solid",
    borderRight: "1px solid",
    borderColor: "divider",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  grid: {
    gridColumn: 1,
    gridRow: 1,
    backgroundColor: "background.paper",
    borderBottom: "1px solid",
    borderColor: "divider",
  },
  day: {
    gridRow: 1,
    p: 1,
    textAlign: "center",
    backgroundColor: "background.paper",
    borderBottom: "1px solid",
    borderLeft: "1px solid",
    borderColor: "divider",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dayName: {
    textTransform: "uppercase",
    color: "text.secondary",
  },
  dayFormattedBase: {
    color: "text.primary",
    fontWeight: 600,
    mt: 1.5,
  },
  dayFormattedToday: {
    backgroundColor: "primary.main",
    color: "#fff",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: (theme: Theme) => `0 4px 12px ${theme.palette.primary.main}33`,
  },
};
