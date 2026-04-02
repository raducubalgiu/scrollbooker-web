import { useInfiniteReviews } from "@/hooks/infiniteQuery/useInfiniteReviews";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import ReviewCard from "../../ProfileModule/social/ReviewCard";

type ReviewsTabProps = {
  userId: number | undefined;
};

const ReviewsTab = ({ userId }: ReviewsTabProps) => {
  const { data, isLoading } = useInfiniteReviews(userId);
  const reviews = data?.pages.flatMap((p) => p.results) ?? [];

  return (
    <Box p={3}>
      {isLoading && (
        <Stack alignItems="center" justifyContent="center" py={4}>
          <CircularProgress />
        </Stack>
      )}
      {!isLoading &&
        reviews.length > 0 &&
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)}

      {!isLoading && reviews.length === 0 && (
        <Typography>Nu există recenzii.</Typography>
      )}
    </Box>
  );
};

export default memo(ReviewsTab);
