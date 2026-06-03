"use client";

import { useCustomQuery } from "@/hooks/useHttp";
import dayjs from "@/lib/dayjs";
import {
  CalendarEventsResponse,
  CalendarEventsSlot,
} from "@/ts/models/booking/availability/CalendarEvents";
import { Box, Slide, Typography } from "@mui/material";
import { Session } from "next-auth";
import { useMemo, useState } from "react";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { getScheduleBounds } from "./getScheduleBounds";
import { WeeklyCalendarHeader } from "./WeeklyCalendarHeader";
import { getFrontendDays } from "./getFrontendDays";
import CalendarEvent from "./CalendarEvent/CalendarEvent";
import CreateAppointmentModal from "./CreateAppointmentModal/CreateAppointmentModal";
import { AppointmentBlockSlot } from "@/ts/models/booking/appointment/Appointment";
import BlockAppBar from "./BlockAppBar";

const rowHeightMap: Record<number, number> = {
  15: 100,
  30: 120,
  45: 140,
  60: 180,
};

type WeeklyCalendarProps = {
  session: Session;
  schedules: Schedule[];
};

type CreateAppointmentSlotType = {
  startLocale: string;
  endLocale: string;
  startUtc: string;
  endUtc: string;
};

type CreateAppointmentModalType = {
  open: boolean;
  slot: CreateAppointmentSlotType | null;
};

export const WeeklyCalendar = ({ session, schedules }: WeeklyCalendarProps) => {
  const [isBlocking, setIsBlocking] = useState(false);
  const [selectedSlotsToBlock, setSelectedSlotsToBlock] = useState<
    AppointmentBlockSlot[]
  >([]);
  const [createModal, setCreateModal] = useState<CreateAppointmentModalType>({
    open: false,
    slot: null,
  });
  const [slotDuration, setSlotDuration] = useState(60);
  const [currentWeekDate, setCurrentWeekDate] = useState<dayjs.Dayjs>(() =>
    dayjs()
  );

  const currentRowHeight = useMemo(() => {
    return rowHeightMap[slotDuration] || 100;
  }, [slotDuration]);

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

  const { data, isLoading } = useCustomQuery<CalendarEventsResponse>({
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

  const handleToggleSelectSlot = (slot: CalendarEventsSlot) => {
    setSelectedSlotsToBlock((prev) => {
      const isAlreadySelected = prev.some(
        (item) => item.start_date === slot.start_date_utc
      );

      if (isAlreadySelected) {
        return prev.filter((item) => item.start_date !== slot.start_date_utc);
      }

      const newBlockItem: AppointmentBlockSlot = {
        start_date: slot.start_date_utc,
        end_date: slot.end_date_utc,
      };

      return [...prev, newBlockItem];
    });
  };

  const handleToggleBlocking = () => {
    if (isBlocking) {
      setIsBlocking(false);
    } else {
      setIsBlocking(true);
    }
  };

  const handleCloseCreateModal = () => {
    setCreateModal({ open: false, slot: null });
  };

  const handleOpenCreateModal = (slot: CreateAppointmentSlotType | null) => {
    setCreateModal({
      open: true,
      slot,
    });
  };

  const handleResetSelectedSlots = () => {
    setIsBlocking(false);
    setSelectedSlotsToBlock([]);
  };

  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
        pb: isBlocking ? "100px" : 0,
        transition: "padding-bottom 0.2s ease",
      }}
    >
      <CreateAppointmentModal
        open={createModal.open}
        onClose={handleCloseCreateModal}
      />

      <WeeklyCalendarHeader
        currentWeekDate={currentWeekDate}
        isBlocking={isBlocking}
        isLoading={isLoading}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
        slotDuration={slotDuration}
        onSlotDurationChange={(duration) => setSlotDuration(duration)}
        onBlockSlots={handleToggleBlocking}
        onAddAppointment={() => handleOpenCreateModal(null)}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `90px repeat(7, minmax(130px, 1fr))`,
          gridTemplateRows: `100px repeat(${totalRows - 1}, ${currentRowHeight}px)`,
          overflow: "hidden",
          backgroundColor: "background.paper",
          borderRadius: 5,
          pb: 0,
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
          const isToday = dayjs().format("YYYY-MM-DD") === dayData.dateStr;

          return (
            <Box
              key={dayData.dateStr}
              sx={{
                gridColumn: index + 2,
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
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ textTransform: "uppercase", color: "text.secondary" }}
              >
                {dayData.dayName}
              </Typography>

              <Typography
                variant="h3"
                noWrap
                sx={{
                  color: "text.primary",
                  fontWeight: 600,
                  mt: 1.5,
                  ...(isToday && {
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
                    boxShadow: (theme) =>
                      `0 4px 12px ${theme.palette.primary.main}33`,
                  }),
                }}
              >
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
                alignItems: "flex-start",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: "text.secondary" }}
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
                    ? "background.default"
                    : "transparent",
                }}
              >
                {isOutsideSchedule && (
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

          if (targetFrontendIndex === -1 || !bounds || !bounds.minTime)
            return null;

          const colIndex = targetFrontendIndex + 2;
          const totalContentHeight = timeStrings.length * currentRowHeight;

          return (
            <Box
              key={`events-col-${dayBackend.day}`}
              sx={{
                gridColumn: colIndex,
                gridRowStart: 2,
                gridRowEnd: timeStrings.length + 2,
                position: "relative",
                height: `${totalContentHeight}px`,
                width: "100%",
              }}
            >
              {dayBackend.slots.map((slot, slotIndex) => {
                const isSlotChecked = selectedSlotsToBlock.some(
                  (item) => item.start_date === slot.start_date_utc
                );

                return (
                  <CalendarEvent
                    key={`slot-${dayBackend.day}-${slotIndex}`}
                    slot={slot}
                    isBlocking={isBlocking}
                    minTimeStr={bounds.minTime}
                    slotDuration={slotDuration}
                    rowHeight={currentRowHeight}
                    onSelectFreeSlot={(
                      startLocale,
                      endLocale,
                      startUtc,
                      endUtc
                    ) => {
                      if (!startLocale || !endLocale || !startUtc || !endUtc)
                        return;

                      handleOpenCreateModal({
                        startLocale,
                        endLocale,
                        startUtc,
                        endUtc,
                      });
                    }}
                    onToggleSelectSlot={handleToggleSelectSlot}
                    isSelected={isSlotChecked}
                    businessShortDomain={data?.business_short_domain}
                  />
                );
              })}
            </Box>
          );
        })}
      </Box>

      <Slide direction="up" in={isBlocking} mountOnEnter unmountOnExit>
        <BlockAppBar
          selectedSlotsToBlock={selectedSlotsToBlock}
          onReset={handleResetSelectedSlots}
        />
      </Slide>
    </Box>
  );
};
