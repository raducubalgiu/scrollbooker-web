"use client";

import React from "react";
import { Stack, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "@/lib/dayjs";
import type { Dayjs } from "dayjs";
import { SelectedSlot } from "./createOwnClientTypes";

type DateTimeSelectionContentProps = {
  selectedSlot: SelectedSlot | null;
  totalDurationMinutes: number;
  onChangeSlot: (slot: SelectedSlot) => void;
};

const DateTimeSelectionContent = ({
  selectedSlot,
  totalDurationMinutes,
  onChangeSlot,
}: DateTimeSelectionContentProps) => {
  const current = selectedSlot ? dayjs(selectedSlot.startLocale) : dayjs();

  const buildSlot = (date: Dayjs, time: Dayjs): SelectedSlot => {
    const start = date
      .hour(time.hour())
      .minute(time.minute())
      .second(0)
      .millisecond(0);

    const end = start.add(totalDurationMinutes || 30, "minute");

    return {
      startUtc: start.utc().toISOString(),
      endUtc: end.utc().toISOString(),
      startLocale: start.format(),
      endLocale: end.format(),
    };
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2.5}>
        <DatePicker
          label="Data"
          value={current}
          onChange={(value) => value && onChangeSlot(buildSlot(value, current))}
          slotProps={{ textField: { fullWidth: true } }}
        />

        <TimePicker
          label="Ora de start"
          value={current}
          onChange={(value) => value && onChangeSlot(buildSlot(current, value))}
          ampm={false}
          slotProps={{ textField: { fullWidth: true } }}
        />

        {totalDurationMinutes > 0 && (
          <Typography variant="body2" color="text.secondary">
            Durata totală a serviciilor selectate: {totalDurationMinutes} min.
          </Typography>
        )}
      </Stack>
    </LocalizationProvider>
  );
};

export default DateTimeSelectionContent;
