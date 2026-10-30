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
        gap={{ xs: 2.5, md: 4 }}
        sx={styles.headerRow}
      >
        <UserAvatar
          isBusinessOrEmployee={is_business_or_employee}
          openNow={opening_hours?.open_now}
          url={avatar}
          size={{ xs: "lg", md: "xxl" }}
        />

        <Stack sx={styles.infoWrapper} spacing={{ xs: 0.5, md: 1 }}>
          <Stack flexDirection="row" alignItems="center" sx={styles.nameRow}>
            <Typography sx={styles.fullName}>{fullname}</Typography>
            <Typography sx={styles.username}>@{username}</Typography>
          </Stack>

          <Stack flexDirection="row" alignItems="center" gap={1}>
            <Typography variant="body2" fontWeight={500} color="text.secondary">
              {profession}
            </Typography>

            {is_business_or_employee && counters?.ratings_average > 0 && (
              <Stack
                flexDirection="row"
                alignItems="center"
                gap={0.5}
                sx={styles.ratingBadge}
              >
                <GradeIcon color="rating" sx={styles.star} />
                <Typography sx={styles.rating}>
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
            <Box sx={{ mt: 1.5 }}>
              <ProfileAddress address={address} />
            </Box>
          )}

          <Box sx={styles.bioDesktopWrapper}>
            <Box sx={styles.bioBox}>{bio}</Box>

            <Stack flexDirection="row" alignItems="center" gap={1.5} mt={3}>
              {" "}
              {/* 👈 mt generos pentru butoanele de acțiune pe desktop */}
              {actions}
            </Stack>
          </Box>
        </Stack>
      </Stack>

      <Box sx={styles.mobileWrapper}>
        <Stack
          flexDirection="row"
          alignItems="center"
          gap={1.5}
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
    px: { xs: 2, md: 4, lg: 0 },
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
    gap: 1,
  },
  fullName: {
    fontWeight: 600,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexShrink: 1,
    minWidth: 0,
    letterSpacing: "-0.02em",
    fontSize: {
      xs: "1.15rem",
      sm: "1.5rem",
      md: "1.875rem",
      lg: "2.25rem",
    },
  },
  username: {
    color: "text.disabled",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexShrink: 2,
    minWidth: 0,
    fontSize: { md: "1rem", lg: "1.125rem" },
    display: { xs: "none", sm: "block" },
  },
  ratingBadge: {
    py: 0.2,
    borderRadius: 1.5,
  },
  star: {
    fontSize: 25,
  },
  rating: {
    fontWeight: 700,
    color: "text.primary",
    fontSize: { xs: 16, md: 18 },
  },
  scheduleButton: {
    display: "inline-flex",
    width: "fit-content",
    borderRadius: 2,
    py: { xs: 0.5, md: "6px 12px" },
    transition: "all 0.2s ease",
    "&:hover": {
      bgcolor: "action.hover",
    },
  },
  scheduleIcon: {
    fontSize: { xs: 18, md: 20 },
  },
  scheduleText: {
    mx: 0.5,
    fontWeight: 500,
    color: "text.primary",
    fontSize: { xs: "0.8125rem", md: "0.875rem" },
  },
  bioDesktopWrapper: {
    display: { xs: "none", sm: "block" },
    mt: 2,
  },
  bioBox: {
    maxWidth: "md",
    color: "text.secondary",
    lineHeight: 1.5,
    fontSize: { md: "0.9375rem", lg: "1rem" },
  },
  mobileWrapper: {
    display: { xs: "block", sm: "none" },
    mt: 2,
  },
  actionsRowMobile: {
    width: "100%",
  },
  bioMobileBox: {
    mt: 2.5,
    px: 1,
  },
  bioMobileText: {
    textAlign: "center",
    color: "text.secondary",
    lineHeight: 1.5,
    fontSize: "0.875rem",
  },
};
