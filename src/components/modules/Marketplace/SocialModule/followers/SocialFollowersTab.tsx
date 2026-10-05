import { Box, CircularProgress } from "@mui/material";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { isEmpty } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import UserItem from "@/components/cutomized/UserItem/UserItem";
import {
  useFollow,
  useInfiniteFollowers,
  useUnfollow,
} from "@/controllers/social/follow.controller";
import { UserMini } from "@/ts/models/user/UserMini";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

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

  const queryClient = useQueryClient();
  const { mutate: follow } = useFollow();
  const { mutate: unfollow } = useUnfollow();
  const [pendingUserId, setPendingUserId] = useState<number | null>(null);

  const handleToggleFollow = useCallback(
    (user: UserMini) => {
      setPendingUserId(user.id);
      const mutate = user.is_follow ? unfollow : follow;

      mutate(user.id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["followers", userId] });
        },
        onSettled: () => {
          setPendingUserId(null);
        },
      });
    },
    [follow, unfollow, queryClient, userId]
  );

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
  }, [
    rootRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    disableInitialIgnore,
  ]);

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
            onToggleFollow={handleToggleFollow}
            isTogglingFollow={pendingUserId === follower.id}
          />
        ))}

      <div ref={sentinelRef} aria-hidden style={{ height: 1 }} />

      {isFetchingNextPage && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      {!isLoading && isEmpty(followers) && (
        <NotFound
          title="Urmăritori"
          description="Acest cont nu este urmărit de nimeni"
          icon={<PeopleAltOutlinedIcon />}
        />
      )}
    </>
  );
};

export default memo(SocialFollowersTab);
