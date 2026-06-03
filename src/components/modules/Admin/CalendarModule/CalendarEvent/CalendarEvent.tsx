"use client";

import React, { memo, useMemo } from "react";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import BlockedSlot from "./BlockedSlot";
import BookedSlot from "./BookedSlot";
import LastMinuteSlot from "./LastMinuteSlot";
import CalendarAvailableSlot from "./CalendarAvailableSlot";
import { calculateEventLayout } from "./calculateEventLayout";

interface CalendarEventProps {
  businessShortDomain: string;
  slot: CalendarEventsSlot;
  isBlocking: boolean;
  minTimeStr: string | undefined;
  slotDuration: number;
  rowHeight: number;
  isSelected: boolean;
  onSelectFreeSlot: (
    startLocale: string,
    endLocale: string,
    startUtc: string,
    endUtc: string
  ) => void;
  onToggleSelectSlot: (slot: CalendarEventsSlot) => void;
}

const CalendarEvent = ({
  businessShortDomain,
  slot,
  isBlocking,
  minTimeStr,
  slotDuration,
  rowHeight,
  isSelected,
  onSelectFreeSlot,
  onToggleSelectSlot,
}: CalendarEventProps) => {
  const absolutePlacementStyles = useMemo(() => {
    return calculateEventLayout({ slot, minTimeStr, slotDuration, rowHeight });
  }, [slot, minTimeStr, slotDuration, rowHeight]);

  if (!absolutePlacementStyles) return null;

  switch (true) {
    case slot.is_blocked:
      return <BlockedSlot slot={slot} globalSx={absolutePlacementStyles} />;
    case slot.is_booked:
      return (
        <BookedSlot
          slot={slot}
          businessShortDomain={businessShortDomain}
          globalSx={absolutePlacementStyles}
        />
      );
    case slot.is_last_minute:
      return <LastMinuteSlot slot={slot} globalSx={absolutePlacementStyles} />;
    default:
      return (
        <CalendarAvailableSlot
          slot={slot}
          globalSx={absolutePlacementStyles}
          isBlocking={isBlocking}
          isSelected={isSelected}
          onSlotClick={() => {
            if (isBlocking) {
              onToggleSelectSlot(slot);
            } else {
              onSelectFreeSlot(
                slot.start_date_locale,
                slot.end_date_locale,
                slot.start_date_utc,
                slot.end_date_utc
              );
            }
          }}
        />
      );
  }
};

export default memo(CalendarEvent);
