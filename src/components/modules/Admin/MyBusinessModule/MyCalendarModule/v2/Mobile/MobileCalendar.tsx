"use client";

import React, { useMemo, useState } from "react";
import { Box, Fab, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import { Session } from "next-auth";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import MobileCalendarHeaderActions from "./MobileCalendarHeaderActions";
import MobileDayPager from "./MobileDayPager";
import MobileTimeline from "./MobileTimeline";
import MobileTimelineSkeleton from "./MobileTimelineSkeleton";
import MobileEmployeeSheet from "./MobileEmployeeSheet";
import MobileBlockBar from "./MobileBlockBar";
import {
  minutesFromDateTimeString,
  parseTimeStringToMinutes,
} from "./mobileGeometry";
import CreateOwnClientModal from "../CreateOwnClientModal/CreateOwnClientModal";
import CalendarSettingsModal from "../CalendarSettings/CalendarSettingsModal";
import { useMobileCalendar } from "./useMobileCalendar";
import BlockSlotsDialog from "../BlockSlots/BlockSlotsDialog";
import AppointmentDetailsDialog from "../AppointmentDetailsDialog";

type MobileCalendarProps = {
  session: Session;
};

const MobileCalendar = ({ session }: MobileCalendarProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [detailsAppointmentId, setDetailsAppointmentId] = useState<
    number | null
  >(null);

  const c = useMobileCalendar(session);

  const dayBounds = useMemo(() => {
    const scheduleStartMinutes = parseTimeStringToMinutes(
      c.daySchedule?.start_time
    );
    const scheduleEndMinutes = parseTimeStringToMinutes(
      c.daySchedule?.end_time
    );

    const slotsStartMinutes = c.daySlots
      .map((s) => minutesFromDateTimeString(s.start_date_locale))
      .filter((v): v is number => v !== null);
    const slotsEndMinutes = c.daySlots
      .map((s) => minutesFromDateTimeString(s.end_date_locale))
      .filter((v): v is number => v !== null);

    const dayStartMinutes = [
      scheduleStartMinutes,
      slotsStartMinutes.length ? Math.min(...slotsStartMinutes) : null,
    ].filter((v): v is number => v !== null);
    const dayEndMinutes = [
      scheduleEndMinutes,
      slotsEndMinutes.length ? Math.max(...slotsEndMinutes) : null,
    ].filter((v): v is number => v !== null);

    if (dayStartMinutes.length === 0 || dayEndMinutes.length === 0) return null;

    const start = Math.min(...dayStartMinutes);
    const end = Math.max(...dayEndMinutes);

    return start < end ? { start, end } : null;
  }, [c.daySchedule, c.daySlots]);

  return (
    <Box sx={styles.root}>
      <HeaderMobile
        customTitle={
          <Stack alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary">
              Calendar
            </Typography>
            <Typography variant="subtitle1" fontWeight={700} noWrap>
              {c.currentWeekStart.format("MMMM YYYY")}
            </Typography>
          </Stack>
        }
        customAction={
          <Box
            sx={{ cursor: "pointer", display: "flex" }}
            onClick={() => setIsSettingsOpen(true)}
          >
            <SettingsIcon sx={{ color: "text.primary" }} />
          </Box>
        }
      />

      <MobileCalendarHeaderActions
        showsEmployeeDropdown={c.showsEmployeeDropdown}
        ownAvatar={c.ownAvatar}
        ownCalendarColor={c.ownCalendarColor}
        ownFullname={c.ownFullname}
        selectedEmployeeColor={
          c.selectedEmployee
            ? c.employeeColorsMap.get(c.selectedEmployee.id) ?? null
            : null
        }
        ownUsername={c.ownUsername}
        selectedEmployee={c.selectedEmployee}
        isBlocking={c.isBlocking}
        hasFreeSlots={c.hasFreeSlots}
        enableBack
        enableNext
        onOpenEmployeeSheet={() => c.setIsEmployeeSheetOpen(true)}
        onToggleBlocking={c.handleToggleBlocking}
        onPreviousWeek={c.handlePreviousWeek}
        onNextWeek={c.handleNextWeek}
        isTodaySelected={c.isTodaySelected}
        onToday={c.handleToday}
      />

      <MobileDayPager
        weekStart={c.currentWeekStart}
        selectedDay={c.selectedDay}
        availableDaysSet={c.availableDaysSet}
        onSelectDay={c.handleSelectDay}
      />

      <Box sx={{ flex: 1, overflowY: "auto", px: 1 }}>
        {c.isLoadingEvents && <MobileTimelineSkeleton />}

        {!c.isLoadingEvents && c.isCalendarEventsError && (
          <Typography color="error.main" sx={{ textAlign: "center", py: 6 }}>
            Ceva nu a mers cum trebuie. Încearcă mai târziu.
          </Typography>
        )}

        {!c.isLoadingEvents && !c.isCalendarEventsError && dayBounds && (
          <MobileTimeline
            dayStartMinutes={dayBounds.start}
            currentTimeMinutes={c.currentTimeMinutes}
            dayEndMinutes={dayBounds.end}
            slots={c.daySlots}
            slotDuration={c.slotDuration}
            businessShortDomain={c.businessShortDomain}
            isBlocking={c.isBlocking}
            pendingBlockSlots={c.pendingBlockSlots}
            onSlotTap={(slot) =>
              c.handleSlotTap(slot, setDetailsAppointmentId)
            }
          />
        )}

        {!c.isLoadingEvents && !c.isCalendarEventsError && !dayBounds && (
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", py: 6 }}
          >
            Nu ai nici o rezervare
          </Typography>
        )}
      </Box>

      {c.isBlocking && (
        <MobileBlockBar
          isEnabled={c.hasPendingBlockChanges}
          onCancel={c.handleResetBlocking}
          onBlockConfirm={() => c.setIsBlockSheetOpen(true)}
        />
      )}

      {!c.isLoadingEvents && !c.isCalendarEventsError && !c.isBlocking && (
        <Fab
          {...(c.hasFreeSlots ? { color: "primary" as const } : {})}
          disabled={!c.hasFreeSlots}
          onClick={c.handleOpenAddOwnClient}
          sx={styles.fab}
        >
          <AddIcon />
        </Fab>
      )}

      <MobileEmployeeSheet
        open={c.isEmployeeSheetOpen}
        employees={c.employees}
        isLoading={c.isLoadingEmployees}
        selectedEmployeeId={c.resolvedSelectedEmployeeId}
        employeesAvailabilityMap={c.employeesAvailabilityMap}
        employeeColorsMap={c.employeeColorsMap}
        onSelect={c.handleSelectEmployee}
        onClose={() => c.setIsEmployeeSheetOpen(false)}
      />

      <BlockSlotsDialog
        open={c.isBlockSheetOpen}
        dayLabel={c.selectedDay.format("dddd, D MMMM")}
        slotLabels={Array.from(c.pendingBlockSlots).sort().map((slot) => slot.slice(11, 16))}
        isSaving={c.isLoadingBlock}
        onConfirm={c.handleConfirmBlock}
        onClose={() => c.setIsBlockSheetOpen(false)}
      />

      <AppointmentDetailsDialog
        appointmentId={detailsAppointmentId}
        onClose={() => setDetailsAppointmentId(null)}
        onAppointmentChange={c.refetchCalendarEvents}
      />

      <CreateOwnClientModal
        open={c.isAddingOwnClient}
        businessId={c.businessId ?? 0}
        providerUserId={c.targetUserId}
        employeeId={c.employeeIdFilter}
        initialSlot={c.ownClientSlot}
        onClose={c.handleCloseAddOwnClient}
        onCreated={c.refetchCalendarEvents}
      />

      <CalendarSettingsModal
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userId={session.user_id}
        canSetAppointmentGap={!c.showsEmployeeDropdown}
      />
    </Box>
  );
};

export default MobileCalendar;

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    position: "relative",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
  },
} as const;
