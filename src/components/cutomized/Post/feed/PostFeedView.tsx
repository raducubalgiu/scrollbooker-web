import React from "react";
import { Alert, Box, Snackbar } from "@mui/material";
import { Post } from "@/ts/models/social/Post";
import PostActions from "../actions/PostActions";
import ExploreControls from "../ExploreControls";
import PostLinkedProductsSheet from "../sheets/PostLinkedProductsSheet";
import PostCommentsSheet from "../sheets/PostCommentsSheet";
import PostReviewsSheet from "../sheets/PostReviewsSheet";
import PostMoreSheet from "../sheets/PostMoreSheet";
import PostDesktopSidebar from "../sidebar/PostDesktopSidebar";
import ForceDarkChrome from "@/components/core/ForceDarkChrome";
import { FeedVideoPool } from "@/components/modules/Marketplace/FeedModule/FeedVideoPool";
import { usePostFeed } from "./usePostFeed";

type PostFeedViewProps = {
  posts: Post[];
  feed: ReturnType<typeof usePostFeed>;
  headerSlot?: React.ReactNode;
  topLeftSlot?: React.ReactNode;
};

const PostFeedView = ({
  posts,
  feed,
  headerSlot,
  topLeftSlot,
}: PostFeedViewProps) => {
  const {
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
    isTogglingFollow,
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
  } = feed;

  const { user_actions, counters } = currentPost ?? {};

  return (
    <Box
      sx={{
        p: { xs: 0, lg: 2.5 },
        width: "100%",
        height: "100%",
        overflow: "hidden",
        overscrollBehavior: "none",
      }}
    >
      <ForceDarkChrome />
      <Box sx={styles.container}>
        {topLeftSlot}

        <Box sx={styles.mainContent}>
          <Box sx={styles.leftSection}>
            <Box sx={styles.videoContainer}>
              <FeedVideoPool
                posts={posts}
                currentIndex={currentIndex}
                loaders={loaders}
                callbacks={callbacks}
                onIndexChange={handleIndexChange}
                onOpenLinkedProducts={() => setIsProductsOpen(true)}
              />

              {headerSlot}
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

          <PostDesktopSidebar
            post={currentPost ?? null}
            linkedProducts={linkedProducts}
            isLoadingLinkedProducts={isLoadingLinkedProducts}
            postId={currentPost?.id}
            isLoading={loaders.isLoading}
            commentsCount={currentPost?.counters.comment_count}
            user={currentPost?.user}
            isVideoReview={currentPost?.is_video_review === true}
            businessLocation={currentPost?.business_location}
            distanceKm={distanceKm}
            onNavigateToBooking={handleNavigateToBooking}
            onFollow={handleFollow}
            isTogglingFollow={isTogglingFollow}
          />
        </Box>

        <Box sx={styles.controlsSection}>
          {loaders.isLoading ? (
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

        <PostLinkedProductsSheet
          open={isProductsOpen}
          onClose={() => setIsProductsOpen(false)}
          distanceKm={distanceKm}
          linkedProducts={linkedProducts}
          isLoadingLinkedProducts={isLoadingLinkedProducts}
          isLoadingPosts={loaders.isLoading}
          onNavigateToBooking={handleNavigateToBooking}
        />

        <PostCommentsSheet
          open={isCommentsOpen}
          onClose={() => setIsCommentsOpen(false)}
          postId={currentPost?.id}
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
};

export default PostFeedView;

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
    backgroundColor: {
      xs: "#262626",
      md: "background.paper",
    },
  },
} as const;
