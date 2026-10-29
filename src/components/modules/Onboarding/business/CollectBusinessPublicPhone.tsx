import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useSendPhoneVerificationCode } from "@/controllers/auth/auth.controller";
import { useCollectPhoneCodeVerification } from "@/controllers/onboarding/onboarding.controller";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { onboardingTitleSx } from "../onboarding.styles";
import AuthGradientButton from "@/components/modules/AuthModule/AuthGradientButton";

const CollectBusinessPublicPhone = () => {
  const { update } = useSession();
  const router = useRouter();
  const t = useTranslations("onboarding.publicPhone");

  const [step, setStep] = useState("enterPhone");
  const [localNumber, setLocalNumber] = useState("");
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const countryCode = "+40";

  const { mutate: sendCode, isPending: isPendingSendCode } =
    useSendPhoneVerificationCode();

  const { mutate: verifyCode, isPending: isPendingVerifyCode } =
    useCollectPhoneCodeVerification();

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);

    return () => clearTimeout(timer);
  }, [cooldown]);

  const isPhoneValid = localNumber.length === 10;
  const isCodeComplete = code.length === 6;
  const isDisabled = step === "enterPhone" ? !isPhoneValid : !isCodeComplete;
  const isLoading = isPendingSendCode || isPendingVerifyCode;

  const handleSendCode = () => {
    const fullPhone = `${countryCode}${localNumber}`;

    sendCode(
      { phone: fullPhone },
      {
        onSuccess: () => {
          setStep("enterCode");
          setCooldown(60);
        },
      }
    );
  };

  const handleVerify = () => {
    const fullPhone = `${countryCode}${localNumber}`;

    verifyCode(
      { phone: fullPhone, code: code },
      {
        onSuccess: async (data) => {
          await update({
            is_validated: data.is_validated,
            registration_step: data.registration_step,
          });

          router.refresh();
        },
      }
    );
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
            <Typography variant="h4" sx={onboardingTitleSx}>
              {step === "enterPhone" ? t("title") : t("phoneVerificationTitle")}
            </Typography>

            <Typography color="text.secondary">
              {step === "enterPhone"
                ? t("subtitle")
                : t("phoneVerificationCodeDescription")}{" "}
            </Typography>
          </Stack>

          <Box>
            {step === "enterPhone" ? (
              <Stack direction="row" spacing={1.5}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2,
                    fontWeight: 700,
                    bgcolor: "action.selected",
                    borderRadius: 1.5,
                    border: "1px solid",
                    borderColor: "divider",
                    minWidth: "60px",
                  }}
                >
                  {countryCode}
                </Box>

                <TextField
                  fullWidth
                  value={localNumber}
                  onChange={(e) =>
                    setLocalNumber(
                      e.target.value.replace(/\D/g, "").slice(0, 10)
                    )
                  }
                  placeholder={t("phoneVerificationPlaceholder")}
                  slotProps={{ htmlInput: { inputMode: "numeric" } }}
                />
              </Stack>
            ) : (
              <TextField
                fullWidth
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder={t("phoneVerificationCodePlaceholder")}
                slotProps={{
                  htmlInput: {
                    maxLength: 6,
                    inputMode: "numeric",
                    style: {
                      textAlign: "center",
                      fontWeight: 600,
                      letterSpacing: "4px",
                    },
                  },
                }}
              />
            )}
          </Box>

          <AuthGradientButton
            fullWidth
            loading={isLoading}
            disabled={isLoading || isDisabled}
            onClick={step === "enterPhone" ? handleSendCode : handleVerify}
            disableElevation
            sx={{ py: 1.5, fontSize: 16, fontWeight: 600 }}
          >
            {step === "enterPhone"
              ? t("phoneVerificationSendCode")
              : t("phoneVerificationVerify")}
          </AuthGradientButton>

          <Stack alignItems="center" spacing={1}>
            {step === "enterCode" ? (
              <>
                <Button
                  onClick={handleSendCode}
                  disabled={cooldown > 0 || isLoading}
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  {cooldown > 0
                    ? t("resendCooldown", { seconds: cooldown })
                    : t("resend")}
                </Button>

                <Button
                  onClick={() => {
                    setStep("enterPhone");
                    setCode("");
                  }}
                  sx={{ textTransform: "none", fontWeight: 600, mt: 1 }}
                  color="inherit"
                >
                  {t("changePhoneNumber")}
                </Button>
              </>
            ) : null}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default CollectBusinessPublicPhone;
