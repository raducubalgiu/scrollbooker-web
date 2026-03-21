"use client";

import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ScheduleType,
  ScheduleUpdateType,
} from "@/ts/models/booking/schedule/ScheduleType";
import SchedulesSelectHours from "./SchedulesSelectHours";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import ActionButton, {
  ActionButtonType,
} from "@/components/core/ActionButton/ActionButton";
import { toast } from "react-toastify";
import { useMutate } from "@/hooks/useHttp";

type SchedulesProps = { data: ScheduleType[] };

export default function MySchedulesModule({ data }: SchedulesProps) {
  const [disabled, setDisabled] = useState(true);

  const methods = useForm({
    defaultValues: {
      schedules: data.map((schedule) => {
        const { start_time, end_time } = schedule;
        return {
          ...schedule,
          start_time: start_time ? start_time : "closed",
          end_time: end_time ? end_time : "closed",
        };
      }),
    },
  });
  const { watch, reset, handleSubmit } = methods;
  const { schedules } = watch();

  const { mutate: handleUpdateSchedules, isPending } = useMutate<
    ScheduleUpdateType[]
  >({
    key: ["update-schedules"],
    url: "/api/schedules",
    method: "PUT",
    options: {
      onSuccess: () => {
        toast.success("Ți-ai salvat cu succes programul!");
        setDisabled(true);
      },
      onError: () => {
        reset();
        toast.error("Ceva nu a mers cum trebuie. Încearcă mai târziu");
      },
    },
  });

  const handleSave = (new_data: { schedules: ScheduleType[] }) => {
    const updated_schedules = new_data.schedules.map((schedule) => {
      const { id, start_time, end_time } = schedule;

      return {
        id,
        start_time: start_time == "closed" ? null : start_time,
        end_time: end_time == "closed" ? null : end_time,
      };
    });

    handleUpdateSchedules(updated_schedules);
  };

  const actions: ActionButtonType[] = [
    {
      title: "Renunță",
      hidden: disabled,
      props: {
        variant: "outlined",
        color: "secondary",
        onClick: () => {
          reset();
          setDisabled(true);
        },
        disableElevation: true,
      },
    },
    {
      title: "Editează",
      hidden: !disabled,
      props: {
        onClick: () => setDisabled(false),
        disableElevation: true,
      },
    },
    {
      title: "Salvează",
      hidden: disabled,
      props: {
        onClick: handleSubmit(handleSave),
        loading: isPending,
        disableElevation: true,
      },
    },
  ];

  return (
    <FormProvider {...methods}>
      <Box>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell
                component="th"
                scope="col"
                sx={{ fontWeight: 700, fontSize: "1rem", letterSpacing: 0.2 }}
              >
                Ziua
              </TableCell>
              <TableCell
                component="th"
                scope="col"
                align="center"
                sx={{ fontWeight: 700, fontSize: "1rem", letterSpacing: 0.2 }}
              >
                Start
              </TableCell>
              <TableCell
                component="th"
                scope="col"
                align="center"
                sx={{ fontWeight: 700, fontSize: "1rem", letterSpacing: 0.2 }}
              >
                Sfârșit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedules?.map((schedule, i) => (
              <SchedulesSelectHours
                key={i}
                schedule={schedule}
                namePath={`schedules.${i}`}
                disabled={disabled}
              />
            ))}
          </TableBody>
        </Table>
        <Stack alignItems="flex-end" sx={{ py: 1.5 }}>
          <ActionButton actions={actions} />
        </Stack>
      </Box>
    </FormProvider>
  );
}
