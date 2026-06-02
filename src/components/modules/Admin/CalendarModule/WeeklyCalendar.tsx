"use client";

import { useCustomQuery } from "@/hooks/useHttp";
import dayjs from "@/lib/dayjs";
import { CalendarEventsResponse } from "@/ts/models/booking/availability/CalendarEvents";
import { Box, ButtonBase, Typography } from "@mui/material";
import { Session } from "next-auth";
import { useMemo, useState } from "react";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { getScheduleBounds } from "./getScheduleBounds";
import { WeeklyCalendarHeader } from "./WeeklyCalendarHeader";
import CalendarEvent from "./CalendarEvent";
import { getFrontendDays } from "./getFrontendDays";

type WeeklyCalendarProps = {
  session: Session;
  schedules: Schedule[];
};

export const WeeklyCalendar = ({ session, schedules }: WeeklyCalendarProps) => {
  const [slotDuration, setSlotDuration] = useState(60);
  const [currentWeekDate, setCurrentWeekDate] = useState<dayjs.Dayjs>(() =>
    dayjs()
  );

  const frontendDays = useMemo(() => {
    return getFrontendDays(currentWeekDate, schedules);
  }, [currentWeekDate, schedules]);

  const startDateStr = useMemo(
    () => currentWeekDate.startOf("week").format("YYYY-MM-DD"),
    [currentWeekDate]
  );
  const endDateStr = useMemo(
    () => currentWeekDate.endOf("week").format("YYYY-MM-DD"),
    [currentWeekDate]
  );

  const { data } = useCustomQuery<CalendarEventsResponse>({
    key: [
      "weekly-calendar",
      slotDuration,
      session?.user_id,
      startDateStr,
      endDateStr,
    ],
    url: "/api/availability/weekly-calendar",
    options: {
      enabled: !!session?.user_id,
    },
    params: {
      start_date: startDateStr,
      end_date: endDateStr,
      user_id: session?.user_id,
      slot_duration: slotDuration,
    },
  });

  const { days } = data || {};

  const bounds = useMemo(() => getScheduleBounds(schedules), [schedules]);

  const { timeStrings, rowMap, totalRows } = useMemo(() => {
    if (!bounds) {
      return { timeStrings: [], rowMap: {}, totalRows: 0 };
    }

    let current = dayjs(`2026-01-01T${bounds.minTime}`);
    const end = dayjs(`2026-01-01T${bounds.maxTime}`);

    const strings: string[] = [];
    const map: Record<string, number> = {};
    let rowIndex = 2;

    while (current.isBefore(end)) {
      const timeFormatted = current.format("HH:mm:ss");
      strings.push(timeFormatted);
      map[timeFormatted] = rowIndex;

      current = current.add(slotDuration, "minute");
      rowIndex++;
    }

    const finalTimeFormatted = end.format("HH:mm:ss");
    map[finalTimeFormatted] = rowIndex;

    return { timeStrings: strings, rowMap: map, totalRows: rowIndex - 1 };
  }, [bounds, slotDuration]);

  if (totalRows === 0) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: "center",
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Typography color="text.secondary" fontWeight={500}>
          Acest angajat nu are un program de lucru configurat.
        </Typography>
      </Box>
    );
  }

  const handlePrevWeek = () =>
    setCurrentWeekDate((prev) => prev.subtract(1, "week"));
  const handleNextWeek = () =>
    setCurrentWeekDate((prev) => prev.add(1, "week"));
  const handleToday = () => setCurrentWeekDate(dayjs());

  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <WeeklyCalendarHeader
        currentWeekDate={currentWeekDate}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
        slotDuration={slotDuration}
        onSlotDurationChange={(duration) => setSlotDuration(duration)}
        onBlockSlots={() => {}}
        onAddAppointment={() => {}}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `90px repeat(7, minmax(130px, 1fr))`,
          gridTemplateRows: `70px repeat(${totalRows - 1}, 100px)`,
          overflow: "hidden",
          backgroundColor: "background.paper",
        }}
      >
        {/* ==========================================
            1. HEADER: ZILELE SĂPTĂMÂNII (Row 1)
            ========================================== */}
        <Box
          sx={{
            gridColumn: 1,
            gridRow: 1,
            backgroundColor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />
        {frontendDays?.map((dayData, index) => {
          return (
            <Box
              key={dayData.dateStr}
              sx={{
                gridColumn: index + 2,
                gridRow: 1,
                p: 1,
                textAlign: "center",
                backgroundColor: "background.paper",
                borderTop: "1px solid",
                borderBottom: "1px solid",
                borderLeft: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", textTransform: "capitalize" }}
              >
                {dayData.dayName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {dayData.dayFormatted}
              </Typography>
            </Box>
          );
        })}

        {/* ==========================================
            2. AXA ORARĂ DIN STÂNGA (Coloana 1)
            ========================================== */}
        {timeStrings.map((time) => {
          const currentRow = rowMap[time];
          return (
            <Box
              key={`axis-${time}`}
              sx={{
                gridColumn: 1,
                gridRow: currentRow,
                p: 1,
                textAlign: "right",
                pr: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.paper",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                {time.substring(0, 5)}
              </Typography>
            </Box>
          );
        })}

        {/* ==========================================
          3. STRATUL DE FUNDAL: CELULE ȘI BUTOANE (100% Client-side Static)
          ========================================== */}
        {frontendDays.map((dayData, dayIndex) => {
          const colIndex = dayIndex + 2;

          return timeStrings.map((time) => {
            const currentRow = rowMap[time];
            let isOutsideSchedule = true;

            if (
              dayData.schedule &&
              dayData.schedule.start_time &&
              dayData.schedule.end_time
            ) {
              const startWorkStr = dayData.schedule.start_time;
              const endWorkStr = dayData.schedule.end_time;
              const currentCellStr = time;
              if (
                currentCellStr >= startWorkStr &&
                currentCellStr < endWorkStr
              ) {
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
                    ? "action.disabledBackground"
                    : "transparent",
                }}
              >
                {isOutsideSchedule ? (
                  <Box
                    sx={(theme) => {
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
                        mixBlendMode:
                          theme.palette.mode === "light"
                            ? "multiply"
                            : "screen",
                        opacity: 0.15,
                      };
                    }}
                  />
                ) : (
                  <ButtonBase
                    onClick={() => {}}
                    sx={{
                      width: "100%",
                      height: "100%",
                      transition: "background-color 0.15s ease",
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  />
                )}
              </Box>
            );
          });
        })}

        {/* ==========================================
            4. STRATUL DE SUPRAPUNERE: EVENIMENTELE DIN BE
            ========================================== */}
        {data?.days?.map((dayBackend) => {
          const targetFrontendIndex = frontendDays.findIndex(
            (d) => d.dateStr === dayBackend.day
          );
          if (targetFrontendIndex === -1) return null;

          const colIndex = targetFrontendIndex + 2;

          return dayBackend.slots.map((slot, slotIndex) => (
            <CalendarEvent
              key={`event-${dayBackend.day}-${slotIndex}`}
              slot={slot}
              dayColumnIndex={colIndex}
              rowMap={rowMap}
              minTimeStr={bounds?.minTime || "09:00:00"} // <-- PARAMETRU NOU (din bounds-ul static)
              slotDuration={slotDuration} // <-- PARAMETRU NOU (din starea dropdown-ului)
            />
          ));
        })}
      </Box>
    </Box>
  );
};
