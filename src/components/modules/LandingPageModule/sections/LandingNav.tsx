"use client";

import { alpha, Box, Button, Container, Stack } from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AppRoutes } from "@/utils/routes";
import { trackRegisterCtaClick } from "@/utils/analytics";
import { useLandingColors } from "../LandingThemeContext";
import LandingLogo from "../components/LandingLogo";
import LandingLanguageSwitcher from "../components/LandingLanguageSwitcher";

type LandingNavProps = {
  // Pe "/" trimitem orice intenție de business către pagina de prezentare
  // (/for-business) înainte de formularul de lead — pe /for-business
  // însuși, unde contextul e deja dat, trimitem direct către /partners.
  registerHref?: string;
  // Permite /for-business să-și afișeze propriul logo (wordmark pe două
  // rânduri) în loc de LandingLogo-ul generic — opțional, ca "/" să rămână
  // neschimbat.
  logo?: React.ReactNode;
};

export default function LandingNav({ registerHref, logo }: LandingNavProps) {
  const t = useTranslations("nav");
  const LANDING_COLORS = useLandingColors();

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        borderBottom: `1px solid ${LANDING_COLORS.border}`,
        backdropFilter: "blur(12px)",
        backgroundColor: alpha(LANDING_COLORS.background, 0.72),
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: { xs: 1.5, md: 2 } }}
        >
          <Box
            component={Link}
            href={AppRoutes.home()}
            sx={{ lineHeight: 0 }}
          >
            {logo ?? <LandingLogo height={26} />}
          </Box>

          <Stack direction="row" spacing={{ xs: 0.75, sm: 1.25 }} alignItems="center">
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <LandingLanguageSwitcher />
            </Box>
            {/* <Button
              component={Link}
              href={AppRoutes.login()}
              variant="text"
              sx={{ color: "rgba(255,255,255,0.85)", px: { xs: 1.25, sm: 1.75 } }}
            >
              {t("login")}
            </Button> */}
            <Button
              component={Link}
              href={registerHref ?? AppRoutes.forBusiness()}
              onClick={() =>
                trackRegisterCtaClick(
                  "nav",
                  registerHref ?? AppRoutes.forBusiness()
                )
              }
              variant="contained"
              disableElevation
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                backgroundColor: LANDING_COLORS.primary,
                "&:hover": { backgroundColor: LANDING_COLORS.primaryDark },
                px: 1.75,
                whiteSpace: "nowrap",
              }}
            >
              {registerHref ? t("registerFull") : t("forBusiness")}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
