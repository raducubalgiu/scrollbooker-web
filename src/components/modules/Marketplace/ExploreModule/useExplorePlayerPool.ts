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

const ANIMATION_DURATION_MS = 280;

export function useExplorePlayerPool({
  posts,
  currentIndex,
}: UseExplorePlayerPoolParams): UseExplorePlayerPoolResult {
  const [slideOffset, setSlideOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const prevIndexRef = useRef(currentIndex);
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prev = prevIndexRef.current;
    const next = currentIndex;

    if (prev === next) return;

    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);

    const initialOffset = next > prev ? 1 : -1;

    setIsAnimating(false);
    setSlideOffset(initialOffset);

    const rafId = requestAnimationFrame(() => {
      setIsAnimating(true);
      setSlideOffset(0);
    });

    animationTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, ANIMATION_DURATION_MS);

    prevIndexRef.current = next;

    return () => {
      cancelAnimationFrame(rafId);
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    };
  }, [currentIndex]);

  const prevPost = posts[currentIndex - 1] ?? null;
  const currentPost = posts[currentIndex] ?? null;
  const nextPost = posts[currentIndex + 1] ?? null;

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
        isActive: !isAnimating,
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
    [prevPost, currentPost, nextPost, isAnimating]
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
