import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
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
      <Typography variant="h4" fontWeight={600} gutterBottom mb={2.5}>
        Despre
      </Typography>

      <Typography mb={2.5}>
        Adara Spa is more than a place. It is an experience, a journey, a
        ceremony. It is the perfect space to enjoy peace and serenity and to
        refresh your mind, body and soul. Adara Spa treatments will surrender
        your senses from head to toe, taking your body through a journey of
        exfoliation, numerous types of massages, Oriental Hammam, Foot
        Reflexology and other techniques that will leave your body and mind in
        perfect equilibrium.
      </Typography>

      <Image
        src={profile.location.map_url ?? ""}
        alt=""
        height={600}
        width={1200}
        style={{
          borderRadius: 15,
          objectFit: "cover",
        }}
      />

      <Grid container spacing={5} mt={5}>
        <Grid size={6}>
          <Typography variant="h5" fontWeight={600} mt={5} mb={2.5}>
            Programul de lucru
          </Typography>

          <SchedulesSection schedules={profile.schedules} />
        </Grid>
        <Grid size={6}>
          <Typography variant="h5" fontWeight={600} mt={5} mb={2.5}>
            Altceva
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(BusinessAboutTab);
