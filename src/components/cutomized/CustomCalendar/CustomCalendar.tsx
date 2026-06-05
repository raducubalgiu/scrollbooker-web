import React, { memo, useCallback, useMemo, useState } from "react";
import { Box, Theme, Typography } from "@mui/material";
import CalendarHeader, { CalendarActionTypeEnum } from "./CalendarHeader";

import { Dayjs } from "dayjs";
import dayjs from "@/lib/dayjs";

import localeData from "dayjs/plugin/localeData";
dayjs.extend(localeData);

type Props = {
  value: Dayjs | null;
  onChange: (date: Dayjs) => void;
};

const CELL_SIZE = "56px";
const CELL_GAP = 0.5;

const CustomCalendar: React.FC<Props> = ({ value, onChange }) => {
  const today = useMemo(() => dayjs().startOf("day"), []);
  const maxDate = useMemo(() => today.add(6, "month").endOf("day"), [today]);

  const { weekDays, firstDayOfWeek } = useMemo(() => {
    const localeConfig = dayjs.localeData();
    const firstDay = localeConfig.firstDayOfWeek();
    const localizedWeekDays = localeConfig.weekdaysMin();

    return {
      firstDayOfWeek: firstDay,
      weekDays: [
        ...localizedWeekDays.slice(firstDay),
        ...localizedWeekDays.slice(0, firstDay),
      ],
    };
  }, []);

  const [viewMonth, setViewMonth] = useState<Dayjs>(() =>
    today.startOf("month")
  );

  const canGoPrev = viewMonth.isAfter(today.startOf("month"));
  const canGoNext = viewMonth.isBefore(maxDate.startOf("month"));

  const days = useMemo(() => {
    const startOfMonth = viewMonth.startOf("month");
    const endOfMonth = viewMonth.endOf("month");
    const startOffset = (startOfMonth.day() - firstDayOfWeek + 7) % 7;

    const daysArray: (Dayjs | null)[] = [];
    for (let i = 0; i < startOffset; i++) daysArray.push(null);
    for (let d = 0; d < endOfMonth.date(); d++) {
      daysArray.push(startOfMonth.add(d, "day"));
    }
    while (daysArray.length % 7 !== 0) daysArray.push(null);

    return daysArray;
  }, [viewMonth, firstDayOfWeek]);

  const handleNavigate = useCallback(
    (action: CalendarActionTypeEnum) => {
      if (action === CalendarActionTypeEnum.GO_PREV && canGoPrev)
        setViewMonth((m) => m.subtract(1, "month"));
      else if (action === CalendarActionTypeEnum.GO_NEXT && canGoNext)
        setViewMonth((m) => m.add(1, "month"));
    },
    [canGoPrev, canGoNext]
  );

  return (
    <Box sx={styles.root}>
      <CalendarHeader
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        title={viewMonth.format("MMMM YYYY")}
        onSetTitle={handleNavigate}
      />

      <Box sx={styles.gridHeader}>
        {weekDays.map((d) => (
          <Typography
            key={d}
            variant="caption"
            fontWeight={600}
            sx={styles.weekDayText}
          >
            {d}
          </Typography>
        ))}
      </Box>

      <Box sx={styles.gridDays}>
        {days.map((day, i) => {
          if (!day) {
            return <Box key={i} sx={styles.emptyCell} />;
          }

          const isPast = day.isBefore(today);
          const isAfterMax = day.isAfter(maxDate);
          const isDisabled = isPast || isAfterMax;
          const isSelected = value ? day.isSame(value, "day") : false;
          const isToday = day.isSame(today, "day");

          return (
            <Box
              key={i}
              onClick={() => !isDisabled && onChange(day)}
              sx={styles.dayCell(isDisabled, isSelected, isToday)}
            >
              {day.date()}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default memo(CustomCalendar);

const styles = {
  root: {
    width: "100%",
    maxWidth: `calc(7 * ${CELL_SIZE} + 6 * ${CELL_GAP}px)`,
  },
  gridHeader: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: CELL_GAP,
    justifyItems: "center",
    mb: 1,
  },
  weekDayText: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
    textTransform: "capitalize",
    color: (theme: Theme) => theme.palette.grey[500],
  },
  gridDays: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: CELL_GAP,
    justifyItems: "center",
  },
  emptyCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
  },
  dayCell: (isDisabled: boolean, isSelected: boolean, isToday: boolean) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: "50%",
    cursor: isDisabled ? "default" : "pointer",
    bgcolor: isSelected ? "primary.main" : "transparent",
    color: isDisabled
      ? "text.disabled"
      : isSelected
        ? "#fff"
        : isToday
          ? "primary.main"
          : "text.primary",
    fontWeight: isToday || isSelected ? 700 : 400,
    fontSize: "1.05rem",
    border: isToday
      ? "1px solid"
      : !isSelected
        ? "2px solid"
        : "2px solid transparent",
    borderColor: isToday && !isSelected ? "primary.main" : "transparent",
    transition: "background-color 0.15s, color 0.15s",
    "&:hover": !isDisabled
      ? {
          bgcolor: isSelected ? "primary.dark" : "action.hover",
        }
      : {},
  }),
};
