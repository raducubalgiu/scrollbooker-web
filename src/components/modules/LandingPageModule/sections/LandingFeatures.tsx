"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import { LANDING_COLORS } from "../landing.constants";

const FEATURES = [
  {
    icon: GroupsRoundedIcon,
    title: "Comunitate, nu doar clienți",
    description:
      "Like-uri, comentarii, distribuiri, urmăritori — fiecare interacțiune te aduce în fața a tot mai mulți oameni noi, ca pe orice rețea socială.",
  },
  {
    icon: CalendarMonthRoundedIcon,
    title: "Programări online, 24/7",
    description:
      "Clienții rezervă direct din videoclip, oricând, fără telefoane sau mesaje. Calendarul tău se actualizează automat, în timp real.",
  },
  {
    icon: DashboardCustomizeRoundedIcon,
    title: "Administrare completă",
    description:
      "Calendar, servicii, produse, program de lucru și angajați — toate într-un singur panou, indiferent dacă lucrezi singur sau cu o echipă.",
  },
  {
    icon: VideocamRoundedIcon,
    title: "Recenzii video = reclamă gratuită",
    description:
      "Clienții tăi mulțumiți postează chiar ei clipuri video-review — conținut real, care circulă în feed-ul altora și îți aduce clienți noi, fără cost.",
  },
];

export default function LandingFeatures() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 6, maxWidth: 640 }}>
          <Typography
            variant="overline"
            sx={{ color: LANDING_COLORS.primary, fontWeight: 700, letterSpacing: 1.5 }}
          >
            De ce ScrollBooker
          </Typography>
          <Typography variant="h2" sx={{ color: LANDING_COLORS.textPrimary }}>
            Tot ce îți trebuie ca să crești, într-o singură aplicație
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {FEATURES.map((feature) => (
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
                  <feature.icon fontSize="small" />
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
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
