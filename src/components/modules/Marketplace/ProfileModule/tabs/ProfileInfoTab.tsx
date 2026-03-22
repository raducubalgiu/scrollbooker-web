import { useCustomQuery } from "@/hooks/useHttp";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import React, { memo } from "react";
import { UserProfileInfoResponse } from "@/ts/models/user/UserProfileInfo";
import SchedulesSection from "@/components/cutomized/SchedulesSection/SchedulesSection";
import Image from "next/image";

type ProfileInfoTabProps = {
  userId: number;
};

const ProfileInfoTab = ({ userId }: ProfileInfoTabProps) => {
  const { data, isLoading, isRefetching } =
    useCustomQuery<UserProfileInfoResponse>({
      key: ["profile-info"],
      url: `/api/profile/info?userId=${userId}`,
      options: {
        enabled: !!userId,
      },
    });

  const { location, description, schedules } = data || {};

  return (
    <>
      {isLoading ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 10, width: "100%" }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Box maxWidth="md" sx={{ py: 2 }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Descrierea locatiei
          </Typography>
          <Typography variant="body1">
            {description || "Acest utilizator nu a adăugat o descriere."}
          </Typography>

          <Typography variant="h6" gutterBottom fontWeight={600} mt={4}>
            Programul de lucru
          </Typography>

          <SchedulesSection schedules={schedules || []} />

          <Typography variant="h6" gutterBottom fontWeight={600} mt={4}>
            Adresa locatiei
          </Typography>

          <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
            <LocationOnOutlinedIcon />
            <Typography variant="body1" ml={1}>
              {location?.formatted_address || "Adresă necunoscută"}
            </Typography>
          </Stack>

          {location?.map_url && (
            <Image
              src={location.map_url}
              alt="Map"
              layout="responsive"
              width={500}
              height={300}
              style={{ borderRadius: 20 }}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default memo(ProfileInfoTab);
