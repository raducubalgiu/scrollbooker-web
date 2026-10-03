"use client";

import { Box, Theme, Typography } from "@mui/material";
import { EmployeesDayCalendarHeader } from "./EmployeesDayCalendarHeader";
import CreateAppointmentModal from "../CreateAppointmentModal/CreateAppointmentModal";
import BlockAppBar from "../BlockAppBar";
import { EmployeesDayCalendarColumnsHeader } from "./EmployeesDayCalendarColumnsHeader";
import { EmployeesDayCalendarGridBackground } from "./EmployeesDayCalendarGridBackground";
import { EmployeesDayCalendarEventsLayer } from "./EmployeesDayCalendarEventsLayer";
import CalendarLoadingOverlay from "../CalendarLoadingOverlay";
import { useEmployeesDayCalendar } from "./useEmployeesDayCalendar";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { EMPLOYEE_COLUMN_MIN_WIDTH } from "./employeesDayCalendarConstants";

export const EmployeesDayCalendar = () => {
  const {
    isBlocking,
    selectedSlotsToBlock,
    createModal,
    userId,
    slotDuration,
    setSlotDuration,
    rowHeightLevel,
    setRowHeightLevel,
    isExpanded,
    setIsExpanded,
    currentDay,
    currentRowHeight,
    employees,
    timeStrings,
    rowMap,
    totalRows,
    isLoading,
    isLoadingBlock,
    isLoadingLastMinute,
    isLoadingOwnClient,
    bounds,
    data,
    handlePrevDay,
    handleNextDay,
    handleToday,
    handleToggleSelectSlot,
    handleToggleBlocking,
    handleCloseCreateModal,
    handleOpenCreateModal,
    handleCloseBlocking,
    handleConfirmBlockPayload,
    handleLastMinutePayload,
    handleOwnClientPayload,
  } = useEmployeesDayCalendar();

  if (employees.length === 0 && !isLoading) {
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
          Nu există niciun angajat adăugat în echipa ta încă.
        </Typography>
      </Box>
    );
  }

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
          Niciun angajat nu are un program de lucru configurat.
        </Typography>
      </Box>
    );
  }

  return (
    <MainLayout hideAction showHeader={false} sx={{ bgcolor: "background.paper" }}>
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
            bgcolor: "background.paper",
            overflow: "auto",
            p: 2.5,
          }),
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

        <EmployeesDayCalendarHeader
          currentDay={currentDay}
          isBlocking={isBlocking}
          isLoading={isLoading}
          onPrevDay={handlePrevDay}
          onNextDay={handleNextDay}
          onToday={handleToday}
          slotDuration={slotDuration}
          onSlotDurationChange={(duration) => setSlotDuration(duration)}
          rowHeightLevel={rowHeightLevel}
          onRowHeightChange={setRowHeightLevel}
          isExpanded={isExpanded}
          onToggleExpanded={() => setIsExpanded(!isExpanded)}
          userId={userId}
          onBlockSlots={handleToggleBlocking}
          onAddAppointment={() => handleOpenCreateModal(null, null)}
        />

        <Box sx={{ overflowX: "auto" }}>
          <EmployeesDayCalendarColumnsHeader employees={employees} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `90px repeat(${employees.length}, minmax(${EMPLOYEE_COLUMN_MIN_WIDTH}px, 1fr))`,
              gridTemplateRows: `repeat(${totalRows - 1}, ${currentRowHeight}px)`,
              backgroundColor: "background.default",
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
                    backgroundColor: "background.default",
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

            <EmployeesDayCalendarGridBackground
              employees={employees}
              timeStrings={timeStrings}
              rowMap={rowMap}
            />

            <EmployeesDayCalendarEventsLayer
              employees={employees}
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
