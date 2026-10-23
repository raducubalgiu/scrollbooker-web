import { Box, CircularProgress, Stack } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useGetReviewsSummary } from "@/controllers/booking/review.controller";
import ReviewsSummarySection from "./ReviewsSummarySection";
import WrittenReviewsTab from "./WrittenReviewsTab";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";

// Componentă comună, folosită atât în SocialModal (tab-ul Recenzii), cât
// și în PostReviewsSheet — orice modificare de aici se reflectă în ambele
// locuri.
type ReviewsContentProps = {
  businessId: number;
  employeeId: number | null;
  rootRef?: React.RefObject<HTMLDivElement | null>;
  disableInitialIgnore?: boolean;
};

// MVP: nu includem recenzii video — tab-urile ALL/VIDEO (+ VideoReviewsTab)
// sunt comentate temporar, afișăm direct lista ALL (WrittenReviewsTab).
// const TABS: CustomTabType[] = [
//   { label: "Scrise", key: 0 },
//   { label: "Video", key: 1 },
// ];

const ReviewsContent = ({
  businessId,
  employeeId,
  rootRef,
  disableInitialIgnore,
}: ReviewsContentProps) => {
  const [selectedRatings, setSelectedRatings] = useState<Set<number>>(
    () => new Set()
  );
  // const [currentTab, setCurrentTab] = useState(0);
  const { data, isLoading } = useGetReviewsSummary({ businessId, employeeId });

  const summary = useMemo(
    () =>
      data
        ? {
            ratingsAverage: Number(data.ratings_average) || 0,
            ratingsCount: Number(data.ratings_count) || 0,
            breakdown: data.breakdown.map((item) => ({
              rating: Number(item.rating),
              count: Number(item.count) || 0,
            })),
          }
        : null,
    [data]
  );

  const handleRatingClick = useCallback((rating: number) => {
    setSelectedRatings((prev) => {
      const next = new Set(prev);
      if (next.has(rating)) next.delete(rating);
      else next.add(rating);
      return next;
    });
  }, []);

  if (isLoading) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        <CircularProgress />
      </Stack>
    );
  }

  if (!summary || summary.ratingsCount === 0) {
    return (
      <NotFound
        title="Recenzii"
        description="Nu au fost găsite recenzii"
        icon={<ReviewsOutlinedIcon />}
      />
    );
  }

  return (
    <Box>
      <ReviewsSummarySection
        summary={summary}
        selectedRatings={selectedRatings}
        onRatingClick={handleRatingClick}
      />

      {/* MVP: tab-urile ALL/VIDEO sunt dezactivate, afișăm direct lista ALL.
      <Box sx={styles.tabsContainer}>
        <CustomTabs
          currentTab={currentTab}
          tabs={TABS}
          setValue={setCurrentTab}
        />
      </Box>
      */}

      <WrittenReviewsTab
        businessId={businessId}
        employeeId={employeeId}
        selectedRatings={selectedRatings}
        isLoadingSummary={isLoading}
        rootRef={rootRef}
        disableInitialIgnore={disableInitialIgnore}
      />

      {/* MVP: ramura video, dezactivată temporar.
      {currentTab === 1 && (
        <VideoReviewsTab
          businessId={businessId}
          employeeId={employeeId}
          rootRef={rootRef}
          disableInitialIgnore={disableInitialIgnore}
        />
      )}
      */}
    </Box>
  );
};

export default ReviewsContent;

// const styles = {
//   tabsContainer: {
//     position: "sticky",
//     top: 0,
//     zIndex: 8,
//     backgroundColor: "background.default",
//     py: 1,
//     borderTop: "1px solid transparent",
//     display: "flex",
//     justifyContent: "center",
//   },
// };
