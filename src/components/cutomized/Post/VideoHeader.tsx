"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { PostBusinessLocation, PostUser } from "@/ts/models/social/Post";
import Link from "next/link";
import { getGoogleMapsDirectionsUrl } from "@/utils/get-google-maps-directions";
import { AppRoutes } from "@/utils/routes";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import AvatarWithRating from "../Avatar/AvatarWithRating";
import { formatDistance } from "@/utils/formatters";

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
  const mapsUrl = getGoogleMapsDirectionsUrl(businessLocation?.coordinates);
  const { navigateTo } = useAppNavigation();
  const locationSummary = [
    formatDistance(distanceKm),
    businessLocation?.formatted_address,
  ]
    .filter((part): part is string => Boolean(part))
    .join(" • ");

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

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={styles.ellipsisText}
            >
              {fullname ?? "-"}
            </Typography>

            {!is_follow && onFollow && (
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
                sx={{ textTransform: "none", flexShrink: 0 }}
              >
                Urmărește
              </Button>
            )}
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ ...styles.ellipsisText, mt: 0.25 }}
          >
            {isBusinessOrEmployee ? profession : `@${username}`}
          </Typography>

          {locationSummary && (
            <Link
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
              prefetch={false}
              onClick={(e) => e.stopPropagation()}
            >
              <Stack
                direction="row"
                alignItems="center"
                gap={0.5}
                sx={{ mt: 0.75, minWidth: 0 }}
              >
                <LocationOnOutlinedIcon
                  sx={{ fontSize: 16, color: "text.secondary", flexShrink: 0 }}
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={styles.ellipsisText}
                >
                  {locationSummary}
                </Typography>
              </Stack>
            </Link>
          )}
        </Box>
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
  ellipsisText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
  },
};
