import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { PoolItem } from "./useExplorePlayerPool";
import { PostVideoPlayer } from "@/components/cutomized/Post/PostVideoPlayer";
import {
  PostActionCallbacks,
  PostActionLoaders,
} from "@/components/cutomized/Post/actions/postActionTypes";

type ExploreVideoPoolProps = {
  items: PoolItem[];
  loaders: PostActionLoaders;
  callbacks: PostActionCallbacks;
  slideOffset: number;
  isAnimating: boolean;
  onNext: () => void;
  onPrev: () => void;
  onOpenLinkedProducts: () => void;
};

const ANIMATION_DURATION_MS = 280;
const SWIPE_PERCENT_THRESHOLD = 0.2;
const DRAG_CLICK_THRESHOLD = 5;
const VELOCITY_THRESHOLD = 0.45;

export function ExploreVideoPool({
  items,
  loaders,
  callbacks,
  slideOffset,
  isAnimating,
  onNext,
  onPrev,
  onOpenLinkedProducts,
}: ExploreVideoPoolProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dragStartY = useRef<number | undefined>(undefined);
  const dragStartTimeRef = useRef<number>(0);
  const isDragging = useRef(false);

  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isAnimatingRef = useRef(isAnimating);
  const onNextRef = useRef(onNext);
  const onPrevRef = useRef(onPrev);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);
  useEffect(() => {
    onNextRef.current = onNext;
  }, [onNext]);
  useEffect(() => {
    onPrevRef.current = onPrev;
  }, [onPrev]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    el.style.setProperty("--slide-offset", `${slideOffset * 100}%`);

    if (isAnimating) {
      el.style.setProperty("--drag-offset", "0px");
      el.classList.add("is-animating");
    } else {
      el.classList.remove("is-animating");
    }
  }, [slideOffset, isAnimating]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const playVideoInSlot = (slot: "prev" | "next") => {
      const video = el.querySelector<HTMLVideoElement>(
        `[data-slot="${slot}"] video`
      );
      video?.play().catch(() => {});
    };

    const resetDrag = () => {
      // Curățăm orice timer activ anterior pentru a preveni scoaterea bruscă a clasei CSS
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

      dragStartY.current = undefined;
      isDragging.current = false;

      el.classList.add("is-animating");
      el.style.setProperty("--drag-offset", "0px");

      resetTimerRef.current = setTimeout(() => {
        el.classList.remove("is-animating");
      }, ANIMATION_DURATION_MS);
    };

    const commitDrag = (delta: number) => {
      dragStartY.current = undefined;

      if (!isDragging.current) {
        resetDrag();
        return;
      }

      const timeElapsed = performance.now() - dragStartTimeRef.current;
      const velocity = Math.abs(delta) / (timeElapsed || 1);

      const containerHeight = el.clientHeight || window.innerHeight;
      const dragDistanceRatio = Math.abs(delta) / containerHeight;

      if (
        velocity <= VELOCITY_THRESHOLD &&
        dragDistanceRatio < SWIPE_PERCENT_THRESHOLD
      ) {
        resetDrag();
        return;
      }

      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      el.classList.add("is-animating");
      el.style.setProperty("--drag-offset", "0px");

      if (delta > 0) {
        playVideoInSlot("next");
        onNextRef.current();
      } else {
        playVideoInSlot("prev");
        onPrevRef.current();
      }

      isDragging.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (isAnimatingRef.current) return;

      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      el.classList.remove("is-animating");

      const touchY = e.touches[0]?.clientY;
      if (touchY === undefined) return;

      dragStartY.current = touchY;
      dragStartTimeRef.current = performance.now();
      isDragging.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (dragStartY.current === undefined || isAnimatingRef.current) return;

      const touchY = e.touches[0]?.clientY;
      if (touchY === undefined) return;

      const delta = dragStartY.current - touchY;

      if (!isDragging.current && Math.abs(delta) > DRAG_CLICK_THRESHOLD) {
        isDragging.current = true;
      }

      if (isDragging.current) {
        if (e.cancelable) e.preventDefault();
        el.style.setProperty("--drag-offset", `${-delta}px`);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (dragStartY.current === undefined) return;

      const touchY = e.changedTouches[0]?.clientY;
      if (touchY === undefined) {
        resetDrag();
        return;
      }

      const delta = dragStartY.current - touchY;
      commitDrag(delta);
    };

    const onMouseDown = (e: MouseEvent) => {
      if (isAnimatingRef.current) return;

      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      el.classList.remove("is-animating");

      dragStartY.current = e.clientY;
      dragStartTimeRef.current = performance.now();
      isDragging.current = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (dragStartY.current === undefined || isAnimatingRef.current) return;

      if (e.buttons === 0) {
        resetDrag();
        return;
      }

      const delta = dragStartY.current - e.clientY;

      if (!isDragging.current && Math.abs(delta) > DRAG_CLICK_THRESHOLD) {
        isDragging.current = true;
      }

      if (isDragging.current) {
        el.style.setProperty("--drag-offset", `${-delta}px`);
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      if (dragStartY.current === undefined) return;
      commitDrag(dragStartY.current - e.clientY);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mouseleave", resetDrag);

    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mouseleave", resetDrag);
    };
  }, []);

  return (
    <Box ref={rootRef} sx={styles.root}>
      {items.map((item) => {
        const isCurrent = item.slot === "current";
        return (
          <Box
            key={item.post?.id ?? item.slot}
            data-slot={item.slot}
            sx={{ ...styles.playerLayer, zIndex: isCurrent ? 2 : 1 }}
          >
            <PostVideoPlayer
              post={item.post ?? null}
              loaders={loaders}
              callbacks={callbacks}
              src={item.src ?? ""}
              isActive={item.isActive}
              isLoading={loaders.isLoading && isCurrent}
              preload={item.shouldPreload ? "auto" : "none"}
              resetOnInactive={false}
              onOpenLinkedProducts={onOpenLinkedProducts}
            />
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
    overflow: "hidden",
    userSelect: "none",
    WebkitUserSelect: "none",
    touchAction: "none",
    "--slide-offset": "0%",
    "--drag-offset": "0px",

    "& [data-slot='prev']": {
      transform:
        "translate3d(0, calc(-100% + var(--slide-offset) + var(--drag-offset)), 0)",
    },
    "& [data-slot='current']": {
      transform:
        "translate3d(0, calc(0% + var(--slide-offset) + var(--drag-offset)), 0)",
    },
    "& [data-slot='next']": {
      transform:
        "translate3d(0, calc(100% + var(--slide-offset) + var(--drag-offset)), 0)",
    },

    "&.is-animating [data-slot]": {
      transition: `transform ${ANIMATION_DURATION_MS}ms cubic-bezier(0.25, 1, 0.5, 1) !important`,
    },
  },
  playerLayer: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    willChange: "transform",
    backfaceVisibility: "hidden",
    transformStyle: "flat",
  },
} as const;
