import InputSelect from "@/components/core/Input/InputSelect";
import { useMutate } from "@/hooks/useHttp";
import { OnboardingResponse } from "@/ts/models/onboarding/Onboarding";
import { Button, Container, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

type BirthdateForm = {
  day: string;
  month: string;
  year: string;
};

const days = Array.from({ length: 31 }, (_, i) => ({
  value: (i + 1).toString(),
  name: (i + 1).toString(),
}));

const months = [
  { value: "1", name: "Ianuarie" },
  { value: "2", name: "Februarie" },
  { value: "3", name: "Martie" },
  { value: "4", name: "Aprilie" },
  { value: "5", name: "Mai" },
  { value: "6", name: "Iunie" },
  { value: "7", name: "Iulie" },
  { value: "8", name: "August" },
  { value: "9", name: "Septembrie" },
  { value: "10", name: "Octombrie" },
  { value: "11", name: "Noiembrie" },
  { value: "12", name: "Decembrie" },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => ({
  value: (currentYear - i).toString(),
  name: (currentYear - i).toString(),
}));

const CollectBirthdateStep = () => {
  const { update } = useSession();
  const router = useRouter();

  const methods = useForm<BirthdateForm>({
    defaultValues: { day: "", month: "", year: "" },
  });

  const { mutate: updateBirthdate, isPending } = useMutate({
    key: ["update-birthdate"],
    url: "/api/onboarding/collect-birthdate",
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

  const onSubmit = (data: BirthdateForm) => {
    let formattedDate = null;

    if (data.day && data.month && data.year) {
      const dateString = `${data.year}-${data.month.padStart(2, "0")}-${data.day.padStart(2, "0")}`;
      formattedDate = dayjs(dateString).format("YYYY-MM-DD");
    }

    updateBirthdate({ birthdate: formattedDate });
  };

  return (
    <FormProvider {...methods}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", bgcolor: "background.paper" }}
      >
        <Container maxWidth="sm">
          <Stack spacing={3}>
            <Stack spacing={1} textAlign="center">
              <Typography variant="h4" fontWeight={700}>
                Data de naștere
              </Typography>

              <Typography color="text.secondary">
                Folosim această informație doar pentru a-ți personaliza
                experiența
              </Typography>
            </Stack>

            <Stack flexDirection="row" alignItems="center" gap={1}>
              <InputSelect name="day" label="Zi" options={days} size="medium" />
              <InputSelect
                name="month"
                label="Lună"
                options={months}
                size="medium"
              />
              <InputSelect
                name="year"
                label="An"
                options={years}
                size="medium"
              />
            </Stack>

            <Button
              variant="contained"
              size="large"
              fullWidth
              loading={isPending}
              disabled={isPending}
              onClick={methods.handleSubmit(onSubmit)}
              disableElevation
              sx={{ fontWeight: 600, p: 1.5, fontSize: 17 }}
            >
              Salvează
            </Button>

            <Button
              onClick={() => updateBirthdate({ birthdate: null })}
              disableElevation
              sx={{ fontWeight: 600, p: 1.5, fontSize: 17 }}
              disabled={isPending}
            >
              Prefer să nu spun
            </Button>
          </Stack>
        </Container>
      </Stack>
    </FormProvider>
  );
};

export default CollectBirthdateStep;
