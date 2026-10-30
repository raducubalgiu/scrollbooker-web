export enum CalendarColorEnum {
  BLUE = "blue",
  CYAN = "cyan",
  TEAL = "teal",
  GREEN = "green",
  LIME = "lime",
  AMBER = "amber",
  RED = "red",
  PINK = "pink",
  PURPLE = "purple",
  SLATE = "slate",
}

export enum CalendarColorModeEnum {
  SERVICE = "service",
  EMPLOYEE = "employee",
}

export const CALENDAR_COLORS: CalendarColorEnum[] = Object.values(CalendarColorEnum);

export const CALENDAR_COLOR_LABELS: Record<CalendarColorEnum, string> = {
  [CalendarColorEnum.BLUE]: "Albastru",
  [CalendarColorEnum.CYAN]: "Turcoaz",
  [CalendarColorEnum.TEAL]: "Verde-albastru",
  [CalendarColorEnum.GREEN]: "Verde",
  [CalendarColorEnum.LIME]: "Lime",
  [CalendarColorEnum.AMBER]: "Chihlimbar",
  [CalendarColorEnum.RED]: "Roșu",
  [CalendarColorEnum.PINK]: "Roz",
  [CalendarColorEnum.PURPLE]: "Mov",
  [CalendarColorEnum.SLATE]: "Gri",
};

export const toCalendarColor = (
  value: string | null | undefined
): CalendarColorEnum | null =>
  value && CALENDAR_COLORS.includes(value as CalendarColorEnum)
    ? (value as CalendarColorEnum)
    : null;
