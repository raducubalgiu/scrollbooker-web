"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LANDING_COLORS } from "../landing.constants";

const STEP_NUMBERS = ["01", "02", "03"];

type Step = { title: string; description: string };

export default function LandingHowItWorks() {
  const t = useTranslations("howItWorks");
  const steps = t.raw("steps") as Step[];

  return (
    <Box
      id="cum-functioneaza"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: LANDING_COLORS.surface,
        borderTop: `1px solid ${LANDING_COLORS.border}`,
        borderBottom: `1px solid ${LANDING_COLORS.border}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 6, maxWidth: 640 }}>
          <Typography
            variant="overline"
            sx={{ color: LANDING_COLORS.primary, fontWeight: 700, letterSpacing: 1.5 }}
          >
            {t("kicker")}
          </Typography>
          <Typography variant="h2" sx={{ color: LANDING_COLORS.textPrimary }}>
            {t("title")}
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid key={step.title} size={{ xs: 12, md: 4 }}>
              <Stack spacing={2}>
                <Typography
                  sx={{
                    fontSize: "2.75rem",
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.12)",
                    lineHeight: 1,
                  }}
                >
                  {STEP_NUMBERS[index]}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: LANDING_COLORS.textPrimary }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: LANDING_COLORS.textSecondary, lineHeight: 1.7 }}
                >
                  {step.description}
                </Typography>
              </Stack>

              {index < steps.length - 1 && (
                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    height: 1,
                    mt: 4,
                    background: `linear-gradient(90deg, ${LANDING_COLORS.border}, transparent)`,
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: { xs: 8, md: 10 } }}>
          <Stack spacing={1.5} sx={{ mb: 4, maxWidth: 640 }}>
            <Typography
              variant="overline"
              sx={{ color: LANDING_COLORS.primary, fontWeight: 700, letterSpacing: 1.5 }}
            >
              {t("clientsKicker")}
            </Typography>
            <Typography variant="h3" sx={{ color: LANDING_COLORS.textPrimary }}>
              {t("clientsTitle")}
            </Typography>
          </Stack>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "3840 / 2160",
              borderRadius: 3,
              overflow: "hidden",
              border: `1px solid ${LANDING_COLORS.border}`,
            }}
          >
            <Image
              src="/landing/booking-flow.png"
              alt={t("bookingFlowImageAlt")}
              fill
              sizes="(max-width: 1200px) 95vw, 1100px"
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
