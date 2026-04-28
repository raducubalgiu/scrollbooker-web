"use client";

import * as React from "react";
import { alpha, Box, IconButton, Theme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { Post } from "@/ts/models/social/Post";
import { useMutate } from "@/hooks/useHttp";
import PostActions from "../ExploreModule/PostActions";
import ExploreSidebar from "../ExploreModule/sidebar/ExploreSidebar";
import { PostVideoPlayer } from "../ExploreModule/PostVideoPlayer";

type ProfileVideoDetailPageProps = {
  username: string;
  initialPost: Post;
  tab?: string | null | undefined;
};

export default function VideoDetailModule({
  username,
  initialPost,
  tab,
}: ProfileVideoDetailPageProps) {
  const [post, setPost] = React.useState<Post>(initialPost);
  const router = useRouter();

  const handleClose = React.useCallback(() => {
    if (!tab) {
      router.back();
      return;
    }

    router.replace(`/profile/${username}?tab=${tab}`);
  }, [router, tab, username]);

  const { mutate: like } = useMutate({
    key: ["like-post", post.id],
    method: "POST",
    url: `/api/posts/like`,
  });

  const { mutate: unlike } = useMutate({
    key: ["unlike-post", post.id],
    method: "DELETE",
    url: `/api/posts/like`,
  });

  const { mutate: bookmark } = useMutate({
    key: ["bookmark-post", post.id],
    method: "POST",
    url: `/api/posts/bookmark`,
  });

  const { mutate: unbookmark } = useMutate({
    key: ["unbookmark-post", post.id],
    method: "DELETE",
    url: `/api/posts/bookmark`,
  });

  const handleLike = React.useCallback(() => {
    if (post.user_actions.is_liked) {
      setPost((prev) => ({
        ...prev,
        counters: {
          ...prev.counters,
          like_count: Math.max(0, prev.counters.like_count - 1),
        },
        user_actions: {
          ...prev.user_actions,
          is_liked: false,
        },
      }));

      unlike(
        { post_id: post.id },
        {
          onError: () => {
            setPost((prev) => ({
              ...prev,
              counters: {
                ...prev.counters,
                like_count: prev.counters.like_count + 1,
              },
              user_actions: {
                ...prev.user_actions,
                is_liked: true,
              },
            }));
          },
        }
      );

      return;
    }

    setPost((prev) => ({
      ...prev,
      counters: {
        ...prev.counters,
        like_count: prev.counters.like_count + 1,
      },
      user_actions: {
        ...prev.user_actions,
        is_liked: true,
      },
    }));

    like(
      { post_id: post.id },
      {
        onError: () => {
          setPost((prev) => ({
            ...prev,
            counters: {
              ...prev.counters,
              like_count: Math.max(0, prev.counters.like_count - 1),
            },
            user_actions: {
              ...prev.user_actions,
              is_liked: false,
            },
          }));
        },
      }
    );
  }, [like, unlike, post]);

  const handleBookmark = React.useCallback(() => {
    if (post.user_actions.is_bookmarked) {
      setPost((prev) => ({
        ...prev,
        counters: {
          ...prev.counters,
          bookmark_count: Math.max(0, prev.counters.bookmark_count - 1),
        },
        user_actions: {
          ...prev.user_actions,
          is_bookmarked: false,
        },
      }));

      unbookmark(
        { post_id: post.id },
        {
          onError: () => {
            setPost((prev) => ({
              ...prev,
              counters: {
                ...prev.counters,
                bookmark_count: prev.counters.bookmark_count + 1,
              },
              user_actions: {
                ...prev.user_actions,
                is_bookmarked: true,
              },
            }));
          },
        }
      );

      return;
    }

    setPost((prev) => ({
      ...prev,
      counters: {
        ...prev.counters,
        bookmark_count: prev.counters.bookmark_count + 1,
      },
      user_actions: {
        ...prev.user_actions,
        is_bookmarked: true,
      },
    }));

    bookmark(
      { post_id: post.id },
      {
        onError: () => {
          setPost((prev) => ({
            ...prev,
            counters: {
              ...prev.counters,
              bookmark_count: Math.max(0, prev.counters.bookmark_count - 1),
            },
            user_actions: {
              ...prev.user_actions,
              is_bookmarked: false,
            },
          }));
        },
      }
    );
  }, [bookmark, unbookmark, post]);

  return (
    <Box sx={styles.container}>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        sx={styles.backButton}
      >
        <CloseIcon fontSize="large" />
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
            counters={post.counters}
            userActions={post.user_actions}
            onCommentClick={() => {}}
            onLike={handleLike}
            onBookmarkClick={handleBookmark}
            onShareClick={() => {}}
          />
        </Box>

        <ExploreSidebar
          isLoading={false}
          commentsCount={post.counters.comment_count}
          postId={post.id}
          user={post.user}
          businessLocation={post?.business_location}
          onNavigateToBooking={() => router.back()}
        />
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "stretch",
    width: "100%",
    height: "calc(100vh - 40px)",
    marginTop: "20px",
    overflow: "hidden",
  },

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

  mainContent: {
    minWidth: 0,
    minHeight: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },

  controlsSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
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
    flexShrink: 0,
    backgroundColor: "background.default",
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
