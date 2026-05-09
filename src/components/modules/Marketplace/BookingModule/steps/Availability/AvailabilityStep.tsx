"use client";

import React from "react";
import "dayjs/locale/ro";
import { Box, Typography } from "@mui/material";
import dayjs from "@/lib/dayjs";
import AvailabiltyActions from "./AvailabiltyActions";
import AvailabilityHeader from "./AvailabilityHeader";
import AvailabilityTimeSlots from "./AvailabilityTimeSlots";
import { useCalendarNavigation } from "./useCalendarNavigation";
import { useAvailabilityData } from "./useAvailabilityData";
import { AvailableTimeSlot } from "@/ts/models/booking/availability/AvailableTimeSlot";

type AvailabilityStepProps = {
  userId: number;
  slotDuration: number;
  selectedTimeSlot: AvailableTimeSlot | null;
  onSelectTimeSlot: (slot: AvailableTimeSlot) => void;
};

const AvailabilityStep = ({
  userId,
  slotDuration,
  selectedTimeSlot,
  onSelectTimeSlot,
}: AvailabilityStepProps) => {
  const {
    activeDate,
    setActiveDate,
    weeks,
    transform,
    isAnimating,
    handleNavigate,
    maxDate,
    isPrevDisabled,
    isNextDisabled,
  } = useCalendarNavigation(dayjs());

  const { timeslots, isLoadingSlots, isLoadingDays, availableDaysSet } =
    useAvailabilityData(userId, slotDuration, activeDate, maxDate);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography fontWeight={800} fontSize={47.5} mt={3}>
        Data și ora
      </Typography>

      <AvailabiltyActions
        activeMonth={activeDate.format("MMMM YYYY")}
        isPrevDisabled={isLoadingSlots || isPrevDisabled}
        isNextDisabled={isLoadingSlots || isNextDisabled}
        onNavigatePrev={() => handleNavigate("prev")}
        onNavigateNext={() => handleNavigate("next")}
      />

      <AvailabilityHeader
        weeks={weeks}
        activeDate={activeDate}
        maxDate={maxDate}
        isLoadingAvailableDays={isLoadingDays}
        isAnimating={isAnimating}
        transform={transform}
        onSetActiveDay={setActiveDate}
        availableDaysSet={availableDaysSet}
      />

      <AvailabilityTimeSlots
        data={timeslots}
        isLoading={isLoadingSlots}
        selectedTimeSlot={selectedTimeSlot}
        onSelectTimeSlot={onSelectTimeSlot}
      />
    </Box>
  );
};

export default AvailabilityStep;
