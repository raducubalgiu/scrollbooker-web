import { PostComment } from "@/ts/models/social/PostComment";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { memo, useEffect, useState } from "react";
import { useMutate } from "@/hooks/useHttp";
import CloseIcon from "@mui/icons-material/Close";
import { Reply } from "./VideoComments";
import CommentReplies from "./CommentReplies";

dayjs.extend(relativeTime);

type CommentCardProps = {
  comment: PostComment;
  avatar: string | null;
  reply: Reply | null;
  onAddReply: (reply: Reply) => void;
  onRemoveReply: () => void;
  onCreateReplyComment: () => void;
};

const CommentCard = ({
  comment,
  avatar,
  reply,
  onAddReply,
  onRemoveReply,
  onCreateReplyComment,
}: CommentCardProps) => {
  const [likeCount, setLikeCount] = useState(comment.like_count ?? 0);
  const [liked, setLiked] = useState(comment.is_liked);
  const [shouldFetchReplies, setShouldFetchReplies] = useState(false);

  const { id, post_id, user, text, liked_by_post_author, replies_count } =
    comment;

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
        >
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={600}
            sx={{ cursor: "pointer" }}
            onClick={() => onAddReply({ commentId: comment.id, text: "" })}
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

        {reply && reply.commentId === comment.id && (
          <Stack flexDirection="row" alignItems="center" my={2} gap={1}>
            <TextField
              size="small"
              placeholder="Raspunde..."
              fullWidth
              value={reply.text}
              multiline
              minRows={0}
              maxRows={4}
              onChange={(e) =>
                onAddReply({ commentId: reply.commentId, text: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: 0,
                  borderRadius: 50,
                },
                "& .MuiInputBase-inputMultiline": {
                  padding: "12px 20px 0px 20px",
                  borderRadius: 50,
                },
              }}
            />

            <IconButton
              onClick={onCreateReplyComment}
              sx={{
                bgcolor: "primary.main",
                color: "#fff",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
              disabled={reply.text.trim() === ""}
            >
              <ArrowUpwardOutlinedIcon />
            </IconButton>

            <IconButton onClick={onRemoveReply}>
              <CloseIcon />
            </IconButton>
          </Stack>
        )}

        {comment.replies_count > 0 && (
          <CommentReplies
            postId={post_id}
            commentId={id}
            repliesCount={replies_count}
            shouldFetchReplies={shouldFetchReplies}
            onSetShouldFetchReplies={() => setShouldFetchReplies(true)}
          />
        )}
      </Box>
    </Stack>
  );
};

export default memo(CommentCard);
