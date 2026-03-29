import { PostComment } from "@/ts/models/social/PostComment";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { memo, useEffect, useState } from "react";
import { useMutate } from "@/hooks/useHttp";

dayjs.extend(relativeTime);

type CommentCardProps = {
  comment: PostComment;
  avatar: string | null;
};

const CommentCard = ({ comment, avatar }: CommentCardProps) => {
  const [likeCount, setLikeCount] = useState(comment.like_count ?? 0);
  const [liked, setLiked] = useState(comment.is_liked);

  const { user, text, liked_by_post_author } = comment;

  useEffect(() => {
    setLiked(comment.is_liked);
    setLikeCount(comment.like_count ?? 0);
  }, [comment.is_liked, comment.like_count]);

  const { mutate: like } = useMutate({
    key: ["like-comment", comment.id],
    method: "POST",
    url: `/api/comments/like`,
    options: {
      onError: () => {
        setLiked((prev) => !prev);
        setLikeCount((prev) => prev - 1);
      },
    },
  });

  const { mutate: unlike } = useMutate({
    key: ["unlike-comment", comment.id],
    method: "DELETE",
    url: `/api/comments/like`,
    options: {
      onError: () => {
        setLiked((prev) => !prev);
        setLikeCount((prev) => prev + 1);
      },
    },
  });

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      like({ comment_id: comment.id });
    } else {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
      unlike({ comment_id: comment.id });
    }
  };

  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Avatar src={user.avatar ?? ""} sx={{ width: 40, height: 40 }} />

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
          <Typography fontWeight={700}>@{user.username}</Typography>
          <Typography variant="caption" color="text.secondary">
            {dayjs(comment.created_at).fromNow()}
          </Typography>
        </Stack>

        <Typography>{text}</Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 1 }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={600}
            sx={{ cursor: "pointer" }}
          >
            Răspunde
          </Typography>

          <Stack direction="row" alignItems="center">
            {liked_by_post_author && (
              <Avatar
                src={avatar ?? ""}
                sx={{ width: 24, height: 24, mr: 2 }}
              />
            )}

            <Typography color="text.secondary" fontWeight={600}>
              {likeCount}
            </Typography>

            <IconButton size="medium" onClick={handleLike}>
              {!liked ? (
                <FavoriteBorderRoundedIcon />
              ) : (
                <FavoriteRoundedIcon color="error" />
              )}
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default memo(CommentCard);
