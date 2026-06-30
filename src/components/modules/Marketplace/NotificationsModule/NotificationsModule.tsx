"use client";

import React from "react";
import { Box, Typography, Divider, CircularProgress } from "@mui/material";
import isEmpty from "lodash/isEmpty";
import NotificationItem from "./NotificationItem";
import { useInfiniteNotifications } from "@/hooks/infiniteQuery/useInfiniteNotifications";
import NotificationSkeletons from "@/components/cutomized/Skeletons/NotificationSkeletons";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotFound from "@/components/cutomized/NotFound/NotFound";

type NotificationsModuleProps = {
  scrollRootRef?: React.RefObject<HTMLDivElement | null>;
  onNavigateToUserProfile: (username: string, profession: string) => void;
  onNavigateToEmploymentRequest: (e: number) => void;
  onNavigateToAppointmentDetails: (appointmentId: number) => void;
};

const NotificationsModule = ({
  scrollRootRef,
  onNavigateToUserProfile,
  onNavigateToEmploymentRequest,
  onNavigateToAppointmentDetails,
}: NotificationsModuleProps) => {
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
  const localListScrollRef = React.useRef<HTMLDivElement | null>(null);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteNotifications();

  const notifications = React.useMemo(
    () => data?.pages.flatMap((p) => p.results) ?? [],
    [data]
  );

  const isInsideOverlay = Boolean(scrollRootRef);
  const activeScrollContainerRef = scrollRootRef || localListScrollRef;

  React.useEffect(() => {
    const root = activeScrollContainerRef.current;
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
  }, [
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    activeScrollContainerRef,
  ]);

  const renderListContent = () => (
    <>
      {isLoading && <NotificationSkeletons />}

      {!isLoading &&
        notifications.map((notification, index) => (
          <NotificationItem
            key={`${notification.id}-${index}`}
            notification={notification}
            onNavigateToUserProfile={onNavigateToUserProfile}
            onNavigateToEmploymentRequest={onNavigateToEmploymentRequest}
            onNavigateToAppointmentDetails={onNavigateToAppointmentDetails}
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
        <NotFound
          title="Notificari"
          description="Nu ai nici o notificare primita"
          icon={<NotificationsNoneOutlinedIcon />}
        />
      )}
    </>
  );

  if (isInsideOverlay) {
    return (
      <>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "background.default",
            p: { xs: 1.5, sm: 2.5 },
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            fontWeight={700}
            fontSize={{ xs: 17, lg: 25 }}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            Notificări
          </Typography>
        </Box>
        {renderListContent()}
      </>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          px: { xs: 1.5, sm: 3 },
          pt: { xs: 1, sm: 3 },
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          fontWeight={700}
          fontSize={{ xs: 17, lg: 25 }}
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          Notificări
        </Typography>
        <Divider sx={{ mt: { xs: 1, md: 2.5 } }} />
      </Box>

      <Box
        ref={localListScrollRef}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorY: "contain",
        }}
      >
        {renderListContent()}
      </Box>
    </Box>
  );
};

export default NotificationsModule;
