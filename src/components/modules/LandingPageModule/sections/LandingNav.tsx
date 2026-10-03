"use client";

import { alpha, Box, Container, Stack } from "@mui/material";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";
import { useLandingColors } from "../LandingThemeContext";
import LandingLogo from "../components/LandingLogo";
import LandingLanguageSwitcher from "../components/LandingLanguageSwitcher";

type LandingNavProps = {
  logo?: React.ReactNode;
};

export default function LandingNav({ logo }: LandingNavProps) {
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
          <Box component={Link} href={AppRoutes.home()} sx={{ lineHeight: 0 }}>
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
            {/* <Button
              component={Link}
              href={AppRoutes.login()}
              variant="text"
              sx={{ color: "rgba(255,255,255,0.85)", px: { xs: 1.25, sm: 1.75 } }}
            >
              {t("login")}
            </Button> */}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
