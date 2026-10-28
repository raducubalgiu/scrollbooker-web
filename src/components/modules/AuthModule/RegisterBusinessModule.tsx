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
import { registerWithCredentials } from "@/controllers/auth/auth.service";
import AuthForm, {
  AuthFormValues,
} from "@/components/modules/AuthModule/AuthForm";
import TopBar from "@/components/core/TopBar/TopBar";
import PageGlow from "@/components/core/PageGlow/PageGlow";

const identifierOptions = (
  t: ReturnType<typeof useTranslations<"registerBusiness">>
) => [
  {
    value: "email" as const,
    label: t("emailLabel"),
    placeholder: t("emailLabel"),
  },
];

export default function RegisterBusinessModule() {
  const t = useTranslations("registerBusiness");
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
      error === "not_business_account"
        ? t("notBusinessAccount")
        : t("googleFailed");

    toast.error(message);
    router.replace(AppRoutes.registerBusiness());
  }, [searchParams, router, t]);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    await signIn("google-business", { callbackUrl: AppRoutes.home() });
  };

  const onSubmit = async (data: AuthFormValues): Promise<void> => {
    setLoading(true);

    const registerPayload: UserRegister = {
      email: data.identifier,
      password: data.password,
      role_name: "business",
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
      console.error("Register crash:", error);
      toast.error(t("genericError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PageGlow />

      <TopBar />

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
            onSubmit={onSubmit}
            orLabel={t("or")}
            googleLabel={t("continueWithGoogle")}
            isGoogleLoading={googleLoading}
            onGoogleClick={handleGoogleSignIn}
            footerText={t("haveAccount")}
            footerLinkText={t("login")}
            footerHref={AppRoutes.login()}
          />
        </Container>
      </Box>
    </Box>
  );
}
