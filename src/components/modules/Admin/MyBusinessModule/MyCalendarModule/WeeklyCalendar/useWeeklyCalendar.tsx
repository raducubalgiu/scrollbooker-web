"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useMutate } from "@/hooks/useHttp";
import { useGetCalendarEvents } from "@/controllers/booking/availability.controller";
import { useGetCalendarSettings } from "@/controllers/booking/calendarSettings.controller";
import {
  AppointmentBlockCreate,
  AppointmentBlockSlot,
  AppointmentLastMinuteCreate,
  AppointmentOwnClientCreate,
} from "@/ts/models/booking/appointment/Appointment";
import { CreateAppointmentModalType } from "./WeeklyCalendar";
import { getFrontendDays } from "../getFrontendDays";
import { getScheduleBounds } from "../getScheduleBounds";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { Session } from "next-auth";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { CreateOwnClientFormData } from "../CreateAppointmentModal/CreateOwnClient";
import {
  ROW_HEIGHT_LEVELS,
  RowHeightLevel,
} from "../CalendarSettings/rowHeightLevels";

interface UseWeeklyCalendarProps {
  session: Session;
  schedules: Schedule[];
}

export const useWeeklyCalendar = ({
  session,
  schedules,
}: UseWeeklyCalendarProps) => {
  const [isBlocking, setIsBlocking] = useState(false);
  const [selectedSlotsToBlock, setSelectedSlotsToBlock] = useState<
    AppointmentBlockSlot[]
  >([]);
  const [createModal, setCreateModal] = useState<CreateAppointmentModalType>({
    open: false,
    slot: null,
  });
  const [slotDuration, setSlotDuration] = useState(60);
  const [rowHeightLevel, setRowHeightLevel] = useState<RowHeightLevel>("medium");
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentWeekDate, setCurrentWeekDate] = useState<dayjs.Dayjs>(() =>
    dayjs()
  );

  const { data: calendarSettings } = useGetCalendarSettings(session?.user_id);
  const hasAppliedDefaultDurationRef = useRef(false);

  useEffect(() => {
    if (hasAppliedDefaultDurationRef.current || !calendarSettings) return;
    hasAppliedDefaultDurationRef.current = true;
    setSlotDuration(calendarSettings.slot_duration_minutes);
  }, [calendarSettings]);

  // 1. MEMOIZARE VALORI ȘI PARAMETRI STATICI
  const currentRowHeight = useMemo(() => {
    return ROW_HEIGHT_LEVELS[rowHeightLevel];
  }, [rowHeightLevel]);

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

  const bounds = useMemo(() => getScheduleBounds(schedules), [schedules]);

  // 2. LOGICA API (QUERY & MUTATION)
  const { data, isLoading, refetch } = useGetCalendarEvents({
    businessId: session?.business_id ?? undefined,
    startDate: startDateStr,
    endDate: endDateStr,
    slotDuration,
    employeeId: session?.is_employee ? session?.user_id : undefined,
  });

  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    if (data && !hasLoadedOnce) setHasLoadedOnce(true);
  }, [data, hasLoadedOnce]);

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

  const { mutate: handleLastMinute, isPending: isLoadingLastMinute } =
    useMutate({
      key: ["last-minute-appointments"],
      url: "/api/appointments/last-minute",
      options: {
        onSuccess: async () => {
          refetch();
          setCreateModal({ open: false, slot: null });
        },
      },
    });

  const { mutate: handleOwnClient, isPending: isLoadingOwnClient } = useMutate({
    key: ["own-client-appointments"],
    url: "/api/appointments/own-client",
    options: {
      onSuccess: async () => {
        refetch();
        setCreateModal({ open: false, slot: null });
      },
    },
  });

  // 3. CALCULUL COMPLEX DE REȚEA ORARĂ (MEMOIZAT AGRESIV)
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

  // 4. MEMOIZARE CALLBACKS (Împiedică recrearea referințelor de funcții transmise către sub-componente memoizate)
  const handlePrevWeek = useCallback(() => {
    setCurrentWeekDate((prev) => prev.subtract(1, "week"));
  }, []);

  const handleNextWeek = useCallback(() => {
    setCurrentWeekDate((prev) => prev.add(1, "week"));
  }, []);

  const handleToday = useCallback(() => {
    setCurrentWeekDate(dayjs());
  }, []);

  const handleToggleSelectSlot = useCallback((slot: CalendarEventsSlot) => {
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
        user_id: session?.user_id,
      };

      return [...prev, newBlockItem];
    });
  }, []);

  const handleCloseBlocking = useCallback(() => {
    setIsBlocking(false);
    setSelectedSlotsToBlock([]);
  }, []);

  const handleToggleBlocking = useCallback(() => {
    setIsBlocking((prev) => {
      if (prev) {
        setSelectedSlotsToBlock([]);
        return false;
      }
      return true;
    });
  }, []);

  const handleCloseCreateModal = useCallback(() => {
    setCreateModal({ open: false, slot: null });
  }, []);

  const handleOpenCreateModal = useCallback(
    (slot: CalendarEventsSlot | null) => {
      setCreateModal({
        open: true,
        slot,
      });
    },
    []
  );

  const handleConfirmBlockPayload = useCallback(() => {
    if (selectedSlotsToBlock.length === 0) return;

    const payload: AppointmentBlockCreate = {
      blocked_message: null,
      slots: selectedSlotsToBlock.map((slot) => ({
        start_date: slot.start_date,
        end_date: slot.end_date,
        user_id: slot.user_id,
      })),
    };
    handleBlock(payload);
  }, [selectedSlotsToBlock, session?.user_id, handleBlock]);

  const handleLastMinutePayload = useCallback(
    (discount: number, slot: CalendarEventsSlot) => {
      const payload: AppointmentLastMinuteCreate = {
        discount,
        start_date: slot.start_date_utc,
        end_date: slot.end_date_utc,
        user_id: session?.user_id,
      };

      handleLastMinute(payload);
    },
    []
  );

  const handleOwnClientPayload = useCallback(
    (data: CreateOwnClientFormData, slot: CalendarEventsSlot) => {
      const payload: AppointmentOwnClientCreate = {
        start_date: slot.start_date_utc,
        end_date: slot.end_date_utc,
        user_id: session?.user_id,
        customer_fullname: data.customerFullname,

        custom_product: {
          product_name: data.productName,
          price: Number(data.price),
          discount: Number(data.discount),
          price_with_discount: Number(data.priceWithDiscount),
          duration: Number(data.duration),
        },
        product_variants: null,
      };

      handleOwnClient(payload);
    },
    []
  );

  return {
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
    timeStrings,
    rowMap,
    totalRows,
    isLoading: isLoading,
    isInitialLoading: !hasLoadedOnce && isLoading,
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
  };
};
