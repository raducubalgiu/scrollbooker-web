"use client";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import ProfileCounters from "./ProfileCounters";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileTabs from "./tabs/ProfileTabs";
import SocialModal from "./social/SocialModal";
import { SocialTabEnum } from "./social/SocialTabEnum";
import ScheduleModal from "./ScheduleModal";
import { UpdateFollowersAction } from "@/ts/enums/UpdateFollowersAction";
import { UserCounter, UserProfile } from "@/ts/models/user/UserProfile";
import EditProfileModal from "./edit/EditProfileModal";
import MenuIcon from "@mui/icons-material/Menu";

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
  const [openScheduleModal, setOpenScheduleModal] = useState<boolean>(false);
  const [openEditProfileModal, setOpenEditProfileModal] =
    useState<boolean>(false);
  const [openSocialModal, setOpenSocialModal] =
    useState<SocialModalProps | null>(null);
  const isSocialModalOpen = openSocialModal !== null;
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
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          display: { xs: "flex", lg: "none" },
          top: 0,
          zIndex: 1100,
        }}
      >
        <Toolbar sx={{ justifyContent: "center", position: "relative" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              textTransform: "lowercase",
            }}
          >
            @{profile.username}
          </Typography>

          <IconButton
            edge="end"
            size="large"
            sx={{
              position: "absolute",
              right: 16,
              color: "text.primary",
            }}
            onClick={() => {}}
          >
            <MenuIcon sx={{ fontSize: 27.5 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SocialModal
        open={isSocialModalOpen}
        counters={updatedCounters}
        socialModal={openSocialModal}
        handleClose={() => setOpenSocialModal(null)}
      />

      <ScheduleModal
        open={openScheduleModal}
        userId={profile.id}
        handleClose={() => setOpenScheduleModal(false)}
      />

      <EditProfileModal
        open={openEditProfileModal}
        handleClose={() => setOpenEditProfileModal(false)}
        profile={profile}
      />

      <ProfileCounters
        onClick={(tab) => {
          setOpenSocialModal({
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
        onOpenEditModal={() => setOpenEditProfileModal(true)}
        onUpdateFollows={handleUpdateFollows}
      />

      <ProfileTabs
        userId={profile.id}
        businessId={profile.business_id}
        username={profile.username}
        businessOwnerId={business_owner?.id}
        isBusinessOrEmployee={is_business_or_employee}
        isMyProfile={is_own_profile}
        tab={tab}
      />
    </Box>
  );
};

export default ProfileModule;
