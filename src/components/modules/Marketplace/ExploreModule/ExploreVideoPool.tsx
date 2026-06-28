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

const ANIMATION_DURATION_MS = 300;
const SWIPE_PERCENT_THRESHOLD = 0.22;
const DRAG_CLICK_THRESHOLD = 5;
const VELOCITY_THRESHOLD = 0.5;

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

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.style.setProperty(
        "--slide-offset",
        `${slideOffset * 100}%`
      );

      if (isAnimating) {
        rootRef.current.style.setProperty("--drag-offset", "0px");
        rootRef.current.classList.add("is-animating");
      } else {
        rootRef.current.classList.remove("is-animating");
      }
    }
  }, [slideOffset, isAnimating]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isAnimating) return;
    dragStartY.current = e.touches[0]?.clientY;
    dragStartTimeRef.current = performance.now();
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (dragStartY.current === undefined || isAnimating) return;
    const delta = dragStartY.current - (e.touches[0]?.clientY ?? 0);

    if (!isDragging.current && Math.abs(delta) > DRAG_CLICK_THRESHOLD) {
      isDragging.current = true;
    }

    if (isDragging.current && rootRef.current) {
      rootRef.current.style.setProperty("--drag-offset", `${-delta}px`);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (dragStartY.current === undefined) return;
    const delta = dragStartY.current - (e.changedTouches[0]?.clientY ?? 0);
    commitDrag(delta);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAnimating) return;
    dragStartY.current = e.clientY;
    dragStartTimeRef.current = performance.now();
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartY.current === undefined || isAnimating) return;
    if (e.buttons === 0) {
      resetDrag();
      return;
    }
    const delta = dragStartY.current - e.clientY;

    if (!isDragging.current && Math.abs(delta) > DRAG_CLICK_THRESHOLD) {
      isDragging.current = true;
    }

    if (isDragging.current && rootRef.current) {
      rootRef.current.style.setProperty("--drag-offset", `${-delta}px`);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartY.current === undefined) return;
    const delta = dragStartY.current - e.clientY;
    commitDrag(delta);
  };

  const commitDrag = (delta: number) => {
    dragStartY.current = undefined;

    if (!isDragging.current) {
      resetDrag();
      return;
    }

    const timeElapsed = performance.now() - dragStartTimeRef.current;
    const velocity = Math.abs(delta) / (timeElapsed || 1);

    const windowHeight =
      typeof window !== "undefined" ? window.innerHeight : 800;
    const dragDistanceRatio = Math.abs(delta) / windowHeight;

    const isFlickGesture = velocity > VELOCITY_THRESHOLD;
    const isLongSwipeGesture = dragDistanceRatio >= SWIPE_PERCENT_THRESHOLD;

    if (!isFlickGesture && !isLongSwipeGesture) {
      resetDrag();
      return;
    }

    if (rootRef.current) {
      rootRef.current.style.setProperty("--drag-offset", "0px");
    }

    if (delta > 0) onNext();
    else onPrev();

    isDragging.current = false;
  };

  const resetDrag = () => {
    dragStartY.current = undefined;
    isDragging.current = false;

    if (rootRef.current) {
      rootRef.current.classList.add("is-animating");
      rootRef.current.style.setProperty("--drag-offset", "0px");

      setTimeout(() => {
        rootRef.current?.classList.remove("is-animating");
      }, ANIMATION_DURATION_MS);
    }
  };

  return (
    <Box
      ref={rootRef}
      sx={styles.root}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={resetDrag}
    >
      {items.map((item) => {
        const isCurrent = item.slot === "current";

        return (
          <Box
            key={item.post?.id ?? item.slot}
            data-slot={item.slot}
            sx={{
              ...styles.playerLayer,
              zIndex: isCurrent ? 2 : 1,
            }}
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
    "--slide-offset": "0%",
    "--drag-offset": "0px",

    "& [data-slot='prev']": {
      transform:
        "translateY(calc(-100% + var(--slide-offset) + var(--drag-offset)))",
    },
    "& [data-slot='current']": {
      transform:
        "translateY(calc(0% + var(--slide-offset) + var(--drag-offset)))",
    },
    "& [data-slot='next']": {
      transform:
        "translateY(calc(100% + var(--slide-offset) + var(--drag-offset)))",
    },

    "&.is-animating [data-slot]": {
      transition: `transform ${ANIMATION_DURATION_MS}ms cubic-bezier(0.215, 0.610, 0.355, 1.000) !important`,
    },
  },
  playerLayer: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    willChange: "transform",
    backfaceVisibility: "hidden",
  },
} as const;
