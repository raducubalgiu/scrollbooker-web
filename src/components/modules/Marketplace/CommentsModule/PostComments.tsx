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
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateComment,
  useInfiniteComments,
  useLikeComment,
  useUnlikeComment,
} from "@/controllers/social/comment.controller";
import { patchCommentInCache } from "@/utils/commentCache";

type PostCommentsProps = {
  postId: number | undefined;
  postAuthorAvatar: string | null;
};

const PostComments = ({ postId, postAuthorAvatar }: PostCommentsProps) => {
  const [newCommentText, setNewCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [activeReplyTarget, setActiveReplyTarget] =
    useState<ReplyTarget | null>(null);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteComments({
      enabled: true,
      postId: postId ?? 0,
    });

  const rootComments = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data]
  );

  const { mutate: createComment, isPending: isSubmittingComment } =
    useCreateComment();

  const queryClient = useQueryClient();
  const { mutate: likeComment } = useLikeComment();
  const { mutate: unlikeComment } = useUnlikeComment();

  if (!postId) {
    return (
      <Stack alignItems="center" justifyContent="center" py={4}>
        <Typography color="text.secondary">
          Nu s-a putut încărca comentariile.
        </Typography>
      </Stack>
    );
  }

  const handleCreateRootComment = () => {
    const text = newCommentText.trim();
    if (!text) return;

    createComment(
      { postId, text, parentId: null, replyToCommentId: null },
      {
        onSuccess: () => {
          setNewCommentText("");
        },
      }
    );
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

    createComment(
      {
        postId,
        text,
        parentId: rootComment.id,
        replyToCommentId: activeReplyTarget.replyToCommentId,
      },
      {
        onSuccess: () => {
          setReplyText("");
          setActiveReplyTarget(null);
        },
      }
    );
  };

  const toggleCommentLike = (comment: PostComment, nextLiked: boolean): PostComment => ({
    ...comment,
    is_liked: nextLiked,
    like_count: Math.max(0, comment.like_count + (nextLiked ? 1 : -1)),
  });

  const handleToggleLike = (comment: PostComment, nextLiked: boolean) => {
    patchCommentInCache(queryClient, postId, comment, (c) =>
      toggleCommentLike(c, nextLiked)
    );

    const mutate = nextLiked ? likeComment : unlikeComment;
    mutate(comment.id, {
      onError: () =>
        patchCommentInCache(queryClient, postId, comment, (c) =>
          toggleCommentLike(c, !nextLiked)
        ),
    });
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
              isSubmitting={isSubmittingComment}
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
          disabled={isSubmittingComment}
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
    px: { xs: 1.5, md: 3 },
    py: { xs: 2, md: 3 },
    scrollBarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
};
