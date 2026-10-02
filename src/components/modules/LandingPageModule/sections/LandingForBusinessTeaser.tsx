"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import { useTranslations } from "next-intl";
import { LANDING_COLORS } from "../landing.constants";
import { AppRoutes } from "@/utils/routes";

const ICONS = [
  CalendarMonthRoundedIcon,
  DashboardCustomizeRoundedIcon,
  VideocamRoundedIcon,
];

export default function LandingForBusinessTeaser() {
  const t = useTranslations("forBusinessTeaser");
  const items = t.raw("items") as string[];

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            borderRadius: 4,
            border: `1px solid ${LANDING_COLORS.border}`,
            backgroundColor: LANDING_COLORS.surface,
            p: { xs: 3, md: 5 },
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 4, md: 6 }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="overline"
                sx={{ color: LANDING_COLORS.primary, fontWeight: 700, letterSpacing: 1.5 }}
              >
                {t("kicker")}
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: LANDING_COLORS.textPrimary, mt: 1, mb: 3, maxWidth: 520 }}
              >
                {t("title")}
              </Typography>

              <Grid container spacing={1.5}>
                {items.map((item, index) => {
                  const Icon = ICONS[index]!;

                  return (
                    <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
                      <Stack direction="row" spacing={1.25} alignItems="flex-start">
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
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
                          sx={{ color: LANDING_COLORS.textSecondary, lineHeight: 1.5, mt: 0.4 }}
                        >
                          {item}
                        </Typography>
                      </Stack>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            <Button
              component={Link}
              href={AppRoutes.forBusiness()}
              variant="outlined"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                flexShrink: 0,
                whiteSpace: "nowrap",
                borderColor: LANDING_COLORS.border,
                color: LANDING_COLORS.textPrimary,
                px: 3,
                py: 1.25,
                fontWeight: 700,
                "&:hover": {
                  borderColor: LANDING_COLORS.primary,
                  backgroundColor: "rgba(255,111,0,0.08)",
                },
              }}
            >
              {t("button")}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
