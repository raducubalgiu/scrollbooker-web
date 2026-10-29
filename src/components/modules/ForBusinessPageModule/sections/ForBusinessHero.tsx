"use client";

import {
  alpha,
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import RedeemRoundedIcon from "@mui/icons-material/RedeemRounded";
import {
  fadeUpKeyframes,
  motionSafe,
} from "@/components/modules/LandingPageModule/landing.motion";
import { AppRoutes } from "@/utils/routes";
import { trackRegisterCtaClick } from "@/utils/analytics";

export default function ForBusinessHero() {
  const t = useTranslations("forBusinessHero");
  const { palette } = useTheme();

  const fadeUp = (index: number) =>
    motionSafe(
      `${fadeUpKeyframes} 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.12}s both`,
    );

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 5, md: 9 },
        pb: { xs: 8, md: 11 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: { xs: 360, md: 620 },
          height: { xs: 360, md: 620 },
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(palette.secondary.main, 0.22)} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-25%",
          left: "-15%",
          width: { xs: 320, md: 560 },
          height: { xs: 320, md: 560 },
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(palette.primary.main, 0.22)} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 7, md: 6 }}
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
                border: `1px solid ${alpha(palette.secondary.main, 0.35)}`,
                backgroundColor: alpha(palette.secondary.main, 0.08),
                mb: 3,
                ...fadeUp(0),
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: palette.secondary.main,
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: palette.text.primary, fontWeight: 700 }}
              >
                {t("badge")}
              </Typography>
            </Box>

            <Typography
              component="h1"
              sx={{
                color: palette.text.primary,
                fontSize: { xs: "2.75rem", sm: "3.5rem", md: "4.25rem" },
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: "-0.045em",
                mb: 3,
                ...fadeUp(1),
              }}
            >
              {t("titlePrefix")}{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(90deg, ${palette.primary.main}, ${palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {t("titleHighlight")}
              </Box>
              {t("titleSuffix")}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: palette.text.secondary,
                fontSize: { xs: "1.05rem", md: "1.2rem" },
                lineHeight: 1.6,
                maxWidth: 560,
                mb: 4,
                ...fadeUp(2),
              }}
            >
              {t("subtitle")}
            </Typography>

            <Stack
              direction="row"
              spacing={1.25}
              alignItems="center"
              sx={{
                display: "inline-flex",
                px: 2.25,
                py: 1.5,
                borderRadius: 4,
                background: `linear-gradient(90deg, ${alpha(palette.primary.main, 0.1)}, ${alpha(palette.secondary.main, 0.1)})`,
                border: `1px solid ${alpha(palette.secondary.main, 0.3)}`,
                mb: 4,
                ...fadeUp(3),
              }}
            >
              <RedeemRoundedIcon
                sx={{ fontSize: 24, color: palette.primary.main }}
              />
              <Typography
                sx={{
                  color: palette.text.primary,
                  fontWeight: 500,
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                }}
              >
                {t.rich("launchOffer", {
                  b: (chunks) => (
                    <Box
                      component="span"
                      sx={{ fontWeight: 800, color: palette.primary.main }}
                    >
                      {chunks}
                    </Box>
                  ),
                })}
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              alignItems={{ xs: "stretch", sm: "center" }}
              sx={fadeUp(4)}
            >
              <Button
                component={Link}
                href={AppRoutes.registerBusiness()}
                onClick={() =>
                  trackRegisterCtaClick(
                    "for_business_hero",
                    AppRoutes.registerBusiness()
                  )
                }
                variant="contained"
                size="large"
                disableElevation
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  background: `linear-gradient(90deg, ${palette.primary.main}, ${palette.secondary.main})`,
                  color: palette.common.white,
                  whiteSpace: "nowrap",
                  fontWeight: 800,
                  borderRadius: 50,
                  boxShadow: `0 12px 32px -10px ${alpha(palette.secondary.main, 0.6)}`,
                  transition: "transform 0.15s, box-shadow 0.15s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 16px 40px -10px ${alpha(palette.secondary.main, 0.75)}`,
                  },
                }}
              >
                {t("primaryButton")}
              </Button>

              <Button
                component={Link}
                href="#cum-functioneaza"
                variant="outlined"
                size="large"
                sx={{
                  color: palette.text.primary,
                  borderColor: palette.divider,
                  whiteSpace: "nowrap",
                  fontWeight: 700,
                  borderRadius: 50,
                  "&:hover": {
                    borderColor: palette.text.secondary,
                    backgroundColor: alpha(palette.text.primary, 0.04),
                  },
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
              borderRadius: 6,
              overflow: "hidden",
              border: `1px solid ${palette.divider}`,
              aspectRatio: "1 / 1",
              boxShadow: `0 40px 80px -30px ${alpha(palette.secondary.main, 0.35)}`,
              ...fadeUp(2),
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
