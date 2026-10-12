"use client";

import { useCallback, useRef } from "react";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { Box, Theme, Typography } from "@mui/material";
import { Session } from "next-auth";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { CalendarHeader } from "../sharedComponents/CalendarHeader";
import CreateAppointmentModal from "../sharedComponents/CreateAppointmentModal/CreateAppointmentModal";
import BlockAppBar from "../sharedComponents/BlockAppBar";
import { WeeklyCalendarDaysHeader } from "./WeeklyCalendarDaysHeader";
import { CalendarGridBackground } from "../sharedComponents/CalendarGridBackground";
import { CalendarEventsLayer } from "../sharedComponents/CalendarEventsLayer";
import CalendarLoadingOverlay from "../sharedComponents/CalendarLoadingOverlay";
import { useWeeklyCalendar } from "./useWeeklyCalendar";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { WeeklyCalendarSkeleton } from "./WeeklyCalendarSkeleton";
import {
  getCalendarPageBg,
  getCalendarTableBg,
} from "../sharedComponents/calendarSurfaceColors";

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
    rowHeightLevel,
    setRowHeightLevel,
    isExpanded,
    setIsExpanded,
    currentWeekDate,
    currentRowHeight,
    frontendDays,
    columns,
    timeStrings,
    rowMap,
    totalRows,
    isLoading,
    isInitialLoading,
    isLoadingBlock,
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
    handleOwnClientPayload,
  } = useWeeklyCalendar({ session, schedules });

  const headerScrollRef = useRef<HTMLDivElement>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);

  const handleBodyScroll = useCallback(() => {
    if (headerScrollRef.current && bodyScrollRef.current) {
      headerScrollRef.current.scrollLeft = bodyScrollRef.current.scrollLeft;
    }
  }, []);

  const startOfWeek = currentWeekDate.startOf("week");
  const endOfWeek = currentWeekDate.endOf("week");
  const formattedRange = `${startOfWeek.format("DD")} - ${endOfWeek.format("DD")} ${endOfWeek.format("MMMM YYYY")}`;

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

  if (isInitialLoading) {
    return (
      <MainLayout
        hideAction
        showHeader={false}
        sx={{ bgcolor: getCalendarPageBg }}
      >
        <Box sx={{ width: "100%", boxSizing: "border-box" }}>
          <CalendarHeader
            label={formattedRange}
            isBlocking={isBlocking}
            isLoading={isLoading}
            onPrevious={handlePrevWeek}
            onNext={handleNextWeek}
            onToday={handleToday}
            slotDuration={slotDuration}
            onSlotDurationChange={(duration) => setSlotDuration(duration)}
            rowHeightLevel={rowHeightLevel}
            onRowHeightChange={setRowHeightLevel}
            isExpanded={isExpanded}
            onToggleExpanded={() => setIsExpanded(!isExpanded)}
            userId={session?.user_id}
            canSetAppointmentGap
            onBlockSlots={handleToggleBlocking}
            onAddAppointment={() => handleOpenCreateModal(null)}
          />

          <WeeklyCalendarSkeleton />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout hideAction showHeader={false} sx={{ bgcolor: getCalendarPageBg }}>
      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",
          pb: isBlocking ? "120px" : 0,
          transition: "padding-bottom 0.2s ease",
          ...(isExpanded && {
            position: "fixed",
            inset: 0,
            zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
            bgcolor: getCalendarPageBg,
            overflow: "auto",
            p: 2.5,
          }),
        }}
      >
        <CreateAppointmentModal
          createModal={createModal}
          isLoadingOwnClient={isLoadingOwnClient}
          onCreateOwnClient={handleOwnClientPayload}
          onClose={handleCloseCreateModal}
        />

        <CalendarHeader
          label={formattedRange}
          isBlocking={isBlocking}
          isLoading={isLoading}
          onPrevious={handlePrevWeek}
          onNext={handleNextWeek}
          onToday={handleToday}
          slotDuration={slotDuration}
          onSlotDurationChange={(duration) => setSlotDuration(duration)}
          rowHeightLevel={rowHeightLevel}
          onRowHeightChange={setRowHeightLevel}
          isExpanded={isExpanded}
          onToggleExpanded={() => setIsExpanded(!isExpanded)}
          userId={session?.user_id}
          canSetAppointmentGap
          onBlockSlots={handleToggleBlocking}
          onAddAppointment={() => handleOpenCreateModal(null)}
        />

        {/* ====================================================================
      1. CONTAINER STICKY: DOAR RÂNDUL CU ZILELE SĂPTĂMÂNII
      ==================================================================== */}
        <WeeklyCalendarDaysHeader
          frontendDays={frontendDays}
          scrollRef={headerScrollRef}
        />

        {/* ====================================================================
      2. CONTAINER CONȚINUT: AXA ORARĂ, FUNDALUL ȘI SUPRAPUNERILE
      ==================================================================== */}
        <Box
          ref={bodyScrollRef}
          onScroll={handleBodyScroll}
          sx={{ overflowX: "auto" }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `90px repeat(7, minmax(130px, 1fr))`,
              gridTemplateRows: `repeat(${totalRows - 1}, ${currentRowHeight}px)`,
              //overflow: "hidden",
              backgroundColor: getCalendarTableBg,
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
                    backgroundColor: getCalendarTableBg,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    position: "sticky",
                    left: 0,
                    zIndex: 8,
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
            <CalendarGridBackground
              columns={columns}
              timeStrings={timeStrings}
              rowMap={rowMap}
            />

            {/* ====================================================================
          4. STRATUL DE SUPRAPUNERE EXTRAS ȘI MEMOIZAT (ZERO PERF IMPACT)
          ==================================================================== */}
            <CalendarEventsLayer
              columns={columns}
              bounds={bounds}
              currentRowHeight={currentRowHeight}
              slotDuration={slotDuration}
              timeStringsLength={timeStrings.length}
              selectedSlotsToBlock={selectedSlotsToBlock}
              isBlocking={isBlocking}
              businessShortDomain={data?.business_short_domain ?? ""}
              onToggleSelectSlot={(_key, slot) => handleToggleSelectSlot(slot)}
              onOpenCreateModal={(_key, slot) => handleOpenCreateModal(slot)}
            />

            {/* ==========================================
          5. OVERLAY DINAMIC DE LOADING (Injected directly in CSS Grid)
          ========================================== */}
            {isLoading && <CalendarLoadingOverlay />}
          </Box>
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
