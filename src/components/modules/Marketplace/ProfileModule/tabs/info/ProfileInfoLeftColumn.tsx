import { Box, Typography } from "@mui/material";
import React from "react";
import { LocationInfo } from "@/ts/models/user/UserProfileAbout";
import { BusinessMediaFile } from "@/ts/models/booking/business/BusinessMediaFile";
import ProfileInfoLocationSection from "./ProfileInfoLocationSection";
import ProfileInfoGallery from "./ProfileInfoGallery";

type ProfileInfoLeftColumnProps = {
  description: string | null;
  location: LocationInfo;
  businessMedia: BusinessMediaFile[];
};

const ProfileInfoLeftColumn = ({
  description,
  location,
  businessMedia,
}: ProfileInfoLeftColumnProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box>
        <Typography variant="h6" fontWeight="800" mb={2}>
          Despre Business
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            lineHeight: 1.8,
            fontSize: "1.1rem",
            whiteSpace: "pre-line",
          }}
        >
          {description ||
            "Nu există o descriere disponibilă pentru acest profil."}
        </Typography>
      </Box>

      <ProfileInfoLocationSection location={location} />
      <ProfileInfoGallery businessMedia={businessMedia} />
    </Box>
  );
};

export default ProfileInfoLeftColumn;
