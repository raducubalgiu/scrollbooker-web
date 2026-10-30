import dayjs from "@/lib/dayjs";
import {
  BusinessCalendarEmployee,
  BusinessCalendarEvent,
  BusinessCalendarSchedule,
} from "@/ts/models/booking/availability/BusinessCalendarEvents";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import {
  CalendarColorEnum,
  CalendarColorModeEnum,
  toCalendarColor,
} from "@/ts/enums/CalendarColorEnum";

export const NOW_ROUNDING_MINUTES = 5;

const MINUTES_IN_DAY = 24 * 60;

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type Interval = { start: number; end: number };

export type CalendarBounds = { minTime: string; maxTime: string };

export type CalendarNow = { date: string; minutes: number };

export const timeToMinutes = (time: string): number => {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(rest).padStart(2, "0")}:00`;
};

const splitLocale = (locale: string) => {
  const [date = "", time = "00:00"] = locale.split("T");
  return { date, minutes: timeToMinutes(time) };
};

export const getCalendarNow = (timezone: string, nowMs: number): CalendarNow => {
  const now = dayjs(nowMs).tz(timezone);
  const nextMinute = now.hour() * 60 + now.minute() + 1;

  return {
    date: now.format("YYYY-MM-DD"),
    minutes:
      Math.ceil(nextMinute / NOW_ROUNDING_MINUTES) * NOW_ROUNDING_MINUTES,
  };
};

export const getScheduleForDate = (
  schedules: BusinessCalendarSchedule[],
  date: string
): BusinessCalendarSchedule | undefined => {
  const dayName = WEEK_DAYS[dayjs(date).day()];
  return schedules.find((schedule) => schedule.day_of_week === dayName);
};

const getEventIntervalOnDate = (
  event: BusinessCalendarEvent,
  date: string
): Interval | null => {
  const start = splitLocale(event.start_date_locale);
  const end = splitLocale(event.end_date_locale);

  if (start.date > date || end.date < date) return null;

  const interval = {
    start: start.date < date ? 0 : start.minutes,
    end: end.date > date ? MINUTES_IN_DAY : end.minutes,
  };

  return interval.end > interval.start ? interval : null;
};

const subtractIntervals = (base: Interval, busy: Interval[]): Interval[] => {
  const sorted = [...busy].sort((a, b) => a.start - b.start);
  const free: Interval[] = [];
  let cursor = base.start;

  for (const interval of sorted) {
    if (interval.end <= cursor) continue;
    if (interval.start >= base.end) break;
    if (interval.start > cursor) free.push({ start: cursor, end: interval.start });
    cursor = Math.max(cursor, interval.end);
  }

  if (cursor < base.end) free.push({ start: cursor, end: base.end });

  return free;
};

const splitOnGrid = (
  interval: Interval,
  gridStartMinutes: number,
  slotDuration: number
): Interval[] => {
  const pieces: Interval[] = [];
  let start = interval.start;

  while (start < interval.end) {
    const stepsFromGrid = Math.floor((start - gridStartMinutes) / slotDuration) + 1;
    const nextLine = gridStartMinutes + stepsFromGrid * slotDuration;
    const end = Math.min(nextLine, interval.end);
    pieces.push({ start, end });
    start = end;
  }

  return pieces;
};

export const resolveEventColor = (
  event: BusinessCalendarEvent,
  employee: BusinessCalendarEmployee,
  colorMode: CalendarColorModeEnum
): CalendarColorEnum | null =>
  toCalendarColor(event.color) ??
  toCalendarColor(
    colorMode === CalendarColorModeEnum.EMPLOYEE
      ? employee.calendar_color
      : event.service_color
  );

const eventToSlot = (
  event: BusinessCalendarEvent,
  calendarColor: CalendarColorEnum | null
): CalendarEventsSlot => ({
  id: event.id,
  start_date_locale: event.start_date_locale,
  end_date_locale: event.end_date_locale,
  start_date_utc: event.start_date_utc,
  end_date_utc: event.end_date_utc,
  is_booked: !event.is_blocked,
  is_blocked: event.is_blocked,
  is_last_minute: false,
  last_minute_discount: null,
  info: event.info,
  calendar_color: calendarColor,
});

const freeIntervalToSlot = (
  date: string,
  interval: Interval,
  timezone: string
): CalendarEventsSlot => {
  const startLocale = `${date}T${minutesToTime(interval.start)}`;
  const endLocale = `${date}T${minutesToTime(interval.end)}`;

  return {
    id: null,
    start_date_locale: startLocale,
    end_date_locale: endLocale,
    start_date_utc: dayjs.tz(startLocale, timezone).utc().format(),
    end_date_utc: dayjs.tz(endLocale, timezone).utc().format(),
    is_booked: false,
    is_blocked: false,
    is_last_minute: false,
    last_minute_discount: null,
    info: null,
  };
};

export const buildDaySlots = ({
  employee,
  date,
  timezone,
  slotDuration,
  gridStartMinutes,
  now,
  colorMode = CalendarColorModeEnum.SERVICE,
}: {
  employee: BusinessCalendarEmployee;
  date: string;
  timezone: string;
  slotDuration: number;
  gridStartMinutes: number;
  now: CalendarNow;
  colorMode?: CalendarColorModeEnum;
}): CalendarEventsSlot[] => {
  const dayEvents = employee.events.filter(
    (event) => getEventIntervalOnDate(event, date) !== null
  );
  const eventSlots = dayEvents.map((event) =>
    eventToSlot(event, resolveEventColor(event, employee, colorMode))
  );

  const schedule = getScheduleForDate(employee.schedules, date);
  if (!schedule?.start_time || !schedule?.end_time || date < now.date) {
    return eventSlots;
  }

  const cutoff = date === now.date ? now.minutes : 0;
  const window: Interval = {
    start: Math.max(timeToMinutes(schedule.start_time), cutoff),
    end: timeToMinutes(schedule.end_time),
  };

  if (window.start >= window.end) return eventSlots;

  const busy = dayEvents
    .map((event) => getEventIntervalOnDate(event, date))
    .filter((interval): interval is Interval => interval !== null);

  const freeSlots = subtractIntervals(window, busy)
    .flatMap((interval) => splitOnGrid(interval, gridStartMinutes, slotDuration))
    .map((interval) => freeIntervalToSlot(date, interval, timezone));

  return [...eventSlots, ...freeSlots].sort((a, b) =>
    a.start_date_locale.localeCompare(b.start_date_locale)
  );
};

export const getCalendarBounds = (
  employees: BusinessCalendarEmployee[],
  dates: string[]
): CalendarBounds | null => {
  let min = Infinity;
  let max = -Infinity;

  for (const employee of employees) {
    for (const date of dates) {
      const schedule = getScheduleForDate(employee.schedules, date);
      if (schedule?.start_time && schedule?.end_time) {
        min = Math.min(min, timeToMinutes(schedule.start_time));
        max = Math.max(max, timeToMinutes(schedule.end_time));
      }

      for (const event of employee.events) {
        const interval = getEventIntervalOnDate(event, date);
        if (!interval) continue;
        min = Math.min(min, interval.start);
        max = Math.max(max, Math.min(interval.end, MINUTES_IN_DAY - 1));
      }
    }
  }

  if (!Number.isFinite(min) || !Number.isFinite(max) || min >= max) return null;

  return { minTime: minutesToTime(min), maxTime: minutesToTime(max) };
};

export const hasFreeSlot = (slots: CalendarEventsSlot[]): boolean =>
  slots.some((slot) => !slot.is_booked && !slot.is_blocked);
