"use client";

import { alpha, Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import { useTranslations } from "next-intl";
import { useLandingColors } from "../LandingThemeContext";

const INFO_ICONS = [
  SellRoundedIcon,
  PlaceRoundedIcon,
  StarRoundedIcon,
  ScheduleRoundedIcon,
];

export default function LandingBookingDemo() {
  const t = useTranslations("bookingDemo");
  const LANDING_COLORS = useLandingColors();
  const infoChips = t.raw("infoChips") as string[];

  const cardSx = {
    height: "100%",
    p: { xs: 3, md: 4 },
    borderRadius: 3,
    border: `1px solid ${LANDING_COLORS.border}`,
    backgroundColor: LANDING_COLORS.background,
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
    border: `1px solid ${LANDING_COLORS.border}`,
    color: LANDING_COLORS.textPrimary,
  };

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
        <Stack spacing={1.5} sx={{ mb: 4, maxWidth: 680 }}>
          <Typography
            variant="overline"
            sx={{
              color: LANDING_COLORS.primary,
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
            }}
          >
            {t("title")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: LANDING_COLORS.textSecondary, fontSize: "1.1rem" }}
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
                  color: LANDING_COLORS.textPrimary,
                  border: `1px solid ${LANDING_COLORS.border}`,
                  backgroundColor: LANDING_COLORS.background,
                }}
              >
                <Icon sx={{ fontSize: 16, color: LANDING_COLORS.primary }} />
                {chip}
              </Box>
            );
          })}
        </Box>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack
              spacing={2}
              sx={{ ...cardSx, borderColor: LANDING_COLORS.primary }}
            >
              <Box
                sx={{
                  ...chipSx,
                  backgroundColor: LANDING_COLORS.primary,
                  color: "#fff",
                }}
              >
                <BoltRoundedIcon sx={{ fontSize: 16 }} />
                {t("instantChip")}
              </Box>
              <Typography
                variant="h5"
                sx={{ color: LANDING_COLORS.textPrimary, fontWeight: 700 }}
              >
                {t("instantTitle")}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: LANDING_COLORS.textSecondary, lineHeight: 1.7 }}
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
                  backgroundColor: alpha(LANDING_COLORS.textPrimary, 0.08),
                  color: LANDING_COLORS.textPrimary,
                }}
              >
                <ChatRoundedIcon sx={{ fontSize: 16 }} />
                {t("contactChip")}
              </Box>
              <Typography
                variant="h5"
                sx={{ color: LANDING_COLORS.textPrimary, fontWeight: 700 }}
              >
                {t("contactTitle")}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: LANDING_COLORS.textSecondary, lineHeight: 1.7 }}
              >
                {t("contactDescription")}
              </Typography>
              <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                <Box sx={contactButtonSx}>
                  <WhatsAppIcon sx={{ fontSize: 18, color: "#25D366" }} />
                  {t("whatsapp")}
                </Box>
                <Box sx={contactButtonSx}>
                  <PhoneRoundedIcon
                    sx={{ fontSize: 18, color: LANDING_COLORS.primary }}
                  />
                  {t("call")}
                </Box>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          sx={{ color: LANDING_COLORS.textSecondary, fontWeight: 600, mb: 2 }}
        >
          {t("flowCaption")}
        </Typography>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "3840 / 2160",
            borderRadius: 3,
            overflow: "hidden",
            border: `1px solid ${LANDING_COLORS.border}`,
          }}
        >
          <Image
            src="/landing/booking-flow.png"
            alt={t("bookingFlowImageAlt")}
            fill
            sizes="(max-width: 1200px) 95vw, 1100px"
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Container>
    </Box>
  );
}
