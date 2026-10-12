"use client";

import React, { memo } from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import CalendarEvent from "./CalendarEvent/CalendarEvent";
import { CurrentTimeIndicator } from "./CurrentTimeIndicator";
import { CalendarGridColumn } from "./CalendarGridBackground";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { AppointmentBlockSlot } from "@/ts/models/booking/appointment/Appointment";

export type CalendarEventsLayerColumn = CalendarGridColumn & {
  isToday: boolean;
};

type CalendarEventsLayerProps = {
  columns: CalendarEventsLayerColumn[];
  bounds: {
    minTime: string | undefined;
    maxTime: string | undefined;
  } | null;
  currentRowHeight: number;
  slotDuration: number;
  timeStringsLength: number;
  selectedSlotsToBlock: AppointmentBlockSlot[];
  isBlocking: boolean;
  businessShortDomain: string;
  onToggleSelectSlot: (columnKey: string, slot: CalendarEventsSlot) => void;
  onOpenCreateModal: (columnKey: string, slot: CalendarEventsSlot) => void;
};

const CalendarEventsLayerComponent = ({
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
}: CalendarEventsLayerProps) => {
  if (!bounds || !bounds.minTime) return null;

  return (
    <>
      {columns.map((column, columnIndex) => {
        const colIndex = columnIndex + 2;
        const totalContentHeight = timeStringsLength * currentRowHeight;

        return (
          <Box
            key={`events-col-${column.key}`}
            sx={{
              gridColumn: colIndex,
              gridRowStart: 1,
              gridRowEnd: timeStringsLength + 1,
              position: "relative",
              height: `${totalContentHeight}px`,
              width: "100%",
            }}
          >
            {column.isToday && (
              <CurrentTimeIndicator
                minTimeStr={bounds.minTime}
                maxTimeStr={bounds.maxTime}
                slotDuration={slotDuration}
                rowHeight={currentRowHeight}
              />
            )}

            {column.slots.map((slot, slotIndex) => {
              const isVacantPastSlot =
                dayjs().isAfter(dayjs(slot.start_date_locale)) &&
                !slot.is_booked &&
                !slot.is_blocked;

              if (isVacantPastSlot) return null;

              const isSlotChecked = selectedSlotsToBlock.some(
                (item) => item.start_date === slot.start_date_utc
              );

              return (
                <CalendarEvent
                  key={`slot-${column.key}-${slotIndex}`}
                  slot={slot}
                  isBlocking={isBlocking}
                  minTimeStr={bounds.minTime}
                  slotDuration={slotDuration}
                  rowHeight={currentRowHeight}
                  isSelected={isSlotChecked}
                  businessShortDomain={businessShortDomain}
                  onToggleSelectSlot={(s) => onToggleSelectSlot(column.key, s)}
                  onOpenCreateModal={(s) => onOpenCreateModal(column.key, s)}
                />
              );
            })}
          </Box>
        );
      })}
    </>
  );
};

export const CalendarEventsLayer = memo(CalendarEventsLayerComponent);
