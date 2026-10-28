"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useLandingColors } from "../LandingThemeContext";
import PhoneMockup from "../components/PhoneMockup";
import FloatingReaction from "../components/FloatingReaction";

const ICONS = [
  AccountCircleRoundedIcon,
  AutoAwesomeRoundedIcon,
  StorefrontRoundedIcon,
];

type ProfileItem = { title: string; description: string };

export default function LandingProfiles() {
  const t = useTranslations("profiles");
  const LANDING_COLORS = useLandingColors();
  const items = t.raw("items") as ProfileItem[];

  return (
    <Box component="section" id="profiles" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          spacing={{ xs: 6, md: 8 }}
          alignItems="center"
        >
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
            <Box sx={{ transform: { md: "rotate(-3deg)" } }}>
              <PhoneMockup
                src="/landing/videos/profile-poster.jpg"
                videoSrc="/landing/videos/profile.mp4"
                alt={t("imageAlt")}
              />
            </Box>

            <FloatingReaction
              delay={0.4}
              sx={{ top: "9%", right: { xs: -4, md: -24 } }}
            >
              <CheckRoundedIcon
                sx={{ fontSize: 18, color: LANDING_COLORS.accent }}
              />
              {t("video.following")}
            </FloatingReaction>

            <FloatingReaction
              delay={1.4}
              variant="primary"
              sx={{ top: "56%", right: { xs: -4, md: -24 } }}
            >
              <WhatsAppIcon sx={{ fontSize: 16 }} />
              {t("video.contact")}
            </FloatingReaction>
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="overline"
              sx={{
                color: LANDING_COLORS.accent,
                fontWeight: 800,
                letterSpacing: 1.5,
              }}
            >
              {t("kicker")}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: LANDING_COLORS.textPrimary,
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
              sx={{
                color: LANDING_COLORS.textSecondary,
                fontSize: "1.1rem",
                mb: 4,
              }}
            >
              {t("subtitle")}
            </Typography>

            <Stack spacing={2.5}>
              {items.map((item, index) => {
                const Icon = ICONS[index] ?? AccountCircleRoundedIcon;

                return (
                  <Stack key={item.title} direction="row" spacing={2}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "14px",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        background: `linear-gradient(135deg, ${LANDING_COLORS.primary}, ${LANDING_COLORS.accent})`,
                      }}
                    >
                      <Icon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color: LANDING_COLORS.textPrimary,
                          fontWeight: 800,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: LANDING_COLORS.textSecondary,
                          lineHeight: 1.6,
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
