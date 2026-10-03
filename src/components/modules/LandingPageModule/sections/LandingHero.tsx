"use client";

import { useState } from "react";
import {
  alpha,
  Box,
  Button,
  Container,
  Stack,
  Typography,
  keyframes,
} from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LANDING_COLORS_LIGHT } from "../landing.constants";
import { useLandingColors } from "../LandingThemeContext";
import PhoneMockup from "../components/PhoneMockup";
import LandingEarlyAdopterModal from "../components/LandingEarlyAdopterModal";
import { AppRoutes } from "@/utils/routes";

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 ${LANDING_COLORS_LIGHT.primary}66; }
  70% { box-shadow: 0 0 0 12px ${LANDING_COLORS_LIGHT.primary}00; }
  100% { box-shadow: 0 0 0 0 ${LANDING_COLORS_LIGHT.primary}00; }
`;

export default function LandingHero() {
  const t = useTranslations("hero");
  const LANDING_COLORS = useLandingColors();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 6, md: 10 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${LANDING_COLORS.primary}33 0%, transparent 70%)`,
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 4 }}
          alignItems="center"
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 1.75,
                py: 0.75,
                borderRadius: 50,
                border: `1px solid ${LANDING_COLORS.border}`,
                backgroundColor: alpha(LANDING_COLORS.textPrimary, 0.04),
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: LANDING_COLORS.primary,
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: LANDING_COLORS.textSecondary, fontWeight: 600 }}
              >
                {t("badge")}
              </Typography>
            </Box>

            <Typography
              variant="h1"
              sx={{
                color: LANDING_COLORS.textPrimary,
                mb: 3,
                letterSpacing: "-0.02em",
              }}
            >
              {t("titlePrefix")}{" "}
              <Box component="span" sx={{ color: LANDING_COLORS.primary }}>
                {t("titleHighlight")}
              </Box>
              {t("titleSuffix")}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: LANDING_COLORS.textSecondary,
                fontSize: { xs: "1.05rem", md: "1.15rem" },
                maxWidth: 560,
                mb: 4,
              }}
            >
              {t("subtitle")}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row", md: "column" }}
              spacing={1.5}
              alignItems={{ xs: "stretch", sm: "center", md: "flex-start" }}
            >
              <Button
                variant="contained"
                disableElevation
                onClick={() => setIsModalOpen(true)}
                size="large"
                sx={{
                  backgroundColor: LANDING_COLORS.primary,
                  "&:hover": { backgroundColor: LANDING_COLORS.primaryDark },
                  whiteSpace: "nowrap",
                  fontWeight: 700,
                  borderRadius: 50,
                  animation: `${pulse} 2.2s infinite`,
                }}
              >
                {t("ctaButton")}
              </Button>
            </Stack>

            <Typography
              variant="body2"
              sx={{ color: LANDING_COLORS.textSecondary, mt: 3 }}
            >
              {t("forBusinessPrefix")}{" "}
              <Box
                component={Link}
                href={AppRoutes.forBusiness()}
                sx={{
                  color: LANDING_COLORS.primary,
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {t("forBusinessLink")}
              </Box>
            </Typography>
          </Box>

          <Box sx={{ flex: 1, width: "100%", position: "relative" }}>
            <PhoneMockup
              src="/landing/feed-screen.png"
              alt={t("imageAlt")}
              priority
              sizes="(max-width: 900px) 80vw, 340px"
            />
          </Box>
        </Stack>
      </Container>

      <LandingEarlyAdopterModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
}
