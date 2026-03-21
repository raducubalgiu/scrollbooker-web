import UserAvatar from "@/components/core/Layout/Admin/UserInfo/UserAvatar";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import React, { useMemo } from "react";
import { OpeningHoursType } from "@/ts/models/user/UserProfileType";
import OwnProfileActions from "./OwnProfileActions";
import UserProfileActions from "./UserProfileActions";

type ProfileUserInfoProps = {
  fullname: string;
  username: string;
  avatar?: string | undefined;
  profession: string;
  ratings_average: number;
  is_business_or_employee: boolean;
  is_own_profile: boolean;
  is_follow: boolean;
  opening_hours: OpeningHoursType;
  onOpenScheduleModal: () => void;
};

const ProfileUserInfo = ({
  fullname,
  username,
  avatar,
  profession,
  ratings_average,
  is_business_or_employee,
  is_own_profile,
  is_follow,
  opening_hours,
  onOpenScheduleModal,
}: ProfileUserInfoProps) => {
  const openingStatus = useMemo(() => {
    if (!opening_hours) return null;

    const daysMap: Record<string, string> = {
      Monday: "Luni",
      Tuesday: "Marți",
      Wednesday: "Miercuri",
      Thursday: "Joi",
      Friday: "Vineri",
      Saturday: "Sâmbătă",
      Sunday: "Duminică",
    };

    const localizeDay = (dayEn?: string) => {
      if (!dayEn) return null;
      return daysMap[dayEn] ?? dayEn;
    };

    if (opening_hours.open_now) {
      if (opening_hours.closing_time) {
        return `Închide la ${opening_hours.closing_time}`;
      }
      return `Deschis`;
    }

    const nextDay = localizeDay(opening_hours.next_open_day);
    const nextTime = opening_hours.next_open_time;
    if (nextDay && nextTime) {
      return `Deschide ${nextDay.toLowerCase()} la ${nextTime}`;
    }

    return `Închis`;
  }, [opening_hours]);

  const actions = useMemo(() => {
    if (is_own_profile) {
      return (
        <OwnProfileActions is_business_or_employee={is_business_or_employee} />
      );
    }

    return (
      <UserProfileActions
        is_business_or_employee={is_business_or_employee}
        is_follow={is_follow}
      />
    );
  }, [is_business_or_employee, is_own_profile, is_follow]);

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

              <ButtonBase
                sx={{ borderRadius: 5 }}
                onClick={onOpenScheduleModal}
              >
                <Stack flexDirection="row" alignItems="center">
                  <QueryBuilderOutlinedIcon
                    color="action"
                    sx={{ fontSize: 25, mr: 0.5 }}
                  />
                  <Typography sx={{ ml: 0.5, mr: 1, color: "text.secondary" }}>
                    {openingStatus}
                  </Typography>
                  <ExpandMoreOutlinedIcon
                    color="action"
                    sx={{ fontSize: 30, mr: 0.5 }}
                  />
                </Stack>
              </ButtonBase>
            </>
          )}
        </Stack>

        <Stack flexDirection="row" alignItems="center" sx={{ mt: 1.5 }}>
          {actions}
        </Stack>
      </Box>
    </Stack>
  );
};

export default ProfileUserInfo;
