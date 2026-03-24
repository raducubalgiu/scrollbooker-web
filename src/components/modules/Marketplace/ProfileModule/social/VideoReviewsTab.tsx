import React, { memo, useEffect, useRef } from "react";
import { useInfiniteReviews } from "@/hooks/infiniteQuery/useInfiniteReviews";

type VideoReviewsTabProps = {
  userId?: number | undefined;
  rootRef?: React.RefObject<HTMLDivElement | null>;
  disableInitialIgnore?: boolean;
};

const VideoReviewsTab = ({
  userId,
  rootRef,
  disableInitialIgnore,
}: VideoReviewsTabProps) => {
  const {
    data: videoReviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteReviews(userId, new Set<number>());

  //const reviews = videoReviews?.pages.flatMap((p) => p.results) ?? [];
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
    <>
      {videoReviews?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.results.map((review) => (
            <div
              key={review.id}
              style={{
                marginBottom: 16,
                padding: 16,
                border: "1px solid #ccc",
                borderRadius: 8,
              }}
            >
              <h3 style={{ margin: 0, fontWeight: 600 }}>{review.review}</h3>
              <p style={{ margin: "8px 0 0" }}>{review.created_at}</p>
            </div>
          ))}
        </React.Fragment>
      ))}
      {/* {!isLoadingVideoReviews && reviews.length === 0 && (
        <Typography variant="h6" color="text.secondary" align="center" mt={4}>
          Nu există recenzii video.
        </Typography>
      )}

      {!isLoadingVideoReviews &&
        reviews.map((review) => (
          <Box
            key={review.id}
            sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              {review.review}
            </Typography>
            <Typography variant="body1">{review.created_at}</Typography>
          </Box>
        ))}

      <div ref={sentinelRef} aria-hidden style={{ height: 1 }} />

      {isFetchingNextPage && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )} */}
    </>
  );
};

export default memo(VideoReviewsTab);
