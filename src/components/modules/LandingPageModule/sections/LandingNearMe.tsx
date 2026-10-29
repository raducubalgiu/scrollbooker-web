"use client";

import { alpha, Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import ToggleOnRoundedIcon from "@mui/icons-material/ToggleOnRounded";
import PhoneMockup from "../components/PhoneMockup";
import FloatingReaction from "../components/FloatingReaction";

type NearMeStep = { title: string; description: string };

export default function LandingNearMe() {
  const t = useTranslations("nearMe");
  const { palette } = useTheme();
  const steps = t.raw("steps") as NearMeStep[];

  return (
    <Box
      component="section"
      id="near-me"
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 12 },
        backgroundColor: palette.surface.main,
        borderTop: `1px solid ${palette.divider}`,
        borderBottom: `1px solid ${palette.divider}`,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: "-30%",
          left: "-10%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${palette.primary.main}26 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 8 }}
          alignItems="center"
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="overline"
              sx={{
                color: palette.primary.main,
                fontWeight: 700,
                letterSpacing: 1.5,
              }}
            >
              {t("kicker")}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: palette.text.primary,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                mt: 1.5,
                mb: 2,
              }}
            >
              {t("title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: palette.text.secondary, mb: 4, maxWidth: 560 }}
            >
              {t("subtitle")}
            </Typography>

            <Stack spacing={2.5} sx={{ mb: 4 }}>
              {steps.map((step, index) => (
                <Stack key={step.title} direction="row" spacing={2}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: palette.primary.main,
                      color: palette.common.white,
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: palette.text.primary,
                        fontWeight: 700,
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: palette.text.secondary }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>

            <Typography
              variant="body2"
              sx={{
                color: palette.text.secondary,
                px: 2,
                py: 1.5,
                borderRadius: 2,
                border: `1px dashed ${palette.divider}`,
                backgroundColor: alpha(palette.text.primary, 0.02),
                maxWidth: 560,
              }}
            >
              {t("optionalNote")}
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              width: "100%",
              maxWidth: { xs: 340, md: 420 },
              mx: "auto",
              position: "relative",
              px: { xs: 3, md: 5 },
            }}
          >
            <Box sx={{ transform: { md: "rotate(3deg)" } }}>
              <PhoneMockup
                src="/landing/videos/filters-drawer-poster.jpg"
                videoSrc="/landing/videos/filters-drawer.mp4"
                alt={t("video.imageAlt")}
              />
            </Box>

            <FloatingReaction
              delay={0.4}
              variant="primary"
              sx={{ top: "2%", left: { xs: -8, md: -32 } }}
            >
              <ToggleOnRoundedIcon sx={{ fontSize: 20 }} />
              {t("video.nearMe")}
            </FloatingReaction>

            <FloatingReaction
              delay={1.4}
              sx={{ bottom: "16%", right: { xs: -4, md: -16 } }}
            >
              <PlaceRoundedIcon
                sx={{ fontSize: 16, color: palette.primary.main }}
              />
              {t("video.distance")}
            </FloatingReaction>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
