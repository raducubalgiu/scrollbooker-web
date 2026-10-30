import { Theme, alpha } from "@mui/material";
import dayjs from "dayjs";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { getDomainColor } from "./mobileDomainColor";

export type MobileSlotStyle = {
  backgroundColor: string;
  lineColor: string;
  borderColor: string;
  isBefore: boolean;
};

export const resolveMobileSlotStyle = (
  theme: Theme,
  slot: CalendarEventsSlot,
  businessShortDomain: string | undefined
): MobileSlotStyle => {
  const isBefore = dayjs().isAfter(dayjs(slot.start_date_locale));
  const domainColor = getDomainColor(theme, businessShortDomain);

  let baseColor: string;
  let bgOpacity: number;
  let borderOpacity: number;

  if (slot.is_booked && slot.calendar_color) {
    baseColor = theme.palette.calendar[slot.calendar_color];
    bgOpacity = 0.2;
    borderOpacity = 0.25;
  } else if (slot.is_booked && slot.info?.channel === "scroll_booker") {
    baseColor = theme.palette.primary.main;
    bgOpacity = 0.2;
    borderOpacity = 0.25;
  } else if (slot.is_booked) {
    baseColor = domainColor;
    bgOpacity = 0.2;
    borderOpacity = 0.25;
  } else if (slot.is_blocked && slot.info?.is_external) {
    baseColor = domainColor;
    bgOpacity = 0.2;
    borderOpacity = 0.25;
  } else if (slot.is_blocked) {
    baseColor = theme.palette.error.main;
    bgOpacity = 0.2;
    borderOpacity = 0.25;
  } else if (slot.is_last_minute) {
    baseColor = theme.palette.rating.main;
    bgOpacity = 0.2;
    borderOpacity = 0.25;
  } else {
    baseColor = theme.palette.background.paper;
    bgOpacity = 1;
    borderOpacity = 0.6;
  }

  const isSpecialState = slot.is_booked || slot.is_blocked || slot.is_last_minute;

  return {
    backgroundColor:
      bgOpacity === 1 ? baseColor : alpha(baseColor, bgOpacity),
    lineColor: slot.is_blocked ? "transparent" : alpha(baseColor, 0.55),
    borderColor: isSpecialState
      ? alpha(baseColor, borderOpacity)
      : theme.palette.divider,
    isBefore,
  };
};
