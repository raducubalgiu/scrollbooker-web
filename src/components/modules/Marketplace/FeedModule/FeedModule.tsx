"use client";

import { Box, Slide } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import FeedTabs, { FeedTabEnum } from "./FeedTabs";
import {
  useInfiniteExplorePosts,
  useInfiniteFollowingPosts,
} from "@/controllers/social/post.controller";
import FeedDrawer from "./FeedDrawer";
import { usePostFeed } from "@/components/cutomized/Post/feed/usePostFeed";
import PostFeedView from "@/components/cutomized/Post/feed/PostFeedView";

export default function FeedModule() {
  const [currentTab, setCurrentTab] = useState<FeedTabEnum>(
    FeedTabEnum.EXPLORE
  );
  const [showDrawer, setShowDrawer] = useState(false);

  const explorePosts = useInfiniteExplorePosts();
  const followingPosts = useInfiniteFollowingPosts();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    currentTab === FeedTabEnum.EXPLORE ? explorePosts : followingPosts;

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data]
  );

  const postsCount = useMemo(() => data?.pages[0]?.count ?? 0, [data]);

  const feed = usePostFeed({
    posts,
    postsCount,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  });

  const handleTabChange = useCallback(
    (tab: FeedTabEnum) => {
      setCurrentTab(tab);
      feed.handleIndexChange(0);
    },
    [feed]
  );

  const handleToggleDrawer = useCallback(() => {
    setShowDrawer((prev) => !prev);
  }, []);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <PostFeedView
        posts={posts}
        feed={feed}
        headerSlot={
          <FeedTabs
            activeTab={currentTab}
            onHandleToggleDrawer={handleToggleDrawer}
            onTabChange={handleTabChange}
          />
        }
      />

      <Slide direction="right" in={showDrawer} mountOnEnter unmountOnExit>
        <Box sx={styles.drawerContainer}>
          <FeedDrawer onCloseDrawer={() => setShowDrawer(false)} />
        </Box>
      </Slide>
    </Box>
  );
}

const styles = {
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
