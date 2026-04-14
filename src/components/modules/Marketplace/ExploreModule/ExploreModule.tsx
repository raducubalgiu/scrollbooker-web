"use client";

import { alpha, Box, Button, IconButton, Slide, Stack } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import PostActions from "./PostActions";
import ExploreControls from "./ExploreControls";
import { useInfiniteExplorePosts } from "@/hooks/infiniteQuery/useInfiniteExplorePosts";
import ExploreSidebar from "./sidebar/ExploreSidebar";
import ExploreDrawer from "./ExploreDrawer";
import { useExplorePlayerPool } from "./useExplorePlayerPool";
import { useExplorePaginationPrefetch } from "./useExplorePaginationPrefetch";
import { useVideoNeighborsPreload } from "./useVideoNeighborsPreload";
import { ExploreVideoPool } from "./ExploreVideoPool";
import MenuIcon from "@mui/icons-material/Menu";

const PREFETCH_OFFSET = 2;

export default function ExploreModule() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<
    Set<number>
  >(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const { user_actions, counters, is_video_review } = currentPost ?? {};

  return (
    <Box sx={styles.container}>
      <Box sx={styles.leftSection}>
        <Box sx={styles.videoContainer}>
          <ExploreVideoPool
            items={poolItems}
            isLoading={isLoading}
            user={currentPost?.user ?? null}
            description={currentPost?.description ?? null}
            isVideoReview={is_video_review ?? false}
            onToggleDrawer={handleToggleDrawer}
          />

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              height: 100,
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), transparent)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                m: 2.5,
                zIndex: 11,
                pointerEvents: "auto",
              }}
            >
              <Stack flexDirection="row" alignItems="center">
                <IconButton size="large" onClick={handleToggleDrawer}>
                  <MenuIcon
                    sx={{ color: "common.white", width: 30, height: 30 }}
                  />
                </IconButton>

                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  sx={{
                    mr: 1,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.7),
                    "&:hover": {
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.3),
                    },
                  }}
                >
                  Explorează
                </Button>
                <Button sx={{ color: "common.white" }} disableElevation>
                  Urmaresti
                </Button>
              </Stack>
            </Box>
          </Box>

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
        />
      </Box>

      <ExploreSidebar
        isLoading={isLoading}
        commentsCount={currentPost?.counters.comment_count}
        postId={currentPost?.id}
        user={currentPost?.user}
        businessLocation={currentPost?.business_location}
      />

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
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "flex-end",
    gap: 3,
    width: "100%",
    height: "calc(100vh - 40px)",
    mx: "auto",
    px: 3,
    overflow: "hidden",
  },
  leftSection: {
    flex: "0 0 auto",
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: 2.5,
  },
  videoContainer: {
    position: "relative",
    height: "100%",
    aspectRatio: "9 / 16",
    borderRadius: 4,
    overflow: "hidden",
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
    p: 5,
  },
} as const;
