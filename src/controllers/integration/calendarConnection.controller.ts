import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BUSINESS_CALENDAR_EVENTS_KEY } from "@/controllers/booking/availability.controller";
import {
  CalendarConnection,
  GoogleCalendarConnectRequest,
} from "@/ts/models/integration/CalendarConnection";

const CONNECTIONS_PATH = "/api/protected/integrations/calendar/connections";
export const CALENDAR_CONNECTION_KEY = "calendar-connection";

export const useGetMyCalendarConnection = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: [CALENDAR_CONNECTION_KEY],
    queryFn: async () => {
      try {
        const response = await axios.get<CalendarConnection>(`${CONNECTIONS_PATH}/me`);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) return null;
        throw error;
      }
    },
    enabled: options?.enabled ?? true,
  });
};

export const useConnectGoogleCalendar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (serverAuthCode: string) => {
      const payload: GoogleCalendarConnectRequest = {
        server_auth_code: serverAuthCode,
        platform: "web",
      };
      const response = await axios.post<CalendarConnection>(
        `${CONNECTIONS_PATH}/google`,
        payload
      );
      return response.data;
    },
    onSuccess: (connection) => {
      queryClient.setQueryData([CALENDAR_CONNECTION_KEY], connection);
      queryClient.invalidateQueries({ queryKey: [BUSINESS_CALENDAR_EVENTS_KEY] });
    },
  });
};

export const useDisconnectGoogleCalendar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await axios.delete(`${CONNECTIONS_PATH}/me`);
    },
    onSuccess: () => {
      queryClient.setQueryData([CALENDAR_CONNECTION_KEY], null);
      queryClient.invalidateQueries({ queryKey: [BUSINESS_CALENDAR_EVENTS_KEY] });
    },
  });
};
