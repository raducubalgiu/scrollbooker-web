"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import FeedTabs, { FeedTabEnum } from "./FeedTabs";
import {
  useInfiniteExplorePosts,
  useInfiniteFollowingPosts,
} from "@/controllers/social/post.controller";
import { useAllServiceDomains } from "@/controllers/nomenclature/service-domain.controller";
import { usePostFeed } from "@/components/cutomized/Post/feed/usePostFeed";
import PostFeedView from "@/components/cutomized/Post/feed/PostFeedView";
import FeedFilterDialog from "./Filters/FeedFilterDialog";
import FeedFilterMobileOverlay from "./Filters/FeedFilterMobileOverlay";
import { useFeedState } from "@/providers/FeedStateProvider";

export default function FeedModule() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    currentTab,
    currentIndex,
    appliedServiceIds,
    appliedOnlyVideoReviews,
    setCurrentTab,
    setCurrentIndex,
    setAppliedFilters,
  } = useFeedState();
  const [showFilters, setShowFilters] = useState(false);

  const { data: domainsData, isLoading: isLoadingDomains } =
    useAllServiceDomains({ page: 1, limit: 100, all: false });
  const domains = domainsData?.results ?? [];

  const explorePosts = useInfiniteExplorePosts({
    serviceIds: Array.from(appliedServiceIds),
    onlyVideoReviews: appliedOnlyVideoReviews,
  });
  const followingPosts = useInfiniteFollowingPosts();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    currentTab === FeedTabEnum.EXPLORE ? explorePosts : followingPosts;

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data]
  );

  const postsCount = useMemo(() => data?.pages[0]?.count ?? 0, [data]);

  const feed = usePostFeed({
    posts,
    postsCount,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    initialIndex: currentIndex,
  });

  useEffect(() => {
    setCurrentIndex(feed.currentIndex);
  }, [feed.currentIndex, setCurrentIndex]);

  const handleTabChange = useCallback(
    (tab: FeedTabEnum) => {
      setCurrentTab(tab);
      feed.handleIndexChange(0);
    },
    [feed, setCurrentTab]
  );

  const handleToggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  const handleCloseFilters = useCallback(() => {
    setShowFilters(false);
  }, []);

  const handleApplyFilters = useCallback(
    (serviceIds: Set<number>, onlyVideoReviews: boolean) => {
      setAppliedFilters(serviceIds, onlyVideoReviews);
    },
    [setAppliedFilters]
  );

  const hasActiveFilters =
    appliedServiceIds.size > 0 || appliedOnlyVideoReviews;

  return (
    <Box sx={styles.root}>
      <PostFeedView
        posts={posts}
        feed={feed}
        headerSlot={
          <FeedTabs
            activeTab={currentTab}
            hasActiveFilters={hasActiveFilters}
            onHandleToggleDrawer={handleToggleFilters}
            onTabChange={handleTabChange}
          />
        }
      />

      {isMobile ? (
        <FeedFilterMobileOverlay
          open={showFilters}
          domains={domains}
          isLoadingDomains={isLoadingDomains}
          appliedServiceIds={appliedServiceIds}
          appliedOnlyVideoReviews={appliedOnlyVideoReviews}
          onApply={handleApplyFilters}
          onClose={handleCloseFilters}
        />
      ) : (
        <FeedFilterDialog
          open={showFilters}
          domains={domains}
          isLoadingDomains={isLoadingDomains}
          appliedServiceIds={appliedServiceIds}
          appliedOnlyVideoReviews={appliedOnlyVideoReviews}
          onApply={handleApplyFilters}
          onClose={handleCloseFilters}
        />
      )}
    </Box>
  );
}

const styles = {
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
} as const;
