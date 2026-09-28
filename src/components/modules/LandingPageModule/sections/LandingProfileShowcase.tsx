"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import ReviewsRoundedIcon from "@mui/icons-material/ReviewsRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { LANDING_COLORS } from "../landing.constants";
import PhoneMockup from "../components/PhoneMockup";

const PROFILE_ITEMS = [
  {
    icon: PeopleAltRoundedIcon,
    title: "Urmăritori, nu doar clienți vechi",
    description:
      "Oricine te apreciază te poate urmări — vede conținutul tău nou primul, chiar dacă nu are încă o programare în plan.",
  },
  {
    icon: VideoLibraryRoundedIcon,
    title: "Un portofoliu video, nu poze statice",
    description:
      "Fiecare lucrare postată rămâne pe profil — clienții noi văd exact ce știi să faci, nu doar o descriere.",
  },
  {
    icon: ReviewsRoundedIcon,
    title: "Recenzii care se văd, nu doar se citesc",
    description:
      "Scorul și numărul de recenzii apar direct pe profil, alături de conținutul care le-a generat.",
  },
  {
    icon: StorefrontRoundedIcon,
    title: "Legătura cu afacerea, vizibilă clar",
    description:
      "Dacă ești angajat, profilul tău arată direct cu ce business lucrezi — clienții rezervă cu tine, știind exact unde.",
  },
];

export default function LandingProfileShowcase() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 8 }}
          alignItems="center"
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="overline"
              sx={{ color: LANDING_COLORS.primary, fontWeight: 700, letterSpacing: 1.5 }}
            >
              Pentru profilul tău
            </Typography>
            <Typography
              variant="h2"
              sx={{ color: LANDING_COLORS.textPrimary, mt: 1.5, mb: 2 }}
            >
              Profilul tău devine o comunitate, nu doar o listă de servicii
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: LANDING_COLORS.textSecondary, mb: 4, lineHeight: 1.7 }}
            >
              Ca pe orice rețea socială — doar că de aici se și rezervă direct,
              fără să schimbi aplicația.
            </Typography>

            <Stack spacing={2.5}>
              {PROFILE_ITEMS.map((item) => (
                <Stack key={item.title} direction="row" spacing={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      color: LANDING_COLORS.primary,
                      flexShrink: 0,
                    }}
                  >
                    <item.icon fontSize="small" />
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
              ))}
            </Stack>
          </Box>

          <Box sx={{ flex: 1, width: "100%" }}>
            <PhoneMockup
              src="/landing/profile-screen.png"
              alt="Profil de business în ScrollBooker, cu urmăritori, recenzii și portofoliu video"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
