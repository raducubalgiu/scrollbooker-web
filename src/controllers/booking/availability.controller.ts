import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  AvailableTimeslotsResponse,
} from "@/ts/models/booking/availability/AvailableTimeSlot";
import {
  CalendarEventsBusinessResponse,
  CalendarEventsResponse,
  EmployeeAvailabilityResponse,
} from "@/ts/models/booking/availability/CalendarEvents";

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

export const useGetCalendarEvents = ({
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
    queryKey: ["calendar-events", businessId, startDate, endDate, slotDuration, employeeId],
    queryFn: async () => {
      const response = await axios.get<CalendarEventsResponse>(
        `/api/protected/availability/${businessId}/calendar-events`,
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

export const useGetBusinessCalendarEventsByDay = ({
  day,
  slotDuration,
  enabled = true,
}: {
  day: string;
  slotDuration: number;
  enabled?: boolean | undefined;
}) => {
  return useQuery({
    queryKey: ["business-calendar-events-by-day", day, slotDuration],
    queryFn: async () => {
      const response = await axios.get<CalendarEventsBusinessResponse>(
        "/api/protected/availability/calendar-events/business",
        { params: { day, slot_duration: slotDuration } }
      );
      return response.data;
    },
    enabled,
  });
};

export const useGetEmployeesDayAvailability = ({
  day,
  slotDuration,
  enabled = true,
}: {
  day: string;
  slotDuration: number;
  enabled?: boolean | undefined;
}) => {
  return useQuery({
    queryKey: ["employees-day-availability", day, slotDuration],
    queryFn: async () => {
      const response = await axios.get<EmployeeAvailabilityResponse[]>(
        "/api/protected/availability/employees/day-availability",
        { params: { day, slot_duration: slotDuration } }
      );
      return response.data;
    },
    enabled,
  });
};
