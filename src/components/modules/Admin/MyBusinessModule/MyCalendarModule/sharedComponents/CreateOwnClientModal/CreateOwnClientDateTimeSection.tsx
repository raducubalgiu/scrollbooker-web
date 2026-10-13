import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import dayjs from "@/lib/dayjs";
import { SelectedSlot } from "./createOwnClientTypes";

type CreateOwnClientDateTimeSectionProps = {
  selectedSlot: SelectedSlot | null;
  disabled: boolean;
  onOpenSelect: () => void;
};

const CreateOwnClientDateTimeSection = ({
  selectedSlot,
  disabled,
  onOpenSelect,
}: CreateOwnClientDateTimeSectionProps) => {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1" fontWeight={700}>
        3. Data și ora
      </Typography>

      <Button
        onClick={onOpenSelect}
        disabled={disabled}
        sx={styles.row}
        endIcon={!disabled && <ChevronRightIcon color="action" />}
      >
        <EventOutlinedIcon sx={{ color: "text.secondary" }} />

        <Box sx={{ flex: 1, textAlign: "left" }}>
          {selectedSlot ? (
            <Typography fontWeight={600} color="text.primary">
              {dayjs(selectedSlot.startLocale).format("dddd, D MMM")}{" "}
              {dayjs(selectedSlot.startLocale).format("HH:mm")} -{" "}
              {dayjs(selectedSlot.endLocale).format("HH:mm")} (
              {dayjs(selectedSlot.endLocale).diff(
                dayjs(selectedSlot.startLocale),
                "minute"
              )}
              min)
            </Typography>
          ) : (
            <Typography color="text.secondary">
              {disabled
                ? "Selectează mai întâi serviciile"
                : "Selectează data și ora"}
            </Typography>
          )}
        </Box>
      </Button>
    </Stack>
  );
};

export default CreateOwnClientDateTimeSection;

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    justifyContent: "flex-start",
    textAlign: "left",
    textTransform: "none",
    color: "text.primary",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 3,
    px: 2,
    py: 1.5,
    width: "100%",
  },
};
