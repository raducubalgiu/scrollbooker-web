import React, { useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Stack,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useUpdateSchedules } from "@/controllers/booking/schedule.controller";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { toast } from "react-toastify";
import ActionButton, {
  ActionButtonType,
} from "@/components/core/ActionButton/ActionButton";
import SchedulesSelectHours from "./SchedulesSelectHours";

type SchedulesFormProps = {
  initialSchedules: Schedule[];
};

export const SchedulesForm = ({ initialSchedules }: SchedulesFormProps) => {
  const t = useTranslations("mySchedules");
  const [disabled, setDisabled] = useState(true);
  const { mutate: handleUpdateSchedules, isPending } = useUpdateSchedules();

  const methods = useForm({
    defaultValues: {
      schedules: initialSchedules.map((schedule) => {
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

  const handleSave = (new_data: { schedules: Schedule[] }) => {
    const updated_schedules = new_data.schedules.map((schedule) => {
      const { id, start_time, end_time } = schedule;
      return {
        id,
        start_time: start_time === "closed" ? null : start_time,
        end_time: end_time === "closed" ? null : end_time,
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
    <Paper>
      <FormProvider {...methods}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell
                component="th"
                scope="col"
                sx={{ fontWeight: 700, fontSize: "1rem", letterSpacing: 0.2 }}
              >
                {t("day")}
              </TableCell>
              <TableCell
                component="th"
                scope="col"
                align="center"
                sx={{ fontWeight: 700, fontSize: "1rem", letterSpacing: 0.2 }}
              >
                {t("start")}
              </TableCell>
              <TableCell
                component="th"
                scope="col"
                align="center"
                sx={{ fontWeight: 700, fontSize: "1rem", letterSpacing: 0.2 }}
              >
                {t("end")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedules?.map((schedule, i) => (
              <SchedulesSelectHours
                key={schedule.id || i}
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
    </Paper>
  );
};
