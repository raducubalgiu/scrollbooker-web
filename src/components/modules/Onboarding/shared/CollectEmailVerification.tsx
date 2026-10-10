"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
} from "@/controllers/auth/auth.controller";
import { OnboardingResponse } from "@/ts/models/onboarding/Onboarding";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const RESEND_COOLDOWN_SECONDS = 60;

function extractErrorDetail(error: unknown): string | undefined {
  const axiosError = error as { response?: { data?: { detail?: string } } };
  return axiosError?.response?.data?.detail;
}

export default function CollectEmailVerificationStep() {
  const t = useTranslations("onboarding.emailVerification");
  const router = useRouter();
  const { update } = useSession();
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);

  const { mutate: verifyEmail, isPending: isVerifying } =
    useVerifyEmailMutation();
  const { mutate: resendCode, isPending: isResending } =
    useResendVerificationEmailMutation();

  useEffect(() => {
    if (cooldown <= 0) return;

    const interval = setInterval(() => {
      setCooldown((value) => Math.max(0, value - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  const handleVerify = () => {
    verifyEmail(code, {
      onSuccess: async (data: OnboardingResponse) => {
        await update({
          is_validated: data.is_validated,
          registration_step: data.registration_step,
        });

        router.refresh();
      },
      onError: (error) => {
        const detail = extractErrorDetail(error);

        if (detail === "Incorrect code") {
          toast.error(t("errorIncorrectCode"));
        } else if (detail === "Too many attempts, request a new code") {
          toast.error(t("errorTooManyAttempts"));
        } else if (detail === "Code invalid or expired") {
          toast.error(t("errorExpiredCode"));
        } else {
          toast.error(t("errorGeneric"));
        }
      },
    });
  };

  const handleResend = () => {
    resendCode(undefined, {
      onSuccess: (data) => {
        if (data.detail === "Email already verified") {
          toast.success(t("alreadyVerified"));
        } else {
          toast.success(t("resendSuccess"));
        }
        setCooldown(RESEND_COOLDOWN_SECONDS);
      },
      onError: () => {
        toast.error(t("errorGeneric"));
        setCooldown(RESEND_COOLDOWN_SECONDS);
      },
    });
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100%" }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3}>
          <Stack spacing={1} textAlign="center">
            <Typography variant="h4" fontWeight={700}>
              {t("title")}
            </Typography>

            <Typography color="text.secondary">{t("subtitle")}</Typography>
          </Stack>

          <Box>
            <TextField
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder={t("codePlaceholder")}
              slotProps={{
                htmlInput: {
                  maxLength: 6,
                  inputMode: "numeric",
                  style: {
                    textAlign: "center",
                    fontWeight: 600,
                  },
                },
              }}
            />
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
            loading={isVerifying}
            disabled={isVerifying || code.length !== 6}
            onClick={handleVerify}
            disableElevation
            sx={{ py: 1.5, fontSize: 16, fontWeight: 600 }}
          >
            {t("verify")}
          </Button>

          <Stack alignItems="center" spacing={1}>
            <Typography color="text.secondary">{t("noEmail")}</Typography>

            <Button
              onClick={handleResend}
              disabled={cooldown > 0 || isResending}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              {cooldown > 0 ? t("resendCooldown", { seconds: cooldown }) : t("resend")}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
