import { PostCounters, PostUserActions } from "@/ts/models/social/Post";
import { IconButton, Stack, Typography } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import IosShareIcon from "@mui/icons-material/IosShare";
import React, { useEffect } from "react";

type VideoActionsProps = {
  counters: PostCounters;
  userActions: PostUserActions;
};

const VideoActions = ({ counters, userActions }: VideoActionsProps) => {
  const { like_count, bookmark_count } = counters;
  const { is_liked, is_bookmarked } = userActions;

  const [likeCount, setLikeCount] = React.useState(like_count);
  const [bookmarkCount, setBookmarkCount] = React.useState(bookmark_count);
  const [isLiked, setIsLiked] = React.useState(is_liked);
  const [isBookmarked, setIsBookmarked] = React.useState(is_bookmarked);

  useEffect(() => {
    setIsLiked(is_liked);
    setIsBookmarked(is_bookmarked);
    setLikeCount(like_count);
    setBookmarkCount(bookmark_count);
  }, [is_liked, is_bookmarked, like_count, bookmark_count]);

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
          {isLiked ? (
            <FavoriteRoundedIcon color="error" />
          ) : (
            <FavoriteBorderRoundedIcon />
          )}
        </IconButton>

        <Typography variant="body1" fontWeight={600}>
          {likeCount?.toString()}
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
          {isBookmarked ? (
            <BookmarkRoundedIcon />
          ) : (
            <BookmarkBorderRoundedIcon />
          )}
        </IconButton>

        <Typography variant="body1" fontWeight={600}>
          {bookmarkCount?.toString()}
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
