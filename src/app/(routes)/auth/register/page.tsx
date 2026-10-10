"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import AppleIcon from "@mui/icons-material/Apple";
import { useTranslations } from "next-intl";

import Input from "@/components/core/Input/Input";
import GoogleIcon from "@/components/core/icons/GoogleIcon";
import { required } from "@/utils/validation-rules";
import { UserRegister } from "@/ts/models/auth/auth";
import { AppRoutes } from "@/utils/routes";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { LANDING_COLORS } from "@/components/modules/LandingPageModule/landing.constants";
import LandingLogo from "@/components/modules/LandingPageModule/components/LandingLogo";
import { registerWithCredentials } from "@/controllers/auth/auth.service";

type RegisterForm = {
  email: string;
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

export default function RegisterPage() {
  const t = useTranslations("register");
  const { update } = useSession();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { navigateTo } = useAppNavigation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const methods = useForm<RegisterForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isRequired = required();

  useEffect(() => {
    const error = searchParams.get("error");
    if (!error) return;

    const message =
      error === "not_client_account" ? t("notClientAccount") : t("googleFailed");

    toast.error(message);
    router.replace(AppRoutes.register());
  }, [searchParams, router, t]);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    await signIn("google-register", { callbackUrl: AppRoutes.home() });
  };

  const onSubmit = async (data: RegisterForm): Promise<void> => {
    setLoading(true);

    const registerPayload: UserRegister = {
      email: data.email,
      password: data.password,
      role_name: "client",
    };

    try {
      const registerResult = await registerWithCredentials(registerPayload);

      if (!registerResult) {
        toast.error(t("registerError"));
        setLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 300));

      const result = await signIn("credentials", {
        redirect: false,
        username: data.email,
        password: data.password,
      });

      if (result?.error) {
        console.error("NextAuth SignIn Error:", result.error);
        toast.error(t("autoLoginError"));
        navigateTo(AppRoutes.login());
        return;
      }

      await update();

      toast.success(t("success"));
      router.refresh();
    } catch (error: unknown) {
      console.error("Register crash:", error);
      toast.error(t("genericError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100dvh", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xs">
        <Stack alignItems="center" sx={{ mb: 5 }}>
          <LandingLogo height={22} />
        </Stack>

        <Stack spacing={0.75} sx={{ mb: 5, textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {t("title")}
          </Typography>
          <Typography color="text.secondary">{t("subtitle")}</Typography>
        </Stack>

        <Stack spacing={1.5} sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            fullWidth
            loading={googleLoading}
            onClick={handleGoogleSignIn}
            startIcon={<GoogleIcon />}
            disableElevation
            sx={oauthButtonSx}
          >
            {t("continueWithGoogle")}
          </Button>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<AppleIcon />}
            disableElevation
            sx={oauthButtonSx}
          >
            {t("continueWithApple")}
          </Button>
        </Stack>

        <Divider sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {t("orWithEmail")}
          </Typography>
        </Divider>

        <FormProvider {...methods}>
          <Stack spacing={1.5}>
            <Input
              label={t("emailLabel")}
              name="email"
              rules={isRequired}
              placeholder={t("emailLabel")}
              size="medium"
              type="email"
            />

            <Input
              label={t("passwordLabel")}
              name="password"
              type="password"
              rules={isRequired}
              placeholder={t("passwordPlaceholder")}
              size="medium"
            />

            <Button
              variant="contained"
              fullWidth
              loading={loading}
              onClick={methods.handleSubmit(onSubmit)}
              disableElevation
              sx={{
                mt: 1,
                py: 1.5,
                fontWeight: 700,
                textTransform: "none",
                backgroundColor: LANDING_COLORS.primary,
                "&:hover": { backgroundColor: LANDING_COLORS.primaryDark },
              }}
            >
              {t("submit")}
            </Button>
          </Stack>
        </FormProvider>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{ mt: 4 }}
        >
          <Typography color="text.secondary">{t("haveAccount")}</Typography>
          <Button
            sx={{ textTransform: "none", fontWeight: 600 }}
            onClick={() => navigateTo(AppRoutes.login())}
          >
            {t("login")}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
