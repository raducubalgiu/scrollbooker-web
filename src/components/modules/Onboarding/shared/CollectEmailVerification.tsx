"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useVerifyEmailMutation } from "@/controllers/auth/auth.controller";
import { OnboardingResponse } from "@/ts/models/onboarding/Onboarding";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function CollectEmailVerificationStep() {
  const t = useTranslations("onboarding.emailVerification");
  const router = useRouter();
  const { update } = useSession();
  const [code, setCode] = useState("");

  const { mutate: verifyEmail, isPending } = useVerifyEmailMutation();

  const handleVerify = () => {
    verifyEmail(undefined, {
      onSuccess: async (data: OnboardingResponse) => {
        await update({
          is_validated: data.is_validated,
          registration_step: data.registration_step,
        });

        router.refresh();
      },
    });
  };

  const handleResend = async () => {};

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
              onChange={(e) => setCode(e.target.value)}
              placeholder={t("codePlaceholder")}
              slotProps={{
                htmlInput: {
                  maxLength: 6,
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
            loading={isPending}
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
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              {t("resend")}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
