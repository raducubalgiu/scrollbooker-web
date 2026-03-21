"use client";

import { Box } from "@mui/material";
import React, { useState } from "react";
import { UserProfileType } from "@/ts/models/user/UserProfileType";
import ProfileCounters from "./ProfileCounters";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileTabs from "./tabs/ProfileTabs";
import SocialModal from "./social/SocialModal";
import { SocialTabEnum } from "./social/SocialTabEnum";

export type ProfileModuleProps = {
  profile: UserProfileType | undefined;
};

export type SocialModalProps = {
  selectedTab: SocialTabEnum;
  userId: number;
  username: string;
};

const ProfileModule = ({ profile }: ProfileModuleProps) => {
  const [isSocialModalOpen, setSocialModalOpen] = useState(false);
  const [socialModal, setSocialModal] = useState<SocialModalProps | null>(null);

  if (!profile) return null;

  const {
    fullname,
    username,
    avatar,
    profession,
    counters,
    is_business_or_employee,
    is_own_profile,
    is_follow,
    opening_hours,
  } = profile;

  return (
    <Box>
      <SocialModal
        open={isSocialModalOpen}
        socialModal={socialModal}
        handleClose={() => setSocialModalOpen(false)}
      />

      <ProfileCounters
        onClick={(tab) => {
          setSocialModal({
            selectedTab: tab,
            userId: profile.id,
            username: profile.username,
          });
          setSocialModalOpen(true);
        }}
        counters={counters}
      />

      <ProfileUserInfo
        fullname={fullname}
        username={username}
        avatar={avatar}
        profession={profession}
        ratings_average={counters.ratings_average}
        is_business_or_employee={is_business_or_employee}
        is_own_profile={is_own_profile}
        is_follow={is_follow}
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
