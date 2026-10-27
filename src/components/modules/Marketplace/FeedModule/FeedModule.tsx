"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
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
import {
  buildFeedUrl,
  LAST_FEED_URL_STORAGE_KEY,
  parseFeedUrlState,
} from "./feedUrlState";
import { useUserLocation } from "@/hooks/useUserLocation";
import { EngagementSourceEnum } from "@/ts/enums/EngagementSourceEnum";

export default function FeedModule() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const searchParams = useSearchParams();
  const initialUrlState = useMemo(
    () => parseFeedUrlState(searchParams),
    // Read once, at mount, as the seed for local state — not meant to react
    // to later changes (we write the URL ourselves via history.replaceState,
    // which Next's router doesn't pick back up, by design).
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const initialPostIdRef = useRef<number | null>(initialUrlState.postId);

  const [currentTab, setCurrentTab] = useState<FeedTabEnum>(
    initialUrlState.tab
  );
  const [appliedServiceIds, setAppliedServiceIds] = useState<Set<number>>(
    initialUrlState.serviceIds
  );
  const [appliedOnlyVideoReviews, setAppliedOnlyVideoReviews] = useState(
    initialUrlState.onlyVideoReviews
  );
  const [appliedOnlyNearby, setAppliedOnlyNearby] = useState(
    initialUrlState.onlyNearby
  );
  const [showFilters, setShowFilters] = useState(false);

  const {
    status: locationStatus,
    location: userLocation,
    requestLocation,
  } = useUserLocation();
  const hasLocationAccess = locationStatus === "granted";

  const { data: domainsData, isLoading: isLoadingDomains } =
    useAllServiceDomains({ page: 1, limit: 100, all: false });
  const domains = domainsData?.results ?? [];

  const explorePosts = useInfiniteExplorePosts({
    serviceIds: Array.from(appliedServiceIds),
    onlyVideoReviews: appliedOnlyVideoReviews,
    onlyNearby: appliedOnlyNearby,
    userLat: userLocation?.lat,
    userLng: userLocation?.lng,
  });
  const followingPosts = useInfiniteFollowingPosts();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    currentTab === FeedTabEnum.EXPLORE ? explorePosts : followingPosts;

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data]
  );

  const postsCount = useMemo(() => data?.pages[0]?.count ?? 0, [data]);

  const initialIndex = useMemo(() => {
    if (initialPostIdRef.current == null) return undefined;
    const idx = posts.findIndex((p) => p.id === initialPostIdRef.current);
    return idx >= 0 ? idx : undefined;
  }, [posts]);

  const feed = usePostFeed({
    posts,
    postsCount,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    initialIndex,
    engagementSource:
      currentTab === FeedTabEnum.EXPLORE
        ? EngagementSourceEnum.EXPLORE_FEED
        : EngagementSourceEnum.FOLLOWING_FEED,
  });

  // Oglindim poziția curentă în URL (fără să trecem prin router-ul Next —
  // vrem doar bara de adrese/history actualizate, nu un re-render/refetch la
  // fiecare swipe) și în sessionStorage, ca linkurile de nav către feed să
  // poată relua exact de aici, nu de la /feed gol.
  useEffect(() => {
    const url = buildFeedUrl({
      tab: currentTab,
      postId: feed.currentPost?.id ?? null,
      serviceIds: appliedServiceIds,
      onlyVideoReviews: appliedOnlyVideoReviews,
      onlyNearby: appliedOnlyNearby,
    });

    window.history.replaceState(null, "", url);
    try {
      sessionStorage.setItem(LAST_FEED_URL_STORAGE_KEY, url);
    } catch {
      // sessionStorage unavailable — URL-ul din bară rămâne corect oricum.
    }
  }, [
    currentTab,
    feed.currentPost?.id,
    appliedServiceIds,
    appliedOnlyVideoReviews,
    appliedOnlyNearby,
  ]);

  const handleTabChange = useCallback(
    (tab: FeedTabEnum) => {
      setCurrentTab(tab);
      feed.handleIndexChange(0);
    },
    [feed]
  );

  const handleToggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  const handleCloseFilters = useCallback(() => {
    setShowFilters(false);
  }, []);

  const handleApplyFilters = useCallback(
    (
      serviceIds: Set<number>,
      onlyVideoReviews: boolean,
      onlyNearby: boolean
    ) => {
      setAppliedServiceIds(serviceIds);
      setAppliedOnlyVideoReviews(onlyVideoReviews);
      setAppliedOnlyNearby(onlyNearby);
    },
    []
  );

  const handleRequestLocationAccess = useCallback(() => {
    void requestLocation();
  }, [requestLocation]);

  const activeFiltersCount =
    appliedServiceIds.size +
    (appliedOnlyVideoReviews ? 1 : 0) +
    (appliedOnlyNearby ? 1 : 0);

  return (
    <Box sx={styles.root}>
      <PostFeedView
        posts={posts}
        feed={feed}
        headerSlot={
          <FeedTabs
            activeTab={currentTab}
            activeFiltersCount={activeFiltersCount}
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
          appliedOnlyNearby={appliedOnlyNearby}
          hasLocationAccess={hasLocationAccess}
          onRequestLocationAccess={handleRequestLocationAccess}
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
          appliedOnlyNearby={appliedOnlyNearby}
          hasLocationAccess={hasLocationAccess}
          onRequestLocationAccess={handleRequestLocationAccess}
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
