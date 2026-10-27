"use client";

import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

import { AppRoutes } from "@/utils/routes";
import AuthForm, {
  AuthFormValues,
} from "@/components/modules/AuthModule/AuthForm";
import TopBar from "@/components/core/TopBar/TopBar";
import PageGlow from "@/components/core/PageGlow/PageGlow";

const identifierOptions = (t: ReturnType<typeof useTranslations<"signin">>) => [
  {
    value: "email" as const,
    label: t("identifierEmail"),
    placeholder: t("identifierEmailPlaceholder"),
  },
  {
    value: "username" as const,
    label: t("identifierUsername"),
    placeholder: t("identifierUsernamePlaceholder"),
  },
  {
    value: "phone" as const,
    label: t("identifierPhone"),
    placeholder: t("identifierPhonePlaceholder"),
  },
];

function loginErrorMessage(
  detail: string | undefined,
  t: ReturnType<typeof useTranslations<"signin">>
): string {
  switch (detail) {
    case "This user is not registered yet":
      return t("errorUserNotFound");
    case "This account uses Google Sign-In. Please use Google to log in.":
      return t("errorGoogleAccount");
    case "Invalid username or password":
      return t("errorInvalidCredentials");
    default:
      return t("errorGeneric");
  }
}

export default function SignInModule() {
  const t = useTranslations("signin");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    const error = searchParams.get("error");
    if (!error) return;

    toast.error(t("googleFailed"));
    router.replace(AppRoutes.login());
  }, [searchParams, router, t]);

  const handleGoogleSignIn = async () => {
    await signIn("google-signin", { callbackUrl });
  };

  const handleLogin = async (data: AuthFormValues) => {
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      username: data.identifier,
      password: data.password,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      toast.error(loginErrorMessage(result.error, t));
      return;
    }

    router.replace(result?.url || callbackUrl);
    router.refresh();
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
            passwordPlaceholder={t("passwordLabel")}
            submitLabel={t("submit")}
            isSubmitting={loading}
            onSubmit={handleLogin}
            orLabel={t("or")}
            googleLabel={t("continueWithGoogle")}
            onGoogleClick={handleGoogleSignIn}
            footerText={t("noAccount")}
            footerLinkText={t("register")}
            footerHref={AppRoutes.register()}
          />
        </Container>
      </Box>
    </Box>
  );
}
