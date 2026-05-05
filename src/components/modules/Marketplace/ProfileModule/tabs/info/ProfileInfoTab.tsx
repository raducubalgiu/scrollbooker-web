import { useCustomQuery } from "@/hooks/useHttp";
import { Box, CircularProgress, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { memo } from "react";
import { UserProfileAbout } from "@/ts/models/user/UserProfileAbout";
import ProfileInfoRightColumn from "./ProfileInfoRightColumn";
import ProfileInfoLeftColumn from "./ProfileInfoLeftColumn";

type ProfileInfoTabProps = {
  userId: number;
};

const ProfileInfoTab = ({ userId }: ProfileInfoTabProps) => {
  const { data, isLoading } = useCustomQuery<UserProfileAbout>({
    key: ["profile-info"],
    url: `/api/profile/info?userId=${userId}`,
    options: {
      enabled: !!userId,
    },
  });

  return (
    <>
      {isLoading && (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 10, width: "100%" }}
        >
          <CircularProgress />
        </Stack>
      )}
      {!isLoading && data && (
        <Box sx={{ p: { xs: 2, md: 4 }, mx: "auto" }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 7, lg: 8 }}>
              <ProfileInfoLeftColumn
                description={data.description}
                location={data.location}
                businessMedia={data.business_media}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 5, lg: 4 }}>
              <ProfileInfoRightColumn
                owner={data.owner}
                schedules={data.schedules}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default memo(ProfileInfoTab);
