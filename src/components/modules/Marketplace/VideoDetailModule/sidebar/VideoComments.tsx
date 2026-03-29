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

const VideoComments = ({ postId, avatar }: VideoCommentsProps) => {
  const [text, setText] = React.useState("");

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
        borderRadius: 50,
        bgcolor: "action.hover",
        "& fieldset": {
          borderColor: "transparent",
        },
        "&:hover fieldset": {
          borderColor: "transparent",
        },
        "&.Mui-focused fieldset": {
          borderColor: "transparent",
        },
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
      text,
      post_id: postId,
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
              <CommentCard key={comment.id} comment={comment} avatar={avatar} />
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
          >
            <ArrowUpwardOutlinedIcon />
          </IconButton>
        </Stack>
      </Box>
    </>
  );
};

export default memo(VideoComments);
