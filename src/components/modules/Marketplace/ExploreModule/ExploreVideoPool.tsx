import { Box } from "@mui/material";
import { PoolItem } from "./useExplorePlayerPool";
import { PostCounters, PostUser } from "@/ts/models/social/Post";
import { PostVideoPlayer } from "../../../cutomized/Post/PostVideoPlayer";
import { useRef } from "react";

type ExploreVideoPoolProps = {
  items: PoolItem[];
  isLoading: boolean;
  user: PostUser | null;
  counters: PostCounters | null;
  description: string | null;
  isVideoReview: boolean;
  onNext: () => void;
  onPrev: () => void;
  onOpenLinkedProducts: () => void;
};

export function ExploreVideoPool({
  items,
  isLoading,
  user,
  counters,
  description,
  isVideoReview,
  onNext,
  onPrev,
  onOpenLinkedProducts,
}: ExploreVideoPoolProps) {
  const touchStartY = useRef<number | undefined>(undefined);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0]?.clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current === undefined) return;

    const touchEndY = e.changedTouches[0]?.clientY;

    if (touchEndY !== undefined) {
      const deltaY = touchStartY.current - touchEndY;
      const swipeThreshold = 50;

      if (deltaY > swipeThreshold) {
        onNext();
      } else if (deltaY < -swipeThreshold) {
        onPrev();
      }
    }

    touchStartY.current = undefined;
  };

  return (
    <Box
      sx={poolStyles.root}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {items.map((item) => {
        if (!item.post || !item.src) return null;

        const isCurrent = item.slot === "current";

        return (
          <Box
            key={item.slot}
            sx={{
              ...poolStyles.playerLayer,
              opacity: isCurrent ? 1 : 0,
              pointerEvents: isCurrent ? "auto" : "none",
              zIndex: isCurrent ? 2 : 1,
            }}
          >
            <PostVideoPlayer
              src={item.src}
              isActive={item.isActive}
              isLoading={isLoading && isCurrent}
              user={user}
              counters={counters}
              description={description ?? ""}
              isVideoReview={isVideoReview}
              preload="metadata"
              resetOnInactive={false}
              onOpenLinkedProducts={onOpenLinkedProducts}
            />
          </Box>
        );
      })}
    </Box>
  );
}

const poolStyles = {
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  playerLayer: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    transition: "opacity 180ms ease",
  },
};
