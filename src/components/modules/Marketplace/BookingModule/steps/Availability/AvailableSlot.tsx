import { lighten, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import React from "react";
import { AvailableTimeSlot } from "@/ts/models/booking/availability/AvailableTimeSlot";
import dayjs from "@/lib/dayjs";

type AvailableSlotProps = {
  slot: AvailableTimeSlot;
  isSelected: boolean;
  onSelectSlot: (slot: AvailableTimeSlot) => void;
};

const AvailableSlot = ({
  slot,
  isSelected,
  onSelectSlot,
}: AvailableSlotProps) => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      onClick={() => onSelectSlot(slot)}
      sx={(theme) => {
        return {
          p: 3,
          border: 1.5,
          borderColor: "divider",
          borderRadius: 2.5,
          mb: 2.5,
          cursor: "pointer",
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor:
              theme.palette.mode === "dark"
                ? lighten(theme.palette.background.paper, 0.1)
                : lighten(theme.palette.background.paper, 0.2),
          },
        };
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        {dayjs.utc(slot.start_date_locale).format("HH:mm")}
      </Typography>

      {isSelected && (
        <CheckCircleRoundedIcon fontSize="large" color="primary" />
      )}
    </Stack>
  );
};

export default AvailableSlot;
