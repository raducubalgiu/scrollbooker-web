"use client";

import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { Box, Typography } from "@mui/material";
import { Session } from "next-auth";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { WeeklyCalendarHeader } from "./WeeklyCalendarHeader";
import CreateAppointmentModal from "../CreateAppointmentModal/CreateAppointmentModal";
import BlockAppBar from "../BlockAppBar";
import { WeeklyCalendarDaysHeader } from "./WeeklyCalendarDaysHeader";
import { WeeklyCalendarGridBackground } from "./WeeklyCalendarGridBackground";
import { WeeklyCalendarEventsLayer } from "./WeeklyCalendarEventsLayer";
import CalendarLoadingOverlay from "../CalendarLoadingOverlay";
import { useWeeklyCalendar } from "./useWeeklyCalendar";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";

type WeeklyCalendarProps = {
  session: Session;
  schedules: Schedule[];
};

export type CreateAppointmentModalType = {
  open: boolean;
  slot: CalendarEventsSlot | null;
};

export const WeeklyCalendar = ({ session, schedules }: WeeklyCalendarProps) => {
  const {
    isBlocking,
    selectedSlotsToBlock,
    createModal,
    slotDuration,
    setSlotDuration,
    currentWeekDate,
    currentRowHeight,
    frontendDays,
    timeStrings,
    rowMap,
    totalRows,
    isLoading,
    isLoadingBlock,
    isLoadingLastMinute,
    isLoadingOwnClient,
    bounds,
    data,
    handlePrevWeek,
    handleNextWeek,
    handleToday,
    handleToggleSelectSlot,
    handleToggleBlocking,
    handleCloseCreateModal,
    handleOpenCreateModal,
    handleCloseBlocking,
    handleConfirmBlockPayload,
    handleLastMinutePayload,
    handleOwnClientPayload,
  } = useWeeklyCalendar({ session, schedules });

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

  return (
    <MainLayout hideAction showHeader={false}>
      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",
          pb: isBlocking ? "120px" : 0,
          transition: "padding-bottom 0.2s ease",
        }}
      >
        <CreateAppointmentModal
          createModal={createModal}
          isLoadingLastMinute={isLoadingLastMinute}
          onCreateLastMinute={handleLastMinutePayload}
          isLoadingOwnClient={isLoadingOwnClient}
          onCreateOwnClient={handleOwnClientPayload}
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
            onToggleSelectSlot={handleToggleSelectSlot}
            onOpenCreateModal={handleOpenCreateModal}
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
          onBlock={handleConfirmBlockPayload}
        />
      </Box>
    </MainLayout>
  );
};
