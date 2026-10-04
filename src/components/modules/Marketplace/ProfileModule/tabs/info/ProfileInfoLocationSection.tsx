import { Box } from "@mui/material";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { BusinessLocation } from "@/ts/models/booking/business/BusinessProfile";
import { getGoogleMapsDirectionsUrl } from "@/utils/get-google-maps-directions";

type ProfileInfoLocationSectionProps = {
  location: BusinessLocation;
};

const ProfileInfoLocationSection = ({
  location,
}: ProfileInfoLocationSectionProps) => {
  const mapsUrl = getGoogleMapsDirectionsUrl(location.coordinates);

  return (
    <Link
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box sx={styles.imageContainer}>
        <Image
          src={location.map_url ?? ""}
          alt={`Harta locației din ${location.formatted_address}`}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </Box>
    </Link>
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
