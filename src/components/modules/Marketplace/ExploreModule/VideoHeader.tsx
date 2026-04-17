"use client";

import { Avatar, Badge, Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { formatRating } from "@/utils/formatters";
import React from "react";
import { PostBusinessLocation, PostUser } from "@/ts/models/social/Post";
import { useRouter } from "next/navigation";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import Link from "next/link";

type VideoHeaderProps = {
  displayDescription: boolean;
  description: string | null;
  businessLocation: PostBusinessLocation | null | undefined;
  user: PostUser | undefined;
};

const VideoHeader = ({
  user,
  description,
  businessLocation,
  displayDescription = false,
}: VideoHeaderProps) => {
  const router = useRouter();
  const { avatar, fullname, username, ratings_average, is_follow } = user || {};
  const { lng, lat } = businessLocation?.coordinates || {};

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${lat},${lng}`)}`;

  const styles = {
    badge: {
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
    avatar: { width: 70, height: 70, border: 1, borderColor: "divider" },
  };

  return (
    <Box>
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        onClick={() => router.push(`/profile/${username}`)}
        sx={{ cursor: "pointer" }}
        gap={0.5}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              sx={styles.badgeContent}
            >
              <StarRateRoundedIcon
                sx={{ fontSize: 18, mr: 0.5 }}
                color="primary"
              />
              <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                {ratings_average ? formatRating(ratings_average) : "-"}
              </Typography>
            </Stack>
          }
          sx={styles.badge}
        >
          <Avatar sx={styles.avatar} src={avatar ?? ""} />
        </Badge>

        <Box flex={1}>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Box>
              <Stack direction="row" alignItems="center" gap={1.5}>
                <>
                  <Typography variant="h6" fontWeight={700} noWrap>
                    {fullname ?? "-"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    @{username}
                  </Typography>
                </>
              </Stack>

              <Typography color="text.secondary">{user?.profession}</Typography>
            </Box>

            {!is_follow && (
              <Button
                variant="outlined"
                color="secondary"
                disableElevation
                sx={{ textTransform: "none" }}
                startIcon={<AddIcon />}
              >
                Urmărește
              </Button>
            )}
          </Stack>

          {lat && lng && (
            <Link
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-container"
              style={{ textDecoration: "none" }}
              prefetch={false}
              onClick={(e) => e.stopPropagation()}
            >
              <Stack flexDirection="row" alignItems="center" gap={1} mt={1.5}>
                <FmdGoodOutlinedIcon color="primary" fontSize="medium" />

                <Typography
                  mt={0.5}
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    wordBreak: "break-word",
                  }}
                >
                  {businessLocation?.formatted_address}
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
