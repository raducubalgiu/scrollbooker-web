import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  AppointmentGapUpdate,
  SlotDurationUpdate,
  UserCalendarSettings,
} from "@/ts/models/booking/schedule/CalendarSettings";

export const useGetCalendarSettings = (
  userId: number | undefined,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["calendar-settings", userId],
    queryFn: async () => {
      const response = await axios.get<UserCalendarSettings>(
        `/api/protected/users/${userId}/calendar-settings`
      );
      return response.data;
    },
    enabled: (options?.enabled ?? true) && !!userId,
  });
};

export const useUpdateSlotDuration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SlotDurationUpdate) => {
      const response = await axios.patch<UserCalendarSettings>(
        "/api/protected/calendar-settings/slot-duration",
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["calendar-settings", data.user_id], data);
    },
  });
};

export const useUpdateAppointmentGap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AppointmentGapUpdate) => {
      const response = await axios.patch<UserCalendarSettings>(
        "/api/protected/calendar-settings/gap",
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["calendar-settings", data.user_id], data);
    },
  });
};
