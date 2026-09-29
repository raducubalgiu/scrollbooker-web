"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { AppRoutes } from "@/utils/routes";
import { LANDING_COLORS } from "../landing.constants";
import PhoneMockup from "../components/PhoneMockup";

export default function LandingHero() {
  const t = useTranslations("hero");

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
                backgroundColor: "rgba(255,255,255,0.04)",
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
                component={Link}
                href={AppRoutes.register()}
                variant="contained"
                size="large"
                disableElevation
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  backgroundColor: LANDING_COLORS.primary,
                  "&:hover": { backgroundColor: LANDING_COLORS.primaryDark },
                  px: 3,
                  py: 1.5,
                  whiteSpace: "nowrap",
                }}
              >
                {t("ctaPrimary")}
              </Button>
              <Button
                component={Link}
                href="#cum-functioneaza"
                variant="outlined"
                size="large"
                sx={{
                  color: LANDING_COLORS.textPrimary,
                  borderColor: LANDING_COLORS.border,
                  px: 3,
                  py: 1.5,
                  whiteSpace: "nowrap",
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.4)",
                    backgroundColor: "rgba(255,255,255,0.04)",
                  },
                }}
              >
                {t("ctaSecondary")}
              </Button>
            </Stack>
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
    </Box>
  );
}
