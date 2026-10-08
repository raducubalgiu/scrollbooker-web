import React, { memo } from "react";
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
  onToggleLike?: (comment: PostComment, nextLiked: boolean) => void;
};

const CommentItem = ({
  comment,
  postAuthorAvatar,
  isReply = false,
  onReply,
  onToggleLike,
}: CommentItemProps) => {
  const handleToggleLike = () => {
    onToggleLike?.(comment, !comment.is_liked);
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
          spacing={0.5}
          alignItems="center"
          sx={{ mb: 0.5, flexWrap: "wrap" }}
        >
          <Typography fontWeight={700}>{comment.user.fullname}</Typography>

          <Typography variant="caption" color="text.secondary">
            {dayjs(comment.created_at).fromNow()}
          </Typography>
        </Stack>

        <Typography
          sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 17 }}
        >
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
              sx={{ cursor: "pointer", fontSize: { xs: 13 } }}
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
              {comment.is_liked ? (
                <FavoriteIcon fontSize="small" color="error" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>

            {comment.like_count > 0 && (
              <Typography color="text.secondary" fontWeight={600}>
                {comment.like_count}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default memo(CommentItem);
