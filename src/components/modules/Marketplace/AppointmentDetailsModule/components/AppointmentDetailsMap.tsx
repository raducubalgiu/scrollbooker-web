"use client";

import { Box, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { AppointmentBusiness } from "@/ts/models/booking/appointment/Appointment";
import { getGoogleMapsDirectionsUrl } from "@/utils/get-google-maps-directions";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";

type AppointmentDetailsMapProps = {
  business: AppointmentBusiness;
};

const AppointmentDetailsMap = ({ business }: AppointmentDetailsMapProps) => {
  const mapsUrl = getGoogleMapsDirectionsUrl(business?.coordinates);
  const hasImage = !!business.map_url;

  return (
    <Link
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
      prefetch={false}
      onClick={(e) => e.stopPropagation()}
    >
      <Paper sx={styles.container}>
        <Box sx={styles.imageContainer}>
          <Image
            src={business.map_url || "/placeholder.jpg"}
            alt="Locație Business"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: "cover", borderRadius: 15 }}
          />
          {hasImage ? (
            <Image
              src={business.map_url || "/placeholder.jpg"}
              alt="Locație Business"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover", borderRadius: 15 }}
            />
          ) : (
            <Box sx={styles.placeholderContainer}>
              <InsertPhotoOutlinedIcon sx={{ fontSize: 40, opacity: 0.7 }} />
              <Typography variant="body2" fontWeight={500}>
                Momentan nu există fotografii
              </Typography>
            </Box>
          )}
        </Box>

        <Stack mt={2.5} gap={1}>
          <Typography color="text.secondary" variant="h6">
            {business.address}
          </Typography>

          <Typography color="primary" variant="h6" fontWeight={600}>
            Obține indicații
          </Typography>
        </Stack>
      </Paper>
    </Link>
  );
};

export default AppointmentDetailsMap;

const styles = {
  container: {
    position: { xs: "relative", md: "sticky" },
    top: { md: 24 },
    overflow: "hidden",
    p: { md: 3 },
    borderRadius: 5,
    cursor: "pointer",
    boxShadow: { xs: "none", md: "0px 5px 16px rgba(0,0,0,0.1)" },

    "&:hover": {
      boxShadow: "0px 10px 35px rgba(0,0,0,0.1)",
      borderColor: "primary.main",
    },
  },
  imageContainer: {
    position: "relative",
    height: { xs: 250, md: 400 },
    width: "100%",
  },
  placeholderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    gap: 1,
    color: "text.disabled",
    p: 2,
    textAlign: "center",
  },
};
