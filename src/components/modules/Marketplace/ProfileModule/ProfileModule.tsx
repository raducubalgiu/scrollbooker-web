"use client";

import { Alert, Box, Snackbar } from "@mui/material";
import React, { useState, useCallback } from "react";
import ProfileCounters from "./ProfileCounters";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileTabs from "./tabs/ProfileTabs";
import ScheduleModal from "./ScheduleModal";
import { UpdateFollowersAction } from "@/ts/enums/UpdateFollowersAction";
import {
  UserCounter,
  UserProfile,
  UserProfileUpdateResponse,
} from "@/ts/models/user/UserProfile";
import EditProfileModal from "./edit/EditProfileModal";
import MyProfileHeaderMobile from "./MyProfileHeaderMobile";
import UserProfileHeaderMobile from "./UserProfileHeaderMobile";
import ProfileMenuSheet from "./ProfileMenuSheet";
import { SocialTabEnum } from "../SocialModule/SocialTabEnum";
import SocialModal from "../SocialModule/SocialModal";
import { LOG } from "@/utils/logger";

export type ProfileModuleProps = {
  profile: UserProfile | null;
  tab?: string | null | undefined;
};

export type SocialModalProps = {
  selectedTab: SocialTabEnum;
  businessId: number | null;
  employeeId: number | null;
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
  const [shareSnackbarOpen, setShareSnackbarOpen] = useState(false);

  const [localProfile, setLocalProfile] = useState<UserProfile | null>(profile);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: "Profilul meu",
      text: "Aruncă o privire peste profilul meu!",
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        const errorMessage =
          error instanceof Error ? error.message : String(error);
        LOG.error(`Eroare tehnică la partajare: ${errorMessage}`);
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareSnackbarOpen(true);
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = window.location.href;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setShareSnackbarOpen(true);
      } catch (fallbackError) {
        const msg =
          fallbackError instanceof Error
            ? fallbackError.message
            : String(fallbackError);
        LOG.error(`Eșec total la copiere link: ${msg}`);
      }
    }
  }, []);

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
        px: { xs: 0, lg: 5 },
      }}
    >
      {localProfile.is_own_profile ? (
        <MyProfileHeaderMobile
          username={localProfile.username}
          isBusinessOrEmployee={localProfile.is_business_or_employee}
          onOpenMenu={() => setIsMenuOpen(true)}
        />
      ) : (
        <UserProfileHeaderMobile
          username={localProfile.username}
          onShare={handleShare}
        />
      )}

      <ProfileTabs
        userId={localProfile.id}
        businessId={localProfile.business_id}
        businessOwnerId={localProfile.business_owner?.id}
        instantBooking={localProfile.instant_booking}
        isBusinessOrEmployee={localProfile.is_business_or_employee}
        isMyProfile={localProfile.is_own_profile}
        tab={tab}
        profileHeaderContent={
          <>
            <ProfileCounters
              onClick={(tab) => {
                setOpenSocialModal({
                  selectedTab: tab,
                  businessId: localProfile.business_id,
                  employeeId:
                    localProfile.business_owner?.id === localProfile.id
                      ? null
                      : localProfile.id,
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
              onShare={handleShare}
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

      <Snackbar
        open={shareSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setShareSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Link-ul a fost copiat în clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileModule;
