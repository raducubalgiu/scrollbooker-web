"use client";

import { Box } from "@mui/material";
import React, { useState, useCallback } from "react";
import ProfileCounters from "./ProfileCounters";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileTabs from "./tabs/ProfileTabs";
import SocialModal from "./social/SocialModal";
import { SocialTabEnum } from "./social/SocialTabEnum";
import ScheduleModal from "./ScheduleModal";
import { UpdateFollowersAction } from "@/ts/enums/UpdateFollowersAction";
import {
  UserCounter,
  UserProfile,
  UserProfileUpdateResponse,
} from "@/ts/models/user/UserProfile";
import EditProfileModal from "./edit/EditProfileModal";
import ProfileHeaderMobile from "./ProfileHeaderMobile";
import ProfileMenuSheet from "./ProfileMenuSheet";

export type ProfileModuleProps = {
  profile: UserProfile | null;
  tab?: string | null | undefined;
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

const ProfileModule = ({ profile, tab }: ProfileModuleProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState<boolean>(false);
  const [openEditProfileModal, setOpenEditProfileModal] =
    useState<boolean>(false);
  const [openSocialModal, setOpenSocialModal] =
    useState<SocialModalProps | null>(null);
  const isSocialModalOpen = openSocialModal !== null;

  const [localProfile, setLocalProfile] = useState<UserProfile | null>(profile);

  const handleUpdateFollows = useCallback((action: UpdateFollowersAction) => {
    setLocalProfile((prev) => {
      if (!prev) return null;
      const delta = action === UpdateFollowersAction.FOLLOW ? 1 : -1;
      const nextCount = Math.max(
        0,
        (prev.counters?.followers_count ?? 0) + delta
      );

      return {
        ...prev,
        counters: {
          ...prev.counters,
          followers_count: nextCount,
        },
      };
    });
  }, []);

  const handleProfileUpdated = useCallback(
    (updatedFields: UserProfileUpdateResponse) => {
      setLocalProfile((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          fullname: updatedFields.fullname,
          username: updatedFields.username,
          avatar: updatedFields.avatar,
          bio: updatedFields.bio,
        };
      });
    },
    []
  );

  if (!localProfile) return null;

  return (
    <Box
      sx={{
        display: { xs: "flex", lg: "block" },
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <ProfileHeaderMobile
        username={localProfile.username}
        isOwnProfile={localProfile.is_own_profile}
        onSetIsMenuOpen={() => setIsMenuOpen(true)}
      />

      <ProfileTabs
        userId={localProfile.id}
        businessId={localProfile.business_id}
        username={localProfile.username}
        businessOwnerId={localProfile.business_owner?.id}
        isBusinessOrEmployee={localProfile.is_business_or_employee}
        isMyProfile={localProfile.is_own_profile}
        tab={tab}
        profileHeaderContent={
          <>
            <ProfileCounters
              onClick={(tab) => {
                setOpenSocialModal({
                  selectedTab: tab,
                  userId: localProfile.id,
                  username: localProfile.username,
                });
              }}
              counters={localProfile?.counters ?? emptyCounters}
            />

            <ProfileUserInfo
              profile={localProfile}
              onOpenScheduleModal={() => setOpenScheduleModal(true)}
              onOpenEditModal={() => setOpenEditProfileModal(true)}
              onUpdateFollows={handleUpdateFollows}
            />
          </>
        }
      />

      <ProfileMenuSheet
        isMenuOpen={isMenuOpen}
        onCloseMenu={() => setIsMenuOpen(false)}
      />

      <SocialModal
        open={isSocialModalOpen}
        counters={localProfile?.counters ?? emptyCounters}
        socialModal={openSocialModal}
        handleClose={() => setOpenSocialModal(null)}
      />

      <ScheduleModal
        open={openScheduleModal}
        userId={localProfile.id}
        handleClose={() => setOpenScheduleModal(false)}
      />

      <EditProfileModal
        open={openEditProfileModal}
        handleClose={() => setOpenEditProfileModal(false)}
        onProfileUpdated={handleProfileUpdated}
        profile={localProfile}
      />
    </Box>
  );
};

export default ProfileModule;
