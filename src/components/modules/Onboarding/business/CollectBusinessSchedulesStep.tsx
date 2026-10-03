import BusinessOnboardingSectionLayout from "../BusinessOnboardingSectionLayout";
import { FormProvider, useForm } from "react-hook-form";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { useGetSchedulesByUserId } from "@/controllers/booking/schedule.controller";
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import SchedulesSelectHours from "../../Admin/MyBusinessModule/MySchedulesModule/SchedulesSelectHours";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { every } from "lodash";
import { useCollectBusinessSchedulesMutation } from "@/controllers/onboarding/onboarding.controller";
import { useTranslations } from "next-intl";

type SchedulesFormValues = {
  schedules: Schedule[];
};

const CollectBusinessSchedulesStep = () => {
  const t = useTranslations("onboarding.schedules");
  const { data: session, update } = useSession();
  const router = useRouter();

  const { data, isLoading } = useGetSchedulesByUserId(String(session?.user_id));

  const methods = useForm<SchedulesFormValues>({
    defaultValues: {
      schedules:
        data?.map((schedule) => ({
          ...schedule,
          start_time: schedule.start_time ?? "closed",
          end_time: schedule.end_time ?? "closed",
        })) ?? [],
    },
  });
  const { watch, handleSubmit, reset } = methods;
  const { schedules } = watch();

  useEffect(() => {
    if (data) {
      const formattedSchedules = data.map((schedule) => ({
        ...schedule,
        start_time: schedule.start_time ?? "closed",
        end_time: schedule.end_time ?? "closed",
      }));

      reset({ schedules: formattedSchedules });
    }
  }, [data, reset]);

  const { mutate: handleUpdateSchedules, isPending: isLoadingUpdate } =
    useCollectBusinessSchedulesMutation();

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
      onSuccess: async (data) => {
        await update({
          is_validated: data.is_validated,
          registration_step: data.registration_step,
        });

        router.refresh();
      },
    });
  };

  const isNextDisabled = every(schedules, { start_time: "closed" });

  return (
    <BusinessOnboardingSectionLayout
      title={t("title")}
      description={t("subtitle")}
      isLoading={isLoadingUpdate}
      isDisabled={isLoading || isLoadingUpdate || isNextDisabled}
      onClick={handleSubmit(handleSave)}
    >
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
              {isLoading &&
                Array.from(new Array(7)).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell>
                      <Skeleton variant="text" width="60%" height={30} />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={35}
                        sx={{ borderRadius: 1 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={35}
                        sx={{ borderRadius: 1 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              {!isLoading &&
                schedules?.map((schedule, i) => (
                  <SchedulesSelectHours
                    key={i}
                    schedule={schedule}
                    namePath={`schedules.${i}`}
                    disabled={false}
                  />
                ))}
            </TableBody>
          </Table>
        </Box>
      </FormProvider>
    </BusinessOnboardingSectionLayout>
  );
};

export default CollectBusinessSchedulesStep;
