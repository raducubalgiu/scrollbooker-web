import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import SchedulesSection from "@/components/cutomized/SchedulesSection/SchedulesSection";
import ProfileInfoLocationSection from "../../ProfileModule/tabs/info/ProfileInfoLocationSection";

type BusinessAboutTabProps = {
  profile: BusinessProfile;
  id: string;
  innerRef: (element: HTMLDivElement | null) => void;
};

const BusinessAboutTab = ({ profile, id, innerRef }: BusinessAboutTabProps) => {
  return (
    <Box id={id} ref={innerRef} sx={{ minHeight: { xs: "auto", md: "500px" } }}>
      <Typography variant="h4" fontWeight={700} gutterBottom mb={2.5}>
        Despre
      </Typography>

      <Typography
        mb={3}
        fontWeight={400}
        variant="body1"
        sx={{ fontSize: { xs: "1rem", md: "1.25rem" }, lineHeight: 1.6 }}
      >
        {profile.description}
      </Typography>

      {profile.location && (
        <ProfileInfoLocationSection location={profile.location} />
      )}

      <Typography
        mt={2}
        mb={{ xs: 4, md: 5 }}
        sx={{ fontSize: { xs: 15, md: 18 }, color: "text.secondary" }}
      >
        {profile.location.formatted_address}
      </Typography>

      <Typography variant="h4" fontWeight={700} mb={2.5}>
        Programul de lucru
      </Typography>

      <SchedulesSection schedules={profile.schedules} />
    </Box>
  );
};

export default memo(BusinessAboutTab);
