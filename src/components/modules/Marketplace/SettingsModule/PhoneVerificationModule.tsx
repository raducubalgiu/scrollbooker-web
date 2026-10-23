"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import { useSendPhoneVerificationCode } from "@/controllers/auth/auth.controller";
import { useVerifyPrivatePhoneNumber } from "@/controllers/user/account.controller";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppRoutes } from "@/utils/routes";

const COUNTRY_CODE = "+40";

type Step = "enterPhone" | "enterCode";

const PhoneVerificationModule = () => {
  const { navigateTo, goBack } = useAppNavigation();

  const [step, setStep] = useState<Step>("enterPhone");
  const [localNumber, setLocalNumber] = useState("");
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: sendCode, isPending: isSending } =
    useSendPhoneVerificationCode();
  const { mutate: verifyCode, isPending: isVerifying } =
    useVerifyPrivatePhoneNumber();

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const fullPhone = `${COUNTRY_CODE}${localNumber}`;
  const isPhoneValid = localNumber.length >= 9;
  const isCodeComplete = code.length === 6;
  const isDisabled = step === "enterPhone" ? !isPhoneValid : !isCodeComplete;
  const isLoading = isSending || isVerifying;

  const handleSendCode = () => {
    setErrorMessage(null);

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
    setErrorMessage(null);

    verifyCode(
      { phone: fullPhone, code },
      {
        onSuccess: () => {
          navigateTo(AppRoutes.accountInfo(), { replace: true });
        },
        onError: (error) => {
          const detail = axios.isAxiosError(error)
            ? (error.response?.data as { detail?: string } | undefined)
                ?.detail
            : undefined;
          setErrorMessage(detail || "Codul introdus este incorect.");
        },
      }
    );
  };

  const handleBack = () => {
    if (step === "enterCode") {
      setStep("enterPhone");
      setCode("");
      setErrorMessage(null);
      return;
    }
    goBack(AppRoutes.accountInfo());
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <HeaderMobile title="Verifică numărul de telefon" onBack={handleBack} />

      <Stack spacing={3} sx={{ px: 2.5, pt: 2.5 }}>
        <Typography color="text.secondary">
          {step === "enterPhone"
            ? "Introdu numărul de telefon folosit pentru securitatea contului tău."
            : `Am trimis un cod prin SMS la ${fullPhone}.`}
        </Typography>

        {step === "enterPhone" ? (
          <Stack direction="row" spacing={1.5}>
            <Box sx={styles.countryCode}>{COUNTRY_CODE}</Box>

            <TextField
              fullWidth
              value={localNumber}
              onChange={(e) =>
                setLocalNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="7xx xxx xxx"
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
            placeholder="Cod de verificare"
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

        {errorMessage && (
          <Typography color="error.main" variant="body2">
            {errorMessage}
          </Typography>
        )}

        <Button
          variant="contained"
          size="large"
          fullWidth
          loading={isLoading}
          disabled={isLoading || isDisabled}
          onClick={step === "enterPhone" ? handleSendCode : handleVerify}
          disableElevation
          sx={{ py: 1.5, fontSize: 16, fontWeight: 600 }}
        >
          {step === "enterPhone" ? "Trimite codul" : "Verifică"}
        </Button>

        {step === "enterCode" && (
          <Button
            onClick={handleSendCode}
            disabled={cooldown > 0 || isLoading}
            sx={{ textTransform: "none", fontWeight: 600, alignSelf: "center" }}
          >
            {cooldown > 0
              ? `Retrimite codul (${cooldown}s)`
              : "Retrimite codul"}
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default PhoneVerificationModule;

const styles = {
  countryCode: {
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
  },
};
