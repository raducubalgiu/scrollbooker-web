"use client";

import * as React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Box, Stack, Button, Typography, Chip } from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SearchHeader from "./SearchHeader";
import { busineses_for_map } from "./searchMockData";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import { formatRating } from "@/utils/formatters";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
const MAPBOX_STYLE_LIGHT = process.env.NEXT_PUBLIC_MAPBOX_STYLE_LIGHT ?? "";
const MAPBOX_STYLE_DARK = process.env.NEXT_PUBLIC_MAPBOX_STYLE_DARK ?? "";

export default function SearchModule() {
  const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<mapboxgl.Map | null>(null);
  const theme = useTheme();
  const mapStyle =
    theme.palette.mode === "dark" ? MAPBOX_STYLE_DARK : MAPBOX_STYLE_LIGHT;

  React.useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || !MAPBOX_TOKEN) {
      return;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [26.1025, 44.4268],
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    new mapboxgl.Marker({ color: "#ef4444" })
      .setLngLat([26.1025, 44.4268])
      .addTo(map);

    mapRef.current = map;

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [mapStyle]);

  return (
    <Box>
      <SearchHeader />

      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 5 }}
      >
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Button
            variant="contained"
            size="large"
            disableElevation
            sx={{ py: 1.5, px: 3 }}
          >
            Toate
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            disableElevation
            sx={{ py: 1.5, px: 3 }}
          >
            Beauty
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            disableElevation
            sx={{ py: 1.5, px: 3 }}
          >
            Medical
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            disableElevation
            sx={{ py: 1.5, px: 3 }}
          >
            Auto
          </Button>
        </Stack>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          gap={1}
        >
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            disableElevation
            sx={{ py: 1.5, px: 3 }}
            startIcon={<MapOutlinedIcon />}
          >
            Filtre
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            disableElevation
            sx={{ py: 1.5, px: 3 }}
            startIcon={<MapOutlinedIcon />}
          >
            Ascunde harta
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={5}>
        <Grid size={7}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 5,
              px: { xs: 1, md: 0 },
            }}
          >
            {busineses_for_map.results.map((b) => (
              <Box key={b.id} sx={{ overflow: "hidden", borderRadius: 2 }}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: 300,
                  }}
                >
                  <Image
                    src={b.media_files[0].url}
                    alt={b.owner.fullname}
                    fill
                    style={{ objectFit: "cover", borderRadius: 20 }}
                  />
                </Box>

                <Stack
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mt={1.5}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {b.owner.fullname}
                    </Typography>
                  </Box>

                  <Stack flexDirection="row" alignItems="center" gap={1}>
                    <StarIcon fontSize="small" color="primary" />
                    <Typography variant="h6" fontWeight={600}>
                      {formatRating(b.owner.ratings_average)}
                    </Typography>
                    <Typography color="text.secondary" fontWeight={400}>
                      ({100})
                    </Typography>
                  </Stack>
                </Stack>

                <Typography color="text.secondary">
                  {b.owner.profession}
                </Typography>

                <Typography
                  color="text.secondary"
                  fontWeight={400}
                  mt={1.5}
                  mb={2.5}
                >
                  {b.address}
                </Typography>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: 5,
                    mb: 1.5,
                    bgcolor: "secondary.main",
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Consultatie Standard 150 RON`}
                >
                  <Stack spacing={0.5}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        Consultatie Standard
                      </Typography>
                      <Typography sx={{ fontWeight: 700 }}>150 RON</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Chip
                        size="small"
                        icon={<AccessTimeOutlinedIcon />}
                        label="30 min"
                      />
                      <Typography variant="body2" color="text.secondary">
                        Caini & Pisici • Standard
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: 5,
                    bgcolor: "secondary.main",
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Consultatie Standard 150 RON`}
                >
                  <Stack spacing={0.5}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        Consultatie Standard
                      </Typography>
                      <Typography sx={{ fontWeight: 700 }}>150 RON</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Chip
                        size="small"
                        icon={<AccessTimeOutlinedIcon />}
                        label="30 min"
                      />
                      <Typography variant="body2" color="text.secondary">
                        Caini & Pisici • Standard
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid size={5}>
          <Box
            sx={{
              position: "sticky",
              top: { xs: 88, md: 88 },
              height: "80vh",
            }}
          >
            <Box
              ref={mapContainerRef}
              sx={{ width: "100%", height: "75vh", borderRadius: 5 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
