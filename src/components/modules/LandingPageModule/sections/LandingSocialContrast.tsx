"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { LANDING_COLORS } from "../landing.constants";

const OLD_WAY = [
  "O listă statică de afaceri, sortată sau filtrată",
  "Cauți activ, doar când ai deja nevoie de o programare",
  "Recenzii = text și un scor, atât",
  "Zero motiv să mai deschizi aplicația între două programări",
];

const NEW_WAY = [
  "Feed video vertical, ca pe TikTok — descoperi organic, nu doar cauți",
  "Urmărești afacerile care îți plac, le vezi conținutul nou în feed",
  "Aprecieri, comentarii, distribuiri — se formează o comunitate reală",
  "Recenziile sunt clipuri video, nu doar stele — dovadă reală, care circulă ca reclamă organică pentru tine",
  "Rezervare instant, direct din videoclip, fără să ieși din aplicație",
];

export default function LandingSocialContrast() {
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
            De ce nu e doar o aplicație de programări
          </Typography>
          <Typography variant="h2" sx={{ color: LANDING_COLORS.textPrimary }}>
            Interacțiunea unei rețele sociale, cu rezervare instant inclusă
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
                  color: "rgba(255,255,255,0.45)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                }}
              >
                O aplicație de programări obișnuită
              </Typography>

              {OLD_WAY.map((item) => (
                <Stack key={item} direction="row" spacing={1.5}>
                  <CloseRoundedIcon
                    fontSize="small"
                    sx={{ color: "rgba(255,255,255,0.3)", mt: 0.2, flexShrink: 0 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}
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
                ScrollBooker
              </Typography>

              {NEW_WAY.map((item) => (
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
