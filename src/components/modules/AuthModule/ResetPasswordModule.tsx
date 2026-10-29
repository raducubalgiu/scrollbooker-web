"use client";

import { Button, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import axios from "axios";
import Input from "@/components/core/Input/Input";
import PasswordInput from "@/components/core/Input/PasswordInput";
import AuthPageShell from "@/components/modules/AuthModule/AuthPageShell";
import AuthGradientButton from "@/components/modules/AuthModule/AuthGradientButton";
import {
  useForgotPassword,
  useResetPassword,
} from "@/controllers/auth/auth.controller";
import {
  emailField,
  passwordStrength,
  required,
} from "@/utils/validation-rules";
import { AppRoutes } from "@/utils/routes";

type ResetPasswordValues = {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
};

function resetErrorMessage(
  error: unknown,
  t: ReturnType<typeof useTranslations<"resetPassword">>
): string {
  const detail = axios.isAxiosError(error)
    ? (error.response?.data as { detail?: string } | undefined)?.detail
    : undefined;

  switch (detail) {
    case "Code invalid or expired":
      return t("errorInvalidCode");
    case "Incorrect code":
      return t("errorIncorrectCode");
    case "Too many attempts, request a new code":
      return t("errorTooManyAttempts");
    default:
      return t("errorGeneric");
  }
}

export default function ResetPasswordModule() {
  const t = useTranslations("resetPassword");
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email")?.trim() ?? "";

  const methods = useForm<ResetPasswordValues>({
    defaultValues: {
      email: emailFromQuery,
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate: resetPassword, isPending } = useResetPassword();
  const { mutate: resendCode, isPending: isResending } = useForgotPassword();

  const handleSubmit = (values: ResetPasswordValues) => {
    resetPassword(
      {
        email: values.email.trim(),
        code: values.code.trim(),
        new_password: values.newPassword,
      },
      {
        onSuccess: () => {
          toast.success(t("success"));
          router.replace(AppRoutes.login());
        },
        onError: (error) => {
          toast.error(resetErrorMessage(error, t));
        },
      }
    );
  };

  const handleResend = async () => {
    const isEmailValid = await methods.trigger("email");
    if (!isEmailValid) return;

    resendCode(methods.getValues("email").trim(), {
      onSuccess: () => toast.success(t("codeResent")),
      onError: () => toast.error(t("errorGeneric")),
    });
  };

  return (
    <AuthPageShell
      title={t("title")}
      subtitle={
        emailFromQuery
          ? t("subtitle", { email: emailFromQuery })
          : t("subtitleNoEmail")
      }
      footerLinkText={t("backToLogin")}
      footerHref={AppRoutes.login()}
    >
      <FormProvider {...methods}>
        <Stack spacing={1.5} sx={{ mb: 3 }}>
          {!emailFromQuery && (
            <Input
              name="email"
              label={t("emailLabel")}
              placeholder={t("emailPlaceholder")}
              type="email"
              autoComplete="email"
              rules={{ ...required(), ...emailField() }}
            />
          )}

          <Input
            name="code"
            label={t("codeLabel")}
            placeholder={t("codePlaceholder")}
            autoComplete="one-time-code"
            slotProps={{
              htmlInput: { inputMode: "numeric", maxLength: 6 },
            }}
            rules={{
              ...required(),
              pattern: { value: /^\d{6}$/, message: t("codeInvalid") },
            }}
          />

          <PasswordInput
            name="newPassword"
            label={t("newPasswordLabel")}
            autoComplete="new-password"
            rules={{ ...required(), ...passwordStrength(t("passwordRules")) }}
          />

          <Typography variant="caption" color="text.secondary" sx={{ px: 0.5 }}>
            {t("passwordRules")}
          </Typography>

          <PasswordInput
            name="confirmPassword"
            label={t("confirmPasswordLabel")}
            autoComplete="new-password"
            rules={{
              ...required(),
              validate: (value: string) =>
                value === methods.getValues("newPassword") ||
                t("passwordsDoNotMatch"),
            }}
          />

          <AuthGradientButton
            loading={isPending}
            onClick={methods.handleSubmit(handleSubmit)}
            sx={{ mt: 1 }}
          >
            {t("submit")}
          </AuthGradientButton>

          <Button
            size="small"
            loading={isResending}
            onClick={handleResend}
            sx={{ alignSelf: "center", textTransform: "none", fontWeight: 600 }}
          >
            {t("resendCode")}
          </Button>
        </Stack>
      </FormProvider>
    </AuthPageShell>
  );
}
