import { Box, Typography, CircularProgress } from "@mui/material";
import React, { memo, useEffect, useRef } from "react";
import { isEmpty } from "lodash";
import UserItem from "@/components/cutomized/UserItem/UserItem";
import { useInfiniteFollowers } from "@/hooks/infiniteQuery/useInfiniteFollowers";

type SocialFollowersTabProps = {
  userId: number | undefined;
  rootRef?: React.RefObject<HTMLDivElement | null>;
  disableInitialIgnore?: boolean;
};
const SocialFollowersTab = ({
  userId,
  rootRef,
  disableInitialIgnore,
}: SocialFollowersTabProps) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteFollowers(userId);

  const followers = data?.pages.flatMap((p) => p.results) ?? [];
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef?.current ?? null;
    const sentinel = sentinelRef.current;
    if (!sentinel || !root) return;

    let ignoreInitial = !disableInitialIgnore;
    const initTimer = window.setTimeout(() => {
      ignoreInitial = false;
    }, 200);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (ignoreInitial) return;
        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root, threshold: 0.1 }
    );

    observer.observe(sentinel);

    return () => {
      clearTimeout(initTimer);
      observer.disconnect();
    };
  }, [rootRef, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading &&
        followers.map((follower) => (
          <UserItem
            key={follower.id}
            user={follower}
            ownerId={userId}
            type="followers"
          />
        ))}

      <div ref={sentinelRef} aria-hidden style={{ height: 1 }} />

      {isFetchingNextPage && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      {!isLoading && isEmpty(followers) && (
        <Box sx={{ p: 2.5 }}>
          <Typography sx={{ textAlign: "center" }}>
            Nu au fost găsite rezultate
          </Typography>
        </Box>
      )}
    </>
  );
};

export default memo(SocialFollowersTab);
