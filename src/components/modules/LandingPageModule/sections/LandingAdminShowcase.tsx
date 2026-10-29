"use client";

import { alpha, Box, Container, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ContentCutRoundedIcon from "@mui/icons-material/ContentCutRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import { useTranslations } from "next-intl";

const ICONS = [
  CalendarMonthRoundedIcon,
  ContentCutRoundedIcon,
  GroupsRoundedIcon,
  QueryStatsRoundedIcon,
];

type AdminItem = { title: string; description: string };

export default function LandingAdminShowcase() {
  const t = useTranslations("adminShowcase");
  const { palette } = useTheme();
  const items = t.raw("items") as AdminItem[];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 8 }}
          alignItems="center"
          useFlexGap
        >
          <Box
            sx={{
              flex: 1,
              width: "100%",
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              border: `1px solid ${palette.divider}`,
              aspectRatio: "4 / 3",
              order: { xs: 1, md: 0 },
            }}
          >
            <Image
              src="/landing/full-administration.png"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 900px) 90vw, 560px"
              style={{ objectFit: "cover" }}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="overline"
              sx={{ color: palette.primary.main, fontWeight: 700, letterSpacing: 1.5 }}
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
              sx={{ color: palette.text.secondary, mb: 4, lineHeight: 1.7 }}
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
                      backgroundColor: alpha(palette.text.primary, 0.06),
                      color: palette.primary.main,
                      flexShrink: 0,
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography
                      sx={{ color: palette.text.primary, fontWeight: 600 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: palette.text.secondary }}
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
