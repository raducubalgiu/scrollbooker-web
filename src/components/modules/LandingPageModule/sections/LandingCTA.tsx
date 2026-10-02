"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { AppRoutes } from "@/utils/routes";
import { LANDING_COLORS } from "../landing.constants";

export default function LandingCTA() {
  const t = useTranslations("cta");

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 5,
            px: { xs: 4, md: 8 },
            py: { xs: 6, md: 8 },
            textAlign: "center",
            border: `1px solid ${LANDING_COLORS.border}`,
            background: `radial-gradient(circle at 50% 0%, ${LANDING_COLORS.primary}26 0%, ${LANDING_COLORS.surface} 65%)`,
          }}
        >
          <Stack spacing={3} alignItems="center" sx={{ position: "relative" }}>
            <Typography
              variant="h2"
              sx={{ color: LANDING_COLORS.textPrimary, maxWidth: 640, letterSpacing: "-0.01em" }}
            >
              {t("title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: LANDING_COLORS.textSecondary, maxWidth: 520, fontWeight: 500 }}
            >
              {t("subtitle")}
            </Typography>
            <Button
              component={Link}
              href={AppRoutes.partners()}
              variant="contained"
              size="large"
              disableElevation
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                backgroundColor: LANDING_COLORS.primary,
                color: "#fff",
                px: 4,
                py: 1.5,
                fontWeight: 700,
                "&:hover": { backgroundColor: LANDING_COLORS.primaryDark },
              }}
            >
              {t("button")}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
