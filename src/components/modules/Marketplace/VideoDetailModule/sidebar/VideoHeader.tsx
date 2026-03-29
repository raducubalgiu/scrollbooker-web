import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { formatRating } from "@/utils/formatters";
import React from "react";
import {
  PostCounters,
  PostUser,
  PostUserActions,
} from "@/ts/models/social/Post";

type VideoHeaderProps = {
  description: string | null;
  user: PostUser;
  counters: PostCounters;
  userActions: PostUserActions;
};

const VideoHeader = ({
  user,
  counters,
  description,
  userActions,
}: VideoHeaderProps) => {
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
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
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
                {formatRating(user.ratings_average)}
              </Typography>
            </Stack>
          }
          sx={styles.badge}
        >
          <Avatar sx={styles.avatar} src={user.avatar ?? ""} />
        </Badge>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Typography variant="h6" fontWeight={700} noWrap>
              {user.fullname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{user.username}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="body2" color="text.secondary">
              Frizerie •
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Strada Oarecare nr 3, Sector 6
            </Typography>
            <Typography
              color="primary"
              fontWeight={600}
              sx={{ cursor: "pointer" }}
            >
              Vezi indicatii
            </Typography>
          </Stack>
        </Box>

        {!user.is_follow && (
          <Button
            variant="outlined"
            color="primary"
            disableElevation
            size="medium"
            sx={{ textTransform: "none" }}
          >
            Urmareste
          </Button>
        )}
      </Stack>

      <Box sx={{ mt: 4 }}>
        <Typography>{description ?? "..."}</Typography>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        spacing={2.5}
        sx={{ mt: 3, flexWrap: "wrap", rowGap: 1.5 }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            sx={{
              width: 45,
              height: 45,
              bgcolor: "action.hover",
            }}
          >
            {userActions.is_liked ? (
              <FavoriteRoundedIcon color="error" />
            ) : (
              <FavoriteBorderRoundedIcon />
            )}
          </IconButton>

          <Typography variant="body1" fontWeight={600}>
            {counters.like_count?.toString()}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            sx={{
              width: 45,
              height: 45,
              bgcolor: "action.hover",
            }}
          >
            <ChatBubbleOutlineIcon fontSize="medium" />
          </IconButton>

          <Typography variant="body1" fontWeight={600}>
            {counters.comments_count?.toString() ?? "0"}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            sx={{
              width: 45,
              height: 45,
              bgcolor: "action.hover",
            }}
          >
            {userActions.is_bookmarked ? (
              <BookmarkRoundedIcon />
            ) : (
              <BookmarkBorderRoundedIcon />
            )}
          </IconButton>

          <Typography variant="body1" fontWeight={600}>
            {counters.bookmark_count?.toString()}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            sx={{
              width: 45,
              height: 45,
              bgcolor: "action.hover",
            }}
          >
            <ShareIcon fontSize="medium" />
          </IconButton>

          <Typography variant="body1" fontWeight={600}>
            12
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default VideoHeader;
