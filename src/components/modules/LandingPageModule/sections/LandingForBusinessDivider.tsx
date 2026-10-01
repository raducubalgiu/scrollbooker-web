"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { LANDING_COLORS } from "../landing.constants";

export default function LandingForBusinessDivider() {
  const t = useTranslations("forBusinessDivider");

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Stack spacing={2} alignItems="center" sx={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 1.75,
              py: 0.75,
              borderRadius: 50,
              border: `1px solid ${LANDING_COLORS.border}`,
              backgroundColor: "rgba(255,255,255,0.04)",
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: LANDING_COLORS.primary,
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: LANDING_COLORS.textSecondary, fontWeight: 600 }}
            >
              {t("kicker")}
            </Typography>
          </Box>

          <Typography
            variant="h3"
            sx={{
              color: LANDING_COLORS.textPrimary,
              letterSpacing: "-0.01em",
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            {t("title")}
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: LANDING_COLORS.textSecondary, maxWidth: 560 }}
          >
            {t("subtitle")}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
