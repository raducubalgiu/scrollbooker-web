"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { PostBusinessLocation, PostUser } from "@/ts/models/social/Post";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CustomAvatar from "@/components/cutomized/Avatar/CustomAvatar";
import { getGoogleMapsDirectionsUrl } from "@/utils/get-google-maps-directions";

type VideoHeaderProps = {
  displayDescription: boolean;
  description: string | null;
  businessLocation: PostBusinessLocation | null | undefined;
  user: PostUser | undefined;
  isVideoReview: boolean;
};

const VideoHeader = ({
  user,
  isVideoReview,
  description,
  businessLocation,
  displayDescription = false,
}: VideoHeaderProps) => {
  const router = useRouter();
  const { avatar, fullname, username, ratings_average, is_follow } = user || {};
  const mapsUrl = getGoogleMapsDirectionsUrl(businessLocation?.coordinates);

  return (
    <Box>
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        onClick={() => router.push(`/profile/${username}`)}
        sx={{ cursor: "pointer", minWidth: 0 }}
        gap={0.5}
      >
        <CustomAvatar
          avatar={avatar}
          ratingsAverage={ratings_average}
          showBadge={!isVideoReview}
        />

        <Box flex={1} sx={{ minWidth: 0 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%", minWidth: 0 }}
            gap={3}
          >
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Stack
                direction="row"
                alignItems="center"
                gap={1.5}
                sx={{ minWidth: 0 }}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ ...styles.ellipsisText, flexShrink: 1 }}
                >
                  {fullname ?? "-"}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ...styles.ellipsisText, flexShrink: 1 }}
                >
                  @{username}
                </Typography>
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={styles.ellipsisText}
              >
                {user?.profession}
              </Typography>
            </Box>

            {!is_follow && (
              <Button
                variant="contained"
                disableElevation
                sx={{ textTransform: "none", flexShrink: 0 }}
              >
                Urmărește
              </Button>
            )}
          </Stack>

          <Link
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-container"
            style={{ textDecoration: "none" }}
            prefetch={false}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={styles.formattedAddress}
            >
              {businessLocation?.formatted_address}
            </Typography>
          </Link>
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
  badge: {
    flexShrink: 0,
    "& .MuiBadge-badge": {
      right: "auto",
      left: "50%",
      transform: `translate(-50%, 100%)`,
    },
  },
  badgeContent: {
    backgroundColor: "background.paper",
    px: 1.5,
    py: 0.5,
    borderRadius: 50,
    boxShadow: 1,
  },
  avatar: {
    width: 70,
    height: 70,
    border: 1,
    borderColor: "divider",
  },
  ellipsisText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
  },
  formattedAddress: {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-word",
  },
};
