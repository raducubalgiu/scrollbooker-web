"use client";

import { alpha, Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";

type BookingMode = {
  badge: string;
  title: string;
  description: string;
  steps: string[];
  fit: string;
};

const MODE_ICONS = [BoltRoundedIcon, WhatsAppIcon];
const NOTE_ICONS = [TuneRoundedIcon, PaymentsRoundedIcon];

export default function ForBusinessBookingModes() {
  const t = useTranslations("forBusinessBookingModes");
  const { palette } = useTheme();
  const modes = t.raw("modes") as BookingMode[];
  const notes = t.raw("notes") as string[];
  const modeColors = [palette.primary.main, palette.whatsapp.dark];

  return (
    <Box
      id="instant-booking"
      component="section"
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 6, maxWidth: 720 }}>
          <Typography
            variant="overline"
            sx={{
              color: palette.primary.main,
              fontWeight: 700,
              letterSpacing: 1.5,
            }}
          >
            {t("kicker")}
          </Typography>
          <Typography variant="h2" sx={{ color: palette.text.primary, fontWeight: 900, letterSpacing: "-0.03em" }}>
            {t("title")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: palette.text.secondary, fontSize: "1.1rem" }}
          >
            {t("subtitle")}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          }}
        >
          {modes.map((mode, index) => {
            const Icon = MODE_ICONS[index] ?? BoltRoundedIcon;
            const color = modeColors[index] ?? palette.primary.main;

            return (
              <Stack
                key={mode.badge}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  border: `1px solid ${index === 0 ? alpha(color, 0.45) : palette.divider}`,
                  backgroundColor:
                    index === 0 ? alpha(color, 0.04) : palette.surface.main,
                }}
              >
                <Box
                  sx={{
                    alignSelf: "flex-start",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                    px: 1.5,
                    py: 0.5,
                    mb: 2.5,
                    borderRadius: 50,
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color,
                    backgroundColor: alpha(color, 0.12),
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                  {mode.badge}
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    color: palette.text.primary,
                    fontSize: { xs: "1.35rem", md: "1.6rem" },
                    fontWeight: 800,
                    mb: 1,
                  }}
                >
                  {mode.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: palette.text.secondary,
                    lineHeight: 1.7,
                    mb: 3,
                  }}
                >
                  {mode.description}
                </Typography>

                <Stack spacing={1.5} sx={{ mb: 3 }}>
                  {mode.steps.map((step, stepIndex) => (
                    <Stack
                      key={step}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                    >
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          color: palette.common.white,
                          backgroundColor: color,
                        }}
                      >
                        {stepIndex + 1}
                      </Box>
                      <Typography
                        sx={{
                          color: palette.text.primary,
                          fontWeight: 600,
                        }}
                      >
                        {step}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                <Stack
                  direction="row"
                  spacing={1.25}
                  sx={{
                    mt: "auto",
                    pt: 2.5,
                    borderTop: `1px solid ${palette.divider}`,
                  }}
                >
                  <CheckCircleRoundedIcon
                    sx={{ fontSize: 20, color, mt: "2px" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {mode.fit}
                  </Typography>
                </Stack>
              </Stack>
            );
          })}
        </Box>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1.5, md: 4 }}
          sx={{ mt: 4 }}
        >
          {notes.map((note, index) => {
            const Icon = NOTE_ICONS[index] ?? TuneRoundedIcon;

            return (
              <Stack
                key={note}
                direction="row"
                spacing={1.25}
                alignItems="center"
              >
                <Icon
                  sx={{ fontSize: 20, color: palette.text.secondary }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: palette.text.secondary }}
                >
                  {note}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
