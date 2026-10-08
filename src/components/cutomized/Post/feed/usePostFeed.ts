import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Post } from "@/ts/models/social/Post";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppRoutes } from "@/utils/routes";
import { BookingSourceEnum } from "@/ts/enums/BookingSourceEnum";
import { LOG } from "@/utils/logger";
import { useGetLinkedProductsByPostId } from "@/controllers/booking/product.controller";
import { useFollow, useUnfollow } from "@/controllers/social/follow.controller";
import { useUserLocation } from "@/hooks/useUserLocation";
import { calculateDistance } from "@/utils/calculateDistance";
import { usePostLikeBookmark } from "../actions/usePostLikeBookmark";
import { patchFollowInAllCaches } from "@/utils/postCache";
import { useFeedPaginationPrefetch } from "./useFeedPaginationPrefetch";

const PREFETCH_OFFSET = 2;

type UsePostFeedParams = {
  posts: Post[];
  postsCount: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  isLoading: boolean;
  initialIndex?: number | undefined;
};

export const usePostFeed = ({
  posts,
  postsCount,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  isLoading,
  initialIndex,
}: UsePostFeedParams) => {
  const { navigateTo } = useAppNavigation();
  const queryClient = useQueryClient();

  const [currentIndex, setCurrentIndex] = useState(0);
  const hasAppliedInitialIndex = useRef(false);

  useEffect(() => {
    if (hasAppliedInitialIndex.current) return;
    if (initialIndex === undefined) return;

    setCurrentIndex(initialIndex);
    hasAppliedInitialIndex.current = true;
  }, [initialIndex]);

  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const currentPost = posts[currentIndex] ?? null;

  const { location: userLocation } = useUserLocation();
  const businessCoordinates = currentPost?.business_location?.coordinates ?? null;

  const distanceKm = useMemo(() => {
    if (!userLocation || !businessCoordinates) return null;
    return calculateDistance(userLocation, businessCoordinates);
  }, [userLocation, businessCoordinates]);

  useFeedPaginationPrefetch({
    currentIndex,
    postsLength: posts.length,
    postsCount,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    prefetchOffset: PREFETCH_OFFSET,
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

  const handleIndexChange = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const { data: linkedProducts, isLoading: isLoadingLinkedProducts } =
    useGetLinkedProductsByPostId({
      postId: currentPost?.id ?? null,
      isEnabled: !!currentPost?.id,
    });

  const { handleLike, handleBookmark, isSavingLike, isSavingBookmark } =
    usePostLikeBookmark(currentPost);

  const { mutate: follow, isPending: isFollowing } = useFollow();
  const { mutate: unfollow, isPending: isUnfollowing } = useUnfollow();

  const handleFollow = useCallback(() => {
    if (!currentPost) return;
    const { id: userId, is_follow: isFollow } = currentPost.user;

    patchFollowInAllCaches(queryClient, userId, !isFollow);

    const mutate = isFollow ? unfollow : follow;
    mutate(userId, {
      onError: () => patchFollowInAllCaches(queryClient, userId, isFollow),
    });
  }, [currentPost, follow, unfollow, queryClient]);

  const handleNavigateToBooking = useCallback(
    (selectedProdId: number | null) => {
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
    },
    [currentPost, navigateTo]
  );

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
    isSavingLike,
    isSavingBookmark,
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

  return {
    currentIndex,
    currentPost,
    goToNext,
    goToPrev,
    handleIndexChange,
    loaders,
    callbacks,
    linkedProducts,
    isLoadingLinkedProducts,
    distanceKm,
    isTogglingFollow: isFollowing || isUnfollowing,
    handleFollow,
    handleNavigateToBooking,
    isProductsOpen,
    setIsProductsOpen,
    isCommentsOpen,
    setIsCommentsOpen,
    isReviewsOpen,
    setIsReviewsOpen,
    isMoreOpen,
    setIsMoreOpen,
    snackbarOpen,
    setSnackbarOpen,
  };
};
