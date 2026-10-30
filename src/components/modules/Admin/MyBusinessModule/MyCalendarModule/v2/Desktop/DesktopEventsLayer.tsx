"use client";

import React, { memo } from "react";
import { Box } from "@mui/material";
import DesktopEvent from "./DesktopEvent/DesktopEvent";
import { DesktopCurrentTimeIndicator } from "./DesktopCurrentTimeIndicator";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { AppointmentBlockSlot } from "@/ts/models/booking/appointment/Appointment";
import { CalendarBounds } from "../calendarSlots";
import { isInFuture } from "../useNow";
import { DesktopGridColumn } from "./DesktopGridBackground";

export type DesktopEventsColumn = DesktopGridColumn & {
  userId: number;
  isToday: boolean;
};

type DesktopEventsLayerProps = {
  columns: DesktopEventsColumn[];
  bounds: CalendarBounds;
  currentRowHeight: number;
  slotDuration: number;
  timeStringsLength: number;
  selectedSlotsToBlock: AppointmentBlockSlot[];
  isBlocking: boolean;
  businessShortDomain: string;
  onToggleSelectSlot: (columnKey: string, slot: CalendarEventsSlot) => void;
  onOpenCreateModal: (columnKey: string, slot: CalendarEventsSlot) => void;
  onOpenDetails: (appointmentId: number) => void;
};

const DesktopEventsLayerComponent = ({
  columns,
  bounds,
  currentRowHeight,
  slotDuration,
  timeStringsLength,
  selectedSlotsToBlock,
  isBlocking,
  businessShortDomain,
  onToggleSelectSlot,
  onOpenCreateModal,
  onOpenDetails,
}: DesktopEventsLayerProps) => {
  return (
    <>
      {columns.map((column, columnIndex) => (
        <Box
          key={`events-col-${column.key}`}
          sx={{
            gridColumn: columnIndex + 2,
            gridRowStart: 1,
            gridRowEnd: timeStringsLength + 1,
            position: "relative",
            height: `${timeStringsLength * currentRowHeight}px`,
            width: "100%",
          }}
        >
          {column.isToday && (
            <DesktopCurrentTimeIndicator
              minTimeStr={bounds.minTime}
              maxTimeStr={bounds.maxTime}
              slotDuration={slotDuration}
              rowHeight={currentRowHeight}
            />
          )}

          {column.slots.map((slot) => (
            <DesktopEvent
              key={`slot-${column.key}-${slot.start_date_utc}-${slot.id ?? "free"}`}
              slot={slot}
              isBlocking={isBlocking}
              minTimeStr={bounds.minTime}
              slotDuration={slotDuration}
              rowHeight={currentRowHeight}
              isSelected={selectedSlotsToBlock.some(
                (item) =>
                  item.start_date === slot.start_date_utc &&
                  item.user_id === column.userId
              )}
              businessShortDomain={businessShortDomain}
              onToggleSelectSlot={(s) => {
                if (isInFuture(s.start_date_utc)) onToggleSelectSlot(column.key, s);
              }}
              onOpenCreateModal={(s) => {
                if (isInFuture(s.start_date_utc)) onOpenCreateModal(column.key, s);
              }}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </Box>
      ))}
    </>
  );
};

export const DesktopEventsLayer = memo(DesktopEventsLayerComponent);
