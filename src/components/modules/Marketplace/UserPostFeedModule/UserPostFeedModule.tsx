"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  alpha,
  Box,
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
import PostMainActionBar from "@/components/cutomized/Post/PostMainActionBar";
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

  const { currentPost, setIsProductsOpen } = feed;

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
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1300,
        bgcolor: "common.black",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <PostFeedView
          posts={posts}
          feed={feed}
          showBookButton={false}
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
      </Box>

      {currentPost && (
        <Box sx={styles.bottomActionsBar} onClick={(e) => e.stopPropagation()}>
          <PostMainActionBar
            instantBooking={currentPost.instant_booking}
            isVideoReview={currentPost.is_video_review}
            contact={currentPost.contact}
            onOpenLinkedProducts={() => setIsProductsOpen(true)}
          />
        </Box>
      )}
    </Box>
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
  bottomActionsBar: {
    display: { xs: "block", lg: "none" },
    flexShrink: 0,
    bgcolor: "common.black",
    px: 2,
    pt: 1,
    pb: "calc(8px + env(safe-area-inset-bottom))",
  },
} as const;
