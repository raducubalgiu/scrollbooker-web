"use client";

import {
  alpha,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import { useLandingColors } from "../LandingThemeContext";
import PhoneMockup from "../components/PhoneMockup";
import FloatingReaction from "../components/FloatingReaction";
import { fadeUpKeyframes, motionSafe } from "../landing.motion";
import { AppRoutes } from "@/utils/routes";
import { trackLoginCtaClick, trackRegisterCtaClick } from "@/utils/analytics";

export default function LandingHero() {
  const t = useTranslations("hero");
  const LANDING_COLORS = useLandingColors();
  const words = t.raw("words") as string[];

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
          background: `radial-gradient(circle, ${alpha(LANDING_COLORS.accent, 0.28)} 0%, transparent 70%)`,
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
          background: `radial-gradient(circle, ${alpha(LANDING_COLORS.primary, 0.25)} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 7, md: 6 }}
          alignItems="center"
        >
          <Box sx={{ flex: 1.1, minWidth: 0 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 1.75,
                py: 0.75,
                borderRadius: 50,
                border: `1px solid ${alpha(LANDING_COLORS.accent, 0.35)}`,
                backgroundColor: alpha(LANDING_COLORS.accent, 0.08),
                mb: 3,
                ...fadeUp(0),
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: LANDING_COLORS.accent,
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: LANDING_COLORS.textPrimary, fontWeight: 700 }}
              >
                {t("badge")}
              </Typography>
            </Box>

            <Typography
              component="h1"
              sx={{
                color: LANDING_COLORS.textPrimary,
                fontSize: { xs: "3rem", sm: "4rem", md: "4.75rem" },
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.045em",
                mb: 3,
              }}
            >
              {words.map((word, index) => (
                <Box
                  key={word}
                  component="span"
                  sx={{
                    display: "inline-block",
                    mr: "0.22em",
                    ...fadeUp(index + 1),
                  }}
                >
                  {word}
                </Box>
              ))}
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  pr: "0.05em",
                  background: `linear-gradient(90deg, ${LANDING_COLORS.primary}, ${LANDING_COLORS.accent})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  ...fadeUp(words.length + 1),
                }}
              >
                {t("highlight")}
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: LANDING_COLORS.textSecondary,
                fontSize: { xs: "1.05rem", md: "1.2rem" },
                lineHeight: 1.6,
                maxWidth: 560,
                mb: 4,
                ...fadeUp(words.length + 2),
              }}
            >
              {t("subtitle")}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              alignItems={{ xs: "stretch", sm: "center" }}
              sx={fadeUp(words.length + 3)}
            >
              <Button
                component={Link}
                href={AppRoutes.register()}
                onClick={() =>
                  trackRegisterCtaClick("home_hero", AppRoutes.register())
                }
                variant="contained"
                size="large"
                disableElevation
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  background: `linear-gradient(90deg, ${LANDING_COLORS.primary}, ${LANDING_COLORS.accent})`,
                  color: "#fff",
                  whiteSpace: "nowrap",
                  fontWeight: 800,
                  borderRadius: 50,
                  boxShadow: `0 12px 32px -10px ${alpha(LANDING_COLORS.accent, 0.6)}`,
                  transition: "transform 0.15s, box-shadow 0.15s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 16px 40px -10px ${alpha(LANDING_COLORS.accent, 0.75)}`,
                  },
                }}
              >
                {t("primaryCta")}
              </Button>
              <Button
                component={Link}
                href={AppRoutes.login()}
                onClick={() => trackLoginCtaClick("home_hero")}
                variant="outlined"
                size="large"
                sx={{
                  color: LANDING_COLORS.textPrimary,
                  borderColor: LANDING_COLORS.border,
                  "&:hover": {
                    borderColor: LANDING_COLORS.textSecondary,
                    backgroundColor: alpha(LANDING_COLORS.textPrimary, 0.04),
                  },
                  whiteSpace: "nowrap",
                  fontWeight: 600,
                  borderRadius: 50,
                }}
              >
                {t("secondaryCta")}
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
            <Box
              sx={{
                transform: { md: "rotate(-3deg)" },
                transition: "transform 0.4s",
                "&:hover": { transform: { md: "rotate(0deg)" } },
              }}
            >
              <PhoneMockup
                src="/landing/videos/feed-poster.jpg"
                videoSrc="/landing/videos/feed.mp4"
                alt={t("imageAlt")}
                priority
                sizes="(max-width: 900px) 80vw, 340px"
              />
            </Box>

            <FloatingReaction delay={0} sx={{ top: "7%", left: 0 }}>
              <AddRoundedIcon
                sx={{ fontSize: 16, color: LANDING_COLORS.accent }}
              />
              {t("reactions.follow")}
            </FloatingReaction>

            <FloatingReaction delay={0.6} sx={{ top: "20%", right: 0 }}>
              <FavoriteRoundedIcon
                sx={{ fontSize: 18, color: LANDING_COLORS.accent }}
              />
              {t("reactions.likes")}
            </FloatingReaction>

            <FloatingReaction
              delay={1.2}
              sx={{
                top: "40%",
                left: { xs: -4, md: -24 },
                borderRadius: "18px 18px 18px 4px",
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: `linear-gradient(135deg, ${LANDING_COLORS.accentAlt}, ${LANDING_COLORS.accent})`,
                }}
              />
              {t("reactions.comment")}
            </FloatingReaction>

            <FloatingReaction
              delay={1.8}
              sx={{ top: "58%", right: { xs: -4, md: -16 } }}
            >
              <PlaceRoundedIcon
                sx={{ fontSize: 16, color: LANDING_COLORS.primary }}
              />
              {t("reactions.distance")}
            </FloatingReaction>

            <FloatingReaction delay={2.4} sx={{ bottom: "18%", left: 0 }}>
              <StarRoundedIcon
                sx={{ fontSize: 18, color: LANDING_COLORS.accentAlt }}
              />
              {t("reactions.rating")}
            </FloatingReaction>

            <FloatingReaction
              delay={3}
              variant="primary"
              sx={{ bottom: "4%", right: { xs: 8, md: 16 } }}
            >
              <BoltRoundedIcon sx={{ fontSize: 16 }} />
              {t("reactions.book")}
            </FloatingReaction>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
