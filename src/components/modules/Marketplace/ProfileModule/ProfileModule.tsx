"use client";

import { Box } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import ProfileCounters from "./ProfileCounters";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileTabs from "./tabs/ProfileTabs";
import SocialModal from "./social/SocialModal";
import { SocialTabEnum } from "./social/SocialTabEnum";
import ScheduleModal from "./ScheduleModal";
import { UpdateFollowersAction } from "@/ts/enums/UpdateFollowersAction";
import { UserCounter, UserProfile } from "@/ts/models/user/UserProfile";

export type ProfileModuleProps = {
  profile: UserProfile | null;
};

export type SocialModalProps = {
  selectedTab: SocialTabEnum;
  userId: number;
  username: string;
};

export type ScheduleModalProps = {
  userId: number;
};

const emptyCounters: UserCounter = {
  user_id: 0,
  followings_count: 0,
  followers_count: 0,
  products_count: 0,
  posts_count: 0,
  ratings_count: 0,
  ratings_average: 0,
};

const ProfileModule = ({ profile }: ProfileModuleProps) => {
  const [openScheduleModal, setOpenScheduleModal] = useState<boolean>(false);
  const [socialModal, setSocialModal] = useState<SocialModalProps | null>(null);
  const isSocialModalOpen = socialModal !== null;
  const [updatedCounters, setUpdatedCounters] = useState<UserCounter>(
    profile?.counters ?? emptyCounters
  );

  useEffect(() => {
    if (profile) setUpdatedCounters(profile.counters);
  }, [profile]);

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

  if (!profile) return null;

  const { is_business_or_employee, is_own_profile, business_owner } = profile;

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
        profile={profile}
        onOpenScheduleModal={() => setOpenScheduleModal(true)}
        onUpdateFollows={handleUpdateFollows}
      />

      <ProfileTabs
        userId={profile.id}
        businessOwnerId={business_owner?.id}
        isBusinessOrEmployee={is_business_or_employee}
        isMyProfile={is_own_profile}
      />
    </Box>
  );
};

export default ProfileModule;
