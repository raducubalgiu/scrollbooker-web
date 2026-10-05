import ReviewCard from "@/components/modules/Marketplace/ProfileModule/social/ReviewCard";
import { useInfiniteReviews } from "@/controllers/booking/review.controller";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { memo } from "react";

type ReviewsTabProps = {
  businessId: number;
  employeeId: number | null;
};

const PostDesktopReviewsTab = ({ businessId, employeeId }: ReviewsTabProps) => {
  const { data, isLoading } = useInfiniteReviews({ businessId, employeeId });
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
        reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onLike={() => {}}
            onNavigateToVideoReview={() => {}}
          />
        ))}

      {!isLoading && reviews.length === 0 && (
        <Typography>Nu există recenzii.</Typography>
      )}
    </Box>
  );
};

export default memo(PostDesktopReviewsTab);
