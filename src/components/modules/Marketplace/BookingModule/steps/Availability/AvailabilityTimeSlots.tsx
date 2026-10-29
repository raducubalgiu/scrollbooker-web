import {
  AvailableTimeSlot,
  AvailableTimeslotsResponse,
} from "@/ts/models/booking/availability/AvailableTimeSlot";
import { Box, Button, Stack, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import React from "react";
import AvailableSlot from "./AvailableSlot";
import AvailableSlotSkeleton from "./AvailableSlotSkeleton";

type AvailabilityTimeSlotsProps = {
  data: AvailableTimeslotsResponse | undefined;
  isLoading: boolean;
  selectedTimeSlot: AvailableTimeSlot | null;
  onSelectTimeSlot: (slot: AvailableTimeSlot) => void;
  onGoToNextAvailableDay?: (() => void) | undefined;
};

const AvailabilityTimeSlots = ({
  data,
  isLoading,
  selectedTimeSlot,
  onSelectTimeSlot,
  onGoToNextAvailableDay,
}: AvailabilityTimeSlotsProps) => {
  const { is_closed, available_slots } = data || {};

  return (
    <Box sx={styles.slotsPlaceholder}>
      {isLoading &&
        Array.from({ length: 5 }).map((_, i) => (
          <AvailableSlotSkeleton key={i} />
        ))}

      {!isLoading && (is_closed || isEmpty(available_slots)) && (
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={2.5}
          sx={{
            p: { xs: 1, md: 3 },
            border: 1.5,
            borderColor: "divider",
            borderRadius: 2.5,
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            Nu au fost găsite locuri libere
          </Typography>

          {onGoToNextAvailableDay && (
            <Button
              variant="outlined"
              color="neutral"
              size="large"
              onClick={onGoToNextAvailableDay}
            >
              Mergi la următoarea zi disponibilă
            </Button>
          )}
        </Stack>
      )}

      {!isLoading &&
        available_slots?.map((slot) => (
          <AvailableSlot
            key={slot.start_date_locale}
            slot={slot}
            isSelected={
              selectedTimeSlot?.start_date_utc === slot.start_date_utc
            }
            onSelectSlot={onSelectTimeSlot}
          />
        ))}
    </Box>
  );
};

export default AvailabilityTimeSlots;

const styles = {
  slotsPlaceholder: {
    mt: { xs: 1.5, md: 4 },
    width: "100%",
  },
};
