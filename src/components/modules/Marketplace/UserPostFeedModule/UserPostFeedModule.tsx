"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  alpha,
  IconButton,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { Post } from "@/ts/models/social/Post";
import { useInfiniteUserPosts } from "@/controllers/social/post.controller";
import { usePostFeed } from "@/components/cutomized/Post/feed/usePostFeed";
import PostFeedView from "@/components/cutomized/Post/feed/PostFeedView";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppRoutes } from "@/utils/routes";
import { getProfileRoute } from "../ProfileModule/tabs/profileTabsHelper";

type UserPostFeedModuleProps = {
  initialPost: Post;
  tab?: string | null;
};

export default function UserPostFeedModule({
  initialPost,
  tab,
}: UserPostFeedModuleProps) {
  const { navigateTo, goBack } = useAppNavigation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteUserPosts({ userId: initialPost.user.id });

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data]
  );

  const postsCount = useMemo(() => data?.pages[0]?.count ?? 0, [data]);

  const [resolvedIndex, setResolvedIndex] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (resolvedIndex !== undefined) return;

    const idx = posts.findIndex((p) => p.id === initialPost.id);
    if (idx !== -1) {
      setResolvedIndex(idx);
      return;
    }

    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    } else if (!hasNextPage) {
      setResolvedIndex(0);
    }
  }, [
    posts,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    resolvedIndex,
    initialPost.id,
  ]);

  const feed = usePostFeed({
    posts,
    postsCount,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    initialIndex: resolvedIndex,
  });

  const { currentPost } = feed;

  useEffect(() => {
    if (!currentPost || resolvedIndex === undefined) return;
    if (typeof window === "undefined") return;

    const targetTab = tab ? getProfileRoute(tab) : undefined;
    const url = AppRoutes.postDetail(
      currentPost.user.username,
      currentPost.user.profession,
      currentPost.id,
      targetTab
    );

    // Deliberately bypasses next/navigation's router: postId is a path
    // segment, and router.replace() on a changed dynamic segment re-runs
    // this route's Server Component (re-fetch + full remount), wiping the
    // in-progress scroll/index state. A plain history update keeps the
    // address bar in sync without touching the already-loaded feed.
    window.history.replaceState(null, "", url);
  }, [currentPost, resolvedIndex, tab]);

  const handleClose = () => {
    if (!tab) {
      goBack();
      return;
    }

    const targetTabEnum = getProfileRoute(tab);
    navigateTo(
      AppRoutes.profile(
        initialPost.user.username,
        initialPost.user.profession,
        targetTabEnum
      ),
      { replace: true }
    );
  };

  return (
    <PostFeedView
      posts={posts}
      feed={feed}
      topLeftSlot={
        isMobile ? (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            size="small"
            sx={styles.closeButtonMobile}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
        ) : (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            sx={styles.backButton}
          >
            <ArrowBackIcon sx={{ fontSize: "2.1875rem" }} />
          </IconButton>
        )
      }
    />
  );
}

const styles = {
  backButton: {
    position: "absolute",
    top: 0,
    left: "20px",
    zIndex: 20,
    width: 65,
    height: 65,
    color: "text.primary",
    border: (theme: Theme) =>
      `1px solid ${alpha(theme.palette.text.primary, 0.2)}`,
    "&:hover": {
      bgcolor: "action.hover",
    },
  },
  closeButtonMobile: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 20,
    color: "#fff",
  },
} as const;
