"use client";

import { useState } from "react";
import { Button, Divider, Stack, SxProps, Theme, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import NextLink from "next/link";
import AppleIcon from "@mui/icons-material/Apple";
import PasswordInput from "@/components/core/Input/PasswordInput";
import GoogleIcon from "@/components/core/icons/GoogleIcon";
import { required } from "@/utils/validation-rules";
import IdentifierInput, {
  AuthIdentifierType,
  IdentifierOption,
} from "@/components/modules/AuthModule/IdentifierInput";

export type AuthFormValues = {
  identifier: string;
  password: string;
};

const oauthButtonSx = {
  borderColor: "divider",
  color: "text.primary",
  textTransform: "none" as const,
  fontWeight: 600,
  "&:hover": {
    borderColor: "text.secondary",
    backgroundColor: "action.hover",
  },
};

type AuthFormProps = {
  title: string;
  subtitle: string;
  identifierOptions: IdentifierOption[];
  passwordLabel: string;
  passwordPlaceholder: string;
  submitLabel: string;
  isSubmitting: boolean;
  submitButtonSx?: SxProps<Theme>;
  onSubmit: (values: AuthFormValues) => void | Promise<void>;
  orLabel: string;
  googleLabel: string;
  isGoogleLoading?: boolean;
  onGoogleClick: () => void;
  appleLabel: string;
  footerText: string;
  footerLinkText: string;
  footerHref: string;
};

export default function AuthForm({
  title,
  subtitle,
  identifierOptions,
  passwordLabel,
  passwordPlaceholder,
  submitLabel,
  isSubmitting,
  submitButtonSx,
  onSubmit,
  orLabel,
  googleLabel,
  isGoogleLoading,
  onGoogleClick,
  appleLabel,
  footerText,
  footerLinkText,
  footerHref,
}: AuthFormProps) {
  const methods = useForm<AuthFormValues>({
    defaultValues: { identifier: "", password: "" },
  });

  const [identifierType, setIdentifierType] = useState<AuthIdentifierType>(
    identifierOptions[0]?.value ?? "email"
  );
  const isPhoneFlow = identifierType === "phone";
  const isRequired = required();

  const handleIdentifierTypeChange = (type: AuthIdentifierType) => {
    setIdentifierType(type);
    methods.setValue("identifier", "");
  };

  const handleSubmit = async (values: AuthFormValues) => {
    if (isPhoneFlow) return;
    await onSubmit(values);
  };

  return (
    <>
      <Stack spacing={0.75} sx={{ mb: 5, textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
        <Typography color="text.secondary">{subtitle}</Typography>
      </Stack>

      <FormProvider {...methods}>
        <Stack spacing={1.5} sx={{ mb: 3 }}>
          <IdentifierInput
            name="identifier"
            options={identifierOptions}
            identifierType={identifierType}
            onIdentifierTypeChange={handleIdentifierTypeChange}
          />

          {!isPhoneFlow && (
            <PasswordInput
              label={passwordLabel}
              name="password"
              rules={isRequired}
              placeholder={passwordPlaceholder}
              size="medium"
            />
          )}

          <Button
            variant="contained"
            fullWidth
            loading={isSubmitting}
            disabled={isPhoneFlow}
            onClick={methods.handleSubmit(handleSubmit)}
            disableElevation
            sx={{ mt: 1, fontWeight: 700, textTransform: "none", ...submitButtonSx }}
          >
            {submitLabel}
          </Button>
        </Stack>
      </FormProvider>

      <Divider sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {orLabel}
        </Typography>
      </Divider>

      <Stack spacing={1.5} sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          fullWidth
          loading={isGoogleLoading ?? false}
          onClick={onGoogleClick}
          startIcon={<GoogleIcon />}
          disableElevation
          sx={oauthButtonSx}
        >
          {googleLabel}
        </Button>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<AppleIcon />}
          disableElevation
          sx={oauthButtonSx}
        >
          {appleLabel}
        </Button>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
        sx={{ mt: 4 }}
      >
        <Typography color="text.secondary">{footerText}</Typography>
        <Button
          component={NextLink}
          href={footerHref}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          {footerLinkText}
        </Button>
      </Stack>
    </>
  );
}
