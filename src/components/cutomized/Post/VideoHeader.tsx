"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { PostBusinessLocation, PostUser } from "@/ts/models/social/Post";
import { AppRoutes } from "@/utils/routes";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import AvatarWithRating from "../Avatar/AvatarWithRating";
import ProfileAddress from "@/components/modules/Marketplace/ProfileModule/ProfileAddress";

type VideoHeaderProps = {
  displayDescription: boolean;
  description: string | null;
  businessLocation: PostBusinessLocation | null | undefined;
  distanceKm?: number | null;
  user: PostUser | undefined;
  isVideoReview: boolean;
  onFollow?: (() => void) | undefined;
  isTogglingFollow?: boolean | undefined;
};

const VideoHeader = ({
  user,
  isVideoReview,
  description,
  businessLocation,
  distanceKm = null,
  displayDescription = false,
  onFollow,
  isTogglingFollow = false,
}: VideoHeaderProps) => {
  const { avatar, fullname, username, profession, ratings_average, is_follow } =
    user || {};
  const isBusinessOrEmployee = !isVideoReview;
  const showFollowButton = !is_follow && !!onFollow;
  const { navigateTo } = useAppNavigation();

  return (
    <Box>
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        onClick={() =>
          username && profession
            ? navigateTo(AppRoutes.profile(username, profession))
            : undefined
        }
        sx={{ cursor: "pointer", minWidth: 0 }}
      >
        <AvatarWithRating
          avatar={avatar ?? null}
          ratingsAverage={ratings_average ?? null}
          isBusinessOrEmployee={isBusinessOrEmployee}
        />

        <Stack spacing={0.5} sx={styles.infoColumn}>
          <Box sx={styles.nameRow}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={
                showFollowButton
                  ? styles.nameTextWithButton
                  : styles.ellipsisText
              }
            >
              {fullname ?? "-"}
            </Typography>

            {showFollowButton && onFollow && (
              <Button
                variant="contained"
                size="small"
                disableElevation
                loading={isTogglingFollow}
                disabled={isTogglingFollow}
                onClick={(e) => {
                  e.stopPropagation();
                  onFollow();
                }}
                sx={styles.followButton}
              >
                Urmărește
              </Button>
            )}
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={styles.ellipsisText}
          >
            {isBusinessOrEmployee ? profession : `@${username}`}
          </Typography>

          {businessLocation?.formatted_address && (
            <Box sx={styles.addressRow} onClick={(e) => e.stopPropagation()}>
              <ProfileAddress
                address={businessLocation.formatted_address}
                distanceKm={distanceKm}
                variant="body2"
                icon
              />
            </Box>
          )}
        </Stack>
      </Stack>

      {displayDescription && (
        <Box sx={{ mt: 4 }}>
          <Typography>{description ?? "..."}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default VideoHeader;

const styles = {
  infoColumn: {
    minWidth: 0,
    flex: 1,
  },
  addressRow: {
    minWidth: 0,
  },
  nameRow: {
    position: "relative",
    minWidth: 0,
  },
  ellipsisText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
  },
  nameTextWithButton: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
    pr: 13,
  },
  followButton: {
    position: "absolute",
    top: "50%",
    right: 0,
    transform: "translateY(-50%)",
    textTransform: "none",
  },
};
