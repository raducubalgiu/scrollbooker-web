export type CalendarDurationOption = {
  minutes: number;
  label: string;
};

export const SLOT_DURATION_OPTIONS: CalendarDurationOption[] = [
  { minutes: 30, label: "30 minute" },
  { minutes: 45, label: "45 minute" },
  { minutes: 60, label: "1 oră" },
  { minutes: 90, label: "1 oră 30 minute" },
];

export const APPOINTMENT_GAP_OPTIONS: CalendarDurationOption[] = [
  { minutes: 0, label: "Fără pauză" },
  { minutes: 5, label: "5 minute" },
  { minutes: 10, label: "10 minute" },
  { minutes: 15, label: "15 minute" },
];

export const labelForSlotDuration = (minutes: number): string =>
  SLOT_DURATION_OPTIONS.find((option) => option.minutes === minutes)?.label ??
  "";

export const labelForAppointmentGap = (minutes: number): string =>
  APPOINTMENT_GAP_OPTIONS.find((option) => option.minutes === minutes)
    ?.label ?? "";
