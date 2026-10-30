import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  AvailableTimeslotsResponse,
} from "@/ts/models/booking/availability/AvailableTimeSlot";
import { BusinessCalendarEventsResponse } from "@/ts/models/booking/availability/BusinessCalendarEvents";

export const BUSINESS_CALENDAR_EVENTS_KEY = "business-calendar-events";

export const useGetBusinessCalendarEvents = ({
  businessId,
  startDate,
  endDate,
  employeeId,
  enabled = true,
}: {
  businessId: number | undefined;
  startDate: string;
  endDate: string;
  employeeId?: number | undefined;
  enabled?: boolean | undefined;
}) => {
  return useQuery({
    queryKey: [BUSINESS_CALENDAR_EVENTS_KEY, businessId, startDate, endDate, employeeId],
    queryFn: async () => {
      const response = await axios.get<BusinessCalendarEventsResponse>(
        `/api/protected/businesses/${businessId}/calendar-events`,
        {
          params: {
            start_date: startDate,
            end_date: endDate,
            employee_id: employeeId,
          },
        }
      );
      return response.data;
    },
    placeholderData: keepPreviousData,
    enabled: enabled && !!businessId,
  });
};

export const useGetAvailableDays = ({
  businessId,
  startDate,
  endDate,
  slotDuration,
  employeeId,
  enabled = true,
}: {
  businessId: number | undefined;
  startDate: string;
  endDate: string;
  slotDuration: number;
  employeeId?: number | undefined;
  enabled?: boolean | undefined;
}) => {
  return useQuery({
    queryKey: ["available-days", businessId, startDate, endDate, slotDuration, employeeId],
    queryFn: async () => {
      const response = await axios.get<string[]>(
        `/api/protected/businesses/${businessId}/availability`,
        {
          params: {
            start_date: startDate,
            end_date: endDate,
            slot_duration: slotDuration,
            employee_id: employeeId,
          },
        }
      );
      return response.data;
    },
    enabled: enabled && !!businessId,
  });
};

export const useGetDailyTimeslots = ({
  businessId,
  day,
  slotDuration,
  employeeId,
  enabled = true,
}: {
  businessId: number | undefined;
  day: string;
  slotDuration: number;
  employeeId?: number | undefined;
  enabled?: boolean | undefined;
}) => {
  return useQuery({
    queryKey: ["daily-timeslots", businessId, day, slotDuration, employeeId],
    queryFn: async () => {
      const response = await axios.get<AvailableTimeslotsResponse>(
        `/api/protected/businesses/${businessId}/availability/timeslots`,
        {
          params: {
            day,
            slot_duration: slotDuration,
            employee_id: employeeId,
          },
        }
      );
      return response.data;
    },
    enabled: enabled && !!businessId,
  });
};

