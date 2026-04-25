"use client";

import NotificationSkeleton from "@/components/cutomized/Skeletons/NotificationSkeletons";
import NotificationItem from "@/components/cutomized/NotificationItem/NotificationItem";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { useInfiniteNotifications } from "@/hooks/infiniteQuery/useInfiniteNotifications";
import React from "react";

type NotificationsModuleProps = {
  scrollRootRef: React.RefObject<HTMLDivElement | null>;
  onNavigateToUserProfile: (username: string) => void;
};

const NotificationsModule = ({
  scrollRootRef,
  onNavigateToUserProfile,
}: NotificationsModuleProps) => {
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteNotifications();

  const notifications = React.useMemo(
    () => data?.pages.flatMap((p) => p.results) ?? [],
    [data]
  );

  React.useEffect(() => {
    const root = scrollRootRef.current;
    const sentinel = sentinelRef.current;

    if (!root || !sentinel || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root,
        threshold: 0.1,
        rootMargin: "0px 0px 80px 0px",
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, scrollRootRef]);

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "background.paper",
          px: 3,
          pt: 3,
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          fontWeight={700}
          fontSize={25}
        >
          Notificări
        </Typography>

        <Divider sx={{ mt: 2.5, mb: 1.5 }} />
      </Box>

      {isLoading && <NotificationSkeleton />}

      {!isLoading &&
        notifications.map((notification, index) => (
          <NotificationItem
            key={`${notification.id}-${index}`}
            notification={notification}
            onNavigateToUserProfile={onNavigateToUserProfile}
          />
        ))}

      {hasNextPage && (
        <Box
          ref={sentinelRef}
          sx={{
            py: 4,
            display: "flex",
            justifyContent: "center",
            minHeight: 60,
          }}
        >
          {isFetchingNextPage && <CircularProgress size={25} />}
        </Box>
      )}

      {!isLoading && !hasNextPage && !isEmpty(notifications) && (
        <Typography
          sx={{
            textAlign: "center",
            py: 5,
            color: "text.disabled",
            fontSize: 14,
          }}
        >
          Nu mai sunt notificări de afișat
        </Typography>
      )}

      {!isLoading && isEmpty(notifications) && (
        <Typography sx={{ textAlign: "center", py: 3 }} color="text.secondary">
          Nu au fost găsite notificări
        </Typography>
      )}
    </>
  );
};

export default NotificationsModule;
