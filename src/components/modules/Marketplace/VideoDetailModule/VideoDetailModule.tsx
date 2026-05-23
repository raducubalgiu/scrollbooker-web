"use client";

import * as React from "react";
import { alpha, Box, IconButton, Theme } from "@mui/material";
import { Post } from "@/ts/models/social/Post";
import PostActions from "../../../cutomized/PostVideo/PostActions";
import { PostVideoPlayer } from "../../../cutomized/PostVideo/PostVideoPlayer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExploreSidebar from "@/components/cutomized/PostVideo/sidebar/ExploreSidebar";
import { useVideoDetail } from "./useVideoDetail";

type ProfileVideoDetailPageProps = {
  username: string;
  profession: string;
  initialPost: Post;
  tab?: string | null;
};

export default function VideoDetailModule(props: ProfileVideoDetailPageProps) {
  const {
    post,
    handleClose,
    handleLike,
    handleBookmark,
    handleDelete,
    isPendingDelete,
    goBack,
  } = useVideoDetail(props);

  return (
    <Box sx={styles.container}>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        sx={styles.backButton}
      >
        <ArrowBackIcon sx={{ fontSize: { xs: "1.5rem", sm: "2.1875rem" } }} />
      </IconButton>

      <Box sx={styles.mainContent}>
        <Box sx={styles.leftSection}>
          <Box sx={styles.videoContainer}>
            <PostVideoPlayer
              src={post.media_files[0]?.url ?? ""}
              isActive={true}
              isLoading={false}
              user={post.user}
              description={post.description ?? ""}
              isVideoReview={post.is_video_review}
            />
          </Box>

          <PostActions
            isLoading={false}
            isOwnPost={post.is_own_post}
            counters={post.counters}
            userActions={post.user_actions}
            onCommentClick={() => {}}
            onLike={handleLike}
            onBookmarkClick={handleBookmark}
            onDeleteClick={() => handleDelete()}
            isLoadingDelete={isPendingDelete}
            onShareClick={() => {}}
            onReportClick={() => {}}
          />
        </Box>

        <ExploreSidebar
          isLoading={false}
          commentsCount={post.counters.comment_count}
          postId={post.id}
          user={post.user}
          businessLocation={post?.business_location}
          onNavigateToBooking={goBack}
          isVideoReview={post.is_video_review}
        />
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

  backButton: {
    position: "absolute",
    top: { xs: 10, md: 0 },
    left: { xs: 10, md: "20px" },
    zIndex: 20,
    width: { xs: 50, md: 65 },
    height: { xs: 50, md: 65 },
    color: { xs: "#fff", lg: "text.primary" },
    border: (theme: Theme) =>
      `1px solid ${alpha(theme.palette.text.primary, 0.2)}`,
    "&:hover": {
      bgcolor: "action.hover",
    },
  },

  mainContent: {
    minWidth: 0,
    minHeight: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: { xs: 0, md: 3 },
  },

  leftSection: {
    flex: { xs: "1 1 100%", md: "0 0 auto" },
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: { xs: 0, md: 2.5 },
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
    p: 5,
  },
} as const;
