import { Dayjs } from "dayjs";
import dayjs from "@/lib/dayjs";
import { useCustomQuery } from "@/hooks/useHttp";
import { AvailableTimeslotsResponse } from "@/ts/models/booking/availability/AvailableTimeSlot";
import { useMemo } from "react";

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

  const timeslotsQuery = useCustomQuery<AvailableTimeslotsResponse>({
    key: ["available-timeslots", day, businessId],
    url: `/api/availability/${businessId}/timeslots?day=${day}&employeeId=${selectedEmployeeId}&slotDuration=${slotDuration}`,
  });

  const availableDaysQuery = useCustomQuery<string[]>({
    key: ["user-available-days", businessId],
    url: `/api/availability/${businessId}/available-days?employeeId=${selectedEmployeeId}&startDate=${todayStr}&endDate=${maxDateStr}`,
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
