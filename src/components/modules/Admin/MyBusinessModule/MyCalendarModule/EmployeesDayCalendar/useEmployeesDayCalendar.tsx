"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useGetBusinessCalendarEventsByDay } from "@/controllers/booking/availability.controller";
import { useGetScheduleBounds } from "@/controllers/booking/schedule.controller";
import { useGetCalendarSettings } from "@/controllers/booking/calendarSettings.controller";
import { createTimeRowMap } from "../createTimeRowMap";
import { useCalendarAppointmentMutations } from "../sharedComponents/useCalendarAppointmentMutations";
import {
  AppointmentBlockCreate,
  AppointmentBlockSlot,
  AppointmentOwnClientCreate,
} from "@/ts/models/booking/appointment/Appointment";
import {
  CalendarEventsBusinessEmployee,
  CalendarEventsSlot,
} from "@/ts/models/booking/availability/CalendarEvents";
import { CreateOwnClientFormData } from "../sharedComponents/CreateAppointmentModal/CreateOwnClient";
import {
  ROW_HEIGHT_LEVELS,
  RowHeightLevel,
} from "../sharedComponents/CalendarSettings/rowHeightLevels";

export type EmployeesCreateAppointmentModalType = {
  open: boolean;
  slot: CalendarEventsSlot | null;
  employeeId: number | null;
};

export const useEmployeesDayCalendar = () => {
  const { data: session } = useSession();
  const [isBlocking, setIsBlocking] = useState(false);
  const [selectedSlotsToBlock, setSelectedSlotsToBlock] = useState<
    AppointmentBlockSlot[]
  >([]);
  const [createModal, setCreateModal] =
    useState<EmployeesCreateAppointmentModalType>({
      open: false,
      slot: null,
      employeeId: null,
    });
  const [slotDuration, setSlotDuration] = useState(60);
  const [rowHeightLevel, setRowHeightLevel] = useState<RowHeightLevel>("medium");
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentDay, setCurrentDay] = useState<dayjs.Dayjs>(() => dayjs());

  const { data: calendarSettings } = useGetCalendarSettings(session?.user_id);
  const hasAppliedDefaultDurationRef = useRef(false);

  useEffect(() => {
    if (hasAppliedDefaultDurationRef.current || !calendarSettings) return;
    hasAppliedDefaultDurationRef.current = true;
    setSlotDuration(calendarSettings.slot_duration_minutes);
  }, [calendarSettings]);

  const currentRowHeight = useMemo(() => {
    return ROW_HEIGHT_LEVELS[rowHeightLevel];
  }, [rowHeightLevel]);

  const dayStr = useMemo(
    () => currentDay.format("YYYY-MM-DD"),
    [currentDay]
  );

  const { data: scheduleBounds, isLoading: isBoundsLoading } =
    useGetScheduleBounds();

  const bounds = useMemo(() => {
    if (!scheduleBounds?.min_start_time || !scheduleBounds?.max_end_time) {
      return null;
    }
    return {
      minTime: scheduleBounds.min_start_time,
      maxTime: scheduleBounds.max_end_time,
    };
  }, [scheduleBounds]);

  const { data, isLoading } = useGetBusinessCalendarEventsByDay({
    day: dayStr,
    slotDuration,
  });

  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [employees, setEmployees] = useState<CalendarEventsBusinessEmployee[]>(
    []
  );

  useEffect(() => {
    if (!data) return;
    if (!hasLoadedOnce) setHasLoadedOnce(true);
    setEmployees(data.employees);
  }, [data, hasLoadedOnce]);

  const isToday = useMemo(
    () => dayStr === dayjs().format("YYYY-MM-DD"),
    [dayStr]
  );

  const columns = useMemo(
    () =>
      employees.map((employee) => ({
        key: String(employee.id),
        slots: employee.slots,
        isToday,
      })),
    [employees, isToday]
  );

  const { handleBlock, isLoadingBlock, handleOwnClient, isLoadingOwnClient } =
    useCalendarAppointmentMutations({
      onBlockSuccess: () => {
        handleCloseBlocking();
      },
      onOwnClientSuccess: () => {
        setCreateModal({ open: false, slot: null, employeeId: null });
      },
    });

  const { timeStrings, rowMap, totalRows } = useMemo(() => {
    if (!bounds) {
      return { timeStrings: [], rowMap: {}, totalRows: 0 };
    }

    return createTimeRowMap(bounds.minTime, bounds.maxTime, slotDuration);
  }, [bounds, slotDuration]);

  const handlePrevDay = useCallback(() => {
    setCurrentDay((prev) => prev.subtract(1, "day"));
  }, []);

  const handleNextDay = useCallback(() => {
    setCurrentDay((prev) => prev.add(1, "day"));
  }, []);

  const handleToday = useCallback(() => {
    setCurrentDay(dayjs());
  }, []);

  const handleToggleSelectSlot = useCallback(
    (employeeId: number, slot: CalendarEventsSlot) => {
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
          user_id: employeeId,
        };

        return [...prev, newBlockItem];
      });
    },
    []
  );

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
    setCreateModal({ open: false, slot: null, employeeId: null });
  }, []);

  const handleOpenCreateModal = useCallback(
    (employeeId: number | null, slot: CalendarEventsSlot | null) => {
      setCreateModal({
        open: true,
        slot,
        employeeId,
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
  }, [selectedSlotsToBlock, handleBlock]);

  const handleOwnClientPayload = useCallback(
    (data: CreateOwnClientFormData, slot: CalendarEventsSlot) => {
      if (!createModal.employeeId) return;

      const payload: AppointmentOwnClientCreate = {
        start_date: slot.start_date_utc,
        end_date: slot.end_date_utc,
        user_id: createModal.employeeId,
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
    [createModal.employeeId, handleOwnClient]
  );

  return {
    userId: session?.user_id,
    isBlocking,
    selectedSlotsToBlock,
    createModal,
    slotDuration,
    setSlotDuration,
    rowHeightLevel,
    setRowHeightLevel,
    isExpanded,
    setIsExpanded,
    currentDay,
    currentRowHeight,
    employees,
    columns,
    timeStrings,
    rowMap,
    totalRows,
    isLoading,
    isInitialLoading: isBoundsLoading || (!hasLoadedOnce && isLoading),
    isLoadingBlock,
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
    handleOwnClientPayload,
  };
};
