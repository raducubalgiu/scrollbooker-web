import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Post } from "@/ts/models/social/Post";
import { useLikePost, useUnlikePost } from "@/controllers/social/like.controller";
import {
  useBookmarkPost,
  useUnbookmarkPost,
} from "@/controllers/social/bookmark.controller";
import { patchPostInAllCaches } from "@/utils/postCache";

type ToggleFlagKey = "is_liked" | "is_bookmarked";
type ToggleCounterKey = "like_count" | "bookmark_count";

const toggle = (
  post: Post,
  flagKey: ToggleFlagKey,
  counterKey: ToggleCounterKey,
  next: boolean
): Post => ({
  ...post,
  user_actions: { ...post.user_actions, [flagKey]: next },
  counters: {
    ...post.counters,
    [counterKey]: Math.max(0, post.counters[counterKey] + (next ? 1 : -1)),
  },
});

export const usePostLikeBookmark = (
  post: Post | null,
  onLocalUpdate?: (updater: (post: Post) => Post) => void
) => {
  const queryClient = useQueryClient();

  const { mutate: likePost } = useLikePost();
  const { mutate: unlikePost } = useUnlikePost();
  const { mutate: bookmarkPost } = useBookmarkPost();
  const { mutate: unbookmarkPost } = useUnbookmarkPost();

  const [isSavingLike, setIsSavingLike] = useState(false);
  const [isSavingBookmark, setIsSavingBookmark] = useState(false);

  const applyPatch = useCallback(
    (postId: number, updater: (post: Post) => Post) => {
      patchPostInAllCaches(queryClient, postId, updater);
      onLocalUpdate?.(updater);
    },
    [queryClient, onLocalUpdate]
  );

  const handleLike = useCallback(() => {
    if (!post || isSavingLike) return;

    const was = post.user_actions.is_liked;
    setIsSavingLike(true);
    applyPatch(post.id, (p) => toggle(p, "is_liked", "like_count", !was));

    const mutate = was ? unlikePost : likePost;
    mutate(post.id, {
      onError: () =>
        applyPatch(post.id, (p) => toggle(p, "is_liked", "like_count", was)),
      onSettled: () => setIsSavingLike(false),
    });
  }, [post, isSavingLike, applyPatch, likePost, unlikePost]);

  const handleBookmark = useCallback(() => {
    if (!post || isSavingBookmark) return;

    const was = post.user_actions.is_bookmarked;
    setIsSavingBookmark(true);
    applyPatch(post.id, (p) =>
      toggle(p, "is_bookmarked", "bookmark_count", !was)
    );

    const mutate = was ? unbookmarkPost : bookmarkPost;
    mutate(post.id, {
      onError: () =>
        applyPatch(post.id, (p) =>
          toggle(p, "is_bookmarked", "bookmark_count", was)
        ),
      onSettled: () => setIsSavingBookmark(false),
    });
  }, [post, isSavingBookmark, applyPatch, bookmarkPost, unbookmarkPost]);

  return { handleLike, handleBookmark, isSavingLike, isSavingBookmark };
};
