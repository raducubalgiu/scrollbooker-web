"use client";

import React, { useMemo } from "react";
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
  businessId: number;
  selectedEmployeeId: number | null;
  slotDuration: number;
  selectedTimeSlot: AvailableTimeSlot | null;
  onSelectTimeSlot: (slot: AvailableTimeSlot) => void;
};

const AvailabilityStep = ({
  businessId,
  selectedEmployeeId,
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
    useAvailabilityData(
      businessId,
      selectedEmployeeId,
      slotDuration,
      activeDate,
      maxDate
    );

  const activeDateStr = activeDate.format("YYYY-MM-DD");

  const nextAvailableDateStr = useMemo(() => {
    return Array.from(availableDaysSet)
      .filter((day) => day > activeDateStr)
      .sort()[0];
  }, [availableDaysSet, activeDateStr]);

  const handleGoToNextAvailableDay = nextAvailableDateStr
    ? () => setActiveDate(dayjs(nextAvailableDateStr))
    : undefined;

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
        onGoToNextAvailableDay={handleGoToNextAvailableDay}
      />
    </Box>
  );
};

export default AvailabilityStep;
