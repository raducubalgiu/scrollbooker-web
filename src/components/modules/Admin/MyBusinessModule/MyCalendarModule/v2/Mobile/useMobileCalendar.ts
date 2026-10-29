"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import dayjs from "@/lib/dayjs";
import {
  BUSINESS_CALENDAR_EVENTS_KEY,
  useGetAvailableDays,
  useGetBusinessCalendarEvents,
} from "@/controllers/booking/availability.controller";
import { useGetCalendarSettings } from "@/controllers/booking/calendarSettings.controller";
import { useGetAllEmployeesByOwner } from "@/controllers/booking/employee.controller";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { AppointmentBlockCreate } from "@/ts/models/booking/appointment/Appointment";
import { useCalendarAppointmentMutations } from "../../sharedComponents/useCalendarAppointmentMutations";
import {
  buildDaySlots,
  getCalendarBounds,
  getCalendarNow,
  getScheduleForDate,
  hasFreeSlot,
  timeToMinutes,
} from "../calendarSlots";
import { isInFuture, useNow } from "../useNow";
import { useCalendarUrlState } from "../useCalendarUrlState";

const DATE_FORMAT = "YYYY-MM-DD";

export const useMobileCalendar = (session: Session) => {
  const userId = session.user_id;
  const businessId = session.business_id ?? undefined;
  const businessOwnerId = session.business_owner_id ?? undefined;
  const hasEmployeesFlag = !!session.has_employees;

  const isOwner = businessOwnerId !== undefined && businessOwnerId === userId;
  const showsEmployeeDropdown = isOwner && hasEmployeesFlag;
  const selfEmployeeId =
    businessOwnerId !== undefined && businessOwnerId !== userId ? userId : undefined;

  const queryClient = useQueryClient();
  const nowMs = useNow();

  const {
    date: selectedDay,
    employeeId: selectedEmployeeId,
    setUrlState,
  } = useCalendarUrlState();
  const currentWeekStart = useMemo(
    () => selectedDay.startOf("week"),
    [selectedDay]
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
    employees?.find((e) => e.id === selectedEmployeeId)?.id ??
    employees?.[0]?.id ??
    null;

  const selectedEmployee = employees?.find(
    (e) => e.id === resolvedSelectedEmployeeId
  );

  const employeeIdFilter =
    selfEmployeeId ??
    (showsEmployeeDropdown ? resolvedSelectedEmployeeId ?? undefined : undefined);
  const isCalendarEnabled =
    !showsEmployeeDropdown || resolvedSelectedEmployeeId !== null;

  const dayStr = selectedDay.format(DATE_FORMAT);

  const {
    data: calendarEvents,
    isLoading,
    isPlaceholderData,
    isError: isCalendarEventsError,
    refetch: refetchCalendarEvents,
  } = useGetBusinessCalendarEvents({
    businessId,
    startDate: dayStr,
    endDate: dayStr,
    employeeId: employeeIdFilter,
    enabled: isCalendarEnabled,
  });

  const { data: allEmployeesDay } = useGetBusinessCalendarEvents({
    businessId,
    startDate: dayStr,
    endDate: dayStr,
    enabled: showsEmployeeDropdown && isEmployeeSheetOpen,
  });

  const timezone = calendarEvents?.timezone ?? dayjs.tz.guess();
  const now = useMemo(() => getCalendarNow(timezone, nowMs), [timezone, nowMs]);

  const currentTimeMinutes = useMemo(() => {
    const local = dayjs(nowMs).tz(timezone);
    return local.format(DATE_FORMAT) === dayStr
      ? local.hour() * 60 + local.minute()
      : null;
  }, [nowMs, timezone, dayStr]);

  const calendarEmployee = calendarEvents?.employees[0];
  const targetUserId = calendarEmployee?.id ?? resolvedSelectedEmployeeId ?? userId;

  const daySchedule = useMemo(
    () =>
      calendarEmployee
        ? getScheduleForDate(calendarEmployee.schedules, dayStr)
        : undefined,
    [calendarEmployee, dayStr]
  );

  const daySlots = useMemo(() => {
    if (!calendarEvents || !calendarEmployee) return [];

    const bounds = getCalendarBounds([calendarEmployee], [dayStr]);
    if (!bounds) return [];

    return buildDaySlots({
      employee: calendarEmployee,
      date: dayStr,
      timezone: calendarEvents.timezone,
      slotDuration,
      gridStartMinutes: timeToMinutes(bounds.minTime),
      now,
    });
  }, [calendarEvents, calendarEmployee, dayStr, slotDuration, now]);

  const employeesAvailabilityMap = useMemo(() => {
    const map = new Map<number, boolean>();
    if (!allEmployeesDay) return map;

    const dayNow = getCalendarNow(allEmployeesDay.timezone, nowMs);
    allEmployeesDay.employees.forEach((employee) => {
      const bounds = getCalendarBounds([employee], [dayStr]);
      const slots = bounds
        ? buildDaySlots({
            employee,
            date: dayStr,
            timezone: allEmployeesDay.timezone,
            slotDuration,
            gridStartMinutes: timeToMinutes(bounds.minTime),
            now: dayNow,
          })
        : [];
      map.set(employee.id, hasFreeSlot(slots));
    });

    return map;
  }, [allEmployeesDay, dayStr, slotDuration, nowMs]);

  const weekStartStr = currentWeekStart.format(DATE_FORMAT);
  const weekEndStr = currentWeekStart.add(6, "day").format(DATE_FORMAT);

  const { data: availableDays } = useGetAvailableDays({
    businessId,
    startDate: weekStartStr,
    endDate: weekEndStr,
    slotDuration,
    employeeId: employeeIdFilter,
    enabled: isCalendarEnabled,
  });

  const availableDaysSet = useMemo(
    () => new Set(availableDays ?? []),
    [availableDays]
  );

  useEffect(() => {
    const blocked = new Set(
      daySlots.filter((s) => s.is_blocked).map((s) => s.start_date_locale)
    );
    setDefaultBlockedStartLocale(blocked);
    setSelectedStartLocale(blocked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarEvents]);

  const hasFreeSlots = hasFreeSlot(daySlots);

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
      setUrlState({ date });
    },
    [isBlocking, defaultBlockedStartLocale, setUrlState]
  );

  const handlePreviousWeek = useCallback(() => {
    handleSelectDay(selectedDay.subtract(1, "week"));
  }, [handleSelectDay, selectedDay]);

  const handleNextWeek = useCallback(() => {
    handleSelectDay(selectedDay.add(1, "week"));
  }, [handleSelectDay, selectedDay]);

  const handleToday = useCallback(() => {
    handleSelectDay(dayjs());
  }, [handleSelectDay]);

  const isTodaySelected = dayStr === dayjs(nowMs).format(DATE_FORMAT);

  const handleSelectEmployee = useCallback(
    (employeeId: number) => {
      setUrlState({ employeeId });
      setIsEmployeeSheetOpen(false);
    },
    [setUrlState]
  );

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
      queryClient.invalidateQueries({ queryKey: [BUSINESS_CALENDAR_EVENTS_KEY] });
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
      if (isFreeSlot && !isInFuture(slot.start_date_utc)) return;

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
    currentTimeMinutes,
    isTodaySelected,
    handleToday,
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
    isLoadingEvents: isLoading || isPlaceholderData,
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
