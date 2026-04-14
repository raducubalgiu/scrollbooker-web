import UserAvatar from "@/components/core/Avatar/UserAvatar";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import React, { useMemo } from "react";
import OwnProfileActions from "./OwnProfileActions";
import UserProfileActions from "./UserProfileActions";
import { UpdateFollowersAction } from "@/ts/enums/UpdateFollowersAction";
import { UserProfile } from "@/ts/models/user/UserProfile";
import { formatRating } from "@/utils/formatters";

type ProfileUserInfoProps = {
  profile: UserProfile;
  onOpenScheduleModal: () => void;
  onUpdateFollows: (action: UpdateFollowersAction) => void;
  onOpenEditModal: () => void;
};

const ProfileUserInfo = ({
  profile,
  onOpenScheduleModal,
  onUpdateFollows,
  onOpenEditModal,
}: ProfileUserInfoProps) => {
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
  } = profile || {};

  const openingStatus = useMemo(() => {
    if (!opening_hours) return null;

    const daysMap: Record<string, string> = {
      Monday: "Luni",
      Tuesday: "Marți",
      Wednesday: "Miercuri",
      Thursday: "Joi",
      Friday: "Vineri",
      Saturday: "Sâmbătă",
      Sunday: "Duminică",
    };

    const localizeDay = (dayEn: string | null) => {
      if (!dayEn) return null;
      return daysMap[dayEn] ?? dayEn;
    };

    if (opening_hours.open_now) {
      if (opening_hours.closing_time) {
        return `Închide la ${opening_hours.closing_time}`;
      }
      return `Deschis`;
    }

    const nextDay = localizeDay(opening_hours.next_open_day);
    const nextTime = opening_hours.next_open_time;
    if (nextDay && nextTime) {
      return `Deschide ${nextDay.toLowerCase()} la ${nextTime}`;
    }

    return `Închis`;
  }, [opening_hours]);

  const actions = useMemo(() => {
    if (is_own_profile) {
      return (
        <OwnProfileActions
          is_business_or_employee={is_business_or_employee}
          onOpenEditModal={onOpenEditModal}
        />
      );
    }

    return (
      <UserProfileActions
        userId={id}
        is_business_or_employee={is_business_or_employee}
        is_follow={is_follow}
        onUpdateFollows={onUpdateFollows}
      />
    );
  }, [is_business_or_employee, is_own_profile, is_follow, id, onUpdateFollows]);

  const styles = {
    fullName: {
      fontWeight: 600,
      fontSize: {
        xs: 20,
        sm: 24,
        md: 28,
        lg: 30,
        xl: 32,
      },
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
      fontWeight: 600,
      fontSize: {
        sm: 15,
        md: 20,
        lg: 25,
        xl: 28,
      },
    },
  };

  return (
    <Stack flexDirection="row" alignItems="center" sx={{ p: { xs: 2, lg: 0 } }}>
      <UserAvatar
        isBusinessOrEmployee={is_business_or_employee}
        openNow={opening_hours.open_now}
        url={avatar}
        size="xxl"
      />

      <Box sx={{ ml: 3 }}>
        <Stack flexDirection="row" alignItems="center">
          <Typography variant="h5" sx={styles.fullName}>
            {fullname}
          </Typography>
          <Typography variant="body1" sx={{ ml: 1.5, color: "text.secondary" }}>
            @{username}
          </Typography>
        </Stack>

        <Stack flexDirection="row" alignItems="center">
          <Typography
            variant="subtitle1"
            sx={{ mr: 1.5, color: "text.secondary" }}
          >
            {profession}
          </Typography>
          {is_business_or_employee && (
            <>
              <Stack flexDirection="row" alignItems="center">
                <GradeIcon color="primary" sx={styles.star} />
                <Typography variant="h6" sx={styles.rating}>
                  {formatRating(counters.ratings_average)}
                </Typography>
              </Stack>

              <Typography
                sx={{ mx: 1.5, fontSize: 25, color: "text.secondary" }}
              >
                &#x2022;
              </Typography>

              <ButtonBase
                sx={{ borderRadius: 5 }}
                onClick={onOpenScheduleModal}
              >
                <Stack flexDirection="row" alignItems="center">
                  <QueryBuilderOutlinedIcon
                    color="action"
                    sx={{ fontSize: 25, mr: 0.5 }}
                  />
                  <Typography sx={{ ml: 0.5, mr: 1, color: "text.secondary" }}>
                    {openingStatus}
                  </Typography>
                  <ExpandMoreOutlinedIcon
                    color="action"
                    sx={{ fontSize: 30, mr: 0.5 }}
                  />
                </Stack>
              </ButtonBase>
            </>
          )}
        </Stack>

        {/* {business_owner && (
          <Stack flexDirection="row" alignItems="center" mt={0.5}>
            {business_owner.id !== id && (
              <>
                <Stack flexDirection="row" alignItems="center">
                  <CachedIcon />

                  <ButtonBase>
                    <Avatar
                      src={business_owner?.avatar ?? ""}
                      sx={{ border: 1, borderColor: "text.secondary", ml: 1.5 }}
                    />
                    <Typography
                      variant="body1"
                      color="primary"
                      fontWeight={600}
                      sx={{ ml: 1 }}
                    >
                      @{business_owner?.username}
                    </Typography>
                  </ButtonBase>
                </Stack>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    ml: 1.5,
                    mr: 1,
                    borderColor: "divider",
                    height: 15,
                    alignSelf: "center",
                  }}
                />
              </>
            )}

            <Button
              size="medium"
              sx={{ textTransform: "capitalize", color: "text.primary" }}
              startIcon={<LocationOnOutlinedIcon color="primary" />}
            >
              Locatie
            </Button>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                mx: 1,
                borderColor: "divider",
                height: 15,
                alignSelf: "center",
              }}
            />

            <Button
              size="medium"
              sx={{ textTransform: "capitalize", color: "text.primary" }}
              startIcon={<LocalPhoneOutlinedIcon color="primary" />}
            >
              Telefon
            </Button>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                mx: 1,
                borderColor: "divider",
                height: 15,
                alignSelf: "center",
              }}
            />

            <Button
              size="medium"
              sx={{ textTransform: "capitalize", color: "text.primary" }}
              startIcon={<EmailOutlinedIcon color="primary" />}
            >
              Email
            </Button>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                mx: 1,
                borderColor: "divider",
                height: 15,
                alignSelf: "center",
              }}
            />

            <Button
              size="medium"
              sx={{ textTransform: "capitalize", color: "text.primary" }}
              startIcon={<LanguageOutlinedIcon color="primary" />}
            >
              Website
            </Button>
          </Stack>
        )} */}

        <Box sx={{ maxWidth: "sm", mt: 1.5 }}>{bio}</Box>

        <Stack flexDirection="row" alignItems="center" sx={{ mt: 1.5 }}>
          {actions}
        </Stack>
      </Box>
    </Stack>
  );
};

export default ProfileUserInfo;
