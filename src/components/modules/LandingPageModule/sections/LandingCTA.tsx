"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { AppRoutes } from "@/utils/routes";
import { LANDING_COLORS } from "../landing.constants";

export default function LandingCTA() {
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
            background: `linear-gradient(135deg, ${LANDING_COLORS.primaryDark} 0%, ${LANDING_COLORS.primary} 100%)`,
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Typography
              variant="h2"
              sx={{ color: "#000", maxWidth: 640, letterSpacing: "-0.01em" }}
            >
              Fii pregătit înainte să vină valul, nu după
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "rgba(0,0,0,0.75)", maxWidth: 520, fontWeight: 500 }}
            >
              Cu cât profilul tău e configurat mai devreme, cu atât ai mai
              multă vizibilitate atunci când clienții ajung în aplicație — și
              mai puțină concurență pentru aceeași atenție. Înregistrarea
              durează câteva minute și nu costă nimic.
            </Typography>
            <Button
              component={Link}
              href={AppRoutes.register()}
              variant="contained"
              size="large"
              disableElevation
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                px: 4,
                py: 1.5,
                "&:hover": { backgroundColor: "#1a1a1a" },
              }}
            >
              Înregistrează-ți afacerea
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
