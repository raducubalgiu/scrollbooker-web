"use client";

import { Box, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { AppointmentBusiness } from "@/ts/models/booking/appointment/Appointment";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

type AppointmentDetailsMapProps = {
  business: AppointmentBusiness;
};

const AppointmentDetailsMap = ({ business }: AppointmentDetailsMapProps) => {
  const { lng, lat } = business?.coordinates || {};

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${lat},${lng}`
  )}`;

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
        </Box>

        <Stack direction="row" mt={2.5} gap={2} alignItems="center">
          <FmdGoodOutlinedIcon color="primary" />
          <Box>
            <Typography color="text.secondary" variant="h6">
              {business.address}
            </Typography>

            <Typography color="primary" variant="h6" fontWeight={600}>
              Obține indicații
            </Typography>
          </Box>
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
};
