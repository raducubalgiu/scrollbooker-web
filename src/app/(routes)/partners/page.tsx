"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "react-toastify";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useTranslations } from "next-intl";

import Input from "@/components/core/Input/Input";
import { emailField, phoneField, required } from "@/utils/validation-rules";
import { AppRoutes } from "@/utils/routes";
import LandingLogo from "@/components/modules/LandingPageModule/components/LandingLogo";
import { useLandingTheme } from "@/components/modules/LandingPageModule/LandingThemeContext";
import { useSubmitBusinessLeadMutation } from "@/controllers/leads/leads.controller";
import { BusinessLeadCreate } from "@/ts/models/leads/BusinessLead";
import {
  trackBusinessLeadSubmitted,
  trackBusinessLeadError,
} from "@/utils/analytics";
import { lightTheme, darkTheme } from "../../../../theme/theme";

type PartnersForm = {
  fullname: string;
  email: string;
  phone: string;
  business_name: string;
  business_domain: string;
  city: string;
};

export default function PartnersPage() {
  const t = useTranslations("partners");
  const { mode, colors: LANDING_COLORS } = useLandingTheme();
  const [submitted, setSubmitted] = useState(false);

  const methods = useForm<PartnersForm>({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      business_name: "",
      business_domain: "",
      city: "",
    },
  });

  const isRequired = required();
  const emailRules = { ...required(), ...emailField() };
  const phoneRules = { ...required(), ...phoneField() };
  const { mutate: submitLead, isPending } = useSubmitBusinessLeadMutation();

  const onSubmit = (data: PartnersForm) => {
    const { city, ...rest } = data;
    const payload: BusinessLeadCreate = {
      ...rest,
      ...(city ? { city } : {}),
    };

    submitLead(payload, {
      onSuccess: () => {
        trackBusinessLeadSubmitted(data.business_domain, Boolean(city));
        setSubmitted(true);
      },
      onError: () => {
        trackBusinessLeadError();
        toast.error(t("genericError"));
      },
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100dvh",
        py: { xs: 5, md: 8 },
        backgroundColor: LANDING_COLORS.background,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${LANDING_COLORS.primary}33 0%, transparent 70%)`,
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative" }}>
        <Stack
          component={Link}
          href={AppRoutes.home()}
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            color: LANDING_COLORS.textSecondary,
            textDecoration: "none",
            width: "fit-content",
            mb: 5,
            "&:hover": { color: LANDING_COLORS.textPrimary },
          }}
        >
          <ArrowBackRoundedIcon fontSize="small" />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {t("back")}
          </Typography>
        </Stack>

        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <LandingLogo height={22} />
        </Box>

        <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
          <Box
            sx={{
              backgroundColor: LANDING_COLORS.surface,
              border: `1px solid ${LANDING_COLORS.border}`,
              borderRadius: 4,
              p: { xs: 3, sm: 5 },
              boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
            }}
          >
            {submitted ? (
              <Stack
                spacing={2}
                alignItems="center"
                sx={{ py: 4, textAlign: "center" }}
              >
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 56, color: LANDING_COLORS.primary }}
                />
                <Typography
                  variant="h5"
                  sx={{ color: LANDING_COLORS.textPrimary, fontWeight: 700 }}
                >
                  {t("successTitle")}
                </Typography>
                <Typography sx={{ color: LANDING_COLORS.textSecondary }}>
                  {t("successSubtitle")}
                </Typography>
              </Stack>
            ) : (
              <>
                <Stack spacing={0.75} sx={{ mb: 4, textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    sx={{ color: LANDING_COLORS.textPrimary, fontWeight: 700 }}
                  >
                    {t("title")}
                  </Typography>
                  <Typography sx={{ color: LANDING_COLORS.textSecondary }}>
                    {t("subtitle")}
                  </Typography>
                </Stack>

                <FormProvider {...methods}>
                  <Stack spacing={1.5}>
                    <Input
                      label={t("fullnameLabel")}
                      name="fullname"
                      rules={isRequired}
                      size="medium"
                    />
                    <Input
                      label={t("emailLabel")}
                      name="email"
                      type="email"
                      rules={emailRules}
                      size="medium"
                    />
                    <Input
                      label={t("phoneLabel")}
                      name="phone"
                      type="tel"
                      rules={phoneRules}
                      size="medium"
                    />
                    <Input
                      label={t("businessNameLabel")}
                      name="business_name"
                      rules={isRequired}
                      size="medium"
                    />
                    <Input
                      label={t("businessDomainLabel")}
                      name="business_domain"
                      placeholder={t("businessDomainPlaceholder")}
                      rules={isRequired}
                      size="medium"
                    />
                    <Input label={t("cityLabel")} name="city" size="medium" />

                    <Button
                      variant="contained"
                      fullWidth
                      loading={isPending}
                      onClick={methods.handleSubmit(onSubmit)}
                      disableElevation
                      sx={{
                        fontWeight: 700,
                        textTransform: "none",
                        backgroundColor: LANDING_COLORS.primary,
                        "&:hover": {
                          backgroundColor: LANDING_COLORS.primaryDark,
                        },
                      }}
                    >
                      {t("submit")}
                    </Button>

                    <Typography
                      variant="caption"
                      sx={{
                        textAlign: "center",
                        color: LANDING_COLORS.textSecondary,
                      }}
                    >
                      {t("consentNote")}
                    </Typography>
                  </Stack>
                </FormProvider>
              </>
            )}
          </Box>
        </ThemeProvider>
      </Container>
    </Box>
  );
}
