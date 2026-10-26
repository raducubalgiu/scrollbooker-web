import UserAvatar from "@/components/core/Avatar/UserAvatar";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import React, { useMemo } from "react";
import UserProfileActions from "./UserProfileActions";
import { UpdateFollowersAction } from "@/ts/enums/UpdateFollowersAction";
import { UserProfile } from "@/ts/models/user/UserProfile";
import { formatOpeningStatus, formatRating } from "@/utils/formatters";
import { useRouter } from "next/navigation";
import { BookingSourceEnum } from "@/ts/enums/BookingSourceEnum";
import MyProfileActions from "./MyProfileActions";
import ProfileAddress from "./ProfileAddress";

type ProfileUserInfoProps = {
  profile: UserProfile;
  onOpenScheduleModal: () => void;
  onUpdateFollows: (action: UpdateFollowersAction) => void;
  onOpenEditModal: () => void;
  onShare: () => void;
};

const ProfileUserInfo = ({
  profile,
  onOpenScheduleModal,
  onUpdateFollows,
  onOpenEditModal,
  onShare,
}: ProfileUserInfoProps) => {
  const router = useRouter();
  const {
    id,
    fullname,
    username,
    avatar,
    profession,
    bio,
    is_business_or_employee,
    is_own_profile,
    is_follow,
    counters,
    opening_hours,
    address,
    instant_booking,
  } = profile || {};

  const openingStatus = useMemo(
    () => formatOpeningStatus(opening_hours),
    [opening_hours]
  );

  const handleBookNow = () => {
    router.push(
      `/booking/${profile.business_id}/${profile.business_owner?.id}/${profile.id}?source=${BookingSourceEnum.PROFILE}`
    );
  };

  const actions = useMemo(() => {
    if (is_own_profile) {
      return (
        <MyProfileActions
          isBusinessOrEmployee={is_business_or_employee}
          instantBooking={instant_booking}
          onOpenEditModal={onOpenEditModal}
          onShare={onShare}
        />
      );
    }

    return (
      <UserProfileActions
        userId={id}
        businessId={profile.business_id}
        isBusinessOrEmployee={is_business_or_employee}
        isFollow={is_follow}
        instantBooking={instant_booking}
        contact={profile.contact}
        onUpdateFollows={onUpdateFollows}
        onBookNow={handleBookNow}
      />
    );
  }, [
    is_business_or_employee,
    is_own_profile,
    is_follow,
    id,
    instant_booking,
    profile.business_id,
    profile.contact,
    onUpdateFollows,
    onOpenEditModal,
    onShare,
  ]);

  return (
    <Box sx={styles.root}>
      <Stack
        flexDirection="row"
        alignItems="center"
        gap={{ xs: 2, lg: 3 }}
        sx={styles.headerRow}
      >
        <UserAvatar
          isBusinessOrEmployee={is_business_or_employee}
          openNow={opening_hours.open_now}
          url={avatar}
          size={{ xs: "lg", md: "xxl" }}
        />

        <Box sx={styles.infoWrapper}>
          <Stack flexDirection="row" alignItems="center" sx={styles.nameRow}>
            <Typography variant="h5" sx={styles.fullName}>
              {fullname}
            </Typography>

            <Typography sx={styles.username}>@{username}</Typography>
          </Stack>

          <Stack flexDirection="row" alignItems="center" gap={1} mt={0.5}>
            <Typography variant="subtitle1" sx={styles.profession}>
              {profession}
            </Typography>

            {is_business_or_employee && (
              <Stack flexDirection="row" alignItems="center">
                <GradeIcon color="rating" sx={styles.star} />
                <Typography variant="h6" sx={styles.rating}>
                  {formatRating(counters.ratings_average)}
                </Typography>
              </Stack>
            )}
          </Stack>

          {is_business_or_employee && (
            <ButtonBase
              sx={styles.scheduleButton}
              onClick={onOpenScheduleModal}
            >
              <Stack flexDirection="row" alignItems="center" gap={0.5}>
                <QueryBuilderOutlinedIcon
                  color="action"
                  sx={styles.scheduleIcon}
                />
                <Typography sx={styles.scheduleText}>
                  {openingStatus}
                </Typography>
                <ExpandMoreOutlinedIcon
                  color="action"
                  sx={styles.scheduleIcon}
                />
              </Stack>
            </ButtonBase>
          )}

          {address && !profile.is_own_profile && (
            <Box sx={styles.addressRow}>
              <ProfileAddress address={address} />
            </Box>
          )}

          <Box sx={styles.bioDesktopWrapper}>
            <Box sx={styles.bioBox}>{bio}</Box>

            <Stack flexDirection="row" alignItems="center" gap={1} mt={1.5}>
              {actions}
            </Stack>
          </Box>
        </Box>
      </Stack>

      <Box sx={styles.mobileWrapper}>
        <Stack
          flexDirection="row"
          alignItems="center"
          gap={1}
          sx={styles.actionsRowMobile}
        >
          {actions}
        </Stack>

        <Box sx={styles.bioMobileBox}>
          <Typography sx={styles.bioMobileText}>{bio}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileUserInfo;

const styles = {
  root: {
    px: { xs: 2, lg: 0 },
    pb: { xs: 2, lg: 0 },
  },
  headerRow: {
    width: "100%",
    minWidth: 0,
  },
  infoWrapper: {
    width: "100%",
    minWidth: 0,
  },
  nameRow: {
    width: "100%",
    minWidth: 0,
  },
  fullName: {
    fontWeight: 600,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexShrink: 1,
    minWidth: 0,
    fontSize: {
      xs: 17,
      sm: 18,
      md: 24,
      lg: 30,
      xl: 32,
    },
  },
  username: {
    ml: 1.5,
    color: "text.secondary",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexShrink: 2,
    minWidth: 0,
    fontSize: { xs: "0.875rem", sm: "1rem" },
    display: { xs: "none", lg: "block" },
  },
  profession: {
    color: "text.secondary",
    fontSize: { xs: "0.875rem", sm: "1rem" },
  },
  star: {
    mr: 0.5,
    fontWeight: 600,
    fontSize: {
      sm: 20,
      md: 25,
      lg: 30,
      xl: 32,
    },
  },
  rating: {
    fontWeight: { xs: 800, lg: 600 },
    fontSize: {
      sm: 17,
      md: 20,
      lg: 25,
      xl: 28,
    },
  },
  scheduleButton: {
    borderRadius: 5,
    mt: 1,
  },
  scheduleIcon: {
    fontSize: { xs: 20, lg: 25 },
  },
  scheduleText: {
    mx: 0.5,
    color: "text.secondary",
    fontSize: { xs: "0.875rem", sm: "1rem" },
  },
  addressRow: {
    mt: 1,
  },
  bioDesktopWrapper: {
    display: { xs: "none", sm: "block" },
  },
  bioBox: {
    maxWidth: "sm",
    mt: 1.5,
  },
  mobileWrapper: {
    display: { xs: "block", sm: "none" },
  },
  actionsRowMobile: {
    width: "100%",
    mt: 1.5,
  },
  bioMobileBox: {
    maxWidth: "sm",
    mt: 2.5,
    mx: 5,
  },
  bioMobileText: {
    textAlign: "center",
    fontSize: { xs: "0.875rem", sm: "1rem" },
  },
};
