import InputSelect from "@/components/core/Input/InputSelect";
import { Button, Container, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useCollectBirthdateMutation } from "@/controllers/onboarding/onboarding.controller";
import { useTranslations } from "next-intl";

type BirthdateForm = {
  day: string;
  month: string;
  year: string;
};

const days = Array.from({ length: 31 }, (_, i) => ({
  value: (i + 1).toString(),
  name: (i + 1).toString(),
}));

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => ({
  value: (currentYear - i).toString(),
  name: (currentYear - i).toString(),
}));

const CollectBirthdateStep = () => {
  const t = useTranslations("onboarding.birthdate");
  const months = (t.raw("months") as string[]).map((name, i) => ({
    value: (i + 1).toString(),
    name,
  }));
  const { update } = useSession();
  const router = useRouter();

  const methods = useForm<BirthdateForm>({
    defaultValues: { day: "", month: "", year: "" },
  });

  const { mutate: updateBirthdate, isPending } = useCollectBirthdateMutation();

  const handleBirthdateSuccess = async (data: {
    is_validated: boolean;
    registration_step: string | null;
  }) => {
    await update({
      is_validated: data.is_validated,
      registration_step: data.registration_step,
    });

    router.refresh();
  };

  const onSubmit = (data: BirthdateForm) => {
    let formattedDate = null;

    if (data.day && data.month && data.year) {
      const dateString = `${data.year}-${data.month.padStart(2, "0")}-${data.day.padStart(2, "0")}`;
      formattedDate = dayjs(dateString).format("YYYY-MM-DD");
    }

    updateBirthdate(
      { birthdate: formattedDate },
      { onSuccess: handleBirthdateSuccess }
    );
  };

  return (
    <FormProvider {...methods}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100%", bgcolor: "background.paper" }}
      >
        <Container maxWidth="sm">
          <Stack spacing={3}>
            <Stack spacing={1} textAlign="center">
              <Typography variant="h4" fontWeight={700}>
                {t("title")}
              </Typography>

              <Typography color="text.secondary">{t("subtitle")}</Typography>
            </Stack>

            <Stack flexDirection="row" alignItems="center" gap={1}>
              <InputSelect
                name="day"
                label={t("day")}
                options={days}
                size="medium"
              />
              <InputSelect
                name="month"
                label={t("month")}
                options={months}
                size="medium"
              />
              <InputSelect
                name="year"
                label={t("year")}
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
              {t("save")}
            </Button>

            <Button
              onClick={() =>
                updateBirthdate(
                  { birthdate: null },
                  { onSuccess: handleBirthdateSuccess }
                )
              }
              disableElevation
              sx={{ fontWeight: 600, p: 1.5, fontSize: 17 }}
              disabled={isPending}
            >
              {t("skip")}
            </Button>
          </Stack>
        </Container>
      </Stack>
    </FormProvider>
  );
};

export default CollectBirthdateStep;
