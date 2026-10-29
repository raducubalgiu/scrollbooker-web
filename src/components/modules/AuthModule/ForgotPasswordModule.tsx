"use client";

import { Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import Input from "@/components/core/Input/Input";
import AuthPageShell from "@/components/modules/AuthModule/AuthPageShell";
import AuthGradientButton from "@/components/modules/AuthModule/AuthGradientButton";
import { useForgotPassword } from "@/controllers/auth/auth.controller";
import { emailField, required } from "@/utils/validation-rules";
import { AppRoutes } from "@/utils/routes";

type ForgotPasswordValues = {
  email: string;
};

export default function ForgotPasswordModule() {
  const t = useTranslations("forgotPassword");
  const router = useRouter();
  const methods = useForm<ForgotPasswordValues>({
    defaultValues: { email: "" },
  });

  const { mutate: requestReset, isPending } = useForgotPassword();

  const handleSubmit = ({ email }: ForgotPasswordValues) => {
    const normalizedEmail = email.trim();

    requestReset(normalizedEmail, {
      onSuccess: () => {
        toast.success(t("codeSent"));
        router.push(AppRoutes.resetPassword(normalizedEmail));
      },
      onError: () => {
        toast.error(t("errorGeneric"));
      },
    });
  };

  return (
    <AuthPageShell
      title={t("title")}
      subtitle={t("subtitle")}
      footerLinkText={t("backToLogin")}
      footerHref={AppRoutes.login()}
    >
      <FormProvider {...methods}>
        <Stack spacing={1.5} sx={{ mb: 3 }}>
          <Input
            name="email"
            label={t("emailLabel")}
            placeholder={t("emailPlaceholder")}
            type="email"
            autoComplete="email"
            rules={{ ...required(), ...emailField() }}
          />

          <AuthGradientButton
            loading={isPending}
            onClick={methods.handleSubmit(handleSubmit)}
            sx={{ mt: 1 }}
          >
            {t("submit")}
          </AuthGradientButton>
        </Stack>
      </FormProvider>
    </AuthPageShell>
  );
}
