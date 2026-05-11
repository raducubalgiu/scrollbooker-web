import {
  AvailableTimeSlot,
  AvailableTimeslotsResponse,
} from "@/ts/models/booking/availability/AvailableTimeSlot";
import {
  alpha,
  Box,
  Button,
  Skeleton,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import { isEmpty } from "lodash";
import React from "react";
import AvailableSlot from "./AvailableSlot";

type AvailabilityTimeSlotsProps = {
  data: AvailableTimeslotsResponse | undefined;
  isLoading: boolean;
  selectedTimeSlot: AvailableTimeSlot | null;
  onSelectTimeSlot: (slot: AvailableTimeSlot) => void;
};

const AvailabilityTimeSlots = ({
  data,
  isLoading,
  selectedTimeSlot,
  onSelectTimeSlot,
}: AvailabilityTimeSlotsProps) => {
  const { is_closed, available_slots } = data || {};

  return (
    <Box sx={styles.slotsPlaceholder}>
      {isLoading &&
        Array.from({ length: 5 }).map((_, i) => (
          <Stack key={i} flexDirection="row" sx={styles.slotContainer}>
            <Stack
              sx={{ height: 30 }}
              alignItems="center"
              justifyContent="center"
            >
              <Skeleton variant="rounded" width={60} height={15} />
            </Stack>
          </Stack>
        ))}

      {!isLoading && (is_closed || isEmpty(available_slots)) && (
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={2.5}
          sx={{
            p: 3,
            border: 1.5,
            borderColor: "divider",
            borderRadius: 2.5,
            minHeight: 300,
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            Nu au fost găsite locuri libere
          </Typography>

          <Button variant="outlined" color="secondary" size="large">
            Mergi la următoarea zi disponibilă
          </Button>
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
    mt: 4,
    width: "100%",
  },
  slotContainer: (theme: Theme) => ({
    p: 3,
    border: 1.5,
    borderColor: "divider",
    borderRadius: 2.5,
    mb: 2.5,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.text.primary + "90",
      backgroundColor: alpha(theme.palette.divider, 0),
    },
  }),
};
