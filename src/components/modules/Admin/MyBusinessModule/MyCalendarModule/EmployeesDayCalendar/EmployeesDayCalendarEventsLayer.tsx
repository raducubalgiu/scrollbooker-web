"use client";

import React, { memo } from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import CalendarEvent from "../CalendarEvent/CalendarEvent";
import {
  CalendarEventsBusinessEmployee,
  CalendarEventsSlot,
} from "@/ts/models/booking/availability/CalendarEvents";
import { AppointmentBlockSlot } from "@/ts/models/booking/appointment/Appointment";

type EmployeesDayCalendarEventsLayerProps = {
  employees: CalendarEventsBusinessEmployee[];
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
  onToggleSelectSlot: (employeeId: number, slot: CalendarEventsSlot) => void;
  onOpenCreateModal: (employeeId: number, slot: CalendarEventsSlot) => void;
};

const EmployeesDayCalendarEventsLayerComponent = ({
  employees,
  bounds,
  currentRowHeight,
  slotDuration,
  timeStringsLength,
  selectedSlotsToBlock,
  isBlocking,
  businessShortDomain,
  onToggleSelectSlot,
  onOpenCreateModal,
}: EmployeesDayCalendarEventsLayerProps) => {
  if (!bounds || !bounds.minTime) return null;

  return (
    <>
      {employees.map((employee, employeeIndex) => {
        const colIndex = employeeIndex + 2;
        const totalContentHeight = timeStringsLength * currentRowHeight;

        return (
          <Box
            key={`events-col-${employee.id}`}
            sx={{
              gridColumn: colIndex,
              gridRowStart: 1,
              gridRowEnd: timeStringsLength + 1,
              position: "relative",
              height: `${totalContentHeight}px`,
              width: "100%",
            }}
          >
            {employee.slots.map((slot, slotIndex) => {
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
                  key={`slot-${employee.id}-${slotIndex}`}
                  slot={slot}
                  isBlocking={isBlocking}
                  minTimeStr={bounds.minTime}
                  slotDuration={slotDuration}
                  rowHeight={currentRowHeight}
                  isSelected={isSlotChecked}
                  businessShortDomain={businessShortDomain}
                  onToggleSelectSlot={(s) => onToggleSelectSlot(employee.id, s)}
                  onOpenCreateModal={(s) => onOpenCreateModal(employee.id, s)}
                />
              );
            })}
          </Box>
        );
      })}
    </>
  );
};

export const EmployeesDayCalendarEventsLayer = memo(
  EmployeesDayCalendarEventsLayerComponent
);
