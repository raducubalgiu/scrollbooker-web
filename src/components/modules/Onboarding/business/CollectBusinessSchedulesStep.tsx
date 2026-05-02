import BusinessOnboardingSectionLayout from "../BusinessOnboardingSectionLayout";
import { FormProvider, useForm } from "react-hook-form";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import SchedulesSelectHours from "../../Admin/MyBusiness/MySchedulesModule/SchedulesSelectHours";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OnboardingResponse } from "@/ts/models/onboarding/Onboarding";

type SchedulesFormValues = {
  schedules: Schedule[];
};

const CollectBusinessSchedulesStep = () => {
  const { update } = useSession();
  const router = useRouter();
  const { data, isLoading } = useCustomQuery<Schedule[]>({
    key: ["business-schedules"],
    url: "/api/my-business/schedules",
  });

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

  const { mutate: handleUpdateSchedules, isPending } = useMutate({
    key: ["update-schedules"],
    url: "/api/onboarding/collect-business-schedules",
    method: "PATCH",
    options: {
      onSuccess: async (data: OnboardingResponse) => {
        await update({
          is_validated: data.is_validated,
          registration_step: data.registration_step,
        });

        router.refresh();
      },
    },
  });

  const handleSave = (new_data: { schedules: Schedule[] }) => {
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

  return (
    <BusinessOnboardingSectionLayout
      title="Programul de lucru"
      description="Adauga intervalele orare in care locatia ta este deschisa pentru clienti"
      isLoading={isPending}
      isDisabled={isPending || isLoading}
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
