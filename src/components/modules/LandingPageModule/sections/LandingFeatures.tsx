"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import { useTranslations } from "next-intl";
import { LANDING_COLORS } from "../landing.constants";

const ICONS = [
  GroupsRoundedIcon,
  CalendarMonthRoundedIcon,
  DashboardCustomizeRoundedIcon,
  VideocamRoundedIcon,
];

type FeatureItem = { title: string; description: string };

export default function LandingFeatures() {
  const t = useTranslations("features");
  const items = t.raw("items") as FeatureItem[];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 6, maxWidth: 640 }}>
          <Typography
            variant="overline"
            sx={{ color: LANDING_COLORS.primary, fontWeight: 700, letterSpacing: 1.5 }}
          >
            {t("kicker")}
          </Typography>
          <Typography variant="h2" sx={{ color: LANDING_COLORS.textPrimary }}>
            {t("title")}
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {items.map((feature, index) => {
            const Icon = ICONS[index]!;

            return (
            <Grid key={feature.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack
                spacing={2}
                sx={{
                  height: "100%",
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${LANDING_COLORS.border}`,
                  backgroundColor: LANDING_COLORS.surface,
                  transition: "border-color 0.2s, transform 0.2s",
                  "&:hover": {
                    borderColor: "rgba(255,111,0,0.4)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
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
                <Typography
                  variant="h6"
                  sx={{ color: LANDING_COLORS.textPrimary }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: LANDING_COLORS.textSecondary, lineHeight: 1.7 }}
                >
                  {feature.description}
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
