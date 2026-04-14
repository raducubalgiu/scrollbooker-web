import React, { memo, useMemo, useState } from "react";
import {
  Box,
  ButtonBase,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import CommentComposer from "./CommentComposer";
import CommentItem from "./CommentItem";
import { PostComment, ReplyTarget } from "@/ts/models/social/PostComment";
import { useInfiniteCommentReplies } from "@/hooks/infiniteQuery/useInfiniteCommentsReplies";

type CommentThreadProps = {
  postId: number;
  rootComment: PostComment;
  currentUserAvatar: string | null;
  postAuthorAvatar: string | null;
  activeReplyTarget: ReplyTarget | null;
  replyText: string;
  onReplyTextChange: (value: string) => void;
  onOpenReply: (target: ReplyTarget) => void;
  onCloseReply: () => void;
  onSubmitReply: (rootComment: PostComment) => void;
  onToggleLike: (
    comment: PostComment,
    nextLiked: boolean
  ) => Promise<void> | void;
};

const CommentThread = ({
  postId,
  rootComment,
  currentUserAvatar,
  postAuthorAvatar,
  activeReplyTarget,
  replyText,
  onReplyTextChange,
  onOpenReply,
  onCloseReply,
  onSubmitReply,
  onToggleLike,
}: CommentThreadProps) => {
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteCommentReplies({
      enabled: isRepliesOpen,
      postId,
      parentId: rootComment.id,
    });

  const replies = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data]
  );

  const isReplyComposerVisible =
    activeReplyTarget?.rootCommentId === rootComment.id;

  const handleReplyOnRoot = () => {
    onOpenReply({
      rootCommentId: rootComment.id,
      replyToCommentId: rootComment.id,
      replyToFullName: rootComment.user.fullname,
    });
  };

  const handleReplyOnReply = (reply: PostComment) => {
    if (!isRepliesOpen) {
      setIsRepliesOpen(true);
    }

    onOpenReply({
      rootCommentId: rootComment.id,
      replyToCommentId: reply.id,
      replyToFullName: reply.user.fullname,
    });
  };

  return (
    <Stack spacing={1.5}>
      <CommentItem
        comment={rootComment}
        postAuthorAvatar={postAuthorAvatar}
        onReply={handleReplyOnRoot}
        onToggleLike={onToggleLike}
      />

      {rootComment.replies_count > 0 && (
        <Box sx={{ pl: 7 }}>
          <ButtonBase
            onClick={() => setIsRepliesOpen((prev) => !prev)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "flex-start",
              mb: 1,
            }}
          >
            <Box sx={{ width: 24, height: 1.5, bgcolor: "divider" }} />
            <Typography color="text.secondary" fontWeight={600}>
              {isRepliesOpen ? "Ascunde răspunsurile" : "Vezi răspunsurile"}
            </Typography>
            <Typography color="text.secondary">
              ({rootComment.replies_count})
            </Typography>
          </ButtonBase>
        </Box>
      )}

      {isRepliesOpen && (
        <Box sx={{ pl: 7, mt: 5 }}>
          <Stack spacing={2}>
            {isLoading && replies.length === 0 && (
              <Stack direction="row" justifyContent="center" py={1}>
                <CircularProgress size={24} />
              </Stack>
            )}

            {replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                isReply
                postAuthorAvatar={postAuthorAvatar}
                onReply={handleReplyOnReply}
                onToggleLike={onToggleLike}
              />
            ))}

            {hasNextPage && (
              <ButtonBase
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                sx={{ justifyContent: "flex-start" }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={600}
                >
                  {isFetchingNextPage
                    ? "Se încarcă..."
                    : "Vezi mai multe răspunsuri"}
                </Typography>
              </ButtonBase>
            )}
          </Stack>
        </Box>
      )}

      {isReplyComposerVisible && (
        <Box sx={{ pl: 7 }}>
          <CommentComposer
            authUserAvatar={currentUserAvatar}
            value={replyText}
            onChange={onReplyTextChange}
            onSubmit={() => onSubmitReply(rootComment)}
            replyingTo={activeReplyTarget.replyToFullName}
            onCancel={onCloseReply}
            autoFocus
            placeholder={`Răspunde lui ${activeReplyTarget.replyToFullName}...`}
          />
        </Box>
      )}
    </Stack>
  );
};

export default memo(CommentThread);
