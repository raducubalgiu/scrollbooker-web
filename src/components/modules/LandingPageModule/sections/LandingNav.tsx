"use client";

import { alpha, Box, Button, Container, Stack } from "@mui/material";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";
import { useLandingColors } from "../LandingThemeContext";
import LandingLogo from "../components/LandingLogo";
import LandingLanguageSwitcher from "../components/LandingLanguageSwitcher";
import { useTranslations } from "next-intl";
import { trackLoginCtaClick, trackRegisterCtaClick } from "@/utils/analytics";

type LandingNavProps = {
  displayCta?: boolean;
  displayAuth?: boolean;
  logo?: React.ReactNode;
};

export default function LandingNav({
  displayCta = false,
  displayAuth = false,
  logo,
}: LandingNavProps) {
  const t = useTranslations("forBusinessHero");
  const tNav = useTranslations("nav");
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
          sx={{ py: { xs: 1.5, md: 2 }, minHeight: { xs: 60, md: 70 } }}
        >
          <Box
            component={Link}
            href={AppRoutes.home()}
            sx={{
              lineHeight: 0,
              "& svg": { height: { xs: 26, md: 30 }, width: "auto" },
            }}
          >
            {logo ?? <LandingLogo height={26} />}
          </Box>

          <Stack
            direction="row"
            spacing={{ xs: 0.75, sm: 1.25 }}
            alignItems="center"
          >
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <LandingLanguageSwitcher />
            </Box>
            {displayAuth && (
              <>
                <Button
                  component={Link}
                  href={AppRoutes.login()}
                  onClick={() => trackLoginCtaClick("nav")}
                  variant="text"
                  size="small"
                  sx={{
                    display: { xs: "none", sm: "inline-flex" },
                    color: LANDING_COLORS.textPrimary,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {tNav("login")}
                </Button>
                <Button
                  component={Link}
                  href={AppRoutes.register()}
                  onClick={() =>
                    trackRegisterCtaClick("nav", AppRoutes.register())
                  }
                  variant="contained"
                  size="small"
                  disableElevation
                  sx={{
                    backgroundColor: LANDING_COLORS.primary,
                    color: "#fff",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    "&:hover": { backgroundColor: LANDING_COLORS.primaryDark },
                  }}
                >
                  {tNav("register")}
                </Button>
              </>
            )}
            {displayCta && (
              <Button
                component={Link}
                href={AppRoutes.registerBusiness()}
                variant="contained"
                size="small"
                onClick={() => {
                  trackRegisterCtaClick(
                    "for_business_nav",
                    AppRoutes.registerBusiness()
                  );
                }}
                sx={{
                  display: { xs: "none", md: "inline-flex" },
                }}
              >
                {t("primaryButton")}
              </Button>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
