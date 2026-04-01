import React, { memo, useEffect, useState } from "react";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PostComment } from "@/ts/models/social/PostComment";

dayjs.extend(relativeTime);

type CommentItemProps = {
  comment: PostComment;
  postAuthorAvatar: string | null;
  isReply?: boolean;
  onReply: (comment: PostComment) => void;
  onToggleLike?: (
    comment: PostComment,
    nextLiked: boolean
  ) => Promise<void> | void;
};

const CommentItem = ({
  comment,
  postAuthorAvatar,
  isReply = false,
  onReply,
  onToggleLike,
}: CommentItemProps) => {
  const [liked, setLiked] = useState(comment.is_liked);
  const [likeCount, setLikeCount] = useState(comment.like_count ?? 0);

  useEffect(() => {
    setLiked(comment.is_liked);
    setLikeCount(comment.like_count ?? 0);
  }, [comment.is_liked, comment.like_count]);

  const handleToggleLike = async () => {
    const nextLiked = !liked;

    setLiked(nextLiked);
    setLikeCount((prev) => prev + (nextLiked ? 1 : -1));

    try {
      await onToggleLike?.(comment, nextLiked);
    } catch {
      setLiked(!nextLiked);
      setLikeCount((prev) => prev - (nextLiked ? 1 : -1));
    }
  };

  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Avatar
        src={comment.user.avatar ?? ""}
        sx={{ width: isReply ? 32 : 40, height: isReply ? 32 : 40 }}
      />

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mb: 0.5, flexWrap: "wrap" }}
        >
          <Typography fontWeight={700}>@{comment.user.username}</Typography>

          <Typography variant="caption" color="text.secondary">
            {dayjs(comment.created_at).fromNow()}
          </Typography>
        </Stack>

        <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {comment.text}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 1 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography
              color="text.secondary"
              fontWeight={600}
              sx={{ cursor: "pointer" }}
              onClick={() => onReply(comment)}
            >
              Răspunde
            </Typography>

            {comment.liked_by_post_author && (
              <Stack direction="row" alignItems="center" spacing={0.75}>
                <Avatar
                  src={postAuthorAvatar ?? ""}
                  sx={{ width: 20, height: 20 }}
                />
                <Typography variant="caption" color="text.secondary">
                  apreciat de autor
                </Typography>
              </Stack>
            )}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <IconButton size="small" onClick={handleToggleLike}>
              {liked ? (
                <FavoriteIcon fontSize="small" color="error" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>

            {likeCount > 0 && (
              <Typography variant="caption" color="text.secondary">
                {likeCount}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default memo(CommentItem);
