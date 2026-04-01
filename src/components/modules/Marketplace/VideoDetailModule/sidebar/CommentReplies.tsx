import { useInfiniteCommentsReplies } from "@/hooks/infiniteQuery/useInfiniteCommentsReplies";
import { PostComment } from "@/ts/models/social/PostComment";
import {
  Box,
  ButtonBase,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import CommentCard from "./CommentCard";
import { Reply } from "./VideoComments";

type CommentRepliesProps = {
  postId: number;
  commentId: number;
  repliesCount: number;
  shouldFetchReplies: boolean;
  onSetShouldFetchReplies: () => void;
};

const CommentReplies = ({
  postId,
  commentId,
  repliesCount,
  shouldFetchReplies,
  onSetShouldFetchReplies,
}: CommentRepliesProps) => {
  const { data, isLoading } = useInfiniteCommentsReplies(
    shouldFetchReplies,
    postId,
    commentId
  );
  const [reply, setReply] = React.useState<Reply | null>(null);

  const replies = data?.pages.flatMap((page) => page.results) ?? [];

  console.log("replies", replies);

  return (
    <Box>
      {!isLoading && replies.length === 0 && (
        <ButtonBase onClick={onSetShouldFetchReplies}>
          <Stack direction="row" alignItems="center">
            <Box sx={{ width: 25, height: 2, bgcolor: "divider", mr: 2 }} />
            <Typography color="text.secondary" mr={1}>
              Vezi răspunsurile
            </Typography>
            <Typography color="text.secondary">({repliesCount})</Typography>
          </Stack>
        </ButtonBase>
      )}

      {isLoading && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          my={1}
        >
          <CircularProgress size={25} />
        </Stack>
      )}

      <Box mt={2.5}>
        {!isLoading &&
          replies &&
          replies.map((r: PostComment) => (
            <CommentCard
              key={r.id}
              comment={r}
              avatar={r.user.avatar}
              reply={reply}
              onAddReply={() => setReply({ commentId: r.id, text: "" })}
              onRemoveReply={() => setReply(null)}
              onCreateReplyComment={() => {}}
            />
          ))}
      </Box>
    </Box>
  );
};

export default memo(CommentReplies);
