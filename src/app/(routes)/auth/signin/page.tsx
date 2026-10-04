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
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import AppleIcon from "@mui/icons-material/Apple";
import { useTranslations } from "next-intl";

import Input from "@/components/core/Input/Input";
import GoogleIcon from "@/components/core/icons/GoogleIcon";
import { required } from "@/utils/validation-rules";
import { AppRoutes } from "@/utils/routes";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import LandingLogo from "@/components/modules/LandingPageModule/components/LandingLogo";

type SignInForm = {
  username: string;
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

export default function SignInPage() {
  const t = useTranslations("signin");
  const router = useRouter();
  const { navigateTo } = useAppNavigation();
  const searchParams = useSearchParams();

  const methods = useForm<SignInForm>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  //const [googleLoading, setGoogleLoading] = useState(false);
  const isRequired = required();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    const error = searchParams.get("error");
    if (!error) return;

    toast.error(t("googleFailed"));
    router.replace(AppRoutes.login());
  }, [searchParams, router, t]);

  const handleGoogleSignIn = async () => {
    //setGoogleLoading(true);
    await signIn("google-signin", { callbackUrl });
  };

  const handleLogin = async (data: SignInForm) => {
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      toast.error(t("credentialsError"));
      return;
    }

    router.replace(result?.url || callbackUrl);
    router.refresh();
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
              label={t("usernameLabel")}
              name="username"
              rules={isRequired}
              placeholder={t("usernameLabel")}
              size="medium"
            />

            <Input
              label={t("passwordLabel")}
              name="password"
              type="password"
              rules={isRequired}
              placeholder={t("passwordLabel")}
              size="medium"
            />

            <Button
              variant="contained"
              fullWidth
              loading={loading}
              onClick={methods.handleSubmit(handleLogin)}
              disableElevation
              sx={{ mt: 1, fontWeight: 700, textTransform: "none" }}
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
          <Typography color="text.secondary">{t("noAccount")}</Typography>
          <Button
            sx={{ textTransform: "none", fontWeight: 600 }}
            onClick={() => navigateTo(AppRoutes.registerBusiness())}
          >
            {t("register")}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
