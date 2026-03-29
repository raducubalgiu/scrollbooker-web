import React from "react";
import { Post, PostCounters, PostUserActions } from "@/ts/models/social/Post";
import { IconButton, Stack, Typography } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import IosShareIcon from "@mui/icons-material/IosShare";
import { useMutate } from "@/hooks/useHttp";

type VideoActionsProps = {
  postId: number;
  counters: PostCounters;
  userActions: PostUserActions;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
};

const VideoActions = ({
  postId,
  counters,
  userActions,
  setPost,
}: VideoActionsProps) => {
  const { like_count, bookmark_count } = counters;
  const { is_liked, is_bookmarked } = userActions;

  const { mutate: like } = useMutate({
    key: ["like-post", postId],
    method: "POST",
    url: `/api/posts/like`,
  });

  const { mutate: unlike } = useMutate({
    key: ["unlike-post", postId],
    method: "DELETE",
    url: `/api/posts/like`,
  });

  const { mutate: bookmark } = useMutate({
    key: ["bookmark-post", postId],
    method: "POST",
    url: `/api/posts/bookmark`,
  });

  const { mutate: unbookmark } = useMutate({
    key: ["unbookmark-post", postId],
    method: "DELETE",
    url: `/api/posts/bookmark`,
  });

  const handleLike = () => {
    if (is_liked) {
      setPost((prev) => ({
        ...prev,
        counters: {
          ...prev.counters,
          like_count: Math.max(0, prev.counters.like_count - 1),
        },
        user_actions: {
          ...prev.user_actions,
          is_liked: false,
        },
      }));

      unlike(
        { post_id: postId },
        {
          onError: () => {
            setPost((prev) => ({
              ...prev,
              counters: {
                ...prev.counters,
                like_count: prev.counters.like_count + 1,
              },
              user_actions: {
                ...prev.user_actions,
                is_liked: true,
              },
            }));
          },
        }
      );

      return;
    }

    setPost((prev) => ({
      ...prev,
      counters: {
        ...prev.counters,
        like_count: prev.counters.like_count + 1,
      },
      user_actions: {
        ...prev.user_actions,
        is_liked: true,
      },
    }));

    like(
      { post_id: postId },
      {
        onError: () => {
          setPost((prev) => ({
            ...prev,
            counters: {
              ...prev.counters,
              like_count: Math.max(0, prev.counters.like_count - 1),
            },
            user_actions: {
              ...prev.user_actions,
              is_liked: false,
            },
          }));
        },
      }
    );
  };

  const handleBookmark = () => {
    if (is_bookmarked) {
      setPost((prev) => ({
        ...prev,
        counters: {
          ...prev.counters,
          bookmark_count: Math.max(0, prev.counters.bookmark_count - 1),
        },
        user_actions: {
          ...prev.user_actions,
          is_bookmarked: false,
        },
      }));

      unbookmark({ post_id: postId });

      return;
    }

    setPost((prev) => ({
      ...prev,
      counters: {
        ...prev.counters,
        bookmark_count: prev.counters.bookmark_count + 1,
      },
      user_actions: {
        ...prev.user_actions,
        is_bookmarked: true,
      },
    }));

    bookmark({ post_id: postId });
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2.5}
      sx={{ mt: 3, flexWrap: "wrap", rowGap: 1.5 }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton
          onClick={handleLike}
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
          onClick={handleBookmark}
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
