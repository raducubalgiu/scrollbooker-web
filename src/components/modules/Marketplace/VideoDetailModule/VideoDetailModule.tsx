"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import VideoSection from "./video/VideoSection";
import VideoSidebar from "./sidebar/VideoSidebar";
import { Post } from "@/ts/models/social/Post";
import { useMutate } from "@/hooks/useHttp";

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
    } else {
      router.replace(`/profile/${username}${tab ? `?tab=${tab}` : ""}`);
    }
  }, [router, tab]);

  const url = post.media_files[0]?.url;

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
    <Box
      sx={{
        height: "100vh",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "minmax(0, 1fr) minmax(480px, 640px)",
        },
      }}
    >
      {url && <VideoSection url={url} onClose={handleClose} />}

      <VideoSidebar
        post={post}
        onHandleLike={handleLike}
        onHandleBookmark={handleBookmark}
      />
    </Box>
  );
}
