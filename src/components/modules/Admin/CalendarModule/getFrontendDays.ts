import dayjs from "@/lib/dayjs";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";

interface FrontendDayResult {
  dateStr: string;
  dayName: string;
  dayFormatted: string;
  schedule: Schedule | null;
}

const ENGLISH_DAYS_MAPPING = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const getFrontendDays = (
  currentWeekDate: dayjs.Dayjs,
  schedules: Schedule[]
): FrontendDayResult[] => {
  const startOfWeek = currentWeekDate.startOf("week");

  return Array.from({ length: 7 }, (_, i) => {
    const currentDay = startOfWeek.add(i, "day");
    const dayIndex = currentDay.day();
    const englishDayName = ENGLISH_DAYS_MAPPING[dayIndex];

    const daySchedule = schedules?.find(
      (s) => s.day_of_week.toLowerCase() === englishDayName
    );

    return {
      dateStr: currentDay.format("YYYY-MM-DD"),
      dayName: currentDay.format("ddd"),
      dayFormatted: currentDay.format("D"),
      schedule: daySchedule || null,
    };
  });
};
