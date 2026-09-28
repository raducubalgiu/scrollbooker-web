"use client";

import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidRoundedIcon from "@mui/icons-material/AndroidRounded";
import { LANDING_COLORS } from "../landing.constants";

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
            Aplicații mobile
          </Typography>
          <Typography
            variant="h2"
            sx={{ color: LANDING_COLORS.textPrimary, maxWidth: 640 }}
          >
            Încă puțin — și ajungem și în buzunarul tău
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: LANDING_COLORS.textSecondary, maxWidth: 520 }}
          >
            Experiența nativă ScrollBooker, cu feed video full-screen, vine
            curând pe iOS și Android. Până atunci, tot ce ai nevoie ca să-ți
            pregătești afacerea funcționează deja, aici, pe web.
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
                  backgroundColor: "rgba(255,255,255,0.06)",
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
                  pentru {platform.name}
                </Typography>
              </Box>

              <Chip
                label="Curând"
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
