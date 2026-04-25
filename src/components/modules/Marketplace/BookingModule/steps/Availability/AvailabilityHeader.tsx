import { Box, Stack, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import dayjs from "@/lib/dayjs";
import React from "react";

type AvailabilityHeaderProps = {
  weeks: Dayjs[][];
  activeDate: Dayjs;
  maxDate: Dayjs;
  isLoadingAvailableDays: boolean;
  isAnimating: boolean;
  transform: number;
  onSetActiveDay: (day: Dayjs) => void;
  availableDaysSet: Set<string>;
};

const AvailabilityHeader = ({
  weeks,
  activeDate,
  maxDate,
  isLoadingAvailableDays,
  isAnimating,
  transform,
  onSetActiveDay,
  availableDaysSet,
}: AvailabilityHeaderProps) => {
  return (
    <Box sx={styles.container}>
      <Box
        sx={{
          display: "flex",
          width: "300%",
          position: "relative",
          left: "-100%",
          transform: `translateX(${transform}%)`,
          transition: isAnimating
            ? "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "none",
        }}
      >
        {weeks.map((week, idx) => (
          <Box key={idx} sx={styles.weekContainer}>
            <Box sx={styles.weekGrid}>
              {week.map((day) => {
                const dateStr = day.format("YYYY-MM-DD");
                const isSelected = day.isSame(activeDate, "day");
                const isPast = day.isBefore(dayjs().startOf("day"));
                const isOutOfRange = day.isAfter(maxDate);
                const hasSlots = availableDaysSet.has(dateStr);

                return (
                  <Stack
                    key={day.toString()}
                    spacing={1}
                    alignItems="center"
                    onClick={() =>
                      !isAnimating &&
                      !isPast &&
                      !isLoadingAvailableDays &&
                      onSetActiveDay(day)
                    }
                    sx={{
                      cursor: isPast ? "default" : "pointer",
                      opacity:
                        isPast ||
                        !hasSlots ||
                        isOutOfRange ||
                        isLoadingAvailableDays
                          ? 0.35
                          : 1,
                      pointerEvents: isAnimating ? "none" : "auto",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: "text.secondary",
                        textTransform: "capitalize",
                        mb: 0.5,
                      }}
                    >
                      {day.format("ddd")}
                    </Typography>

                    <Box
                      sx={{
                        width: 65,
                        height: 65,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        transition: "all 0.2s ease",
                        ...(isSelected
                          ? styles.activeDayCircle
                          : styles.inactiveDayCircle),
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight={isSelected ? 800 : 600}
                        color={isSelected ? "#fff" : "text.primary"}
                      >
                        {day.format("D")}
                      </Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AvailabilityHeader;

const styles = {
  container: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
    border: 1.5,
    borderColor: "divider",
    py: 5,
    borderRadius: 5,
  },
  weekContainer: {
    width: "33.3333%",
    flexShrink: 0,
    px: 1,
  },
  weekGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    width: "100%",
  },
  activeDayCircle: {
    bgcolor: "primary.main",
    color: "primary.contrastText",
    boxShadow: (theme: any) => `0 4px 10px ${theme.palette.primary.main}40`,
  },
  inactiveDayCircle: {
    bgcolor: "transparent",
    color: "text.primary",
    "&:hover": {
      bgcolor: "action.hover",
    },
  },
};
