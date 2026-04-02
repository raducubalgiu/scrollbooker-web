"use client";

import { Box } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import PostOverlay from "./PostOverlay";
import PostActions from "./PostActions";
import { VideoPlayer } from "./VideoPlayer";
import { Post } from "@/ts/models/social/Post";
import ExploreControls from "./ExploreControls";
import { useInfiniteExplorePosts } from "@/hooks/infiniteQuery/useInfiniteExplorePosts";
import ExploreSidebar from "./sidebar/ExploreSidebar";

const WINDOW_SIZE = 5;
const PREFETCH_OFFSET = 2;

export default function ExploreModule() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteExplorePosts();
  const posts = data ? data.pages.flatMap((page) => page.results) : [];
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

  useEffect(() => {
    const shouldPrefetchNextPage =
      hasNextPage &&
      !isFetchingNextPage &&
      currentIndex >= posts.length - PREFETCH_OFFSET;

    if (shouldPrefetchNextPage) {
      fetchNextPage();
    }
  }, [
    currentIndex,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    posts.length,
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
