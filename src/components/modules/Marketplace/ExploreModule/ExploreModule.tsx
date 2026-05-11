"use client";

import { Box, Slide } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import PostActions from "../../../cutomized/PostVideo/PostActions";
import ExploreControls from "./ExploreControls";
import { useInfiniteExplorePosts } from "@/hooks/infiniteQuery/useInfiniteExplorePosts";
import ExploreDrawer from "./ExploreDrawer";
import { useExplorePlayerPool } from "./useExplorePlayerPool";
import { useExplorePaginationPrefetch } from "./useExplorePaginationPrefetch";
import { useVideoNeighborsPreload } from "./useVideoNeighborsPreload";
import { ExploreVideoPool } from "./ExploreVideoPool";
import { useRouter } from "next/navigation";
import { Product } from "@/ts/models/booking/product/Product";
import ExploreHeaderMenu from "./ExploreHeaderMenu";
import ExploreSidebar from "@/components/cutomized/PostVideo/sidebar/ExploreSidebar";

const PREFETCH_OFFSET = 2;

export default function ExploreModule() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<
    Set<number>
  >(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteExplorePosts(selectedBusinessTypes);

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data]
  );

  const postsCount = data?.pages[0]?.count ?? 0;

  const { prevPost, currentPost, nextPost, poolItems } = useExplorePlayerPool({
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

  const handleToggleDrawer = useCallback(() => {
    setShowDrawer((prev) => !prev);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, posts.length - 1);
      return prev < maxIndex ? prev + 1 : prev;
    });
  }, [posts.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const navigateToBooking = useCallback(
    (product: Product) => {
      const businessOwnerId = currentPost?.business_owner?.id;
      const employeeId = currentPost?.employee?.id;

      if (businessOwnerId) {
        let url = `/booking/${product.business_id}?businessOwnerId=${businessOwnerId}`;

        if (employeeId) {
          url += `&employeeId=${employeeId}`;
        }

        router.push(url);
      }
    },
    [router, currentPost]
  );

  const { user_actions, counters, is_video_review } = currentPost ?? {};

  return (
    <Box sx={styles.container}>
      <Box sx={styles.mainContent}>
        <Box sx={styles.leftSection}>
          <Box sx={styles.videoContainer}>
            <ExploreVideoPool
              items={poolItems}
              isLoading={isLoading}
              user={currentPost?.user ?? null}
              description={currentPost?.description ?? null}
              isVideoReview={is_video_review ?? false}
              onNext={goToNext}
              onPrev={goToPrev}
            />

            <ExploreHeaderMenu onHandleToggleDrawer={handleToggleDrawer} />

            <Slide direction="right" in={showDrawer} mountOnEnter unmountOnExit>
              <Box sx={styles.drawerContainer}>
                <ExploreDrawer
                  defaultBusinessTypes={selectedBusinessTypes}
                  onCloseDrawer={() => setShowDrawer(false)}
                  onFilter={(ids) => {
                    setSelectedBusinessTypes(ids);
                    setShowDrawer(false);
                    setCurrentIndex(0);
                  }}
                />
              </Box>
            </Slide>
          </Box>

          <PostActions
            isLoading={isLoading}
            counters={counters}
            userActions={user_actions}
            onCommentClick={() => {}}
            onBookmarkClick={() => {}}
            onLike={() => {}}
            onShareClick={() => {}}
            onOptionsClick={() => {}}
          />
        </Box>

        <ExploreSidebar
          isLoading={isLoading}
          commentsCount={currentPost?.counters.comment_count}
          postId={currentPost?.id}
          user={currentPost?.user}
          isVideoReview={currentPost?.is_video_review === true}
          businessLocation={currentPost?.business_location}
          onNavigateToBooking={navigateToBooking}
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
      xs: "calc(100vh - 65px)",
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
    width: { md: "calc((100vh - 40px) * 9 / 16)" },
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
