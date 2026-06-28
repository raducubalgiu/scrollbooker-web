import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { PoolItem } from "./useExplorePlayerPool";
import {
  PostUser,
  PostCounters,
  PostUserActions,
} from "@/ts/models/social/Post";
import { PostVideoPlayer } from "@/components/cutomized/Post/PostVideoPlayer";

type ExploreVideoPoolProps = {
  items: PoolItem[];
  isLoading: boolean;
  slideOffset: number;
  isAnimating: boolean;
  user: PostUser | null;
  counters: PostCounters | null;
  userActions: PostUserActions | null;
  description: string | null;
  isOwnPost: boolean;
  isVideoReview: boolean;
  onNext: () => void;
  onPrev: () => void;
  onOpenLinkedProducts: () => void;
};

const ANIMATION_DURATION_MS = 300;
const SWIPE_THRESHOLD = 50;
const DRAG_CLICK_THRESHOLD = 5;

export function ExploreVideoPool({
  items,
  isLoading,
  slideOffset,
  isAnimating,
  user,
  counters,
  userActions,
  description,
  isOwnPost,
  isVideoReview,
  onNext,
  onPrev,
  onOpenLinkedProducts,
}: ExploreVideoPoolProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dragStartY = useRef<number | undefined>(undefined);
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

    if (!isDragging.current || Math.abs(delta) < SWIPE_THRESHOLD) {
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
            key={item.slot}
            data-slot={item.slot}
            sx={{
              ...styles.playerLayer,
              zIndex: isCurrent ? 2 : 1,
            }}
          >
            {item.post && item.src ? (
              <PostVideoPlayer
                src={item.src}
                isActive={item.isActive}
                isLoading={isLoading && isCurrent}
                preload={item.shouldPreload ? "auto" : "none"}
                user={isCurrent ? user : null}
                counters={isCurrent ? counters : null}
                userActions={isCurrent ? userActions : null}
                description={isCurrent ? (description ?? "") : ""}
                isOwnPost={isOwnPost}
                isVideoReview={isVideoReview}
                resetOnInactive={false}
                onOpenLinkedProducts={onOpenLinkedProducts}
              />
            ) : null}
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
      transition: `transform ${ANIMATION_DURATION_MS}ms cubic-bezier(0.15, 0.3, 0.25, 1) !important`,
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
