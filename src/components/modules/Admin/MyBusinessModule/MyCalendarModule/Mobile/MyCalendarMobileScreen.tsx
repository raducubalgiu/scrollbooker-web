"use client";

import React, { useMemo, useState } from "react";
import { Box, Fab, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import { AppRoutes } from "@/utils/routes";
import { useMyCalendarMobile } from "./useMyCalendarMobile";
import MyCalendarMobileHeaderActions from "./MyCalendarMobileHeaderActions";
import MyCalendarMobileDayPager from "./MyCalendarMobileDayPager";
import MyCalendarMobileTimeline from "./MyCalendarMobileTimeline";
import MyCalendarMobileEmployeeSheet from "./MyCalendarMobileEmployeeSheet";
import MyCalendarMobileBlockBar from "./MyCalendarMobileBlockBar";
import MyCalendarMobileBlockDrawer from "./MyCalendarMobileBlockDrawer";
import CreateOwnClientModal from "../sharedComponents/CreateOwnClientModal/CreateOwnClientModal";
import CalendarSettingsModal from "../sharedComponents/CalendarSettings/CalendarSettingsModal";
import {
  minutesFromDateTimeString,
  parseTimeStringToMinutes,
} from "./myCalendarMobileGeometry";

type MyCalendarMobileScreenProps = {
  session: Session;
};

const MyCalendarMobileScreen = ({ session }: MyCalendarMobileScreenProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const c = useMyCalendarMobile(session);

  const dayBounds = useMemo(() => {
    const scheduleStartMinutes = parseTimeStringToMinutes(c.daySchedule?.start_time);
    const scheduleEndMinutes = parseTimeStringToMinutes(c.daySchedule?.end_time);

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

  if (!isMobile) return null;

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

      <MyCalendarMobileHeaderActions
        showsEmployeeDropdown={c.showsEmployeeDropdown}
        ownAvatar={c.ownAvatar}
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
      />

      <MyCalendarMobileDayPager
        weekStart={c.currentWeekStart}
        selectedDay={c.selectedDay}
        availableDaysSet={c.availableDaysSet}
        onSelectDay={c.handleSelectDay}
      />

      <Box sx={{ flex: 1, overflowY: "auto", px: 1 }}>
        {c.isLoadingEvents && (
          <Typography color="text.secondary" sx={{ textAlign: "center", py: 6 }}>
            Se încarcă...
          </Typography>
        )}

        {!c.isLoadingEvents && c.isCalendarEventsError && (
          <Typography color="error.main" sx={{ textAlign: "center", py: 6 }}>
            Ceva nu a mers cum trebuie. Încearcă mai târziu.
          </Typography>
        )}

        {!c.isLoadingEvents && !c.isCalendarEventsError && dayBounds && (
          <MyCalendarMobileTimeline
            dayStartMinutes={dayBounds.start}
            dayEndMinutes={dayBounds.end}
            slots={c.daySlots}
            slotDuration={c.slotDuration}
            businessShortDomain={c.businessShortDomain}
            isBlocking={c.isBlocking}
            pendingBlockSlots={c.pendingBlockSlots}
            onSlotTap={(slot) =>
              c.handleSlotTap(slot, (id) =>
                router.push(AppRoutes.appointmentDetails(id))
              )
            }
          />
        )}

        {!c.isLoadingEvents && !c.isCalendarEventsError && !dayBounds && (
          <Typography color="text.secondary" sx={{ textAlign: "center", py: 6 }}>
            Nu ai nici o rezervare
          </Typography>
        )}
      </Box>

      {c.isBlocking && (
        <MyCalendarMobileBlockBar
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

      <MyCalendarMobileEmployeeSheet
        open={c.isEmployeeSheetOpen}
        employees={c.employees}
        isLoading={c.isLoadingEmployees}
        selectedEmployeeId={c.resolvedSelectedEmployeeId}
        employeesAvailabilityMap={c.employeesAvailabilityMap}
        onSelect={c.handleSelectEmployee}
        onClose={() => c.setIsEmployeeSheetOpen(false)}
      />

      <MyCalendarMobileBlockDrawer
        open={c.isBlockSheetOpen}
        dayLabel={c.selectedDay.format("dddd, D MMMM")}
        selectedSlots={c.pendingBlockSlots}
        isSaving={c.isLoadingBlock}
        onConfirm={c.handleConfirmBlock}
        onClose={() => c.setIsBlockSheetOpen(false)}
      />

      <CreateOwnClientModal
        open={c.isAddingOwnClient}
        businessId={c.businessId ?? 0}
        initialSlot={c.ownClientSlot}
        onClose={c.handleCloseAddOwnClient}
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

export default MyCalendarMobileScreen;

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
