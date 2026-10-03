import dayjs from "dayjs";
import { SxProps, Theme } from "@mui/material";

interface LayoutParams {
  slot: any;
  minTimeStr: string | undefined;
  slotDuration: number;
  rowHeight: number;
}

export const calculateEventLayout = ({
  slot,
  minTimeStr,
  slotDuration,
  rowHeight,
}: LayoutParams): SxProps<Theme> | null => {
  if (!minTimeStr) return null;

  const startOnlyStr = slot.start_date_locale.split("T")[1];
  const endOnlyStr = slot.end_date_locale.split("T")[1];

  const globalStart = dayjs(`2026-01-01T${minTimeStr}`);
  const eventStart = dayjs(`2026-01-01T${startOnlyStr}`);
  const eventEnd = dayjs(`2026-01-01T${endOnlyStr}`);

  if (!eventStart.isValid() || !eventEnd.isValid() || !globalStart.isValid()) {
    return null;
  }

  const pixelsPerMinute = rowHeight / slotDuration;
  const minutesFromGlobalStart = eventStart.diff(globalStart, "minute");

  const topPositionPixels = minutesFromGlobalStart * pixelsPerMinute;
  const eventDurationMinutes = eventEnd.diff(eventStart, "minute");
  const heightPixels = eventDurationMinutes * pixelsPerMinute;

  const hasSpacing = slot.is_booked || slot.is_blocked || slot.is_last_minute;
  const GAP_PIXELS = 3;

  return {
    position: "absolute",
    top: hasSpacing
      ? `${topPositionPixels + GAP_PIXELS}px`
      : `${topPositionPixels}px`,
    height: hasSpacing
      ? `${heightPixels - GAP_PIXELS * 2}px`
      : `${heightPixels}px`,
    left: hasSpacing ? "6px" : 0,
    right: hasSpacing ? "6px" : 0,
    zIndex: 5,
    boxSizing: "border-box",
    overflow: "hidden",
    ...(slot.is_booked && {
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.04)",
    }),
  };
};
