"use client";

import { alpha, Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useLandingColors } from "@/components/modules/LandingPageModule/LandingThemeContext";
import { AppRoutes } from "@/utils/routes";

export default function ForBusinessHero() {
  const t = useTranslations("forBusinessHero");
  const LANDING_COLORS = useLandingColors();

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
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              alignItems={{ xs: "stretch", sm: "center" }}
            >
              <Button
                component={Link}
                href={AppRoutes.partners()}
                variant="contained"
                size="large"
                disableElevation
                sx={{
                  backgroundColor: LANDING_COLORS.primary,
                  "&:hover": { backgroundColor: LANDING_COLORS.primaryDark },
                  px: 3,
                  py: 1.5,
                  whiteSpace: "nowrap",
                  fontWeight: 700,
                  borderRadius: 50,
                }}
              >
                {t("primaryButton")}
              </Button>

              <Button
                component={Link}
                href="#cum-functioneaza"
                variant="text"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  color: LANDING_COLORS.textPrimary,
                  px: 2,
                  py: 1.5,
                  whiteSpace: "nowrap",
                  fontWeight: 600,
                }}
              >
                {t("secondaryButton")}
              </Button>
            </Stack>
          </Box>

          <Box
            sx={{
              flex: 1,
              width: "100%",
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              border: `1px solid ${LANDING_COLORS.border}`,
              aspectRatio: "1 / 1",
            }}
          >
            <Image
              src="/landing/for-business-hero.png"
              alt={t("imageAlt")}
              fill
              priority
              sizes="(max-width: 900px) 90vw, 560px"
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
