import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { Box } from "@mui/material";
import { Post } from "@/ts/models/social/Post";
import { PostVideoPlayer } from "@/components/cutomized/Post/PostVideoPlayer";
import {
  PostActionCallbacks,
  PostActionLoaders,
} from "@/components/cutomized/Post/actions/postActionTypes";

const PRELOAD_RADIUS = 1;
const ACTIVE_RATIO_THRESHOLD = 0.6;
const PROGRAMMATIC_SCROLL_GUARD_MS = 500;
const SWIPE_MOVE_THRESHOLD_PX = 10;

type FeedVideoPoolProps = {
  posts: Post[];
  currentIndex: number;
  loaders: PostActionLoaders;
  callbacks: PostActionCallbacks;
  onIndexChange: (index: number) => void;
  onOpenLinkedProducts: () => void;
};

export function FeedVideoPool({
  posts,
  currentIndex,
  loaders,
  callbacks,
  onIndexChange,
  onOpenLinkedProducts,
}: FeedVideoPoolProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const lastSettledIndexRef = useRef<number | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const isFirstScrollRef = useRef(true);
  const programmaticScrollTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const onIndexChangeRef = useRef(onIndexChange);
  useEffect(() => {
    onIndexChangeRef.current = onIndexChange;
  }, [onIndexChange]);

  const setItemRef = useCallback((index: number, el: HTMLDivElement | null) => {
    if (el) itemRefs.current.set(index, el);
    else itemRefs.current.delete(index);
  }, []);

  // Browser-ul decide singur fizica swipe-ului (scroll-snap) — noi doar
  // ascultăm ce index a devenit "principal" vizual, via IntersectionObserver.
  // Recreat la fiecare schimbare a numărului de postări (pagination), ca să
  // observe și elementele nou apărute.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) return;

        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (
            !bestEntry ||
            entry.intersectionRatio > bestEntry.intersectionRatio
          ) {
            bestEntry = entry;
          }
        }

        if (
          !bestEntry ||
          bestEntry.intersectionRatio < ACTIVE_RATIO_THRESHOLD
        ) {
          return;
        }

        const indexAttr = bestEntry.target.getAttribute("data-index");
        const index = indexAttr ? Number(indexAttr) : NaN;

        if (!Number.isNaN(index) && index !== lastSettledIndexRef.current) {
          lastSettledIndexRef.current = index;
          onIndexChangeRef.current(index);
        }
      },
      { root: container, threshold: [0, ACTIVE_RATIO_THRESHOLD, 1] }
    );

    itemRefs.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [posts.length]);

  // currentIndex schimbat din exterior (butoanele de pe desktop) — scroll
  // programatic către el. Dacă schimbarea vine chiar din swipe-ul userului
  // (IntersectionObserver-ul de mai sus a raportat-o deja), nu mai facem
  // nimic — containerul e deja acolo.
  useLayoutEffect(() => {
    if (currentIndex === lastSettledIndexRef.current) return;

    const target = itemRefs.current.get(currentIndex);
    if (!target) return;

    isProgrammaticScrollRef.current = true;
    lastSettledIndexRef.current = currentIndex;
    // The very first programmatic positioning (landing on the initially
    // resolved post) must be instant — the user should never see the
    // feed visibly scroll past the in-between videos on load.
    target.scrollIntoView({
      behavior: isFirstScrollRef.current ? "auto" : "smooth",
      block: "start",
    });
    isFirstScrollRef.current = false;

    if (programmaticScrollTimeoutRef.current) {
      clearTimeout(programmaticScrollTimeoutRef.current);
    }
    programmaticScrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, PROGRAMMATIC_SCROLL_GUARD_MS);
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      if (programmaticScrollTimeoutRef.current) {
        clearTimeout(programmaticScrollTimeoutRef.current);
      }
    };
  }, []);

  // WebKit (Safari/Chrome pe iOS — ambele rulează pe WebKit acolo) e mult
  // mai strict decât Chrome desktop/Android cu privire la autoplay cu
  // sunet: play() trebuie apelat cât mai aproape de gestul userului, nu la
  // finalul lanțului IntersectionObserver → setState → effect, care e
  // asincron și poate ajunge după ce fereastra de "user activation" a
  // expirat (mai probabil la swipe-uri cu impuls mare, unde settle-ul
  // scroll-snap durează mai mult).
  //
  // Doar un touchend nu e suficient ca semnal — se declanșează și la un
  // tap static pe video (toggle play/pause din PostVideoPlayer), caz în
  // care un play() aici intră în cursă cu verificarea video.paused din
  // acel toggle și îi inversează direcția. De-asta urmărim mișcarea reală
  // dintre touchstart/touchend (un swipe, nu un tap) și nu apelăm play()
  // dacă cel mai vizibil post e tot cel deja activ — altfel am putea anula
  // o pauză manuală a userului chiar pe videoul curent.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX = 0;
    let startY = 0;
    let hasMoved = false;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
      hasMoved = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      if (
        Math.abs(touch.clientX - startX) > SWIPE_MOVE_THRESHOLD_PX ||
        Math.abs(touch.clientY - startY) > SWIPE_MOVE_THRESHOLD_PX
      ) {
        hasMoved = true;
      }
    };

    const handleTouchEnd = () => {
      if (!hasMoved) return;

      const containerRect = container.getBoundingClientRect();
      const containerArea = containerRect.width * containerRect.height;
      if (containerArea <= 0) return;

      let bestIndex: number | null = null;
      let bestRatio = 0;

      itemRefs.current.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const overlapHeight = Math.max(
          0,
          Math.min(rect.bottom, containerRect.bottom) -
            Math.max(rect.top, containerRect.top)
        );
        const overlapWidth = Math.max(
          0,
          Math.min(rect.right, containerRect.right) -
            Math.max(rect.left, containerRect.left)
        );
        const ratio = (overlapHeight * overlapWidth) / containerArea;

        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestIndex = index;
        }
      });

      if (
        bestIndex === null ||
        bestRatio < ACTIVE_RATIO_THRESHOLD ||
        bestIndex === lastSettledIndexRef.current
      ) {
        return;
      }

      const el = itemRefs.current.get(bestIndex);
      const video = el?.querySelector("video");
      video?.play().catch(() => {});
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <Box ref={containerRef} sx={styles.root}>
      {posts.map((post, index) => {
        const isActive = index === currentIndex;
        const shouldLoad = Math.abs(index - currentIndex) <= PRELOAD_RADIUS;
        const thumbnailUrl = post.media_files?.[0]?.thumbnail_url;

        return (
          <Box
            key={post.id}
            data-index={index}
            ref={(el: HTMLDivElement | null) => setItemRef(index, el)}
            sx={styles.item}
          >
            {shouldLoad ? (
              <PostVideoPlayer
                post={post}
                loaders={loaders}
                callbacks={callbacks}
                src={post.media_files?.[0]?.url ?? ""}
                isActive={isActive}
                isLoading={loaders.isLoading && isActive}
                preload="auto"
                resetOnInactive={false}
                onOpenLinkedProducts={onOpenLinkedProducts}
              />
            ) : (
              <Box
                sx={{
                  ...styles.placeholder,
                  backgroundImage: thumbnailUrl
                    ? `url(${thumbnailUrl})`
                    : undefined,
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

const styles = {
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflowY: "scroll",
    overflowX: "hidden",
    scrollSnapType: "y mandatory",
    overscrollBehaviorY: "contain",
    touchAction: "pan-y",
    WebkitOverflowScrolling: "touch",
    "&::-webkit-scrollbar": { display: "none" },
    scrollbarWidth: "none",
  },
  item: {
    position: "relative",
    width: "100%",
    height: "100%",
    flexShrink: 0,
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
} as const;
