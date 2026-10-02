"use client";

import { Alert, Box, Slide, Snackbar } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import PostActions from "../../../cutomized/Post/actions/PostActions";
import ExploreControls from "./ExploreControls";
import ExploreDrawer from "./ExploreDrawer";
import { useExplorePlayerPool } from "./useExplorePlayerPool";
import { useExplorePaginationPrefetch } from "./useExplorePaginationPrefetch";
import { useVideoNeighborsPreload } from "./useVideoNeighborsPreload";
import { ExploreVideoPool } from "./ExploreVideoPool";
import ExploreHeaderMenu, { ExploreTabEnum } from "./ExploreHeaderMenu";
import ExploreSidebar from "@/components/cutomized/Post/sidebar/ExploreSidebar";
import { useMutate } from "@/hooks/useHttp";
import PostLinkedProductsSheet from "../../../cutomized/Post/sheets/PostLinkedProductsSheet";
import PostCommentsSheet from "@/components/cutomized/Post/sheets/PostCommentsSheet";
import PostReviewsSheet from "@/components/cutomized/Post/sheets/PostReviewsSheet";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppRoutes } from "@/utils/routes";
import { BookingSourceEnum } from "@/ts/enums/BookingSourceEnum";
import PostMoreSheet from "@/components/cutomized/Post/sheets/PostMoreSheet";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { LOG } from "@/utils/logger";
import { PaginatedData } from "@/components/core/Table/Table";
import { Post } from "@/ts/models/social/Post";
import {
  useInfiniteExplorePosts,
  useInfiniteFollowingPosts,
} from "@/controllers/social/post.controller";
import { useFollow, useUnfollow } from "@/controllers/social/follow.controller";
import { useGetLinkedProductsByPostId } from "@/controllers/booking/product.controller";
import ForceDarkChrome from "@/components/core/ForceDarkChrome";

const PREFETCH_OFFSET = 2;

export default function ExploreModule() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
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

  const activeQueryKey = useMemo(
    () =>
      currentTab === ExploreTabEnum.EXPLORE
        ? ["explore-posts"]
        : ["following-posts"],
    [currentTab]
  );

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
    url: `/api/social/post/like`,
  });

  const { mutate: apiUnlike } = useMutate({
    key: ["unlike-post", currentPost?.id],
    method: "DELETE",
    url: `/api/social/post/like`,
  });

  const { mutate: apiBookmark } = useMutate({
    key: ["bookmark-post", currentPost?.id],
    method: "POST",
    url: `/api/social/post/bookmark`,
  });

  const { mutate: apiUnbookmark } = useMutate({
    key: ["unbookmark-post", currentPost?.id],
    method: "DELETE",
    url: `/api/social/post/bookmark`,
  });

  const { data: linkedProducts, isLoading: isLoadingLinkedProducts } =
    useGetLinkedProductsByPostId({
      postId: currentPost?.id ?? null,
      isEnabled: !!currentPost?.id,
    });

  const updateInfinitePostState = useCallback(
    (
      postId: number,
      type: "is_liked" | "is_bookmarked",
      action: "increment" | "decrement"
    ) => {
      const counterKey = type === "is_liked" ? "like_count" : "bookmark_count";
      const change = action === "increment" ? 1 : -1;

      queryClient.setQueryData(
        activeQueryKey,
        (oldData: InfiniteData<PaginatedData<Post>>) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              results: page.results.map((p) => {
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
        }
      );
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

  const updateUserFollowState = useCallback(
    (userId: number, isFollow: boolean) => {
      const patchPosts = (oldData: InfiniteData<PaginatedData<Post>>) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            results: page.results.map((p) =>
              p.user.id === userId
                ? { ...p, user: { ...p.user, is_follow: isFollow } }
                : p
            ),
          })),
        };
      };

      queryClient.setQueryData(["explore-posts"], patchPosts);
      queryClient.setQueryData(["following-posts"], patchPosts);
    },
    [queryClient]
  );

  const { mutate: follow, isPending: isFollowing } = useFollow();
  const { mutate: unfollow, isPending: isUnfollowing } = useUnfollow();

  const handleFollow = useCallback(() => {
    if (!currentPost) return;
    const { id: userId, is_follow: isFollow } = currentPost.user;

    updateUserFollowState(userId, !isFollow);

    const mutate = isFollow ? unfollow : follow;
    mutate(userId, {
      onError: () => updateUserFollowState(userId, isFollow),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["following-posts"] });
      },
    });
  }, [currentPost, follow, unfollow, updateUserFollowState, queryClient]);

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

  const handleShare = async (): Promise<void> => {
    if (!currentPost) return;

    const { user } = currentPost;
    const shareUrl = `https://scrollbooker-web.vercel.app/user/${user.username}/${user.profession}/post/${currentPost.id}`;

    const shareData: ShareData = {
      title: "Postare Video",
      text: "Aruncă o privire peste aceasta postare video",
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        const msg = error instanceof Error ? error.message : String(error);
        LOG.error(
          `Web Share API a eșuat sau a fost anulat: ${msg}. Trecem la clipboard.`
        );
      }
    }

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setSnackbarOpen(true);
        return;
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error);
        LOG.error(`Clipboard API asincron a eșuat: ${msg}`);
      }
    }

    try {
      window.prompt(
        "Copierea automată nu este permisă de browser. Copiază link-ul de mai jos:",
        shareUrl
      );
    } catch (fallbackError: unknown) {
      const msg =
        fallbackError instanceof Error
          ? fallbackError.message
          : String(fallbackError);
      LOG.error(`Eșec total la orice metodă de partajare/copiere: ${msg}`);
    }
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
    onShareClick: handleShare,
    onCommentClick: () => setIsCommentsOpen(true),
    onDeleteClick: () => {},
    onReportClick: () => {},
    onNavigateToUser: () => {},
  };

  return (
    <Box p={{ xs: 0, lg: 2.5, width: "100%", height: "100%" }}>
      <ForceDarkChrome />
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
            linkedProducts={linkedProducts}
            isLoadingLinkedProducts={isLoadingLinkedProducts}
            postId={currentPost?.id}
            isLoading={isLoading}
            commentsCount={currentPost?.counters.comment_count}
            user={currentPost?.user}
            isVideoReview={currentPost?.is_video_review === true}
            businessLocation={currentPost?.business_location}
            onNavigateToBooking={handleNavigateToBooking}
            onFollow={handleFollow}
            isTogglingFollow={isFollowing || isUnfollowing}
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
          linkedProducts={linkedProducts}
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

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            Link-ul a fost copiat în clipboard!
          </Alert>
        </Snackbar>
      </Box>
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
