import { useEffect, useRef } from "react";

type UseFeedPaginationPrefetchParams = {
  currentIndex: number;
  postsLength: number;
  postsCount: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  prefetchOffset?: number;
};

export function useFeedPaginationPrefetch({
  currentIndex,
  postsLength,
  postsCount,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  prefetchOffset = 2,
}: UseFeedPaginationPrefetchParams) {
  const lastPrefetchTriggerRef = useRef<number | null>(null);

  useEffect(() => {
    const hasMoreRemoteItems = postsLength < postsCount;
    const reachedPrefetchZone =
      currentIndex >= postsLength - 1 - prefetchOffset;
    const alreadyTriggeredForThisLength =
      lastPrefetchTriggerRef.current === postsLength;

    if (
      !hasMoreRemoteItems ||
      !hasNextPage ||
      isFetchingNextPage ||
      !reachedPrefetchZone ||
      alreadyTriggeredForThisLength
    ) {
      return;
    }

    lastPrefetchTriggerRef.current = postsLength;
    fetchNextPage();
  }, [
    currentIndex,
    postsLength,
    postsCount,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    prefetchOffset,
  ]);
}
