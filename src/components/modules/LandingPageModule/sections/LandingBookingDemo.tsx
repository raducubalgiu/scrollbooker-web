"use client";

import { alpha, Box, Container, Stack, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import { useTranslations } from "next-intl";

const INFO_ICONS = [
  SellRoundedIcon,
  PlaceRoundedIcon,
  StarRoundedIcon,
  ScheduleRoundedIcon,
];

export default function LandingBookingDemo() {
  const t = useTranslations("bookingDemo");
  const { palette } = useTheme();
  const infoChips = t.raw("infoChips") as string[];

  const cardSx = {
    height: "100%",
    p: { xs: 3, md: 4 },
    borderRadius: 3,
    border: `1px solid ${palette.divider}`,
    backgroundColor: palette.background.default,
  };

  const chipSx = {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.75,
    width: "fit-content",
    px: 1.5,
    py: 0.5,
    borderRadius: 50,
    fontSize: "0.8rem",
    fontWeight: 700,
  };

  const contactButtonSx = {
    display: "inline-flex",
    alignItems: "center",
    gap: 1,
    px: 2,
    py: 1,
    borderRadius: 50,
    fontWeight: 600,
    fontSize: "0.9rem",
    border: `1px solid ${palette.divider}`,
    color: palette.text.primary,
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: palette.surface.main,
        borderTop: `1px solid ${palette.divider}`,
        borderBottom: `1px solid ${palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 4, maxWidth: 680 }}>
          <Typography
            variant="overline"
            sx={{
              color: palette.primary.main,
              fontWeight: 800,
              letterSpacing: 1.5,
            }}
          >
            {t("kicker")}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: palette.text.primary,
              fontWeight: 900,
              letterSpacing: "-0.03em",
            }}
          >
            {t("title")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: palette.text.secondary, fontSize: "1.1rem" }}
          >
            {t("subtitle")}
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 5 }}>
          {infoChips.map((chip, index) => {
            const Icon = INFO_ICONS[index] ?? SellRoundedIcon;

            return (
              <Box
                key={chip}
                sx={{
                  ...chipSx,
                  py: 0.75,
                  fontSize: "0.875rem",
                  color: palette.text.primary,
                  border: `1px solid ${palette.divider}`,
                  backgroundColor: palette.background.default,
                }}
              >
                <Icon sx={{ fontSize: 16, color: palette.primary.main }} />
                {chip}
              </Box>
            );
          })}
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack
              spacing={2}
              sx={{ ...cardSx, borderColor: palette.primary.main }}
            >
              <Box
                sx={{
                  ...chipSx,
                  backgroundColor: palette.primary.main,
                  color: palette.common.white,
                }}
              >
                <BoltRoundedIcon sx={{ fontSize: 16 }} />
                {t("instantChip")}
              </Box>
              <Typography
                variant="h5"
                sx={{ color: palette.text.primary, fontWeight: 700 }}
              >
                {t("instantTitle")}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: palette.text.secondary, lineHeight: 1.7 }}
              >
                {t("instantDescription")}
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2} sx={cardSx}>
              <Box
                sx={{
                  ...chipSx,
                  backgroundColor: alpha(palette.text.primary, 0.08),
                  color: palette.text.primary,
                }}
              >
                <ChatRoundedIcon sx={{ fontSize: 16 }} />
                {t("contactChip")}
              </Box>
              <Typography
                variant="h5"
                sx={{ color: palette.text.primary, fontWeight: 700 }}
              >
                {t("contactTitle")}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: palette.text.secondary, lineHeight: 1.7 }}
              >
                {t("contactDescription")}
              </Typography>
              <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                <Box sx={contactButtonSx}>
                  <WhatsAppIcon sx={{ fontSize: 18, color: palette.whatsapp.main }} />
                  {t("whatsapp")}
                </Box>
                <Box sx={contactButtonSx}>
                  <PhoneRoundedIcon
                    sx={{ fontSize: 18, color: palette.primary.main }}
                  />
                  {t("call")}
                </Box>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
