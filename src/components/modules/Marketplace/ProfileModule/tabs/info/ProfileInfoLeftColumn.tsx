import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { BusinessLocation } from "@/ts/models/booking/business/BusinessProfile";
import { BusinessMediaFile } from "@/ts/models/booking/business/BusinessMediaFile";
import ProfileInfoLocationSection from "./ProfileInfoLocationSection";
import ProfileInfoGallery from "./ProfileInfoGallery";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

type ProfileInfoLeftColumnProps = {
  description: string | null;
  location: BusinessLocation | null;
  businessMedia: BusinessMediaFile[];
};

const ProfileInfoLeftColumn = ({
  description,
  location,
  businessMedia,
}: ProfileInfoLeftColumnProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h6" fontWeight="800" mb={2}>
            Adresa
          </Typography>

          <Stack flexDirection="row" alignItems="center" gap={1}>
            <FmdGoodOutlinedIcon />
            <Typography>{location?.address}</Typography>
          </Stack>
        </Box>

        <Box>
          <Typography variant="h6" fontWeight="800" mb={2}>
            Descriere
          </Typography>

          <Typography>
            {description ||
              "Nu există o descriere disponibilă pentru acest profil."}
          </Typography>
        </Box>

        {location && <ProfileInfoLocationSection location={location} />}

        <ProfileInfoGallery businessMedia={businessMedia} />
      </Stack>
    </Box>
  );
};

export default ProfileInfoLeftColumn;
