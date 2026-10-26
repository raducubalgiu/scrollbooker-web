"use client";

import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { UserRegister } from "@/ts/models/auth/auth";
import { AppRoutes } from "@/utils/routes";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { LANDING_COLORS } from "@/components/modules/LandingPageModule/landing.constants";
import { registerWithCredentials } from "@/controllers/auth/auth.service";
import AuthForm, {
  AuthFormValues,
} from "@/components/modules/AuthModule/AuthForm";
import TopBar from "@/components/core/TopBar/TopBar";

const identifierOptions = (
  t: ReturnType<typeof useTranslations<"register">>
) => [
  {
    value: "email" as const,
    label: t("identifierEmail"),
    placeholder: t("identifierEmailPlaceholder"),
  },
  {
    value: "phone" as const,
    label: t("identifierPhone"),
    placeholder: t("identifierPhonePlaceholder"),
  },
];

function registerErrorMessage(
  detail: string | undefined,
  t: ReturnType<typeof useTranslations<"register">>
): string {
  switch (detail) {
    case "User already registered":
      return t("errorEmailTaken");
    default:
      return t("errorGeneric");
  }
}

const submitButtonSx = {
  py: 1.5,
  backgroundColor: LANDING_COLORS.primary,
  "&:hover": { backgroundColor: LANDING_COLORS.primaryDark },
};

export default function RegisterModule() {
  const t = useTranslations("register");
  const { update } = useSession();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { navigateTo } = useAppNavigation();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (!error) return;

    const message =
      error === "not_client_account"
        ? t("notClientAccount")
        : t("googleFailed");

    toast.error(message);
    router.replace(AppRoutes.register());
  }, [searchParams, router, t]);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    await signIn("google-register", { callbackUrl: AppRoutes.home() });
  };

  const onSubmit = async (data: AuthFormValues): Promise<void> => {
    setLoading(true);

    const registerPayload: UserRegister = {
      email: data.identifier,
      password: data.password,
      role_name: "client",
    };

    try {
      await registerWithCredentials(registerPayload);

      await new Promise((resolve) => setTimeout(resolve, 300));

      const result = await signIn("credentials", {
        redirect: false,
        username: data.identifier,
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
      const detail = error instanceof Error ? error.message : undefined;
      toast.error(registerErrorMessage(detail, t));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <TopBar />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          py: { xs: 3, md: 10 },
          px: 1,
        }}
      >
        <Container
          maxWidth="sm"
          sx={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <AuthForm
            title={t("title")}
            subtitle={t("subtitle")}
            identifierOptions={identifierOptions(t)}
            passwordLabel={t("passwordLabel")}
            passwordPlaceholder={t("passwordPlaceholder")}
            submitLabel={t("submit")}
            isSubmitting={loading}
            submitButtonSx={submitButtonSx}
            onSubmit={onSubmit}
            orLabel={t("or")}
            googleLabel={t("continueWithGoogle")}
            isGoogleLoading={googleLoading}
            onGoogleClick={handleGoogleSignIn}
            appleLabel={t("continueWithApple")}
            footerText={t("haveAccount")}
            footerLinkText={t("login")}
            footerHref={AppRoutes.login()}
          />
        </Container>
      </Box>
    </Box>
  );
}
