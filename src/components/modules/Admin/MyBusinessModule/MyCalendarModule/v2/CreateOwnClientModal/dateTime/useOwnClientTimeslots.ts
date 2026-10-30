"use client";

import { useMemo, useState } from "react";
import dayjs from "@/lib/dayjs";
import type { Dayjs } from "dayjs";
import {
  useGetAvailableDays,
  useGetDailyTimeslots,
} from "@/controllers/booking/availability.controller";

const DATE_FORMAT = "YYYY-MM-DD";
const TOTAL_WEEKS = 26;

type UseOwnClientTimeslotsParams = {
  businessId: number;
  employeeId: number | undefined;
  totalDurationMinutes: number;
  initialDay: string | null;
};

export const useOwnClientTimeslots = ({
  businessId,
  employeeId,
  totalDurationMinutes,
  initialDay,
}: UseOwnClientTimeslotsParams) => {
  const today = dayjs().startOf("day");
  const firstWeekStart = today.startOf("week");
  const lastDay = firstWeekStart.add(TOTAL_WEEKS * 7 - 1, "day");

  const [selectedDay, setSelectedDay] = useState<Dayjs>(() => {
    const seed = initialDay ? dayjs(initialDay).startOf("day") : today;
    return seed.isBefore(today) || seed.isAfter(lastDay) ? today : seed;
  });

  const weekStart = selectedDay.startOf("week");
  const selectedDayStr = selectedDay.format(DATE_FORMAT);

  const { data: availableDays, isLoading: isLoadingDays, isError: isDaysError } =
    useGetAvailableDays({
      businessId,
      startDate: firstWeekStart.format(DATE_FORMAT),
      endDate: lastDay.format(DATE_FORMAT),
      slotDuration: totalDurationMinutes,
      employeeId,
      enabled: totalDurationMinutes > 0,
    });

  const availableDaysSet = useMemo(
    () => new Set(availableDays ?? []),
    [availableDays]
  );

  const isSelectedDayAvailable = availableDaysSet.has(selectedDayStr);

  const {
    data: timeslots,
    isLoading: isLoadingSlots,
    isError: isSlotsError,
    refetch: refetchSlots,
  } = useGetDailyTimeslots({
    businessId,
    day: selectedDayStr,
    slotDuration: totalDurationMinutes,
    employeeId,
    enabled: totalDurationMinutes > 0 && isSelectedDayAvailable,
  });

  const nextAvailableDay = useMemo(() => {
    const next = [...availableDaysSet]
      .filter((day) => day > selectedDayStr)
      .sort()[0];
    return next ? dayjs(next) : null;
  }, [availableDaysSet, selectedDayStr]);

  const canGoPrevious = weekStart.isAfter(firstWeekStart, "day");
  const canGoNext = weekStart.add(1, "week").isBefore(lastDay, "day");

  const handlePreviousWeek = () => {
    if (canGoPrevious) setSelectedDay((day) => day.subtract(1, "week"));
  };

  const handleNextWeek = () => {
    if (canGoNext) setSelectedDay((day) => day.add(1, "week"));
  };

  const handleSelectDay = (day: Dayjs) => {
    setSelectedDay(day.startOf("day"));
  };

  const slots = isSelectedDayAvailable ? timeslots?.available_slots ?? [] : [];

  return {
    selectedDay,
    weekStart,
    periodLabel: weekStart.format("MMMM YYYY"),
    availableDaysSet,
    slots,
    nextAvailableDay,
    isLoadingDays,
    isLoadingSlots: isSelectedDayAvailable && isLoadingSlots,
    isError: isDaysError || (isSelectedDayAvailable && isSlotsError),
    canGoPrevious,
    canGoNext,
    handlePreviousWeek,
    handleNextWeek,
    handleSelectDay,
    refetchSlots,
  };
};
