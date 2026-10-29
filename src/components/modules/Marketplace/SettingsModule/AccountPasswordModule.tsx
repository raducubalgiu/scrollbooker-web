"use client";

import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import PasswordInput from "@/components/core/Input/PasswordInput";
import {
  useAccountInfo,
  useChangePassword,
} from "@/controllers/auth/auth.controller";
import { AuthProviderEnum } from "@/ts/enums/AuthProviderEnum";
import { passwordStrength, required } from "@/utils/validation-rules";

type ChangePasswordValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const PASSWORD_RULES =
  "Parola trebuie să aibă între 8 și 20 de caractere, cel puțin o literă mare și o cifră.";

const defaultValues: ChangePasswordValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const AccountPasswordModule = () => {
  const methods = useForm<ChangePasswordValues>({ defaultValues });
  const { mutate: changePassword, isPending } = useChangePassword();

  const { data: accountInfo, isLoading } = useAccountInfo();

  const isGoogleAccount =
    accountInfo?.auth_provider === AuthProviderEnum.GOOGLE;

  const handleSubmit = (values: ChangePasswordValues) => {
    changePassword(
      {
        current_password: values.currentPassword,
        new_password: values.newPassword,
      },
      {
        onSuccess: () => {
          methods.reset(defaultValues);
          toast.success("Parola a fost schimbată.");
        },
        onError: (error) => {
          const detail = axios.isAxiosError(error)
            ? (error.response?.data as { detail?: string } | undefined)?.detail
            : undefined;

          switch (detail) {
            case "Current password is incorrect":
              methods.setError("currentPassword", {
                message: "Parola actuală este greșită",
              });
              return;
            case "The new password must be different from the current one":
              methods.setError("newPassword", {
                message: "Parola nouă trebuie să fie diferită de cea actuală",
              });
              return;
            case "This account uses Google Sign-In and has no password":
              toast.error(
                "Contul tău folosește autentificarea cu Google și nu are o parolă.",
              );
              return;
            default:
              toast.error("A apărut o eroare. Încearcă din nou.");
          }
        },
      },
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <HeaderMobile title="Parolă" />

      {isLoading ? (
        <Stack spacing={2} sx={{ px: 2.5, pt: 2.5 }}>
          <Skeleton variant="rounded" height={56} />
          <Skeleton variant="rounded" height={56} />
          <Skeleton variant="rounded" height={56} />
        </Stack>
      ) : isGoogleAccount ? (
        <Typography color="text.secondary" sx={{ px: 2.5, pt: 2.5 }}>
          Contul tău folosește autentificarea cu Google, așa că nu are o parolă
          ScrollBooker. Te conectezi mereu prin Google.
        </Typography>
      ) : (
        <FormProvider {...methods}>
          <Stack spacing={2} sx={{ px: 2.5, pt: 2.5 }}>
            <PasswordInput
              name="currentPassword"
              label="Parola actuală"
              autoComplete="current-password"
              rules={required()}
            />

            <PasswordInput
              name="newPassword"
              label="Parola nouă"
              autoComplete="new-password"
              rules={{ ...required(), ...passwordStrength(PASSWORD_RULES) }}
            />

            <PasswordInput
              name="confirmPassword"
              label="Confirmă parola nouă"
              autoComplete="new-password"
              rules={{
                ...required(),
                validate: (value: string) =>
                  value === methods.getValues("newPassword") ||
                  "Parolele nu coincid",
              }}
            />

            <Typography variant="caption" color="text.secondary">
              {PASSWORD_RULES}
            </Typography>

            <Button
              variant="contained"
              fullWidth
              disableElevation
              loading={isPending}
              onClick={methods.handleSubmit(handleSubmit)}
              sx={{ py: 1.5, fontSize: 16, fontWeight: 600 }}
            >
              Schimbă parola
            </Button>
          </Stack>
        </FormProvider>
      )}
    </Box>
  );
};

export default AccountPasswordModule;
