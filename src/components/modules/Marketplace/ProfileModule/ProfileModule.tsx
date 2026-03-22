"use client";

import { Box } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { UserProfileType } from "@/ts/models/user/UserProfileType";
import ProfileCounters from "./ProfileCounters";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileTabs from "./tabs/ProfileTabs";
import SocialModal from "./social/SocialModal";
import { SocialTabEnum } from "./social/SocialTabEnum";
import ScheduleModal from "./ScheduleModal";
import { UpdateFollowersAction } from "@/ts/enums/UpdateFollowersAction";

export type ProfileModuleProps = {
  profile: UserProfileType | undefined;
};

export type SocialModalProps = {
  selectedTab: SocialTabEnum;
  userId: number;
  username: string;
};

export type ScheduleModalProps = {
  userId: number;
};

const ProfileModule = ({ profile }: ProfileModuleProps) => {
  const [openScheduleModal, setOpenScheduleModal] = useState<boolean>(false);
  const [socialModal, setSocialModal] = useState<SocialModalProps | null>(null);
  const isSocialModalOpen = socialModal !== null;

  if (!profile) return null;

  const [updatedCounters, setUpdatedCounters] = useState(profile.counters);

  useEffect(() => {
    setUpdatedCounters(profile.counters);
  }, [profile.counters]);

  const handleUpdateFollows = useCallback(
    (action: UpdateFollowersAction) => {
      setUpdatedCounters((prev) => {
        if (!prev) return prev;
        const delta = action === UpdateFollowersAction.FOLLOW ? 1 : -1;

        const nextCount = Math.max(0, (prev.followers_count ?? 0) + delta);

        return { ...prev, followers_count: nextCount };
      });
    },
    [setUpdatedCounters]
  );

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
        counters={updatedCounters}
        socialModal={socialModal}
        handleClose={() => setSocialModal(null)}
      />

      <ScheduleModal
        open={openScheduleModal}
        userId={profile.id}
        handleClose={() => setOpenScheduleModal(false)}
      />

      <ProfileCounters
        onClick={(tab) => {
          setSocialModal({
            selectedTab: tab,
            userId: profile.id,
            username: profile.username,
          });
        }}
        counters={updatedCounters}
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
        userId={profile.id}
        business_owner={profile.business_owner}
        onOpenScheduleModal={() => setOpenScheduleModal(true)}
        onUpdateFollows={handleUpdateFollows}
      />

      <ProfileTabs
        userId={profile.id}
        isBusinessOrEmployee={is_business_or_employee}
        isMyProfile={is_own_profile}
      />
    </Box>
  );
};

export default ProfileModule;
