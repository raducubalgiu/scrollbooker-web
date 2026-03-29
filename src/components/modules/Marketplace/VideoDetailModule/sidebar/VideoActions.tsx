import React from "react";
import { PostCounters, PostUserActions } from "@/ts/models/social/Post";
import { IconButton, Stack, Typography } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import IosShareIcon from "@mui/icons-material/IosShare";

type VideoActionsProps = {
  counters: PostCounters;
  userActions: PostUserActions;
  onHandleLike: () => void;
  onHandleBookmark: () => void;
};

const VideoActions = ({
  counters,
  userActions,
  onHandleLike,
  onHandleBookmark,
}: VideoActionsProps) => {
  const { like_count, bookmark_count } = counters;
  const { is_liked, is_bookmarked } = userActions;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2.5}
      sx={{ mt: 3, flexWrap: "wrap", rowGap: 1.5 }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton
          onClick={onHandleLike}
          sx={{
            width: 45,
            height: 45,
            bgcolor: "action.hover",
          }}
        >
          {is_liked ? (
            <FavoriteRoundedIcon color="error" />
          ) : (
            <FavoriteBorderRoundedIcon />
          )}
        </IconButton>

        <Typography variant="body1" fontWeight={600}>
          {like_count?.toString()}
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
          onClick={onHandleBookmark}
          sx={{
            width: 45,
            height: 45,
            bgcolor: "action.hover",
          }}
        >
          {is_bookmarked ? (
            <BookmarkRoundedIcon />
          ) : (
            <BookmarkBorderRoundedIcon />
          )}
        </IconButton>

        <Typography variant="body1" fontWeight={600}>
          {bookmark_count?.toString()}
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
          <IosShareIcon fontSize="medium" />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default VideoActions;
