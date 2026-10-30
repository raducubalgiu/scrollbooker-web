"use client";

import React, { memo, useCallback, useMemo } from "react";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import DesktopBlockedSlot from "./DesktopBlockedSlot";
import DesktopBookedSlot from "./DesktopBookedSlot";
import DesktopAvailableSlot from "./DesktopAvailableSlot";
import { calculateEventLayout } from "./calculateEventLayout";
import dayjs from "@/lib/dayjs";

interface DesktopEventProps {
  businessShortDomain: string;
  slot: CalendarEventsSlot;
  isBlocking: boolean;
  minTimeStr: string | undefined;
  slotDuration: number;
  rowHeight: number;
  isSelected: boolean;
  onOpenCreateModal: (slot: CalendarEventsSlot) => void;
  onToggleSelectSlot: (slot: CalendarEventsSlot) => void;
  onOpenDetails: (appointmentId: number) => void;
}

const DesktopEvent = ({
  businessShortDomain,
  slot,
  isBlocking,
  minTimeStr,
  slotDuration,
  rowHeight,
  isSelected,
  onOpenCreateModal,
  onToggleSelectSlot,
  onOpenDetails,
}: DesktopEventProps) => {
  const absolutePlacementStyles = useMemo(() => {
    return calculateEventLayout({ slot, minTimeStr, slotDuration, rowHeight });
  }, [slot, minTimeStr, slotDuration, rowHeight]);

  const heightPx = useMemo(() => {
    const durationMinutes = dayjs(slot.end_date_locale).diff(
      dayjs(slot.start_date_locale),
      "minute",
    );
    return (durationMinutes * rowHeight) / slotDuration;
  }, [slot.start_date_locale, slot.end_date_locale, rowHeight, slotDuration]);

  const handleSlotClick = useCallback(() => {
    if (isBlocking) {
      onToggleSelectSlot(slot);
    } else {
      onOpenCreateModal(slot);
    }
  }, [isBlocking, slot, onToggleSelectSlot, onOpenCreateModal]);

  const appointmentId = slot.id;

  if (!absolutePlacementStyles) return null;

  switch (true) {
    case slot.is_blocked:
      return (
        <DesktopBlockedSlot slot={slot} globalSx={absolutePlacementStyles} />
      );
    case slot.is_booked:
      return (
        <DesktopBookedSlot
          slot={slot}
          businessShortDomain={businessShortDomain}
          globalSx={absolutePlacementStyles}
          heightPx={heightPx}
          onClick={
            !isBlocking && appointmentId !== null
              ? () => onOpenDetails(appointmentId)
              : undefined
          }
        />
      );
    default:
      return (
        <DesktopAvailableSlot
          slot={slot}
          globalSx={absolutePlacementStyles}
          isBlocking={isBlocking}
          isSelected={isSelected}
          onSlotClick={handleSlotClick}
        />
      );
  }
};

export default memo(DesktopEvent);
