"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLandingColors } from "../LandingThemeContext";

export default function LandingBookingDemo() {
  const t = useTranslations("bookingDemo");
  const LANDING_COLORS = useLandingColors();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: LANDING_COLORS.surface,
        borderTop: `1px solid ${LANDING_COLORS.border}`,
        borderBottom: `1px solid ${LANDING_COLORS.border}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 5, maxWidth: 640 }}>
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
      </Container>
    </Box>
  );
}
