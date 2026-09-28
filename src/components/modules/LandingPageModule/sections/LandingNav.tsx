"use client";

import { Box, Button, Container, Stack } from "@mui/material";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";
import { LANDING_COLORS } from "../landing.constants";
import LandingLogo from "../components/LandingLogo";
import LandingSymbol from "../components/LandingSymbol";

export default function LandingNav() {
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        borderBottom: `1px solid ${LANDING_COLORS.border}`,
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(0,0,0,0.72)",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: { xs: 1.5, md: 2 } }}
        >
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <LandingLogo height={26} />
          </Box>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <LandingSymbol height={20} />
          </Box>

          <Stack direction="row" spacing={{ xs: 0.75, sm: 1.25 }} alignItems="center">
            <Button
              component={Link}
              href={AppRoutes.login()}
              variant="text"
              sx={{ color: "rgba(255,255,255,0.85)", px: { xs: 1.25, sm: 1.75 } }}
            >
              Autentificare
            </Button>
            <Button
              component={Link}
              href={AppRoutes.register()}
              variant="contained"
              disableElevation
              sx={{
                backgroundColor: LANDING_COLORS.primary,
                "&:hover": { backgroundColor: LANDING_COLORS.primaryDark },
                px: { xs: 1.25, sm: 1.75 },
                whiteSpace: "nowrap",
              }}
            >
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                Înregistrează-ți afacerea
              </Box>
              <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                Înregistrare
              </Box>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
