"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ContentCutRoundedIcon from "@mui/icons-material/ContentCutRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import { LANDING_COLORS } from "../landing.constants";

const ADMIN_ITEMS = [
  {
    icon: CalendarMonthRoundedIcon,
    title: "Calendar",
    description:
      "Un calendar propriu per angajat, sau unul singur dacă lucrezi pe cont propriu — mereu sincronizat.",
  },
  {
    icon: ContentCutRoundedIcon,
    title: "Servicii & program",
    description: "Definești serviciile oferite, durata și orele de funcționare.",
  },
  {
    icon: Inventory2RoundedIcon,
    title: "Produse",
    description: "Administrezi produsele/pachetele pe care le vinzi clienților.",
  },
  {
    icon: GroupsRoundedIcon,
    title: "Angajați",
    description:
      "Îți inviți echipa în aplicație — fiecare cu propriul calendar și propriile programări.",
  },
  {
    icon: QueryStatsRoundedIcon,
    title: "Statistici",
    description: "Vezi dintr-o privire cum evoluează afacerea ta în timp.",
  },
];

export default function LandingAdminShowcase() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 8 }}
          alignItems="center"
        >
          <Box
            sx={{
              flex: 1,
              width: "100%",
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              border: `1px solid ${LANDING_COLORS.border}`,
              aspectRatio: "4 / 3",
              order: { xs: 1, md: 0 },
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1746723375184-5f537d2e6f31?fm=jpg&q=80&w=1200&auto=format&fit=crop"
              alt="Interior de salon modern, cu un dispozitiv de administrare pe recepție"
              fill
              sizes="(max-width: 900px) 90vw, 560px"
              style={{ objectFit: "cover" }}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="overline"
              sx={{ color: LANDING_COLORS.primary, fontWeight: 700, letterSpacing: 1.5 }}
            >
              Pentru echipa ta
            </Typography>
            <Typography
              variant="h2"
              sx={{ color: LANDING_COLORS.textPrimary, mt: 1.5, mb: 2 }}
            >
              Nu doar rezervări — administrarea completă a afacerii
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: LANDING_COLORS.textSecondary, mb: 4, lineHeight: 1.7 }}
            >
              Fie că lucrezi singur, fie că ai o echipă întreagă, ScrollBooker
              îți pune la dispoziție toate uneltele de care ai nevoie zi de zi,
              nu doar vitrina din fața clienților.
            </Typography>

            <Stack spacing={2.5}>
              {ADMIN_ITEMS.map((item) => (
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
        </Stack>
      </Container>
    </Box>
  );
}
