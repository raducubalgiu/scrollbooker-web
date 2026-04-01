import React, { memo } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import { useInfiniteComments } from "@/hooks/infiniteQuery/useInfiniteComments";
import CommentCard from "./CommentCard";
import { useMutate } from "@/hooks/useHttp";
import { PostCommentCreate } from "@/ts/models/social/PostComment";

type VideoCommentsProps = {
  postId: number;
  avatar: string | null;
};

export type Reply = {
  commentId: number;
  text: string;
};

const VideoComments = ({ postId, avatar }: VideoCommentsProps) => {
  const [text, setText] = React.useState("");
  const [reply, setReply] = React.useState<Reply | null>(null);

  const { data, refetch, isLoading } = useInfiniteComments(postId);
  const comments = data?.pages.flatMap((page) => page.results) ?? [];
  const count = data?.pages[0]?.count ?? 0;

  const styles = {
    commentsContainer: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      px: 3,
      py: 2,
    },
    input: {
      "& .MuiOutlinedInput-root": {
        padding: 0,
        borderRadius: 50,
      },
      "& .MuiInputBase-inputMultiline": {
        padding: "12px 20px 0px 20px",
        borderRadius: 50,
      },
    },
  };

  const { mutate: createComment } = useMutate({
    key: ["comments", postId],
    method: "POST",
    url: `/api/comments`,
    options: {
      onSuccess: () => refetch(),
    },
  });

  const handleCreateComment = () => {
    const newComment: PostCommentCreate = {
      text: reply ? reply.text : text,
      post_id: postId,
      parent_id: reply?.commentId ?? null,
    };

    createComment(newComment);
    setText("");
  };

  return (
    <>
      <Typography px={3} py={2} fontWeight={700}>
        Commentarii ({count})
      </Typography>

      <Divider />

      <Box sx={styles.commentsContainer}>
        <Stack spacing={2.5}>
          {isLoading && (
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ height: "100%" }}
              flex={1}
            >
              <CircularProgress />
            </Stack>
          )}
          {!isLoading &&
            comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                avatar={avatar}
                reply={reply}
                onAddReply={(reply) => setReply(reply)}
                onRemoveReply={() => setReply(null)}
                onCreateReplyComment={handleCreateComment}
              />
            ))}
        </Stack>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar src={avatar ?? ""} sx={{ width: 45, height: 45 }} />

          <TextField
            fullWidth
            size="medium"
            placeholder="Add comment..."
            sx={styles.input}
            value={text}
            multiline
            minRows={0}
            maxRows={4}
            onChange={(e) => setText(e.target.value)}
          />

          <IconButton
            onClick={handleCreateComment}
            sx={{
              bgcolor: "primary.main",
              color: "#fff",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
            disabled={text.trim() === ""}
          >
            <ArrowUpwardOutlinedIcon />
          </IconButton>
        </Stack>
      </Box>
    </>
  );
};

export default memo(VideoComments);
