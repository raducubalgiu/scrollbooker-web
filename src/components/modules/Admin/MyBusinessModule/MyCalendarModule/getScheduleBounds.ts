import { Schedule } from "@/ts/models/booking/schedule/Schedule";

export const getScheduleBounds = (schedules: Schedule[]) => {
  if (!schedules || schedules.length === 0) return null;

  const activeSchedules = schedules.filter(
    (s) => s.start_time !== null && s.end_time !== null
  );

  if (activeSchedules.length === 0) return null;

  const startTimes = activeSchedules.map((s) => s.start_time as string).sort();
  const endTimes = activeSchedules.map((s) => s.end_time as string).sort();

  return {
    minTime: startTimes[0],
    maxTime: endTimes[endTimes.length - 1],
  };
};
