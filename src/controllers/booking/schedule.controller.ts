import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Schedule,
  ScheduleBounds,
  ScheduleUpdate,
} from "@/ts/models/booking/schedule/Schedule";

export const useGetSchedulesByUserId = (
  userId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["schedules", userId],
    queryFn: async () => {
      const response = await axios.get<Schedule[]>(
        `/api/protected/users/${userId}/schedules`
      );
      return response.data;
    },
    enabled:
      (options?.enabled ?? true) &&
      userId !== "undefined" &&
      userId !== "null",
  });
};

export const useGetScheduleBounds = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["schedule-bounds"],
    queryFn: async () => {
      const response = await axios.get<ScheduleBounds>(
        "/api/protected/schedules/bounds"
      );
      return response.data;
    },
    enabled: options?.enabled ?? true,
  });
};

export const useUpdateSchedules = () => {
  return useMutation({
    mutationFn: async (schedules: ScheduleUpdate[]) => {
      const response = await axios.put<Schedule[]>(
        "/api/protected/schedules",
        schedules
      );
      return response.data;
    },
  });
};
