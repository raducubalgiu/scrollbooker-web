"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import ReviewsRoundedIcon from "@mui/icons-material/ReviewsRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { useTranslations } from "next-intl";
import { LANDING_COLORS } from "../landing.constants";
import PhoneMockup from "../components/PhoneMockup";

const ICONS = [
  PeopleAltRoundedIcon,
  VideoLibraryRoundedIcon,
  ReviewsRoundedIcon,
  StorefrontRoundedIcon,
];

type ProfileItem = { title: string; description: string };

export default function LandingProfileShowcase() {
  const t = useTranslations("profileShowcase");
  const items = t.raw("items") as ProfileItem[];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 8 }}
          alignItems="center"
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="overline"
              sx={{ color: LANDING_COLORS.primary, fontWeight: 700, letterSpacing: 1.5 }}
            >
              {t("kicker")}
            </Typography>
            <Typography
              variant="h2"
              sx={{ color: LANDING_COLORS.textPrimary, mt: 1.5, mb: 2 }}
            >
              {t("title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: LANDING_COLORS.textSecondary, mb: 4, lineHeight: 1.7 }}
            >
              {t("subtitle")}
            </Typography>

            <Stack spacing={2.5}>
              {items.map((item, index) => {
                const Icon = ICONS[index]!;

                return (
                <Stack key={item.title} direction="row" spacing={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      color: LANDING_COLORS.primary,
                      flexShrink: 0,
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography
                      sx={{ color: LANDING_COLORS.textPrimary, fontWeight: 600 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: LANDING_COLORS.textSecondary }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Stack>
                );
              })}
            </Stack>
          </Box>

          <Box sx={{ flex: 1, width: "100%" }}>
            <PhoneMockup
              src="/landing/profile-screen.png"
              alt={t("imageAlt")}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
