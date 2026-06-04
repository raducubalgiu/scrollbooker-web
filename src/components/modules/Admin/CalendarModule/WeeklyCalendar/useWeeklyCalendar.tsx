"use client";

import { useState, useMemo, useCallback } from "react";
import dayjs from "dayjs";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import {
  AppointmentBlockCreate,
  AppointmentBlockSlot,
  AppointmentLastMinuteCreate,
  AppointmentOwnClientCreate,
} from "@/ts/models/booking/appointment/Appointment";
import { CreateAppointmentModalType } from "./WeeklyCalendar";
import { getFrontendDays } from "../getFrontendDays";
import { getScheduleBounds } from "../getScheduleBounds";
import {
  CalendarEventsResponse,
  CalendarEventsSlot,
} from "@/ts/models/booking/availability/CalendarEvents";
import { Session } from "next-auth";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { CreateOwnClientFormData } from "../CreateAppointmentModal/CreateOwnClient";

const rowHeightMap: Record<number, number> = {
  15: 100,
  30: 120,
  45: 140,
  60: 250,
};

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
  const [currentWeekDate, setCurrentWeekDate] = useState<dayjs.Dayjs>(() =>
    dayjs()
  );

  // 1. MEMOIZARE VALORI ȘI PARAMETRI STATICI
  const currentRowHeight = useMemo(() => {
    return rowHeightMap[slotDuration] || 100;
  }, [slotDuration]);

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
  const { data, isLoading, refetch } = useCustomQuery<CalendarEventsResponse>({
    key: [
      "weekly-calendar",
      slotDuration,
      session?.user_id,
      startDateStr,
      endDateStr,
    ],
    url: "/api/availability/weekly-calendar",
    options: {
      enabled: !!session?.user_id,
    },
    params: {
      start_date: startDateStr,
      end_date: endDateStr,
      user_id: session?.user_id,
      slot_duration: slotDuration,
    },
  });

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
    currentWeekDate,
    currentRowHeight,
    frontendDays,
    timeStrings,
    rowMap,
    totalRows,
    isLoading: isLoading,
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
