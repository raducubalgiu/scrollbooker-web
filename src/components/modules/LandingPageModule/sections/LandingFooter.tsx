"use client";

import { alpha, Box, Container, Stack, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AppRoutes } from "@/utils/routes";
import LandingLogo from "../components/LandingLogo";
import LandingLanguageSwitcher from "../components/LandingLanguageSwitcher";

type LandingFooterProps = {
  registerHref?: string;
  displayLogin?: boolean;
};

export default function LandingFooter({
  registerHref,
  displayLogin = false,
}: LandingFooterProps) {
  const t = useTranslations("footer");
  const { palette } = useTheme();

  return (
    <Box
      component="footer"
      sx={{ borderTop: `1px solid ${palette.divider}`, py: 5 }}
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

          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            flexWrap="wrap"
            useFlexGap
          >
            {displayLogin && (
              <Typography
                component={Link}
                href={AppRoutes.login()}
                variant="body2"
                sx={{
                  color: palette.text.secondary,
                  textDecoration: "none",
                  "&:hover": { color: palette.text.primary },
                }}
              >
                {t("login")}
              </Typography>
            )}
            <Typography
              component={Link}
              href={registerHref ?? AppRoutes.forBusiness()}
              variant="body2"
              sx={{
                color: palette.text.secondary,
                textDecoration: "none",
                "&:hover": { color: palette.text.primary },
              }}
            >
              {registerHref ? t("registerBusiness") : t("forBusiness")}
            </Typography>
            <Typography
              component={Link}
              href={AppRoutes.cookies()}
              variant="body2"
              sx={{
                color: palette.text.secondary,
                textDecoration: "none",
                "&:hover": { color: palette.text.primary },
              }}
            >
              {t("cookies")}
            </Typography>
            <Typography
              component="a"
              href="mailto:office@scrollbooker.com"
              variant="body2"
              sx={{
                color: palette.text.secondary,
                textDecoration: "none",
                "&:hover": { color: palette.text.primary },
              }}
            >
              office@scrollbooker.com
            </Typography>
            <LandingLanguageSwitcher />
          </Stack>

          <Typography
            variant="body2"
            sx={{ color: alpha(palette.text.primary, 0.4) }}
          >
            © {new Date().getFullYear()} ScrollBooker
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
