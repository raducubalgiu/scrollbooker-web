"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "@/lib/dayjs";
import type { Dayjs } from "dayjs";
import { SelectedSlot } from "./createOwnClientTypes";

type SelectDateTimeDrawerProps = {
  open: boolean;
  selectedSlot: SelectedSlot | null;
  totalDurationMinutes: number;
  onClose: () => void;
  onSelectSlot: (slot: SelectedSlot) => void;
};

const SelectDateTimeDrawer = ({
  open,
  selectedSlot,
  totalDurationMinutes,
  onClose,
  onSelectSlot,
}: SelectDateTimeDrawerProps) => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [time, setTime] = useState<Dayjs>(dayjs());

  useEffect(() => {
    if (!open) return;

    const seed = selectedSlot ? dayjs(selectedSlot.startLocale) : dayjs();
    setDate(seed);
    setTime(seed);
  }, [open, selectedSlot]);

  const handleConfirm = () => {
    const start = date
      .hour(time.hour())
      .minute(time.minute())
      .second(0)
      .millisecond(0);

    const end = start.add(totalDurationMinutes || 30, "minute");

    onSelectSlot({
      startUtc: start.utc().toISOString(),
      endUtc: end.utc().toISOString(),
      startLocale: start.format(),
      endLocale: end.format(),
    });
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={styles.drawer}
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, pb: 1.5 }}
      >
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>

        <Typography fontWeight={700}>Selectează data și ora</Typography>

        <Box sx={{ width: 34 }} />
      </Stack>

      <Box sx={styles.content}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={2.5}>
            <DatePicker
              label="Data"
              value={date}
              onChange={(value) => value && setDate(value)}
              slotProps={{ textField: { fullWidth: true } }}
            />

            <TimePicker
              label="Ora de start"
              value={time}
              onChange={(value) => value && setTime(value)}
              ampm={false}
              slotProps={{ textField: { fullWidth: true } }}
            />

            {totalDurationMinutes > 0 && (
              <Typography variant="body2" color="text.secondary">
                Durata totală a serviciilor selectate: {totalDurationMinutes}{" "}
                min.
              </Typography>
            )}
          </Stack>
        </LocalizationProvider>
      </Box>

      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          onClick={handleConfirm}
        >
          Confirmă intervalul
        </Button>
      </Box>
    </Drawer>
  );
};

export default SelectDateTimeDrawer;

const styles = {
  drawer: {
    zIndex: (theme: Theme) => theme.zIndex.modal + 1,
  },
  paper: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    p: 2,
    pt: 0,
    overflowY: "auto",
  },
};
