import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import CustomTabs, {
  CustomTabType,
} from "@/components/core/CustomTabs/CustomTabs";
import { useGetReviewsSummary } from "@/controllers/booking/review.controller";
import ReviewsSummarySection from "./ReviewsSummarySection";
import WrittenReviewsTab from "./WrittenReviewsTab";
import VideoReviewsTab from "./VideoReviewsTab";

type SocialReviewsTabProps = {
  businessId: number;
  employeeId: number | null;
  rootRef?: React.RefObject<HTMLDivElement | null>;
  disableInitialIgnore?: boolean;
};

const TABS: CustomTabType[] = [
  { label: "Scrise", key: 0 },
  { label: "Video", key: 1 },
];

const SocialReviewsTab = ({
  businessId,
  employeeId,
  rootRef,
  disableInitialIgnore,
}: SocialReviewsTabProps) => {
  const [selectedRatings, setSelectedRatings] = useState<Set<number>>(
    () => new Set()
  );
  const [currentTab, setCurrentTab] = useState(0);
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
      <Box sx={{ p: 2.5 }}>
        <Typography sx={{ textAlign: "center" }} color="text.secondary">
          Nu au fost găsite rezultate
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mx: 2 }}>
      <ReviewsSummarySection
        summary={summary}
        selectedRatings={selectedRatings}
        onRatingClick={handleRatingClick}
      />

      <Box sx={styles.tabsContainer}>
        <CustomTabs
          currentTab={currentTab}
          tabs={TABS}
          setValue={setCurrentTab}
        />
      </Box>

      {currentTab === 0 ? (
        <WrittenReviewsTab
          businessId={businessId}
          employeeId={employeeId}
          selectedRatings={selectedRatings}
          isLoadingSummary={isLoading}
          rootRef={rootRef}
          disableInitialIgnore={disableInitialIgnore}
        />
      ) : (
        <VideoReviewsTab
          businessId={businessId}
          employeeId={employeeId}
          rootRef={rootRef}
          disableInitialIgnore={disableInitialIgnore}
        />
      )}
    </Box>
  );
};

export default SocialReviewsTab;

const styles = {
  tabsContainer: {
    position: "sticky",
    top: 0,
    zIndex: 8,
    backgroundColor: "background.default",
    py: 1,
    borderTop: "1px solid transparent",
    display: "flex",
    justifyContent: "center",
  },
};
