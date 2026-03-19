"use client";

import { Box } from "@mui/material";
import React, { useState } from "react";
import { UserProfileType } from "@/ts/models/user/UserProfileType";
import ProfileCounters from "./ProfileCounters";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileTabs from "./tabs/ProfileTabs";
import ProfileSocialModal from "./ProfileSocialModal";

type ProfileModuleProps = {
  profile: UserProfileType | undefined;
};

const ProfileModule = ({ profile }: ProfileModuleProps) => {
  const [isSocialModalOpen, setSocialModalOpen] = useState(false);

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
      <ProfileSocialModal
        open={isSocialModalOpen}
        handleClose={() => setSocialModalOpen(false)}
      />

      <ProfileCounters
        onClick={(type) => setSocialModalOpen(true)}
        counters={counters}
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
