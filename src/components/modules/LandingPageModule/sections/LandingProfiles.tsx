"use client";

import { alpha, Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { useLandingColors } from "../LandingThemeContext";

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
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
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
              position: "relative",
              borderRadius: 5,
              overflow: "hidden",
              backgroundColor: "#000",
              aspectRatio: "2400 / 2120",
              boxShadow: `0 40px 100px -40px ${alpha(LANDING_COLORS.accent, 0.5)}`,
            }}
          >
            <Image
              src="/landing/profile-screen.png"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 900px) 95vw, 560px"
              style={{ objectFit: "contain", padding: "6%" }}
            />
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
