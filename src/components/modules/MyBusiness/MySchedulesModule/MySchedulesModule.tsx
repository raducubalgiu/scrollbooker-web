"use client";

import {
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ScheduleResponseType,
  ScheduleUpdateType,
} from "@/ts/models/Schedules/ScheduleType";
import SchedulesSelectHours from "./SchedulesSelectHours";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import ActionButton, {
  ActionButtonType,
} from "@/components/core/ActionButton/ActionButton";
import { toast } from "react-toastify";
import { useMutate } from "@/hooks/useHttp";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";

type SchedulesProps = { data: ScheduleResponseType[] };

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

  const handleSave = (new_data: { schedules: ScheduleResponseType[] }) => {
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
        color: "inherit",
        onClick: () => {
          reset();
          setDisabled(true);
        },
      },
    },
    {
      title: "Editează",
      hidden: !disabled,
      props: {
        onClick: () => setDisabled(false),
      },
    },
    {
      title: "Salvează",
      hidden: disabled,
      props: {
        onClick: handleSubmit(handleSave),
        loading: isPending,
      },
    },
  ];

  return (
    <FormProvider {...methods}>
      <MainLayout title="Programul locației" hideAction>
        <Paper>
          <Divider sx={{ mt: 2.5 }} />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "600" }}>
                  Ziua săptămânii
                </TableCell>
                <TableCell sx={{ fontWeight: "600" }} align="center">
                  Ora de start
                </TableCell>
                <TableCell sx={{ fontWeight: "600" }} align="center">
                  Ora de sfârșit
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
        </Paper>
      </MainLayout>
    </FormProvider>
  );
}
