"use client";

import NotificationSkeleton from "@/components/cutomized/Skeletons/NotificationSkeletons";
import NotificationItem from "@/components/cutomized/NotificationItem/NotificationItem";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { useEffect, useRef } from "react";
import { useInfiniteNotifications } from "@/hooks/infiniteQuery/useInfiniteNotifications";

const NotificationsModule = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteNotifications();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const notifications = data?.pages.flatMap((p) => p.results) ?? [];

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
          Notificari
        </Typography>

        <Divider sx={{ mt: 2.5, mb: 1.5 }} />
      </Box>

      {isLoading && <NotificationSkeleton />}

      {!isLoading &&
        notifications?.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}

      <Box
        ref={loadMoreRef}
        sx={{ py: 3, display: "flex", justifyContent: "center" }}
      >
        {isFetchingNextPage && <CircularProgress size={25} />}
      </Box>

      {!isLoading && isEmpty(notifications) && (
        <Typography sx={{ textAlign: "center" }} color="text.secondary">
          Nu au fost găsite notificări
        </Typography>
      )}
    </>
  );
};

export default NotificationsModule;
