import { Dayjs } from "dayjs";
import dayjs from "@/lib/dayjs";
import { useCustomQuery } from "@/hooks/useHttp";
import { AvailableTimeslotsResponse } from "@/ts/models/booking/availability/AvailableTimeSlot";
import { useMemo } from "react";

export const useAvailabilityData = (
  userId: number,
  slotDuration: number,
  activeDate: Dayjs,
  maxDate: Dayjs
) => {
  const day = activeDate.format("YYYY-MM-DD");
  const todayStr = dayjs().format("YYYY-MM-DD");
  const maxDateStr = maxDate.format("YYYY-MM-DD");

  const timeslotsQuery = useCustomQuery<AvailableTimeslotsResponse>({
    key: ["available-timeslots", day, userId],
    url: `/api/availability/timeslots?day=${day}&userId=${userId}&slotDuration=${slotDuration}`,
  });

  const availableDaysQuery = useCustomQuery<string[]>({
    key: ["user-available-days", userId],
    url: `/api/availability?userId=${userId}&startDate=${todayStr}&endDate=${maxDateStr}`,
  });

  const availableDaysSet = useMemo(
    () => new Set(availableDaysQuery.data || []),
    [availableDaysQuery.data]
  );

  return {
    timeslots: timeslotsQuery.data,
    isLoadingSlots: timeslotsQuery.isLoading || timeslotsQuery.isRefetching,
    isLoadingDays: availableDaysQuery.isLoading,
    availableDaysSet,
  };
};
