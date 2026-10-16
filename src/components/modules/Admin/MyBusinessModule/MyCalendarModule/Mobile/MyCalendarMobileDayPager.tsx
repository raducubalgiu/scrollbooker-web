"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

type MyCalendarMobileDayPagerProps = {
  weekStart: dayjs.Dayjs;
  selectedDay: dayjs.Dayjs;
  availableDaysSet: Set<string>;
  onSelectDay: (date: dayjs.Dayjs) => void;
};

const MyCalendarMobileDayPager = ({
  weekStart,
  selectedDay,
  availableDaysSet,
  onSelectDay,
}: MyCalendarMobileDayPagerProps) => {
  const today = dayjs().startOf("day");

  const days = Array.from({ length: 7 }, (_, i) => weekStart.add(i, "day"));

  return (
    <Box sx={styles.row}>
      {days.map((date) => {
        const dateStr = date.format("YYYY-MM-DD");
        const isAvailable = availableDaysSet.has(dateStr);
        const isSelected = date.isSame(selectedDay, "day");
        const isPastDay = date.startOf("day").isBefore(today);

        const dayNumberColor = isSelected
          ? "common.white"
          : isPastDay || !isAvailable
            ? "text.disabled"
            : "text.primary";

        return (
          <Box
            key={dateStr}
            sx={styles.dayColumn}
            onClick={() => onSelectDay(date)}
          >
            <Typography
              variant="body2"
              color={isAvailable ? "text.primary" : "text.disabled"}
              noWrap
            >
              {date.format("ddd")}
            </Typography>

            <Box
              sx={{
                ...styles.circle,
                backgroundColor: isSelected ? "primary.main" : "transparent",
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={700}
                sx={{ color: dayNumberColor }}
              >
                {date.format("D")}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default MyCalendarMobileDayPager;

const styles = {
  row: {
    display: "flex",
    width: "100%",
    px: 2,
  },
  dayColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
    py: 1.5,
    cursor: "pointer",
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
} as const;
