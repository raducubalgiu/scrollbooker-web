"use client";

import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import SchedulesSelectHours from "./SchedulesSelectHours";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import ActionButton, {
  ActionButtonType,
} from "@/components/core/ActionButton/ActionButton";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useUpdateSchedules } from "@/controllers/booking/schedule.controller";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";

type SchedulesProps = { data: Schedule[] };

export default function MySchedulesModule({ data }: SchedulesProps) {
  const t = useTranslations("mySchedules");
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
  const {
    watch,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = methods;
  const { schedules } = watch();

  const { mutate: handleUpdateSchedules, isPending } = useUpdateSchedules();

  const handleSave = (new_data: { schedules: Schedule[] }) => {
    const updated_schedules = new_data.schedules.map((schedule) => {
      const { id, start_time, end_time } = schedule;

      return {
        id,
        start_time: start_time == "closed" ? null : start_time,
        end_time: end_time == "closed" ? null : end_time,
      };
    });

    handleUpdateSchedules(updated_schedules, {
      onSuccess: () => {
        toast.success(t("saveSuccess"));
        setDisabled(true);
      },
      onError: () => {
        reset();
        toast.error(t("saveError"));
      },
    });
  };

  const actions: ActionButtonType[] = disabled
    ? [
        {
          title: t("edit"),
          props: {
            onClick: () => setDisabled(false),
            disableElevation: true,
          },
        },
      ]
    : [
        {
          title: t("cancel"),
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
          title: isPending ? t("saving") : t("save"),
          props: {
            onClick: handleSubmit(handleSave),
            loading: isPending,
            disabled: isPending || !isDirty,
            disableElevation: true,
          },
        },
      ];

  return (
    <FormProvider {...methods}>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell
              component="th"
              scope="col"
              sx={{
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: 0.2,
              }}
            >
              {t("day")}
            </TableCell>
            <TableCell
              component="th"
              scope="col"
              align="center"
              sx={{
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: 0.2,
              }}
            >
              {t("start")}
            </TableCell>
            <TableCell
              component="th"
              scope="col"
              align="center"
              sx={{
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: 0.2,
              }}
            >
              {t("end")}
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
      <Stack alignItems="flex-end" sx={{ p: 1.5 }}>
        <ActionButton actions={actions} />
      </Stack>
    </FormProvider>
  );
}
