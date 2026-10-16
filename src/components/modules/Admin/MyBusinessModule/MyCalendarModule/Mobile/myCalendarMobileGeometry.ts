export const parseTimeStringToMinutes = (
  value: string | null | undefined
): number | null => {
  if (!value) return null;
  const parts = value.split(":");
  if (parts.length < 2) return null;
  const hour = Number(parts[0]);
  const minute = Number(parts[1]);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
  return hour * 60 + minute;
};

export const minutesFromDateTimeString = (
  value: string | null | undefined
): number | null => {
  if (!value) return null;
  const timePart = value.split("T")[1] ?? value;
  return parseTimeStringToMinutes(timePart);
};

export const generateTicks = (
  startMinutes: number,
  endMinutes: number,
  stepMinutes: number
): number[] => {
  if (stepMinutes <= 0 || startMinutes > endMinutes) return [];

  const result: number[] = [];
  let t = startMinutes;
  while (t <= endMinutes) {
    result.push(t);
    t += stepMinutes;
  }
  return result;
};

export const formatMinutesAsClock = (minutes: number): string => {
  const hour = Math.floor(minutes / 60) % 24;
  const minute = minutes % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

export const hourHeight = (slotDurationMinutes: number): number => {
  if (slotDurationMinutes <= 0) return 60;

  const targetSlotHeight = 60;
  const computed = (60 / slotDurationMinutes) * targetSlotHeight;
  return Math.min(Math.max(computed, 60), 240);
};
