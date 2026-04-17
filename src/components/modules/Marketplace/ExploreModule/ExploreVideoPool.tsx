import { Box } from "@mui/material";
import { PoolItem } from "./useExplorePlayerPool";
import { PostUser } from "@/ts/models/social/Post";
import { PostVideoPlayer } from "./PostVideoPlayer";

type ExploreVideoPoolProps = {
  items: PoolItem[];
  isLoading: boolean;
  user: PostUser | null;
  description: string | null;
  isVideoReview: boolean;
};

export function ExploreVideoPool({
  items,
  isLoading,
  user,
  description,
  isVideoReview,
}: ExploreVideoPoolProps) {
  return (
    <Box sx={poolStyles.root}>
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
              description={description ?? ""}
              isVideoReview={isVideoReview}
              preload="metadata"
              resetOnInactive={false}
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
