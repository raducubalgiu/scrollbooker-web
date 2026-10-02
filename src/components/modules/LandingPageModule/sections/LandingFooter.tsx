"use client";

import { alpha, Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AppRoutes } from "@/utils/routes";
import { LANDING_COLORS } from "../landing.constants";
import LandingLogo from "../components/LandingLogo";
import LandingLanguageSwitcher from "../components/LandingLanguageSwitcher";

export default function LandingFooter() {
  const t = useTranslations("footer");

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
          <Box component={Link} href={AppRoutes.home()} sx={{ lineHeight: 0 }}>
            <LandingLogo height={20} />
          </Box>

          <Stack direction="row" spacing={3} alignItems="center">
            {/* <Typography
              component={Link}
              href={AppRoutes.login()}
              variant="body2"
              sx={{
                color: LANDING_COLORS.textSecondary,
                textDecoration: "none",
                "&:hover": { color: LANDING_COLORS.textPrimary },
              }}
            >
              {t("login")}
            </Typography> */}
            <Typography
              component={Link}
              href={AppRoutes.partners()}
              variant="body2"
              sx={{
                color: LANDING_COLORS.textSecondary,
                textDecoration: "none",
                "&:hover": { color: LANDING_COLORS.textPrimary },
              }}
            >
              {t("registerBusiness")}
            </Typography>
            <Typography
              component="a"
              href="mailto:office@scrollbooker.com"
              variant="body2"
              sx={{
                color: LANDING_COLORS.textSecondary,
                textDecoration: "none",
                "&:hover": { color: LANDING_COLORS.textPrimary },
              }}
            >
              office@scrollbooker.com
            </Typography>
            <LandingLanguageSwitcher />
          </Stack>

          <Typography
            variant="body2"
            sx={{ color: alpha(LANDING_COLORS.textPrimary, 0.4) }}
          >
            © {new Date().getFullYear()} ScrollBooker
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
