import UserAvatar from "@/components/core/Layout/Admin/UserInfo/UserAvatar";
import { Box, Button, Stack, Typography } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import React from "react";
import { OpeningHoursType } from "@/ts/models/user/UserProfileType";

type ProfileUserInfoProps = {
  fullname: string;
  username: string;
  avatar?: string | undefined;
  profession: string;
  ratings_average: number;
  is_business_or_employee: boolean;
  opening_hours: OpeningHoursType;
};

const ProfileUserInfo = ({
  fullname,
  username,
  avatar,
  profession,
  ratings_average,
  is_business_or_employee,
  opening_hours,
}: ProfileUserInfoProps) => {
  return (
    <Stack flexDirection="row" alignItems="center">
      <UserAvatar
        isBusinessOrEmployee={is_business_or_employee}
        openNow={opening_hours.open_now}
        url={avatar}
        small={false}
        defaultSize={250}
        badgeSize={25}
      />

      <Box sx={{ ml: 3 }}>
        <Stack flexDirection="row" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 600, fontSize: 28 }}>
            {fullname}
          </Typography>
          <Typography variant="body1" sx={{ ml: 1.5, color: "text.secondary" }}>
            @{username}
          </Typography>
        </Stack>

        <Stack flexDirection="row" alignItems="center">
          <Typography
            variant="subtitle1"
            sx={{ mr: 1.5, color: "text.secondary" }}
          >
            {profession}
          </Typography>
          {is_business_or_employee && (
            <>
              <Stack flexDirection="row" alignItems="center">
                <GradeIcon color="primary" sx={{ fontSize: 30, mr: 0.5 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 25 }}>
                  {ratings_average}
                </Typography>
              </Stack>

              <Typography
                sx={{ mx: 1.5, fontSize: 25, color: "text.secondary" }}
              >
                &#x2022;
              </Typography>

              <Stack flexDirection="row" alignItems="center">
                <QueryBuilderOutlinedIcon
                  color="action"
                  sx={{ fontSize: 25, mr: 0.5 }}
                />
                <Typography sx={{ ml: 0.5, mr: 1 }} fontWeight={600}>
                  Inchide la {opening_hours.closing_time}
                </Typography>
                <ExpandMoreOutlinedIcon
                  color="action"
                  sx={{ fontSize: 30, mr: 0.5 }}
                />
              </Stack>
            </>
          )}
        </Stack>

        <Stack flexDirection="row" alignItems="center" sx={{ mt: 1.5 }}>
          <Button
            variant="contained"
            onClick={() => {}}
            size="large"
            disableElevation
            sx={{ mr: 1.5, textTransform: "capitalize" }}
          >
            Urmareste
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {}}
            size="large"
            disableElevation
            startIcon={<DateRangeOutlinedIcon />}
            sx={{ textTransform: "capitalize" }}
          >
            Calendar
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ProfileUserInfo;
