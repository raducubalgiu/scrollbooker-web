"use client";

import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import dayjs from "@/lib/dayjs";
import {
  CalendarEventsResponse,
  CalendarEventsSlot,
} from "@/ts/models/booking/availability/CalendarEvents";
import { Box, Typography } from "@mui/material";
import { Session } from "next-auth";
import { useMemo, useState } from "react";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { getScheduleBounds } from "../getScheduleBounds";
import { WeeklyCalendarHeader } from "./WeeklyCalendarHeader";
import { getFrontendDays } from "../getFrontendDays";
import CreateAppointmentModal from "../CreateAppointmentModal/CreateAppointmentModal";
import { AppointmentBlockSlot } from "@/ts/models/booking/appointment/Appointment";
import BlockAppBar from "../BlockAppBar";
import { WeeklyCalendarDaysHeader } from "./WeeklyCalendarDaysHeader";
import { WeeklyCalendarGridBackground } from "./WeeklyCalendarGridBackground";
import { WeeklyCalendarEventsLayer } from "./WeeklyCalendarEventsLayer";
import CalendarLoadingOverlay from "../CalendarLoadingOverlay";

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

  const { data, isLoading, refetch } = useCustomQuery<CalendarEventsResponse>({
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

  const { mutate: handleBlock, isPending: isLoadingBlock } = useMutate({
    key: ["block-appointments"],
    url: "/api/appointments/block",
    options: {
      onSuccess: async () => {
        refetch();
        handleCloseBlocking();
      },
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
      setSelectedSlotsToBlock([]);
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

  const handleCloseBlocking = () => {
    setIsBlocking(false);
    setSelectedSlotsToBlock([]);
  };

  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
        pb: isBlocking ? "120px" : 0,
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

      {/* ====================================================================
      1. CONTAINER STICKY: DOAR RÂNDUL CU ZILELE SĂPTĂMÂNII
      ==================================================================== */}
      <WeeklyCalendarDaysHeader frontendDays={frontendDays} />

      {/* ====================================================================
      2. CONTAINER CONȚINUT: AXA ORARĂ, FUNDALUL ȘI SUPRAPUNERILE
      ==================================================================== */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `90px repeat(7, minmax(130px, 1fr))`,
          gridTemplateRows: `repeat(${totalRows - 1}, ${currentRowHeight}px)`,
          //overflow: "hidden",
          backgroundColor: "background.paper",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderLeft: "1px solid",
          borderRight: "1px solid",
          borderBottom: "1px solid",
          borderColor: "divider",
          pb: 0,
          position: "relative",
        }}
      >
        {/* ==========================================
          2. AXA ORARĂ DIN STÂNGA (Coloana 1)
          ========================================== */}
        {timeStrings.map((time) => {
          const baseRow = rowMap[time];
          if (baseRow === undefined) return null;
          const currentRow = baseRow - 1;

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
          3. STRATUL DE FUNDAL: CELULE ȘI BUTOANE
          ========================================== */}
        <WeeklyCalendarGridBackground
          frontendDays={frontendDays}
          timeStrings={timeStrings}
          rowMap={rowMap}
        />

        {/* ====================================================================
          4. STRATUL DE SUPRAPUNERE EXTRAS ȘI MEMOIZAT (ZERO PERF IMPACT)
          ==================================================================== */}
        <WeeklyCalendarEventsLayer
          daysBackend={data?.days}
          frontendDays={frontendDays}
          bounds={bounds}
          currentRowHeight={currentRowHeight}
          slotDuration={slotDuration}
          timeStringsLength={timeStrings.length}
          selectedSlotsToBlock={selectedSlotsToBlock}
          isBlocking={isBlocking}
          businessShortDomain={data?.business_short_domain ?? ""}
          handleToggleSelectSlot={handleToggleSelectSlot}
          handleOpenCreateModal={handleOpenCreateModal}
        />

        {/* ==========================================
          5. OVERLAY DINAMIC DE LOADING (Injected directly in CSS Grid)
          ========================================== */}
        {isLoading && <CalendarLoadingOverlay />}
      </Box>

      <BlockAppBar
        isBlocking={isBlocking}
        isLoadingBlock={isLoadingBlock}
        selectedSlotsToBlock={selectedSlotsToBlock}
        onCancel={handleCloseBlocking}
        onBlock={() => {
          handleBlock({
            blocked_message: "Slot Blocat",
            slots: selectedSlotsToBlock,
          });
        }}
      />
    </Box>
  );
};
