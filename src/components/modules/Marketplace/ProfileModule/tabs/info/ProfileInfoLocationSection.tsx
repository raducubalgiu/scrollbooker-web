import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { LocationInfo } from "@/ts/models/user/UserProfileAbout";

type ProfileInfoLocationSectionProps = {
  location: LocationInfo;
};

const ProfileInfoLocationSection = ({
  location,
}: ProfileInfoLocationSectionProps) => {
  const { lng, lat } = location?.coordinates || {};

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${lat},${lng}`
  )}`;

  return (
    <Box>
      <Typography variant="h6" fontWeight="800" mb={2}>
        Locație și Adresă
      </Typography>
      <Link href={mapsUrl} target="_blank" rel="noopener noreferrer">
        <Paper elevation={0} sx={styles.paper}>
          <Box sx={styles.imageContainer}>
            <Image
              src={location?.map_url ?? ""}
              alt={`Harta locației din ${location?.formatted_address}`}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </Box>
          <Box sx={styles.addressContainer}>
            <FmdGoodOutlinedIcon />
            <Typography fontWeight="500">
              {location?.formatted_address}
            </Typography>
          </Box>
        </Paper>
      </Link>
    </Box>
  );
};

export default ProfileInfoLocationSection;

const styles = {
  paper: {
    borderRadius: 4,
    overflow: "hidden",
    border: "1px solid",
    borderColor: "divider",
    position: "relative",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 400,
  },
  addressContainer: {
    p: 2,
    display: "flex",
    alignItems: "center",
    gap: 1,
    bgcolor: "background.paper",
  },
};
