"use client";

import { Box, Slide } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import PostActions from "../../../cutomized/Post/actions/PostActions";
import ExploreControls from "./ExploreControls";
import { useInfiniteExplorePosts } from "@/hooks/infiniteQuery/useInfiniteExplorePosts";
import { useInfiniteFollowingPosts } from "@/hooks/infiniteQuery/useInfiniteFollowingPosts";
import ExploreDrawer from "./ExploreDrawer";
import { useExplorePlayerPool } from "./useExplorePlayerPool";
import { useExplorePaginationPrefetch } from "./useExplorePaginationPrefetch";
import { useVideoNeighborsPreload } from "./useVideoNeighborsPreload";
import { ExploreVideoPool } from "./ExploreVideoPool";
import ExploreHeaderMenu, { ExploreTabEnum } from "./ExploreHeaderMenu";
import ExploreSidebar from "@/components/cutomized/Post/sidebar/ExploreSidebar";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { Product } from "@/ts/models/booking/product/Product";
import PostLinkedProductsSheet from "../../../cutomized/Post/sheets/PostLinkedProductsSheet";
import PostCommentsSheet from "@/components/cutomized/Post/sheets/PostCommentsSheet";
import PostReviewsSheet from "@/components/cutomized/Post/sheets/PostReviewsSheet";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppRoutes } from "@/utils/routes";
import { BookingSourceEnum } from "@/ts/enums/BookingSourceEnum";
import PostMoreSheet from "@/components/cutomized/Post/sheets/PostMoreSheet";
import { useQueryClient } from "@tanstack/react-query";

const PREFETCH_OFFSET = 2;

export default function ExploreModule() {
  const [currentTab, setCurrentTab] = useState<ExploreTabEnum>(
    ExploreTabEnum.EXPLORE
  );
  const { navigateTo } = useAppNavigation();
  const queryClient = useQueryClient();

  const [showDrawer, setShowDrawer] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const explorePosts = useInfiniteExplorePosts();
  const followingPosts = useInfiniteFollowingPosts();

  const activeQueryKey =
    currentTab === ExploreTabEnum.EXPLORE
      ? ["explore-posts"]
      : ["following-posts"];

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    currentTab === ExploreTabEnum.EXPLORE ? explorePosts : followingPosts;

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data]
  );

  const postsCount = useMemo(() => data?.pages[0]?.count ?? 0, [data]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTabChange = useCallback((tab: ExploreTabEnum) => {
    setCurrentTab(tab);
    setCurrentIndex(0);
  }, []);

  const {
    prevPost,
    currentPost,
    nextPost,
    poolItems,
    slideOffset,
    isAnimating,
  } = useExplorePlayerPool({
    posts,
    currentIndex,
  });

  useExplorePaginationPrefetch({
    currentIndex,
    postsLength: posts.length,
    postsCount,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    prefetchOffset: PREFETCH_OFFSET,
  });

  useVideoNeighborsPreload({
    prevSrc: prevPost?.media_files?.[0]?.url ?? "",
    nextSrc: nextPost?.media_files?.[0]?.url ?? "",
  });

  useEffect(() => {
    if (currentIndex > 0 && currentIndex >= posts.length) {
      setCurrentIndex(Math.max(0, posts.length - 1));
    }
  }, [currentIndex, posts.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, posts.length - 1);
      return prev < maxIndex ? prev + 1 : prev;
    });
  }, [posts.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const { user_actions, counters } = currentPost ?? {};

  const { mutate: apiLike } = useMutate({
    key: ["like-post", currentPost?.id],
    method: "POST",
    url: `/api/posts/like`,
  });

  const { mutate: apiUnlike } = useMutate({
    key: ["unlike-post", currentPost?.id],
    method: "DELETE",
    url: `/api/posts/like`,
  });

  const { mutate: apiBookmark } = useMutate({
    key: ["bookmark-post", currentPost?.id],
    method: "POST",
    url: `/api/posts/bookmark`,
  });

  const { mutate: apiUnbookmark } = useMutate({
    key: ["unbookmark-post", currentPost?.id],
    method: "DELETE",
    url: `/api/posts/bookmark`,
  });

  const { data: linkedProducts, isLoading: isLoadingLinkedProducts } =
    useCustomQuery<Product[]>({
      key: ["post-linked-products", currentPost?.id],
      url: `/api/posts/${currentPost?.id}/linked-products`,
      options: {
        enabled: !!currentPost?.id,
      },
    });

  const updateInfinitePostState = useCallback(
    (
      postId: number,
      type: "is_liked" | "is_bookmarked",
      action: "increment" | "decrement"
    ) => {
      const counterKey = type === "is_liked" ? "like_count" : "bookmark_count";
      const change = action === "increment" ? 1 : -1;

      queryClient.setQueryData(activeQueryKey, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            results: page.results.map((p: any) => {
              if (p.id !== postId) return p;
              return {
                ...p,
                counters: {
                  ...p.counters,
                  [counterKey]: Math.max(0, p.counters[counterKey] + change),
                },
                user_actions: {
                  ...p.user_actions,
                  [type]: action === "increment",
                },
              };
            }),
          })),
        };
      });
    },
    [queryClient, activeQueryKey]
  );

  const handleLike = useCallback(() => {
    if (!currentPost) return;
    const isLiked = currentPost.user_actions.is_liked;

    updateInfinitePostState(
      currentPost.id,
      "is_liked",
      isLiked ? "decrement" : "increment"
    );

    const triggerApi = isLiked ? apiUnlike : apiLike;
    triggerApi(
      { post_id: currentPost.id },
      {
        onError: () =>
          updateInfinitePostState(
            currentPost.id,
            "is_liked",
            isLiked ? "increment" : "decrement"
          ),
      }
    );
  }, [currentPost, apiLike, apiUnlike, updateInfinitePostState]);

  const handleBookmark = useCallback(() => {
    if (!currentPost) return;
    const isBookmarked = currentPost.user_actions.is_bookmarked;

    updateInfinitePostState(
      currentPost.id,
      "is_bookmarked",
      isBookmarked ? "decrement" : "increment"
    );

    const triggerApi = isBookmarked ? apiUnbookmark : apiBookmark;
    triggerApi(
      { post_id: currentPost.id },
      {
        onError: () =>
          updateInfinitePostState(
            currentPost.id,
            "is_bookmarked",
            isBookmarked ? "increment" : "decrement"
          ),
      }
    );
  }, [currentPost, apiBookmark, apiUnbookmark, updateInfinitePostState]);

  const handleToggleDrawer = useCallback(() => {
    setShowDrawer((prev) => !prev);
  }, []);

  const handleNavigateToBooking = (selectedProdId: number | null) => {
    const { user, business_id, business_owner } = currentPost || {};

    if (!business_id || !business_owner?.id || !user?.id) return;

    navigateTo(
      AppRoutes.booking(
        business_id,
        business_owner.id,
        user.id,
        BookingSourceEnum.EXPLORE_FEED,
        selectedProdId
      )
    );
  };

  const loaders = {
    isLoading,
    isSavingLike: false,
    isSavingBookmark: false,
    isLoadingDelete: false,
  };

  const callbacks = {
    onLike: handleLike,
    onBookmarkClick: handleBookmark,
    onCommentClick: () => setIsCommentsOpen(true),
    onDeleteClick: () => {},
    onShareClick: () => {},
    onReportClick: () => {},
    onNavigateToUser: () => {},
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.mainContent}>
        <Box sx={styles.leftSection}>
          <Box sx={styles.videoContainer}>
            <ExploreVideoPool
              items={poolItems}
              loaders={loaders}
              callbacks={callbacks}
              slideOffset={slideOffset}
              isAnimating={isAnimating}
              onOpenLinkedProducts={() => setIsProductsOpen(true)}
              onNext={goToNext}
              onPrev={goToPrev}
            />

            <ExploreHeaderMenu
              activeTab={currentTab}
              onHandleToggleDrawer={handleToggleDrawer}
              onTabChange={handleTabChange}
            />
          </Box>

          <PostActions
            user={currentPost?.user ?? null}
            counters={counters ?? null}
            userActions={user_actions ?? null}
            isOwnPost={currentPost?.is_own_post ?? false}
            loaders={loaders}
            callbacks={callbacks}
          />
        </Box>

        <ExploreSidebar
          linkedProducts={linkedProducts || []}
          isLoadingLinkedProducts={isLoadingLinkedProducts}
          postId={currentPost?.id}
          isLoading={isLoading}
          commentsCount={currentPost?.counters.comment_count}
          user={currentPost?.user}
          isVideoReview={currentPost?.is_video_review === true}
          businessLocation={currentPost?.business_location}
          onNavigateToBooking={handleNavigateToBooking}
        />
      </Box>

      <Box sx={styles.controlsSection}>
        {isLoading ? (
          <Box width={70} />
        ) : (
          <ExploreControls
            isDisabledPrev={currentIndex === 0}
            isDisabledNext={currentIndex >= posts.length - 1}
            onGoToPrev={goToPrev}
            onGoToNext={goToNext}
          />
        )}
      </Box>

      <Slide direction="right" in={showDrawer} mountOnEnter unmountOnExit>
        <Box sx={styles.drawerContainer}>
          <ExploreDrawer onCloseDrawer={() => setShowDrawer(false)} />
        </Box>
      </Slide>

      <PostLinkedProductsSheet
        open={isProductsOpen}
        onClose={() => setIsProductsOpen(false)}
        linkedProducts={linkedProducts || []}
        isLoadingLinkedProducts={isLoadingLinkedProducts}
        isLoadingPosts={isLoading}
        onNavigateToBooking={handleNavigateToBooking}
      />

      <PostCommentsSheet
        open={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        isLoadingPosts={false}
      />

      <PostReviewsSheet
        open={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
        isLoadingPosts={false}
      />

      <PostMoreSheet
        open={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        isLoadingPosts={false}
      />
    </Box>
  );
}

const styles = {
  container: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr auto" },
    alignItems: "stretch",
    width: "100%",
    height: {
      xs: "100%",
      md: "calc(100vh - 40px)",
    },
    overflow: "hidden",
  },
  mainContent: {
    minWidth: 0,
    minHeight: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: { xs: 0, md: 3 },
    height: "100%",
    width: "100%",
  },
  controlsSection: {
    display: { xs: "none", lg: "flex" },
    alignItems: "center",
    justifyContent: "flex-end",
    pl: 3,
  },
  leftSection: {
    flex: { xs: "1 1 100%", md: "0 0 auto" },
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: { xs: 0, md: 2.5 },
    width: { xs: "100%", md: "calc((100vh - 40px) * 9 / 16)" },
  },
  videoContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
    aspectRatio: { xs: "unset", md: "9 / 16" },
    borderRadius: { xs: 0, md: 4 },
    overflow: "hidden",
    flexShrink: 0,
    backgroundColor: "black",
  },
  drawerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 12,
    bgcolor: "common.black",
    display: "flex",
    flexDirection: "column",
    p: 2.5,
  },
} as const;
