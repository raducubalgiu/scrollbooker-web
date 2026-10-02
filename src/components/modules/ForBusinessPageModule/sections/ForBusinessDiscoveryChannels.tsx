"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useTranslations } from "next-intl";
import { LANDING_COLORS } from "@/components/modules/LandingPageModule/landing.constants";

const ICONS = [TravelExploreRoundedIcon, BadgeRoundedIcon, StarRoundedIcon];

type ChannelItem = { title: string; description: string };

export default function ForBusinessDiscoveryChannels() {
  const t = useTranslations("forBusinessDiscovery");
  const channels = t.raw("channels") as ChannelItem[];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 6, maxWidth: 680 }}>
          <Typography
            variant="overline"
            sx={{ color: LANDING_COLORS.primary, fontWeight: 700, letterSpacing: 1.5 }}
          >
            {t("kicker")}
          </Typography>
          <Typography variant="h2" sx={{ color: LANDING_COLORS.textPrimary }}>
            {t("title")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: LANDING_COLORS.textSecondary, lineHeight: 1.7 }}
          >
            {t("subtitle")}
          </Typography>
        </Stack>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "3200 / 2160",
            borderRadius: 3,
            overflow: "hidden",
            border: `1px solid ${LANDING_COLORS.border}`,
            backgroundColor: LANDING_COLORS.surface,
            mb: 5,
          }}
        >
          <Image
            src="/landing/search-screen.png"
            alt={t("imageAlt")}
            fill
            sizes="(max-width: 1200px) 95vw, 1100px"
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Grid container spacing={3}>
          {channels.map((channel, index) => {
            const Icon = ICONS[index]!;

            return (
              <Grid key={channel.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Stack
                  spacing={1.5}
                  sx={{
                    height: "100%",
                    p: 3,
                    borderRadius: 3,
                    border: `1px solid ${LANDING_COLORS.border}`,
                    backgroundColor: LANDING_COLORS.surface,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(255,111,0,0.12)",
                      color: LANDING_COLORS.primary,
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                  <Typography sx={{ color: LANDING_COLORS.textPrimary, fontWeight: 600 }}>
                    {channel.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: LANDING_COLORS.textSecondary, lineHeight: 1.6 }}
                  >
                    {channel.description}
                  </Typography>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
