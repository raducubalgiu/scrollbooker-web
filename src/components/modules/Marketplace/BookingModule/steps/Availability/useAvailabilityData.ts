import { Dayjs } from "dayjs";
import dayjs from "@/lib/dayjs";
import { useMemo } from "react";
import {
  useGetAvailableDays,
  useGetDailyTimeslots,
} from "@/controllers/booking/availability.controller";

export const useAvailabilityData = (
  businessId: number,
  selectedEmployeeId: number | null,
  slotDuration: number,
  activeDate: Dayjs,
  maxDate: Dayjs
) => {
  const day = activeDate.format("YYYY-MM-DD");
  const todayStr = dayjs().format("YYYY-MM-DD");
  const maxDateStr = maxDate.format("YYYY-MM-DD");

  const timeslotsQuery = useGetDailyTimeslots({
    businessId,
    day,
    slotDuration,
    employeeId: selectedEmployeeId ?? undefined,
    enabled: slotDuration > 0,
  });

  const availableDaysQuery = useGetAvailableDays({
    businessId,
    startDate: todayStr,
    endDate: maxDateStr,
    slotDuration,
    employeeId: selectedEmployeeId ?? undefined,
    enabled: slotDuration > 0,
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
