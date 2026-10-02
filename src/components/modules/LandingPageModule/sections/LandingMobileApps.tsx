"use client";

import { alpha, Box, Chip, Container, Stack, Typography } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidRoundedIcon from "@mui/icons-material/AndroidRounded";
import { useTranslations } from "next-intl";
import { useLandingColors } from "../LandingThemeContext";

const PLATFORMS = [
  {
    icon: AppleIcon,
    name: "iOS",
    store: "App Store",
  },
  {
    icon: AndroidRoundedIcon,
    name: "Android",
    store: "Google Play",
  },
];

export default function LandingMobileApps() {
  const t = useTranslations("mobileApps");
  const LANDING_COLORS = useLandingColors();

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${LANDING_COLORS.primary}1a 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 5 }}>
          <Typography
            variant="overline"
            sx={{ color: LANDING_COLORS.primary, fontWeight: 700, letterSpacing: 1.5 }}
          >
            {t("kicker")}
          </Typography>
          <Typography
            variant="h2"
            sx={{ color: LANDING_COLORS.textPrimary, maxWidth: 640 }}
          >
            {t("title")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: LANDING_COLORS.textSecondary, maxWidth: 520 }}
          >
            {t("subtitle")}
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2.5}
          justifyContent="center"
          alignItems="center"
        >
          {PLATFORMS.map((platform) => (
            <Stack
              key={platform.name}
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                width: { xs: "100%", sm: 260 },
                px: 3,
                py: 2.25,
                borderRadius: 3,
                border: `1px solid ${LANDING_COLORS.border}`,
                backgroundColor: LANDING_COLORS.surface,
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: alpha(LANDING_COLORS.textPrimary, 0.06),
                  color: LANDING_COLORS.textPrimary,
                  flexShrink: 0,
                }}
              >
                <platform.icon fontSize="medium" />
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{ color: LANDING_COLORS.textPrimary, fontWeight: 700 }}
                >
                  {platform.store}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: LANDING_COLORS.textSecondary }}
                >
                  {t("forPrefix")} {platform.name}
                </Typography>
              </Box>

              <Chip
                label={t("soonChip")}
                size="small"
                sx={{
                  backgroundColor: "rgba(255,111,0,0.12)",
                  color: LANDING_COLORS.primary,
                  fontWeight: 700,
                  border: `1px solid ${LANDING_COLORS.primary}`,
                }}
              />
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
