"use client";

import { Box } from "@mui/material";
import React from "react";
import { UserProfileType } from "@/ts/models/user/UserProfileType";
import ProfileCounters from "./ProfileCounters";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileTabs from "./tabs/ProfileTabs";

type ProfileModuleProps = {
  profile: UserProfileType | undefined;
};

const ProfileModule = ({ profile }: ProfileModuleProps) => {
  if (!profile) return null;

  const {
    fullname,
    username,
    avatar,
    profession,
    counters,
    is_business_or_employee,
    is_own_profile,
    opening_hours,
  } = profile;

  return (
    <Box>
      <ProfileCounters
        ratings_count={counters.ratings_count}
        followers_count={counters.followers_count}
        followings_count={counters.followings_count}
      />

      <ProfileUserInfo
        fullname={fullname}
        username={username}
        avatar={avatar}
        profession={profession}
        ratings_average={counters.ratings_average}
        is_business_or_employee={is_business_or_employee}
        opening_hours={opening_hours}
      />

      <ProfileTabs
        isBusinessOrEmployee={is_business_or_employee}
        isMyProfile={is_own_profile}
      />
    </Box>
  );
};

export default ProfileModule;
