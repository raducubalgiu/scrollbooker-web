import React, { useLayoutEffect } from "react";
import { Paper, Table, TableBody, Stack } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useUpdateSchedules } from "@/controllers/booking/schedule.controller";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { toast } from "react-toastify";
import ActionButton, {
  ActionButtonType,
} from "@/components/core/ActionButton/ActionButton";
import MainLayoutFooterActions from "@/components/cutomized/MainLayout/MainLayoutFooterActions";
import SchedulesSelectHours from "./SchedulesSelectHours";

type SchedulesFormProps = {
  initialSchedules: Schedule[];
  onFooterChange?: (footer: React.ReactNode) => void;
};

export const SchedulesForm = ({
  initialSchedules,
  onFooterChange,
}: SchedulesFormProps) => {
  const t = useTranslations("mySchedules");
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
        reset(methods.getValues());
      },
      onError: () => {
        reset();
      },
    });
  };

  const actions: ActionButtonType[] = [
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

  useLayoutEffect(() => {
    if (!onFooterChange) return;
    onFooterChange(<MainLayoutFooterActions actions={actions} />);
    return () => onFooterChange(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, isDirty]);

  return (
    <Paper>
      <FormProvider {...methods}>
        <Table size="medium">
          <TableBody>
            {schedules?.map((schedule, i) => (
              <SchedulesSelectHours
                key={schedule.id || i}
                schedule={schedule}
                namePath={`schedules.${i}`}
                disabled={false}
              />
            ))}
          </TableBody>
        </Table>

        {!onFooterChange && (
          <Stack alignItems="flex-end" sx={{ p: 1.5 }}>
            <ActionButton actions={actions} />
          </Stack>
        )}
      </FormProvider>
    </Paper>
  );
};
