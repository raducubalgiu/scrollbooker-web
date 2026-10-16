"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { Session } from "next-auth";
import {
  useGetAvailableDays,
  useGetCalendarEvents,
  useGetEmployeesDayAvailability,
} from "@/controllers/booking/availability.controller";
import { useGetCalendarSettings } from "@/controllers/booking/calendarSettings.controller";
import { useGetSchedulesByUserId } from "@/controllers/booking/schedule.controller";
import { useGetAllEmployeesByOwner } from "@/controllers/booking/employee.controller";
import { useCalendarAppointmentMutations } from "../sharedComponents/useCalendarAppointmentMutations";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { AppointmentBlockCreate } from "@/ts/models/booking/appointment/Appointment";

export const useMyCalendarMobile = (session: Session) => {
  const userId = session.user_id;
  const businessId = session.business_id ?? undefined;
  const businessOwnerId = session.business_owner_id ?? undefined;
  const hasEmployeesFlag = !!session.has_employees;

  const isOwner = businessOwnerId !== undefined && businessOwnerId === userId;
  const selfEmployeeId =
    businessOwnerId !== undefined && businessOwnerId !== userId ? userId : null;
  const showsEmployeeDropdown = isOwner && hasEmployeesFlag;

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [selectedDay, setSelectedDay] = useState(() => dayjs());
  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    dayjs().startOf("week")
  );
  const [isBlocking, setIsBlocking] = useState(false);
  const [defaultBlockedStartLocale, setDefaultBlockedStartLocale] = useState<
    Set<string>
  >(new Set());
  const [selectedStartLocale, setSelectedStartLocale] = useState<Set<string>>(
    new Set()
  );
  const [ownClientSlot, setOwnClientSlot] = useState<CalendarEventsSlot | null>(
    null
  );
  const [isAddingOwnClient, setIsAddingOwnClient] = useState(false);
  const [isEmployeeSheetOpen, setIsEmployeeSheetOpen] = useState(false);
  const [isBlockSheetOpen, setIsBlockSheetOpen] = useState(false);

  const { data: calendarSettings } = useGetCalendarSettings(userId);
  const slotDuration = calendarSettings?.slot_duration_minutes ?? 60;

  const { data: employees, isLoading: isLoadingEmployees } =
    useGetAllEmployeesByOwner({
      businessOwnerId: userId,
      isEnabled: showsEmployeeDropdown,
    });

  const resolvedSelectedEmployeeId =
    selectedEmployeeId ?? employees?.[0]?.id ?? null;

  const selectedEmployee = employees?.find(
    (e) => e.id === resolvedSelectedEmployeeId
  );

  const effectiveEmployeeId =
    selfEmployeeId ?? (showsEmployeeDropdown ? resolvedSelectedEmployeeId : null);
  const targetUserId = effectiveEmployeeId ?? userId;

  const { data: employeesAvailability } = useGetEmployeesDayAvailability({
    day: selectedDay.format("YYYY-MM-DD"),
    slotDuration,
    enabled: isEmployeeSheetOpen,
  });

  const employeesAvailabilityMap = useMemo(() => {
    const map = new Map<number, boolean>();
    employeesAvailability?.forEach((item) => {
      map.set(item.employee_id, item.has_availability);
    });
    return map;
  }, [employeesAvailability]);

  const weekStartStr = currentWeekStart.format("YYYY-MM-DD");
  const weekEndStr = currentWeekStart.add(6, "day").format("YYYY-MM-DD");

  const { data: availableDays } = useGetAvailableDays({
    businessId,
    startDate: weekStartStr,
    endDate: weekEndStr,
    slotDuration,
    employeeId: showsEmployeeDropdown
      ? resolvedSelectedEmployeeId ?? undefined
      : undefined,
    enabled: !showsEmployeeDropdown || resolvedSelectedEmployeeId !== null,
  });

  const availableDaysSet = useMemo(
    () => new Set(availableDays ?? []),
    [availableDays]
  );

  const dayStr = selectedDay.format("YYYY-MM-DD");

  const {
    data: calendarEvents,
    isLoading: isLoadingEvents,
    isError: isCalendarEventsError,
    refetch: refetchCalendarEvents,
  } = useGetCalendarEvents({
    businessId,
    startDate: dayStr,
    endDate: dayStr,
    slotDuration,
    employeeId: effectiveEmployeeId ?? undefined,
    enabled: !showsEmployeeDropdown || resolvedSelectedEmployeeId !== null,
  });

  const { data: schedules } = useGetSchedulesByUserId(String(targetUserId));

  const daySchedule = useMemo(() => {
    const weekdayName = selectedDay.format("dddd").toLowerCase();
    return schedules?.find((s) => s.day_of_week.toLowerCase() === weekdayName);
  }, [schedules, selectedDay]);

  const daySlots = useMemo(
    () => calendarEvents?.days[0]?.slots ?? [],
    [calendarEvents]
  );

  useEffect(() => {
    const blocked = new Set(
      daySlots.filter((s) => s.is_blocked).map((s) => s.start_date_locale)
    );
    setDefaultBlockedStartLocale(blocked);
    setSelectedStartLocale(blocked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarEvents]);

  const hasFreeSlots = daySlots.some(
    (slot) => !slot.is_booked && !slot.is_blocked
  );

  const pendingBlockSlots = useMemo(() => {
    const result = new Set<string>();
    selectedStartLocale.forEach((v) => {
      if (!defaultBlockedStartLocale.has(v)) result.add(v);
    });
    return result;
  }, [selectedStartLocale, defaultBlockedStartLocale]);

  const hasPendingBlockChanges = useMemo(() => {
    if (selectedStartLocale.size !== defaultBlockedStartLocale.size) return true;
    for (const v of selectedStartLocale) {
      if (!defaultBlockedStartLocale.has(v)) return true;
    }
    return false;
  }, [selectedStartLocale, defaultBlockedStartLocale]);

  const handleSelectDay = useCallback(
    (date: dayjs.Dayjs) => {
      if (isBlocking) {
        setIsBlocking(false);
        setSelectedStartLocale(defaultBlockedStartLocale);
      }
      setSelectedDay(date);
    },
    [isBlocking, defaultBlockedStartLocale]
  );

  const handlePreviousWeek = useCallback(() => {
    setCurrentWeekStart((prev) => prev.subtract(1, "week"));
  }, []);

  const handleNextWeek = useCallback(() => {
    setCurrentWeekStart((prev) => prev.add(1, "week"));
  }, []);

  const handleSelectEmployee = useCallback((employeeId: number) => {
    setSelectedEmployeeId(employeeId);
    setIsEmployeeSheetOpen(false);
  }, []);

  const handleToggleBlocking = useCallback(() => {
    setIsBlocking((prev) => !prev);
  }, []);

  const handleResetBlocking = useCallback(() => {
    setSelectedStartLocale(defaultBlockedStartLocale);
    setIsBlocking(false);
  }, [defaultBlockedStartLocale]);

  const handleToggleBlockDate = useCallback((startDateLocale: string) => {
    setSelectedStartLocale((prev) => {
      const next = new Set(prev);
      if (next.has(startDateLocale)) {
        next.delete(startDateLocale);
      } else {
        next.add(startDateLocale);
      }
      return next;
    });
  }, []);

  const { handleBlock, isLoadingBlock } = useCalendarAppointmentMutations({
    onBlockSuccess: () => {
      refetchCalendarEvents();
      setIsBlockSheetOpen(false);
      setIsBlocking(false);
    },
    onOwnClientSuccess: () => {},
  });

  const handleConfirmBlock = useCallback(
    (message: string) => {
      const slotsToBlock = daySlots
        .filter((s) => pendingBlockSlots.has(s.start_date_locale))
        .map((s) => ({
          start_date: s.start_date_utc,
          end_date: s.end_date_utc,
          user_id: targetUserId,
        }));

      if (slotsToBlock.length === 0) return;

      const payload: AppointmentBlockCreate = {
        blocked_message: message,
        slots: slotsToBlock,
      };

      handleBlock(payload);
    },
    [daySlots, pendingBlockSlots, targetUserId, handleBlock]
  );

  const handleSlotTap = useCallback(
    (slot: CalendarEventsSlot, onNavigateToAppointment: (id: number) => void) => {
      const isFreeSlot = !slot.is_booked && !slot.is_blocked;

      if (isBlocking && isFreeSlot) {
        handleToggleBlockDate(slot.start_date_locale);
      } else if (!isBlocking && isFreeSlot) {
        setOwnClientSlot(slot);
        setIsAddingOwnClient(true);
      } else if (!isBlocking && slot.is_booked && slot.id) {
        onNavigateToAppointment(slot.id);
      }
    },
    [isBlocking, handleToggleBlockDate]
  );

  const handleOpenAddOwnClient = useCallback(() => {
    setOwnClientSlot(null);
    setIsAddingOwnClient(true);
  }, []);

  const handleCloseAddOwnClient = useCallback(() => {
    setIsAddingOwnClient(false);
    refetchCalendarEvents();
  }, [refetchCalendarEvents]);

  return {
    showsEmployeeDropdown,
    ownUsername: session.username ?? "",
    ownAvatar: session.avatar ?? null,
    businessShortDomain: calendarEvents?.business_short_domain,
    employees,
    isLoadingEmployees,
    selectedEmployee,
    resolvedSelectedEmployeeId,
    employeesAvailabilityMap,
    selectedDay,
    currentWeekStart,
    availableDaysSet,
    daySchedule,
    slotDuration,
    daySlots,
    isLoadingEvents,
    isCalendarEventsError,
    hasFreeSlots,
    isBlocking,
    pendingBlockSlots,
    hasPendingBlockChanges,
    selectedStartLocale,
    isLoadingBlock,
    ownClientSlot,
    isAddingOwnClient,
    isEmployeeSheetOpen,
    isBlockSheetOpen,
    targetUserId,
    businessId,
    handleSelectDay,
    handlePreviousWeek,
    handleNextWeek,
    handleSelectEmployee,
    handleToggleBlocking,
    handleResetBlocking,
    handleConfirmBlock,
    handleSlotTap,
    handleOpenAddOwnClient,
    handleCloseAddOwnClient,
    setIsEmployeeSheetOpen,
    setIsBlockSheetOpen,
    refetchCalendarEvents,
  };
};
