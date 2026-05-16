"use client";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
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
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import ProfileHeaderMobile from "./ProfileHeaderMobile";

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

  if (!localProfile) return;

  return (
    <Box>
      <ProfileHeaderMobile
        username={localProfile.username}
        isOwnProfile={localProfile.is_own_profile}
        onSetIsMenuOpen={() => setIsMenuOpen(true)}
      />

      <Drawer
        anchor="bottom"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        sx={{ display: { xs: "block", lg: "none" } }}
        slotProps={{
          paper: {
            sx: {
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              backgroundColor: "background.paper",
              paddingBottom: 2,
            },
          },
        }}
      >
        <Box sx={{ width: "100%", pb: 3 }}>
          <Box
            sx={{
              width: 40,
              height: 4,
              bgcolor: "divider",
              borderRadius: 2,
              mx: "auto",
              mb: 2,
            }}
          />

          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {}}>
                <ListItemIcon>
                  <VideocamOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Creeaza o postare" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => {}}>
                <ListItemIcon>
                  <BusinessCenterOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Afacerea mea" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => {}}>
                <ListItemIcon>
                  <SettingsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Setari" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

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

      <ProfileTabs
        userId={localProfile.id}
        businessId={localProfile.business_id}
        username={localProfile.username}
        businessOwnerId={localProfile.business_owner?.id}
        isBusinessOrEmployee={localProfile.is_business_or_employee}
        isMyProfile={localProfile.is_own_profile}
        tab={tab}
      />
    </Box>
  );
};

export default ProfileModule;
