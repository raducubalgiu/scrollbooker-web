"use client";

import { TableCell, TableRow } from "@mui/material";
import { ScheduleResponseType } from "@/ts/models/Schedules/ScheduleType";
import InputSelect from "@/components/core/Input/InputSelect";
import { useTimeSlots } from "@/hooks/useTimeSlots";
import { useFormContext } from "react-hook-form";

type SchedulesSelectHoursProps = {
  schedule: ScheduleResponseType;
  namePath: string;
  disabled: boolean;
};

export default function SchedulesSelectHours({
  schedule,
  namePath,
  disabled,
}: SchedulesSelectHoursProps) {
  const slots = useTimeSlots();
  const { watch } = useFormContext();
  const closed = { value: "closed", name: "Inchis" };
  const startTime = watch(`${namePath}.start_time`);

  const isGreatherThan = () => ({
    validate: (endTime: string) => {
      if (endTime < startTime) {
        return "Data de sfarsit nu poate fi mai mica sau egala decat data de inceput";
      }
      return true;
    },
  });

  const dayOfWeekMap = new Map<string, string>([
    ["monday", "Luni"],
    ["tuesday", "Marti"],
    ["wednesday", "Miercuri"],
    ["thursday", "Joi"],
    ["friday", "Vineri"],
    ["saturday", "Sambata"],
    ["sunday", "Duminica"],
  ]);

  return (
    <TableRow>
      <TableCell>
        {dayOfWeekMap.get(schedule.day_of_week.toLowerCase())}
      </TableCell>
      <TableCell align="center">
        <InputSelect
          name={`${namePath}.start_time`}
          options={[closed, ...slots]}
          disabled={disabled}
          size="small"
        />
      </TableCell>
      <TableCell align="center">
        <InputSelect
          name={`${namePath}.end_time`}
          options={[closed, ...slots]}
          disabled={disabled}
          size="small"
          rules={isGreatherThan()}
        />
      </TableCell>
    </TableRow>
  );
}
