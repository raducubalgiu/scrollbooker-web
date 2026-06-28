import { useMemo, useRef, useState, useEffect } from "react";
import { Post } from "@/ts/models/social/Post";

export type SlotPosition = "prev" | "current" | "next";

export type PoolItem = {
  slot: SlotPosition;
  post: Post | null;
  src: string;
  isActive: boolean;
  shouldPreload: boolean;
};

type UseExplorePlayerPoolParams = {
  posts: Post[];
  currentIndex: number;
};

type UseExplorePlayerPoolResult = {
  poolItems: PoolItem[];
  prevPost: Post | null;
  currentPost: Post | null;
  nextPost: Post | null;
  slideOffset: number;
  isAnimating: boolean;
};

const ANIMATION_DURATION_MS = 300;

export function useExplorePlayerPool({
  posts,
  currentIndex,
}: UseExplorePlayerPoolParams): UseExplorePlayerPoolResult {
  const [committedIndex, setCommittedIndex] = useState(currentIndex);
  const [slideOffset, setSlideOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const prevIndexRef = useRef(currentIndex);
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prev = prevIndexRef.current;
    const next = currentIndex;

    if (prev === next) return;

    // Anulăm orice animație în curs
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }

    const direction = next > prev ? -1 : 1;

    setIsAnimating(true);
    setSlideOffset(direction);

    animationTimerRef.current = setTimeout(() => {
      setSlideOffset(0);
      setIsAnimating(false);
      setCommittedIndex(next);
    }, ANIMATION_DURATION_MS);

    prevIndexRef.current = next;

    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, [currentIndex]);

  const prevPost = posts[committedIndex - 1] ?? null;
  const currentPost = posts[committedIndex] ?? null;
  const nextPost = posts[committedIndex + 1] ?? null;

  const poolItems = useMemo<PoolItem[]>(
    () => [
      {
        slot: "prev",
        post: prevPost,
        src: prevPost?.media_files?.[0]?.url ?? "",
        isActive: false,
        shouldPreload: !!prevPost,
      },
      {
        slot: "current",
        post: currentPost,
        src: currentPost?.media_files?.[0]?.url ?? "",
        isActive: true,
        shouldPreload: true,
      },
      {
        slot: "next",
        post: nextPost,
        src: nextPost?.media_files?.[0]?.url ?? "",
        isActive: false,
        shouldPreload: !!nextPost,
      },
    ],
    [prevPost, currentPost, nextPost]
  );

  return {
    poolItems,
    prevPost,
    currentPost,
    nextPost,
    slideOffset,
    isAnimating,
  };
}
