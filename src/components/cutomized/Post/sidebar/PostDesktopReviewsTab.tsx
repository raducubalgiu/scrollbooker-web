import ReviewCard from "@/components/modules/Marketplace/SocialModule/reviews/ReviewCard";
import { useInfiniteReviews } from "@/controllers/booking/review.controller";
import { Box, CircularProgress, Stack } from "@mui/material";
import React, { memo } from "react";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";

type ReviewsTabProps = {
  businessId: number;
  employeeId: number | null;
};

const PostDesktopReviewsTab = ({ businessId, employeeId }: ReviewsTabProps) => {
  const { data, isLoading } = useInfiniteReviews({ businessId, employeeId });
  const reviews = data?.pages.flatMap((p) => p.results) ?? [];

  return (
    <Box sx={styles.container}>
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
        <Box sx={styles.emptyState}>
          <NotFound
            compact
            sx={{ "& > .MuiStack-root": { mt: 0 } }}
            icon={<ReviewsOutlinedIcon />}
            title="Recenzii"
            description="Nu au fost găsite recenzii"
          />
        </Box>
      )}
    </Box>
  );
};

export default memo(PostDesktopReviewsTab);

const styles = {
  container: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    p: 3,
  },
  emptyState: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
