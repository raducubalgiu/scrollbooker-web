import { PostCounters, PostUserActions } from "@/ts/models/social/Post";
import { IconButton, Stack, Typography } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import React from "react";

type VideoActionsProps = {
  counters: PostCounters;
  userActions: PostUserActions;
};

const VideoActions = ({ counters, userActions }: VideoActionsProps) => {
  return (
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
  );
};

export default VideoActions;
