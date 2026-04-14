import { Post } from "@/ts/models/social/Post";
import { useMemo } from "react";

type PoolSlot = "prev" | "current" | "next";

export type PoolItem = {
  slot: PoolSlot;
  post: Post | null | undefined;
  index: number;
  src: string;
  isActive: boolean;
};

type UseExplorePlayerPoolParams = {
  posts: Post[];
  currentIndex: number;
};

type UseExplorePlayerPoolReturn = {
  prevPost: Post | null | undefined;
  currentPost: Post | null | undefined;
  nextPost: Post | null | undefined;
  poolItems: PoolItem[];
};

export function useExplorePlayerPool({
  posts,
  currentIndex,
}: UseExplorePlayerPoolParams): UseExplorePlayerPoolReturn {
  return useMemo(() => {
    const prevIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;

    const prevPost = prevIndex >= 0 ? posts[prevIndex] : null;
    const currentPost = posts[currentIndex] ?? null;
    const nextPost = nextIndex < posts.length ? posts[nextIndex] : null;

    const poolItems: PoolItem[] = [
      {
        slot: "prev",
        post: prevPost,
        index: prevIndex,
        src: prevPost?.media_files?.[0]?.url ?? "",
        isActive: false,
      },
      {
        slot: "current",
        post: currentPost,
        index: currentIndex,
        src: currentPost?.media_files?.[0]?.url ?? "",
        isActive: true,
      },
      {
        slot: "next",
        post: nextPost,
        index: nextIndex,
        src: nextPost?.media_files?.[0]?.url ?? "",
        isActive: false,
      },
    ];

    return {
      prevPost,
      currentPost,
      nextPost,
      poolItems,
    };
  }, [posts, currentIndex]);
}
