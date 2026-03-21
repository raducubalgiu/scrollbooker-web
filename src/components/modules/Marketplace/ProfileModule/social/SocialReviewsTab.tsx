import { Box, CircularProgress, Stack } from "@mui/material";
import React, { memo, useCallback, useMemo, useState } from "react";
import RatingsDistribution from "@/components/cutomized/RatingsDistribution/RatingsDistribution";
import CustomTabs, {
  CustomTabType,
} from "@/components/core/CustomTabs/CustomTabs";
import { useCustomQuery } from "@/hooks/useHttp";
import { ReviewsSummaryResponse } from "@/ts/models/booking/review/ReviewsSummaryType";
import VideoReviewsTab from "./VideoReviewsTab";
import WrittenReviewsTab from "./WrittenReviewsTab";
import ReviewsSummaryHeader from "./ReviewsSummaryHeader";

type SocialReviewsTabProps = {
  userId: number | undefined;
  rootRef?: React.RefObject<HTMLDivElement | null>;
  disableInitialIgnore?: boolean;
};

const SocialReviewsTab = ({
  userId,
  rootRef,
  disableInitialIgnore,
}: SocialReviewsTabProps) => {
  const [selectedRatings, setSelectedRatings] = useState<Set<number>>(
    new Set()
  );

  const { data, isLoading } = useCustomQuery<ReviewsSummaryResponse>({
    url: `/api/social/reviews/summary?userId=${userId}`,
    key: ["reviewsSummary", userId],
    options: { enabled: !!userId },
  });

  const { ratings_average, ratings_count } = data || {};
  const [currentTab, setCurrentTab] = useState(0);

  const tabs: CustomTabType[] = useMemo(
    () => [
      { label: "Scrise", key: 0 },
      { label: "Video", key: 1 },
    ],
    []
  );

  const tabsContent = useMemo(() => {
    switch (currentTab) {
      case 0:
        return (
          <WrittenReviewsTab
            userId={userId}
            selectedRatings={selectedRatings}
            isLoadingSummary={isLoading}
            rootRef={rootRef}
            disableInitialIgnore={disableInitialIgnore}
          />
        );
      case 1:
        return (
          <VideoReviewsTab
            userId={userId}
            rootRef={rootRef}
            disableInitialIgnore={disableInitialIgnore}
          />
        );
      default:
        return null;
    }
  }, [userId, selectedRatings, isLoading, rootRef, disableInitialIgnore]);

  const handleRatingClick = useCallback((rating: number) => {
    setSelectedRatings((prev) => {
      if (prev.has(rating)) {
        prev.delete(rating);
      } else {
        prev.add(rating);
      }
      return new Set(prev);
    });
  }, []);

  const styles = {
    tabsContainer: {
      position: "sticky",
      top: 0,
      zIndex: 8,
      backgroundColor: "background.paper",
      py: 1,
      display: "flex",
      justifyContent: "center",
    },
  };

  return (
    <>
      {isLoading && (
        <Stack
          alignItems="center"
          justifyContent="center"
          width={"100%"}
          height={"100%"}
        >
          <CircularProgress />
        </Stack>
      )}
      {!isLoading && (
        <>
          {ratings_average !== undefined && ratings_count !== undefined && (
            <ReviewsSummaryHeader
              ratings_average={ratings_average}
              ratings_count={ratings_count}
            />
          )}

          <RatingsDistribution
            summary={data}
            selectedRatings={selectedRatings}
            onRatingClick={handleRatingClick}
          />

          <Box sx={styles.tabsContainer}>
            <CustomTabs
              currentTab={currentTab}
              tabs={tabs}
              setValue={setCurrentTab}
            />
          </Box>

          {tabsContent}
        </>
      )}
    </>
  );
};

export default memo(SocialReviewsTab);
