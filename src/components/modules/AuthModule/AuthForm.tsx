"use client";

import { useState } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import AuthHeading from "@/components/modules/AuthModule/AuthHeading";
import AuthGradientButton from "@/components/modules/AuthModule/AuthGradientButton";
import { FormProvider, useForm } from "react-hook-form";
import NextLink from "next/link";
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
  py: 1.4,
  borderRadius: 50,
  borderColor: "divider",
  bgcolor: "background.paper",
  color: "text.primary",
  textTransform: "none" as const,
  fontWeight: 700,
  "&:hover": {
    borderColor: "text.secondary",
    bgcolor: "background.paper",
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
  onSubmit: (values: AuthFormValues) => void | Promise<void>;
  orLabel: string;
  googleLabel: string;
  isGoogleLoading?: boolean;
  onGoogleClick: () => void;
  footerText: string;
  footerLinkText: string;
  footerHref: string;
  forgotPasswordLabel?: string;
  forgotPasswordHref?: string;
};

export default function AuthForm({
  title,
  subtitle,
  identifierOptions,
  passwordLabel,
  passwordPlaceholder,
  submitLabel,
  isSubmitting,
  onSubmit,
  orLabel,
  googleLabel,
  isGoogleLoading,
  onGoogleClick,
  footerText,
  footerLinkText,
  footerHref,
  forgotPasswordLabel,
  forgotPasswordHref,
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
      <AuthHeading title={title} subtitle={subtitle} />

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
        {/* 
        <Button
          variant="outlined"
          fullWidth
          startIcon={<AppleIcon />}
          disableElevation
          sx={oauthButtonSx}
        >
          {appleLabel}
        </Button> */}
      </Stack>

      <Divider sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {orLabel}
        </Typography>
      </Divider>

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

          {!isPhoneFlow && forgotPasswordLabel && forgotPasswordHref && (
            <Button
              component={NextLink}
              href={forgotPasswordHref}
              size="small"
              sx={{
                alignSelf: "flex-end",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {forgotPasswordLabel}
            </Button>
          )}

          <AuthGradientButton
            loading={isSubmitting}
            disabled={isPhoneFlow}
            onClick={methods.handleSubmit(handleSubmit)}
            sx={{ mt: 1 }}
          >
            {submitLabel}
          </AuthGradientButton>
        </Stack>
      </FormProvider>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: "auto", pt: 3 }}
      >
        <Typography color="text.secondary" variant="body2">
          {footerText}
        </Typography>
        <Button
          component={NextLink}
          href={footerHref}
          sx={{ textTransform: "none", fontWeight: 600, px: 1.5 }}
        >
          {footerLinkText}
        </Button>
      </Stack>
    </>
  );
}
