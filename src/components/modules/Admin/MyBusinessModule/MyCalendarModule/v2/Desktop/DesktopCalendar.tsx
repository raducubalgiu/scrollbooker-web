"use client";

import { useCallback, useRef, useState } from "react";
import { Box, Theme, Typography } from "@mui/material";
import { Session } from "next-auth";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { DesktopCalendarHeader } from "./DesktopCalendarHeader";
import CreateOwnClientModal from "../CreateOwnClientModal/CreateOwnClientModal";
import DesktopBlockBar from "./DesktopBlockBar";
import DesktopLoadingOverlay from "./DesktopLoadingOverlay";
import {
  getCalendarPageBg,
  getCalendarTableBg,
} from "../calendarSurfaceColors";
import { DesktopWeekSkeleton } from "./DesktopWeekSkeleton";
import { DesktopDaySkeleton } from "./DesktopDaySkeleton";
import { EMPLOYEE_COLUMN_MIN_WIDTH } from "./desktopCalendarConstants";
import { useDesktopCalendar } from "./useDesktopCalendar";
import { DesktopColumnsHeader } from "./DesktopColumnsHeader";
import { DesktopGridBackground } from "./DesktopGridBackground";
import { DesktopEventsLayer } from "./DesktopEventsLayer";
import BlockSlotsDialog from "../BlockSlots/BlockSlotsDialog";
import AppointmentDetailsDialog from "../AppointmentDetailsDialog";

type DesktopCalendarProps = {
  session: Session;
};

const DAY_COLUMN_MIN_WIDTH = 130;
const AXIS_COLUMN_WIDTH = 90;

export const DesktopCalendar = ({ session }: DesktopCalendarProps) => {
  const c = useDesktopCalendar(session);

  const [detailsAppointmentId, setDetailsAppointmentId] = useState<
    number | null
  >(null);
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);

  const handleBodyScroll = useCallback(() => {
    if (headerScrollRef.current && bodyScrollRef.current) {
      headerScrollRef.current.scrollLeft = bodyScrollRef.current.scrollLeft;
    }
  }, []);

  const columnMinWidth =
    c.mode === "day" ? EMPLOYEE_COLUMN_MIN_WIDTH : DAY_COLUMN_MIN_WIDTH;
  const gridTemplateColumns = `${AXIS_COLUMN_WIDTH}px repeat(${c.headerColumns.length}, minmax(${columnMinWidth}px, 1fr))`;
  const gridMinWidth = AXIS_COLUMN_WIDTH + c.headerColumns.length * columnMinWidth;

  const header = (
    <DesktopCalendarHeader
      label={c.label}
      isBlocking={c.isBlocking}
      isLoading={c.isFetching}
      onPrevious={c.handlePrevious}
      onNext={c.handleNext}
      onToday={c.handleToday}
      slotDuration={c.slotDuration}
      onSlotDurationChange={c.setSlotDuration}
      rowHeightLevel={c.rowHeightLevel}
      onRowHeightChange={c.setRowHeightLevel}
      isExpanded={c.isExpanded}
      onToggleExpanded={() => c.setIsExpanded(!c.isExpanded)}
      userId={session.user_id}
      canSetAppointmentGap={c.mode === "week"}
      onBlockSlots={c.handleToggleBlocking}
      onAddAppointment={() =>
        c.handleOpenCreateModal(
          null,
          c.mode === "week" ? c.employees[0]?.id ?? null : null
        )
      }
    />
  );

  if (c.isInitialLoading) {
    return (
      <MainLayout hideAction showHeader={false} sx={{ bgcolor: getCalendarPageBg }}>
        <Box sx={{ width: "100%", boxSizing: "border-box" }}>
          {header}
          {c.mode === "day" ? <DesktopDaySkeleton /> : <DesktopWeekSkeleton />}
        </Box>
      </MainLayout>
    );
  }

  const emptyMessage =
    c.employees.length === 0
      ? "Nu există niciun angajat adăugat în echipa ta încă."
      : !c.bounds
        ? "Nu există un program de lucru configurat pentru această perioadă."
        : null;

  return (
    <MainLayout hideAction showHeader={false} sx={{ bgcolor: getCalendarPageBg }}>
      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",
          pb: c.isBlocking ? "120px" : 0,
          transition: "padding-bottom 0.2s ease",
          ...(c.isExpanded && {
            position: "fixed",
            inset: 0,
            zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
            bgcolor: getCalendarPageBg,
            overflow: "auto",
            p: 2.5,
            pt: 0,
          }),
        }}
      >
        <CreateOwnClientModal
          open={c.createModal.open}
          businessId={c.businessId ?? 0}
          providerUserId={c.createModal.userId}
          employeeId={
            session.is_employee || session.has_employees
              ? c.createModal.userId ?? undefined
              : undefined
          }
          initialSlot={c.createModal.slot}
          onClose={c.handleCloseCreateModal}
        />

        <Box sx={{ pt: c.isExpanded ? 2.5 : 0 }}>{header}</Box>

        {emptyMessage || !c.bounds ? (
          <Box sx={styles.empty}>
            <Typography color="text.secondary" fontWeight={500}>
              {emptyMessage}
            </Typography>
          </Box>
        ) : (
          <>
            <DesktopColumnsHeader
              columns={c.headerColumns}
              gridTemplateColumns={gridTemplateColumns}
              scrollRef={headerScrollRef}
            />

            <Box ref={bodyScrollRef} onScroll={handleBodyScroll} sx={{ overflowX: "auto" }}>
              <Box
                sx={{
                  ...styles.grid,
                  gridTemplateColumns,
                  minWidth: gridMinWidth,
                  gridTemplateRows: `repeat(${c.timeStrings.length}, ${c.currentRowHeight}px)`,
                }}
              >
                {c.timeStrings.map((time, index) => (
                  <Box key={`axis-${time}`} sx={{ ...styles.axisCell, gridRow: index + 1 }}>
                    <Typography variant="caption" sx={styles.axisLabel}>
                      {time.substring(0, 5)}
                    </Typography>
                  </Box>
                ))}

                <DesktopGridBackground
                  columns={c.columns}
                  timeStrings={c.timeStrings}
                  slotDuration={c.slotDuration}
                  now={c.now}
                />

                <DesktopEventsLayer
                  columns={c.columns}
                  bounds={c.bounds}
                  currentRowHeight={c.currentRowHeight}
                  slotDuration={c.slotDuration}
                  timeStringsLength={c.timeStrings.length}
                  selectedSlotsToBlock={c.selectedSlotsToBlock}
                  isBlocking={c.isBlocking}
                  businessShortDomain={c.businessShortDomain}
                  onToggleSelectSlot={(columnKey, slot) => {
                    const column = c.columns.find((item) => item.key === columnKey);
                    if (column) c.handleToggleSelectSlot(column.userId, slot);
                  }}
                  onOpenCreateModal={(columnKey, slot) => {
                    const column = c.columns.find((item) => item.key === columnKey);
                    c.handleOpenCreateModal(slot, column?.userId ?? null);
                  }}
                  onOpenDetails={setDetailsAppointmentId}
                />

                {c.isFetching && <DesktopLoadingOverlay />}
              </Box>
            </Box>
          </>
        )}

        <DesktopBlockBar
          isBlocking={c.isBlocking}
          isLoadingBlock={c.isLoadingBlock}
          selectedSlotsToBlock={c.selectedSlotsToBlock}
          onCancel={c.handleCloseBlocking}
          onBlock={c.handleOpenBlockDialog}
        />

        <AppointmentDetailsDialog
          appointmentId={detailsAppointmentId}
          onClose={() => setDetailsAppointmentId(null)}
          onAppointmentChange={c.invalidateCalendar}
        />

        <BlockSlotsDialog
          open={c.isBlockDialogOpen}
          dayLabel={c.blockDialogLabels.dayLabel}
          slotLabels={c.blockDialogLabels.slotLabels}
          isSaving={c.isLoadingBlock}
          onConfirm={c.handleConfirmBlock}
          onClose={c.handleCloseBlockDialog}
        />
      </Box>
    </MainLayout>
  );
};

const styles = {
  empty: {
    p: 4,
    textAlign: "center",
    border: "1px dashed",
    borderColor: "divider",
    borderRadius: 2,
  },
  grid: {
    display: "grid",
    backgroundColor: getCalendarTableBg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderLeft: "1px solid",
    borderRight: "1px solid",
    borderBottom: "1px solid",
    borderColor: "divider",
    pb: 0,
    position: "relative",
  },
  axisCell: {
    gridColumn: 1,
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
  },
  axisLabel: {
    fontWeight: 700,
    color: "text.secondary",
  },
};
