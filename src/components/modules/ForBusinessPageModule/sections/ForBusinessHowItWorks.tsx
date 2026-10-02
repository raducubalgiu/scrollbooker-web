"use client";

import { alpha, Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslations } from "next-intl";
import { useLandingColors } from "@/components/modules/LandingPageModule/LandingThemeContext";

const STEP_NUMBERS = ["01", "02", "03"];

type Step = { title: string; description: string };

export default function ForBusinessHowItWorks() {
  const t = useTranslations("forBusinessHowItWorks");
  const LANDING_COLORS = useLandingColors();
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
                    color: alpha(LANDING_COLORS.textPrimary, 0.12),
                    lineHeight: 1,
                  }}
                >
                  {STEP_NUMBERS[index]}
                </Typography>
                <Typography variant="h6" sx={{ color: LANDING_COLORS.textPrimary }}>
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
      </Container>
    </Box>
  );
}
