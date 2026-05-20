import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import Image from "next/image";
import SchedulesSection from "@/components/cutomized/SchedulesSection/SchedulesSection";

type BusinessAboutTabProps = {
  profile: BusinessProfile;
  id: string;
  innerRef: (element: HTMLDivElement | null) => void;
};

const BusinessAboutTab = ({ profile, id, innerRef }: BusinessAboutTabProps) => {
  return (
    <Box id={id} ref={innerRef} sx={{ minHeight: "500px" }}>
      <Typography variant="h3" fontWeight={600} gutterBottom mb={2.5}>
        Despre
      </Typography>

      <Typography mb={2.5} fontWeight={400} variant="h6">
        {profile.description}
      </Typography>

      <Image
        src={profile.location.map_url ?? ""}
        alt=""
        height={400}
        width={1200}
        style={{
          borderRadius: 15,
          objectFit: "cover",
        }}
      />

      <Typography variant="h4" fontWeight={600} mt={5} mb={2.5}>
        Programul de lucru
      </Typography>

      <SchedulesSection schedules={profile.schedules} />
    </Box>
  );
};

export default memo(BusinessAboutTab);
