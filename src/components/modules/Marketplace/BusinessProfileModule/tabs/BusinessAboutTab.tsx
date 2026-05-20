import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import Image from "next/image";
import SchedulesSection from "@/components/cutomized/SchedulesSection/SchedulesSection";
import { getGoogleMapsDirectionsUrl } from "@/utils/get-google-maps-directions";

type BusinessAboutTabProps = {
  profile: BusinessProfile;
  id: string;
  innerRef: (element: HTMLDivElement | null) => void;
};

const BusinessAboutTab = ({ profile, id, innerRef }: BusinessAboutTabProps) => {
  const mapsUrl = getGoogleMapsDirectionsUrl(profile.location.coordinates);
  const hasMapImage = !!profile.location.map_url;

  return (
    <Box id={id} ref={innerRef} sx={{ minHeight: "500px" }}>
      <Typography variant="h3" fontWeight={600} gutterBottom mb={2.5}>
        Despre
      </Typography>

      <Typography mb={2.5} fontWeight={400} variant="h6">
        {profile.description}
      </Typography>

      {hasMapImage && (
        <Box
          component="a"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "block",
            position: "relative",
            width: "100%",
            aspectRatio: { xs: "1.5/1", md: "2.5/1" },
            borderRadius: 4,
            overflow: "hidden",
            bgcolor: "action.hover",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Image
            src={profile.location.map_url!}
            alt={`Hartă locație ${profile.owner.fullname}`}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 70vw, 800px"
            style={{
              objectFit: "cover",
            }}
            priority={false}
          />
        </Box>
      )}

      <Typography mt={1.5} mb={5} fontSize={18}>
        {profile.location.formatted_address}
      </Typography>

      <Typography variant="h4" fontWeight={600} mt={5} mb={2.5}>
        Programul de lucru
      </Typography>

      <SchedulesSection schedules={profile.schedules} />
    </Box>
  );
};

export default memo(BusinessAboutTab);
