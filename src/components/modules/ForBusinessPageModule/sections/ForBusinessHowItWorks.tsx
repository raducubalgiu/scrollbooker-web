"use client";

import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslations } from "next-intl";

const STEP_NUMBERS = ["01", "02", "03"];

type Step = { title: string; description: string };

export default function ForBusinessHowItWorks() {
  const t = useTranslations("forBusinessHowItWorks");
  const { palette } = useTheme();
  const steps = t.raw("steps") as Step[];

  return (
    <Box
      id="cum-functioneaza"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: palette.surface.main,
        borderTop: `1px solid ${palette.divider}`,
        borderBottom: `1px solid ${palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 6, maxWidth: 640 }}>
          <Typography
            variant="overline"
            sx={{ color: palette.primary.main, fontWeight: 700, letterSpacing: 1.5 }}
          >
            {t("kicker")}
          </Typography>
          <Typography variant="h2" sx={{ color: palette.text.primary, fontWeight: 900, letterSpacing: "-0.03em" }}>
            {t("title")}
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid key={step.title} size={{ xs: 12, md: 4 }}>
              <Stack spacing={2}>
                <Typography
                  sx={{
                    fontSize: "3rem",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    background: `linear-gradient(90deg, ${palette.primary.main}, ${palette.secondary.main})`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    alignSelf: "flex-start",
                  }}
                >
                  {STEP_NUMBERS[index]}
                </Typography>
                <Typography variant="h6" sx={{ color: palette.text.primary }}>
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: palette.text.secondary, lineHeight: 1.7 }}
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
                    background: `linear-gradient(90deg, ${palette.divider}, transparent)`,
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
