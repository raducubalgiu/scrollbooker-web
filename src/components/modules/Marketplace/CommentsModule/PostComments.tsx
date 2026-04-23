import React, { memo, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CommentComposer from "./CommentComposer";
import CommentThread from "./CommentThread";
import { PostComment, ReplyTarget } from "@/ts/models/social/PostComment";
import { useInfiniteComments } from "@/hooks/infiniteQuery/useInfiniteComments";
import { useMutate } from "@/hooks/useHttp";

type PostCommentsProps = {
  postId: number | undefined;
  postAuthorAvatar: string | null;
};

type CreateCommentPayload = {
  text: string;
  post_id: number;
  parent_id: number | null;
  reply_to_comment_id: number | null;
};

const PostComments = ({ postId, postAuthorAvatar }: PostCommentsProps) => {
  if (!postId) {
    return (
      <Stack alignItems="center" justifyContent="center" py={4}>
        <Typography color="text.secondary">
          Nu s-a putut încărca comentariile.
        </Typography>
      </Stack>
    );
  }

  const [newCommentText, setNewCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [activeReplyTarget, setActiveReplyTarget] =
    useState<ReplyTarget | null>(null);

  const {
    data,
    refetch,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteComments({
    enabled: true,
    postId,
  });

  const rootComments = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data]
  );

  const { mutate: createComment } = useMutate({
    key: ["comments", postId],
    method: "POST",
    url: "/api/comments",
    options: {
      onSuccess: () => {
        setNewCommentText("");
        setReplyText("");
        setActiveReplyTarget(null);
        refetch();
      },
    },
  });

  const { mutate: likeComment } = useMutate({
    key: ["like-comment", postId],
    method: "POST",
    url: "/api/comments/like",
  });

  const { mutate: unlikeComment } = useMutate({
    key: ["unlike-comment", postId],
    method: "DELETE",
    url: "/api/comments/like",
  });

  const handleCreateRootComment = () => {
    const text = newCommentText.trim();
    if (!text) return;

    const payload: CreateCommentPayload = {
      text,
      post_id: postId,
      parent_id: null,
      reply_to_comment_id: null,
    };

    createComment(payload);
  };

  const handleOpenReply = (target: ReplyTarget) => {
    setActiveReplyTarget((prev) => {
      const isSame =
        prev?.rootCommentId === target.rootCommentId &&
        prev?.replyToCommentId === target.replyToCommentId;

      if (isSame) {
        setReplyText("");
        return null;
      }

      setReplyText("");
      return target;
    });
  };

  const handleCloseReply = () => {
    setActiveReplyTarget(null);
    setReplyText("");
  };

  const handleSubmitReply = (rootComment: PostComment) => {
    if (!activeReplyTarget) return;

    const text = replyText.trim();
    if (!text) return;

    const payload: CreateCommentPayload = {
      text,
      post_id: postId,
      parent_id: rootComment.id,
      reply_to_comment_id: activeReplyTarget.replyToCommentId,
    };

    createComment(payload);
  };

  const handleToggleLike = async (comment: PostComment, nextLiked: boolean) => {
    if (nextLiked) {
      await likeComment({ comment_id: comment.id });
      return;
    }

    await unlikeComment({ comment_id: comment.id });
  };

  return (
    <Stack sx={styles.container}>
      <Box sx={styles.listContainer}>
        <Stack spacing={3}>
          {isLoading && rootComments.length === 0 && (
            <Stack alignItems="center" justifyContent="center" py={4}>
              <CircularProgress />
            </Stack>
          )}

          {!isLoading && rootComments.length === 0 && (
            <Typography color="text.secondary">
              Nu există comentarii momentan.
            </Typography>
          )}

          {rootComments.map((comment) => (
            <CommentThread
              key={comment.id}
              postId={postId}
              rootComment={comment}
              postAuthorAvatar={postAuthorAvatar}
              activeReplyTarget={activeReplyTarget}
              replyText={replyText}
              onReplyTextChange={setReplyText}
              onOpenReply={handleOpenReply}
              onCloseReply={handleCloseReply}
              onSubmitReply={handleSubmitReply}
              onToggleLike={handleToggleLike}
            />
          ))}

          {hasNextPage && (
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={600}
              sx={{ cursor: "pointer" }}
              onClick={() => fetchNextPage()}
            >
              {isFetchingNextPage
                ? "Se încarcă..."
                : "Vezi mai multe comentarii"}
            </Typography>
          )}
        </Stack>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <CommentComposer
          value={newCommentText}
          onChange={setNewCommentText}
          onSubmit={handleCreateRootComment}
          placeholder="Add comment..."
        />
      </Box>
    </Stack>
  );
};

export default memo(PostComments);

const styles = {
  container: { minHeight: 0, height: "100%" },
  listContainer: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    p: 3,
    scrollBarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
};
