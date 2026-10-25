import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { useGetPostAnalyticsSummary } from "@/controllers/social/post.controller";
import PostStatisticsContent from "./PostStatisticsContent";

type PostStatisticsBodyProps = {
  postId: number | null;
  enabled: boolean;
};

const PostStatisticsBody = ({ postId, enabled }: PostStatisticsBodyProps) => {
  const { data, isLoading, isError } = useGetPostAnalyticsSummary(
    postId,
    enabled
  );

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ py: 6 }}>
        <CircularProgress size={28} />
      </Stack>
    );
  }

  if (isError || !data) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ py: 6 }}>
        <Typography color="text.secondary">
          Nu am putut încărca statisticile.
        </Typography>
      </Stack>
    );
  }

  return <PostStatisticsContent summary={data} />;
};

export default PostStatisticsBody;
