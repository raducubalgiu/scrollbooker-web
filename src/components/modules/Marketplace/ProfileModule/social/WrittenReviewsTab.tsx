import { useInfiniteReviews } from "@/hooks/infiniteQuery/useInfiniteReviews";
import { Box, CircularProgress, Typography } from "@mui/material";
import React, { memo, useEffect, useRef } from "react";
import ReviewCard from "./ReviewCard";

type WrittenReviewsTabProps = {
  userId: number | undefined;
  selectedRatings: Set<number>;
  isLoadingSummary: boolean;
  rootRef?: React.RefObject<HTMLDivElement | null> | undefined;
  disableInitialIgnore?: boolean | undefined;
};

const WrittenReviewsTab = ({
  userId,
  selectedRatings,
  isLoadingSummary,
  rootRef,
  disableInitialIgnore,
}: WrittenReviewsTabProps) => {
  const {
    data: writtenReviews,
    isLoading: isLoadingWrittenReviews,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteReviews(userId, selectedRatings);

  const reviews = writtenReviews?.pages.flatMap((p) => p.results) ?? [];
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef?.current ?? null;
    const sentinel = sentinelRef.current;
    if (!sentinel || !root) return;

    let ignoreInitial = !disableInitialIgnore;
    const initTimer = window.setTimeout(() => {
      ignoreInitial = false;
    }, 200);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (ignoreInitial) return;
        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root, threshold: 0.1 }
    );

    observer.observe(sentinel);

    return () => {
      clearTimeout(initTimer);
      observer.disconnect();
    };
  }, [
    rootRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    disableInitialIgnore,
  ]);

  return (
    <Box sx={{ mt: 1.5 }}>
      {!isLoadingWrittenReviews && reviews.length === 0 && (
        <Typography variant="h6" color="text.secondary" align="center" mt={4}>
          Nu există recenzii scrise.
        </Typography>
      )}

      {!isLoadingWrittenReviews &&
        !isLoadingSummary &&
        !isRefetching &&
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)}

      <div ref={sentinelRef} aria-hidden style={{ height: 1 }} />

      {(isFetchingNextPage || isRefetching) && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 5,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default memo(WrittenReviewsTab);
