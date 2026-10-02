"use client";

import { alpha, Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useTranslations } from "next-intl";
import { useLandingColors } from "@/components/modules/LandingPageModule/LandingThemeContext";

const ICONS = [CalendarMonthRoundedIcon, PersonRoundedIcon, SyncRoundedIcon];

type CalendarItem = { title: string; description: string };

export default function ForBusinessCalendarShowcase() {
  const t = useTranslations("forBusinessCalendar");
  const LANDING_COLORS = useLandingColors();
  const items = t.raw("items") as CalendarItem[];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 8 }}
          alignItems="center"
        >
          <Box
            sx={{
              flex: 1,
              width: "100%",
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              border: `1px solid ${LANDING_COLORS.border}`,
              aspectRatio: "4 / 3",
            }}
          >
            <Image
              src="/landing/calendar.png"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 900px) 90vw, 560px"
              style={{ objectFit: "cover" }}
            />
          </Box>

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
                        backgroundColor: alpha(LANDING_COLORS.textPrimary, 0.06),
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
        </Stack>
      </Container>
    </Box>
  );
}
