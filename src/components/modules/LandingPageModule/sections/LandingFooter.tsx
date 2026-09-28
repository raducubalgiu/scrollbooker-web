"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";
import { LANDING_COLORS } from "../landing.constants";
import LandingLogo from "../components/LandingLogo";

export default function LandingFooter() {
  return (
    <Box
      component="footer"
      sx={{ borderTop: `1px solid ${LANDING_COLORS.border}`, py: 5 }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
        >
          <LandingLogo height={20} />

          <Stack direction="row" spacing={3}>
            <Typography
              component={Link}
              href={AppRoutes.login()}
              variant="body2"
              sx={{
                color: LANDING_COLORS.textSecondary,
                textDecoration: "none",
                "&:hover": { color: LANDING_COLORS.textPrimary },
              }}
            >
              Autentificare
            </Typography>
            <Typography
              component={Link}
              href={AppRoutes.register()}
              variant="body2"
              sx={{
                color: LANDING_COLORS.textSecondary,
                textDecoration: "none",
                "&:hover": { color: LANDING_COLORS.textPrimary },
              }}
            >
              Înregistrare business
            </Typography>
          </Stack>

          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} ScrollBooker
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
