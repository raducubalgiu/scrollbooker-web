"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { LANDING_COLORS } from "../landing.constants";

const STEPS = [
  {
    number: "01",
    title: "Te înregistrezi",
    description:
      "Completezi datele afacerii tale — durează câteva minute, direct din browser, fără instalare de aplicație.",
  },
  {
    number: "02",
    title: "Îți configurezi profilul",
    description:
      "Adaugi galerie foto, serviciile și produsele oferite, programul de lucru și, dacă e cazul, angajații tăi.",
  },
  {
    number: "03",
    title: "Primești programări",
    description:
      "După aprobare, profilul tău devine vizibil în aplicație — clienții te descoperă și rezervă direct.",
  },
];

export default function LandingHowItWorks() {
  return (
    <Box
      id="cum-functioneaza"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: LANDING_COLORS.surface,
        borderTop: `1px solid ${LANDING_COLORS.border}`,
        borderBottom: `1px solid ${LANDING_COLORS.border}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 6, maxWidth: 640 }}>
          <Typography
            variant="overline"
            sx={{ color: LANDING_COLORS.primary, fontWeight: 700, letterSpacing: 1.5 }}
          >
            Cum funcționează
          </Typography>
          <Typography variant="h2" sx={{ color: LANDING_COLORS.textPrimary }}>
            De la înregistrare la prima programare
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          {STEPS.map((step, index) => (
            <Grid key={step.number} size={{ xs: 12, md: 4 }}>
              <Stack spacing={2}>
                <Typography
                  sx={{
                    fontSize: "2.75rem",
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.12)",
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: LANDING_COLORS.textPrimary }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: LANDING_COLORS.textSecondary, lineHeight: 1.7 }}
                >
                  {step.description}
                </Typography>
              </Stack>

              {index < STEPS.length - 1 && (
                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    height: 1,
                    mt: 4,
                    background: `linear-gradient(90deg, ${LANDING_COLORS.border}, transparent)`,
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: { xs: 8, md: 10 } }}>
          <Stack spacing={1.5} sx={{ mb: 4, maxWidth: 640 }}>
            <Typography
              variant="overline"
              sx={{ color: LANDING_COLORS.primary, fontWeight: 700, letterSpacing: 1.5 }}
            >
              Iar clienții tăi
            </Typography>
            <Typography variant="h3" sx={{ color: LANDING_COLORS.textPrimary }}>
              Rezervă la fel de simplu — direct dintr-un videoclip
            </Typography>
          </Stack>

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
              alt="Flux de rezervare direct dintr-o postare video: vezi un look în feed, alegi serviciul, alegi ora, confirmi rezervarea"
              fill
              sizes="(max-width: 1200px) 95vw, 1100px"
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
