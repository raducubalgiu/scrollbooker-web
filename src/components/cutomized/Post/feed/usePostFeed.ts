import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Post } from "@/ts/models/social/Post";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppRoutes } from "@/utils/routes";
import { BookingSourceEnum } from "@/ts/enums/BookingSourceEnum";
import { useGetLinkedProductsByPostId } from "@/controllers/booking/product.controller";
import { useFollow, useUnfollow } from "@/controllers/social/follow.controller";
import { useUserLocation } from "@/hooks/useUserLocation";
import { calculateDistance } from "@/utils/calculateDistance";
import { usePostLikeBookmark } from "../actions/usePostLikeBookmark";
import { patchFollowInAllCaches } from "@/utils/postCache";
import { useFeedPaginationPrefetch } from "./useFeedPaginationPrefetch";
import { useSharePost } from "@/controllers/social/share.controller";
import { useDeletePost } from "@/controllers/social/post.controller";
import {
  useRecordPostContactClick,
  useRecordProfileVisit,
} from "@/controllers/social/engagement.controller";
import { ContactClickTypeEnum } from "@/ts/enums/ContactClickTypeEnum";
import { EngagementSourceEnum } from "@/ts/enums/EngagementSourceEnum";

const PREFETCH_OFFSET = 2;

type UsePostFeedParams = {
  posts: Post[];
  postsCount: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  isLoading: boolean;
  initialIndex?: number | undefined;
  engagementSource: EngagementSourceEnum;
};

export const usePostFeed = ({
  posts,
  postsCount,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  isLoading,
  initialIndex,
  engagementSource,
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
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const {
    sharePost,
    copiedSnackbarOpen: snackbarOpen,
    closeCopiedSnackbar,
  } = useSharePost();
  const { mutate: deletePost, isPending: isLoadingDelete } = useDeletePost();
  const { mutate: recordContactClick } = useRecordPostContactClick();
  const { mutate: recordProfileVisit } = useRecordProfileVisit();

  const currentPost = posts[currentIndex] ?? null;

  const { location: userLocation } = useUserLocation();
  const businessCoordinates =
    currentPost?.business_location?.coordinates ?? null;

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

  const handleShare = useCallback(async (): Promise<void> => {
    if (!currentPost) return;

    await sharePost({
      postId: currentPost.id,
      username: currentPost.user.username,
      profession: currentPost.user.profession,
      description: currentPost.description,
    });
  }, [currentPost, sharePost]);

  const handleContactClick = useCallback(
    (clickType: ContactClickTypeEnum) => {
      if (!currentPost) return;

      recordContactClick({
        postId: currentPost.id,
        clickType,
        source: engagementSource,
      });
    },
    [currentPost, recordContactClick, engagementSource]
  );

  const handleNavigateToUser = useCallback(() => {
    if (!currentPost) return;
    const { user } = currentPost;

    recordProfileVisit({
      userId: user.id,
      postId: currentPost.id,
      source: engagementSource,
    });

    navigateTo(AppRoutes.profile(user.username, user.profession));
  }, [currentPost, recordProfileVisit, engagementSource, navigateTo]);

  const handleConfirmDelete = useCallback(() => {
    if (!currentPost) return;

    deletePost(currentPost.id, {
      onSuccess: () => {
        setIsMoreOpen(false);
        setIsDeleteConfirmOpen(false);
      },
    });
  }, [currentPost, deletePost]);

  const loaders = {
    isLoading,
    isSavingLike,
    isSavingBookmark,
    isLoadingDelete,
  };

  const callbacks = {
    onLike: handleLike,
    onBookmarkClick: handleBookmark,
    onShareClick: handleShare,
    onCommentClick: () => setIsCommentsOpen(true),
    onReviewsClick: () => setIsReviewsOpen(true),
    onOpenMoreOptions: () => setIsMoreOpen(true),
    onCloseMoreOptions: () => setIsMoreOpen(false),
    onStatisticsClick: () => setIsStatisticsOpen(true),
    onEditClick: () => {},
    onDeleteClick: () => setIsDeleteConfirmOpen(true),
    onNavigateToUser: handleNavigateToUser,
    onContactClick: handleContactClick,
  };

  return {
    currentIndex,
    initialIndex,
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
    isStatisticsOpen,
    setIsStatisticsOpen,
    isDeleteConfirmOpen,
    setIsDeleteConfirmOpen,
    handleConfirmDelete,
    snackbarOpen,
    setSnackbarOpen: closeCopiedSnackbar,
  };
};
