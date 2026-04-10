"use client";

import { alpha, Box, Button, IconButton, Slide, Stack } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PostOverlay from "./PostOverlay";
import PostActions from "./PostActions";
import { VideoPlayer } from "./VideoPlayer";
import { Post } from "@/ts/models/social/Post";
import ExploreControls from "./ExploreControls";
import { useInfiniteExplorePosts } from "@/hooks/infiniteQuery/useInfiniteExplorePosts";
import ExploreSidebar from "./sidebar/ExploreSidebar";
import MenuIcon from "@mui/icons-material/Menu";
import ExploreDrawer from "./ExploreDrawer";

const WINDOW_SIZE = 5;
const PREFETCH_OFFSET = 2;

export default function ExploreModule() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<
    Set<number>
  >(new Set());

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteExplorePosts(selectedBusinessTypes);

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.results) || [],
    [data]
  );

  const postsCount = data?.pages[0]?.count || 0;

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPost: Post | undefined = posts[currentIndex];
  const currentVideoUrl = currentPost?.media_files[0]?.url || "";

  const { user_actions, counters, user, description, is_video_review } =
    currentPost || {};

  const visibleWindow = useMemo(() => {
    const half = Math.floor(WINDOW_SIZE / 2);

    let start = Math.max(0, currentIndex - half);
    let end = Math.min(posts.length, start + WINDOW_SIZE);

    if (end === posts.length) {
      start = Math.max(0, end - WINDOW_SIZE);
    }

    return posts.slice(start, end);
  }, [currentIndex, posts]);

  const goToNext = useCallback(() => {
    if (currentIndex < postsCount - 1) setCurrentIndex((prev) => prev + 1);
  }, [currentIndex, postsCount]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  }, [currentIndex]);

  const lastPrefetchTriggerRef = useRef<number | null>(null);

  useEffect(() => {
    const hasMoreRemoteItems = posts.length < postsCount;
    const reachedPrefetchZone = currentIndex >= posts.length - PREFETCH_OFFSET;
    const alreadyTriggeredForThisLength =
      lastPrefetchTriggerRef.current === posts.length;

    if (
      !hasMoreRemoteItems ||
      !hasNextPage ||
      isFetchingNextPage ||
      !reachedPrefetchZone ||
      alreadyTriggeredForThisLength
    ) {
      return;
    }

    lastPrefetchTriggerRef.current = posts.length;
    fetchNextPage();
  }, [
    currentIndex,
    posts.length,
    postsCount,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.leftSection}>
        <Box sx={styles.videoContainer}>
          <VideoPlayer
            isLoading={isLoading}
            key={currentPost?.id}
            src={currentVideoUrl}
            isActive={true}
          />

          {visibleWindow.map((post) => {
            const url = post.media_files?.[0]?.url;

            return (
              <video
                key={post.id}
                src={url}
                preload="auto"
                style={{ display: "none" }}
              />
            );
          })}

          {!isLoading && (
            <PostOverlay
              user={user}
              description={description ?? ""}
              isVideoReview={is_video_review}
            />
          )}

          {!isLoading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: 100,
                background:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), transparent)",
                zIndex: 10,
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
                  <IconButton
                    size="large"
                    onClick={() => setShowDrawer((prev) => !prev)}
                  >
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
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.7),
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
          )}

          <Slide direction="right" in={showDrawer} mountOnEnter unmountOnExit>
            <Box
              sx={{
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
              }}
            >
              <ExploreDrawer
                defaultBusinessTypes={selectedBusinessTypes}
                onCloseDrawer={() => setShowDrawer(false)}
                onFilter={(ids) => {
                  setSelectedBusinessTypes(ids);
                  setShowDrawer(false);
                }}
              />
            </Box>
          </Slide>
        </Box>

        <PostActions
          isLoading={isLoading}
          counters={counters}
          userActions={user_actions}
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
          isDisabledNext={currentIndex === posts.length - 1}
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
} as const;
