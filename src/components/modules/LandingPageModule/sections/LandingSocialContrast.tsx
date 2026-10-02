"use client";

import { alpha, Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useTranslations } from "next-intl";
import { useLandingColors } from "../LandingThemeContext";

export default function LandingSocialContrast() {
  const t = useTranslations("socialContrast");
  const LANDING_COLORS = useLandingColors();
  const oldWay = t.raw("oldWay") as string[];
  const newWay = t.raw("newWay") as string[];

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
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack
              spacing={2.5}
              sx={{
                height: "100%",
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: `1px solid ${LANDING_COLORS.border}`,
              }}
            >
              <Typography
                sx={{
                  color: alpha(LANDING_COLORS.textPrimary, 0.45),
                  fontWeight: 700,
                  fontSize: "0.95rem",
                }}
              >
                {t("oldWayLabel")}
              </Typography>

              {oldWay.map((item) => (
                <Stack key={item} direction="row" spacing={1.5}>
                  <CloseRoundedIcon
                    fontSize="small"
                    sx={{ color: alpha(LANDING_COLORS.textPrimary, 0.3), mt: 0.2, flexShrink: 0 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: alpha(LANDING_COLORS.textPrimary, 0.45), lineHeight: 1.6 }}
                  >
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack
              spacing={2.5}
              sx={{
                height: "100%",
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: `1px solid ${LANDING_COLORS.primary}`,
                backgroundColor: "rgba(255,111,0,0.06)",
              }}
            >
              <Typography
                sx={{
                  color: LANDING_COLORS.primary,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                }}
              >
                {t("newWayLabel")}
              </Typography>

              {newWay.map((item) => (
                <Stack key={item} direction="row" spacing={1.5}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: LANDING_COLORS.primary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      mt: 0.2,
                    }}
                  >
                    <CheckRoundedIcon sx={{ fontSize: 14, color: "#000" }} />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: LANDING_COLORS.textPrimary,
                      lineHeight: 1.6,
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
