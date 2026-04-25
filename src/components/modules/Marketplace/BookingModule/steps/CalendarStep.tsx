"use client";

import React, { useState, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ro";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Theme,
  alpha,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

dayjs.locale("ro");

const CalendarStep = () => {
  const [activeDate, setActiveDate] = useState<Dayjs>(dayjs());
  const [transform, setTransform] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const weeks = useMemo(() => {
    const currentStart = activeDate.startOf("week");
    const getWeekDays = (start: Dayjs) =>
      [...Array(7)].map((_, i) => start.add(i, "day"));

    return [
      getWeekDays(currentStart.subtract(7, "day")),
      getWeekDays(currentStart),
      getWeekDays(currentStart.add(7, "day")),
    ];
  }, [activeDate]);

  const handleNavigate = (direction: "prev" | "next") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTransform(direction === "next" ? -(100 / 3) : 100 / 3);

    setTimeout(() => {
      setActiveDate((prev) =>
        direction === "next" ? prev.add(7, "day") : prev.subtract(7, "day")
      );
      setTransform(0);
      setIsAnimating(false);
    }, 400);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography fontWeight={800} fontSize={47.5} mt={3}>
        Data și ora
      </Typography>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mt={5}
        mb={3}
      >
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{ textTransform: "capitalize" }}
        >
          {activeDate.format("MMMM YYYY")}
        </Typography>
        <Stack flexDirection="row" gap={1}>
          <IconButton
            size="large"
            onClick={() => handleNavigate("prev")}
            sx={styles.navButton}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="large"
            onClick={() => handleNavigate("next")}
            sx={styles.navButton}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {/* CAROUSEL VIEWPORT */}
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          border: 1.5,
          borderColor: "divider",
          py: 5,
          borderRadius: 5,
        }}
      >
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
                  const isSelected = day.isSame(activeDate, "day");

                  return (
                    <Stack
                      key={day.toString()}
                      spacing={1}
                      alignItems="center"
                      onClick={() => !isAnimating && setActiveDate(day)}
                      sx={{ cursor: "pointer" }}
                    >
                      {/* Ziua Saptamanii (Lu, Ma, etc.) */}
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

                      {/* Cifra Zilei cu fundal rotunjit pentru Active */}
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

      {/* SLOTURI PLACEHOLDER */}
      <Box sx={styles.slotsPlaceholder}>
        {[
          "09:00",
          "10:00",
          "11:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
        ].map((slot, i) => (
          <Stack
            key={i}
            flexDirection="row"
            sx={(theme: Theme) => ({
              p: 3,
              border: 1.5,
              borderColor: "divider",
              borderRadius: 2.5,
              mb: 2.5,
              cursor: "pointer",
              "&:hover": {
                color: theme.palette.text.primary + "90",
                backgroundColor: alpha(theme.palette.divider, 0),
              },
            })}
          >
            <Typography variant="h6" fontWeight={600}>
              {slot}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

const styles = {
  navButton: {
    border: 1.5,
    borderColor: "divider",
    borderRadius: 50,
    p: 2.5,
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
  slotsPlaceholder: {
    mt: 4,
    width: "100%",
  },
};

export default CalendarStep;
