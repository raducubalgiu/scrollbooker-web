"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import dayjs from "@/lib/dayjs";
import {
  BUSINESS_CALENDAR_EVENTS_KEY,
  useGetBusinessCalendarEvents,
} from "@/controllers/booking/availability.controller";
import { useGetCalendarSettings } from "@/controllers/booking/calendarSettings.controller";
import {
  AppointmentBlockCreate,
  AppointmentBlockSlot,
} from "@/ts/models/booking/appointment/Appointment";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { BusinessCalendarEmployee } from "@/ts/models/booking/availability/BusinessCalendarEvents";
import { createTimeRowMap } from "../../createTimeRowMap";
import { useCalendarAppointmentMutations } from "../../sharedComponents/useCalendarAppointmentMutations";
import {
  ROW_HEIGHT_LEVELS,
  RowHeightLevel,
} from "../../sharedComponents/CalendarSettings/rowHeightLevels";
import {
  buildDaySlots,
  getCalendarBounds,
  getCalendarNow,
  timeToMinutes,
} from "../calendarSlots";
import { useNow } from "../useNow";
import { useCalendarUrlState } from "../useCalendarUrlState";
import { DesktopEventsColumn } from "./DesktopEventsLayer";
import { DesktopHeaderColumn } from "./DesktopColumnsHeader";

export type DesktopCalendarMode = "day" | "week";

type CreateModalState = {
  open: boolean;
  slot: CalendarEventsSlot | null;
  userId: number | null;
};

const DATE_FORMAT = "YYYY-MM-DD";

export const useDesktopCalendar = (session: Session) => {
  const mode: DesktopCalendarMode =
    !session.is_employee && session.has_employees ? "day" : "week";
  const businessId = session.business_id ?? undefined;

  const queryClient = useQueryClient();
  const nowMs = useNow();

  const { date: currentDate, setUrlState } = useCalendarUrlState();
  const [isBlocking, setIsBlocking] = useState(false);
  const [selectedSlotsToBlock, setSelectedSlotsToBlock] = useState<
    AppointmentBlockSlot[]
  >([]);
  const [createModal, setCreateModal] = useState<CreateModalState>({
    open: false,
    slot: null,
    userId: null,
  });
  const [slotDuration, setSlotDuration] = useState(60);
  const [rowHeightLevel, setRowHeightLevel] = useState<RowHeightLevel>("medium");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);

  const { data: calendarSettings } = useGetCalendarSettings(session.user_id);
  const hasAppliedDefaultDurationRef = useRef(false);

  useEffect(() => {
    if (hasAppliedDefaultDurationRef.current || !calendarSettings) return;
    hasAppliedDefaultDurationRef.current = true;
    setSlotDuration(calendarSettings.slot_duration_minutes);
  }, [calendarSettings]);

  const { dates, startDate, endDate } = useMemo(() => {
    const first = mode === "day" ? currentDate : currentDate.startOf("week");
    const length = mode === "day" ? 1 : 7;

    return {
      dates: Array.from({ length }, (_, index) =>
        first.add(index, "day").format(DATE_FORMAT)
      ),
      startDate: first.format(DATE_FORMAT),
      endDate: first.add(length - 1, "day").format(DATE_FORMAT),
    };
  }, [mode, currentDate]);

  const { data, isLoading, isFetching } = useGetBusinessCalendarEvents({
    businessId,
    startDate,
    endDate,
  });

  const employees = useMemo(() => data?.employees ?? [], [data]);

  const now = useMemo(
    () => getCalendarNow(data?.timezone ?? dayjs.tz.guess(), nowMs),
    [data?.timezone, nowMs]
  );

  const bounds = useMemo(
    () => getCalendarBounds(employees, dates),
    [employees, dates]
  );

  const { timeStrings, totalRows } = useMemo(() => {
    if (!bounds) return { timeStrings: [], totalRows: 0 };
    return createTimeRowMap(bounds.minTime, bounds.maxTime, slotDuration);
  }, [bounds, slotDuration]);

  const columns = useMemo<DesktopEventsColumn[]>(() => {
    if (!data || !bounds) return [];

    const gridStartMinutes = timeToMinutes(bounds.minTime);
    const toColumn = (key: string, employee: BusinessCalendarEmployee, date: string) => ({
      key,
      userId: employee.id,
      date,
      isToday: date === now.date,
      slots: buildDaySlots({
        employee,
        date,
        timezone: data.timezone,
        slotDuration,
        gridStartMinutes,
        now,
      }),
    });

    if (mode === "day") {
      return employees.map((employee) =>
        toColumn(String(employee.id), employee, startDate)
      );
    }

    const [person] = employees;
    if (!person) return [];

    return dates.map((date) => toColumn(date, person, date));
  }, [data, bounds, employees, mode, dates, startDate, slotDuration, now]);

  const headerColumns = useMemo<DesktopHeaderColumn[]>(() => {
    if (mode === "day") {
      return employees.map((employee) => ({
        kind: "employee",
        key: String(employee.id),
        fullname: employee.fullname ?? employee.username,
        avatar: employee.avatar,
      }));
    }

    return dates.map((date) => ({
      kind: "day",
      key: date,
      dayName: dayjs(date).format("ddd"),
      dayNumber: dayjs(date).format("D"),
      isToday: date === now.date,
    }));
  }, [mode, employees, dates, now.date]);

  const label = useMemo(() => {
    if (mode === "day") return currentDate.format("dddd, DD MMMM YYYY");

    const weekStart = currentDate.startOf("week");
    const weekEnd = currentDate.endOf("week");
    return `${weekStart.format("DD")} - ${weekEnd.format("DD")} ${weekEnd.format("MMMM YYYY")}`;
  }, [mode, currentDate]);

  const step = mode === "day" ? "day" : "week";

  const invalidateCalendar = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [BUSINESS_CALENDAR_EVENTS_KEY] });
  }, [queryClient]);

  const handleCloseBlocking = useCallback(() => {
    setIsBlocking(false);
    setSelectedSlotsToBlock([]);
  }, []);

  const { handleBlock, isLoadingBlock } = useCalendarAppointmentMutations({
    onBlockSuccess: () => {
      setIsBlockDialogOpen(false);
      handleCloseBlocking();
      invalidateCalendar();
    },
    onOwnClientSuccess: () => {},
  });

  const handlePrevious = useCallback(() => {
    setUrlState({ date: currentDate.subtract(1, step) });
  }, [setUrlState, currentDate, step]);

  const handleNext = useCallback(() => {
    setUrlState({ date: currentDate.add(1, step) });
  }, [setUrlState, currentDate, step]);

  const handleToday = useCallback(() => {
    setUrlState({ date: null });
  }, [setUrlState]);

  const handleToggleSelectSlot = useCallback(
    (userId: number, slot: CalendarEventsSlot) => {
      setSelectedSlotsToBlock((prev) => {
        const isSelected = prev.some(
          (item) =>
            item.start_date === slot.start_date_utc && item.user_id === userId
        );

        if (isSelected) {
          return prev.filter(
            (item) =>
              !(item.start_date === slot.start_date_utc && item.user_id === userId)
          );
        }

        return [
          ...prev,
          {
            start_date: slot.start_date_utc,
            end_date: slot.end_date_utc,
            user_id: userId,
          },
        ];
      });
    },
    []
  );

  const handleToggleBlocking = useCallback(() => {
    setIsBlocking((prev) => {
      if (prev) setSelectedSlotsToBlock([]);
      return !prev;
    });
  }, []);

  const handleOpenCreateModal = useCallback(
    (slot: CalendarEventsSlot | null, userId: number | null) => {
      setCreateModal({ open: true, slot, userId });
    },
    []
  );

  const handleCloseCreateModal = useCallback(() => {
    setCreateModal({ open: false, slot: null, userId: null });
    invalidateCalendar();
  }, [invalidateCalendar]);

  const handleOpenBlockDialog = useCallback(() => {
    if (selectedSlotsToBlock.length > 0) setIsBlockDialogOpen(true);
  }, [selectedSlotsToBlock.length]);

  const handleCloseBlockDialog = useCallback(() => {
    setIsBlockDialogOpen(false);
  }, []);

  const handleConfirmBlock = useCallback(
    (message: string) => {
      if (selectedSlotsToBlock.length === 0) return;

      const payload: AppointmentBlockCreate = {
        blocked_message: message,
        slots: selectedSlotsToBlock,
      };
      handleBlock(payload);
    },
    [selectedSlotsToBlock, handleBlock]
  );

  const blockDialogLabels = useMemo(() => {
    const timezone = data?.timezone ?? dayjs.tz.guess();
    const starts = selectedSlotsToBlock
      .map((slot) => dayjs(slot.start_date).tz(timezone))
      .sort((a, b) => a.valueOf() - b.valueOf());
    const isSingleDay = new Set(starts.map((start) => start.format(DATE_FORMAT))).size === 1;
    const [first] = starts;

    return {
      dayLabel: isSingleDay && first ? first.format("dddd, D MMMM") : undefined,
      slotLabels: starts.map((start) =>
        start.format(isSingleDay ? "HH:mm" : "ddd D, HH:mm")
      ),
    };
  }, [selectedSlotsToBlock, data?.timezone]);

  return {
    mode,
    label,
    businessId,
    businessShortDomain: data?.business_short_domain ?? "",
    employees,
    headerColumns,
    columns,
    bounds,
    now,
    timeStrings,
    totalRows,
    slotDuration,
    setSlotDuration,
    rowHeightLevel,
    setRowHeightLevel,
    currentRowHeight: ROW_HEIGHT_LEVELS[rowHeightLevel],
    isExpanded,
    setIsExpanded,
    isBlocking,
    selectedSlotsToBlock,
    createModal,
    isInitialLoading: isLoading && !data,
    isFetching,
    isLoadingBlock,
    handlePrevious,
    handleNext,
    handleToday,
    handleToggleSelectSlot,
    handleToggleBlocking,
    handleCloseBlocking,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleConfirmBlock,
    isBlockDialogOpen,
    blockDialogLabels,
    handleOpenBlockDialog,
    handleCloseBlockDialog,
  };
};
