import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";

type NearbyBusinessItem = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  ratingAverage: number;
  ratingCount: number;
  distanceText: string; // ex: "la 1.2 km distanță" sau "București (0.5 km)"
  categoryName: string;
};

type NearbyBusinessesProps = {
  profile: BusinessProfile;
};

const NearbyBusinesses = ({ profile }: NearbyBusinessesProps) => {
  const DUMMY_NEARBY_BUSINESSES: NearbyBusinessItem[] = [
    {
      id: "near-1",
      slug: "glow-up-salon",
      name: "Glow Up Beauty Lounge",
      imageUrl: profile.media_files[0]?.thumbnail_url ?? "",
      ratingAverage: 4.9,
      ratingCount: 142,
      distanceText: "la 0.4 km distanță",
      categoryName: "Salon de înfrumusețare",
    },
    {
      id: "near-2",
      slug: "zen-dental-clinic",
      name: "ZenDental Clinic",
      imageUrl: profile.media_files[0]?.thumbnail_url ?? "",
      ratingAverage: 4.8,
      ratingCount: 89,
      distanceText: "la 1.1 km distanță",
      categoryName: "Clinicst stomatologică",
    },
    {
      id: "near-3",
      slug: "iron-gym-fitness",
      name: "Iron Gym & Fitness",
      imageUrl: profile.media_files[0]?.thumbnail_url ?? "",
      ratingAverage: 4.7,
      ratingCount: 210,
      distanceText: "la 1.8 km distanță",
      categoryName: "Sală de fitness",
    },
    {
      id: "near-4",
      slug: "urban-barber-shop",
      name: "The Urban Barber Shop",
      imageUrl: profile.media_files[0]?.thumbnail_url ?? "",
      ratingAverage: 5.0,
      ratingCount: 64,
      distanceText: "la 2.3 km distanță",
      categoryName: "Frizerie / Barber Shop",
    },
  ];

  return (
    <Box sx={{ py: 4, borderTop: "1px solid", borderColor: "divider", mt: 5 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Alte business-uri în apropiere
      </Typography>

      {/* Container flexibil: listă verticală pe ecrane mici, grid aerisit pe desktop */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
          },
          gap: 3,
        }}
      >
        {DUMMY_NEARBY_BUSINESSES.map((item) => (
          <Box
            key={item.id}
            component={Link}
            href={`/business/${item.slug}`}
            sx={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              "&:hover .business-image": {
                transform: "scale(1.02)",
              },
            }}
          >
            {/* Zona imaginii în format pur landscape */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                // Forțează un format dreptunghiular perfect (ex: 4:3 sau 16:10 ca pe Airbnb)
                aspectRatio: "1.4/1",
                borderRadius: 4,
                overflow: "hidden",
                bgcolor: "action.hover",
              }}
            >
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
                className="business-image"
                style={{
                  objectFit: "cover",
                  transition: "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              />
            </Box>

            {/* Secțiunea de detalii (text) */}
            <Box sx={{ px: 0.5 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
              >
                {/* Numele afacerii */}
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  noWrap
                  sx={{ color: "text.primary", fontSize: 17 }}
                >
                  {item.name}
                </Typography>

                {/* Rating în stil Airbnb (Stea + text pe un singur rând) */}
                <Stack direction="row" alignItems="center" spacing={0.3}>
                  <StarRoundedIcon
                    sx={{ fontSize: 18, color: "text.primary" }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="text.primary"
                  >
                    {item.ratingAverage.toFixed(1)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ({item.ratingCount})
                  </Typography>
                </Stack>
              </Stack>

              {/* Categorie / Detalii secundare */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5, fontWeight: 400 }}
              >
                {item.categoryName}
              </Typography>

              {/* Distanța fizică */}
              <Typography
                variant="body2"
                color="text.primary"
                fontWeight={500}
                sx={{ mt: 0.25 }}
              >
                {item.distanceText}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default NearbyBusinesses;
