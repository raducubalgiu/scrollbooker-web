"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import { useTranslations } from "next-intl";
import { useLandingColors } from "../LandingThemeContext";
import { AppRoutes } from "@/utils/routes";

const ICONS = [
  CalendarMonthRoundedIcon,
  DashboardCustomizeRoundedIcon,
  VideocamRoundedIcon,
];

export default function LandingForBusinessTeaser() {
  const t = useTranslations("forBusinessTeaser");
  const LANDING_COLORS = useLandingColors();
  const items = t.raw("items") as string[];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: LANDING_COLORS.surface,
        borderTop: `1px solid ${LANDING_COLORS.border}`,
        borderBottom: `1px solid ${LANDING_COLORS.border}`,
      }}
    >
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
              sx={{
                color: LANDING_COLORS.primary,
                fontWeight: 700,
                letterSpacing: 1.5,
              }}
            >
              {t("kicker")}
            </Typography>
            <Typography
              variant="h2"
              sx={{ color: LANDING_COLORS.textPrimary, mt: 1.5, mb: 3 }}
            >
              {t("title")}
            </Typography>

            <Stack spacing={2} sx={{ mb: 4 }}>
              {items.map((item, index) => {
                const Icon = ICONS[index]!;

                return (
                  <Stack
                    key={item}
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 1.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(255,111,0,0.12)",
                        color: LANDING_COLORS.primary,
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ fontSize: 18 }} />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: LANDING_COLORS.textSecondary,
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>

            <Button
              component={Link}
              href={AppRoutes.forBusiness()}
              variant="outlined"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                borderColor: LANDING_COLORS.border,
                color: LANDING_COLORS.textPrimary,
                fontWeight: 700,
                "&:hover": {
                  borderColor: LANDING_COLORS.primary,
                  backgroundColor: "rgba(255,111,0,0.08)",
                },
              }}
            >
              {t("button")}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
