"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLandingColors } from "../LandingThemeContext";

const IMAGE_SOURCES = [
  "https://images.unsplash.com/photo-1641318175316-795cd2db99f8?fm=jpg&q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1780504542428-897e4a4a22f2?fm=jpg&q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?fm=jpg&q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1688583417757-9060cba25399?fm=jpg&q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?fm=jpg&q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?fm=jpg&q=80&w=900&auto=format&fit=crop",
];

type GalleryItem = { label: string; alt: string };

export default function LandingGallery() {
  const t = useTranslations("gallery");
  const LANDING_COLORS = useLandingColors();
  const items = t.raw("items") as GalleryItem[];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 6, maxWidth: 640 }}>
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
          {items.map((item, index) => (
            <Grid key={item.label} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  border: `1px solid ${LANDING_COLORS.border}`,
                  aspectRatio: "4 / 3",
                }}
              >
                <Image
                  src={IMAGE_SOURCES[index]!}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 600px) 90vw, (max-width: 900px) 46vw, 30vw"
                  style={{ objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.7) 100%)",
                  }}
                />
                <Typography
                  sx={{
                    position: "absolute",
                    left: 20,
                    bottom: 18,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
