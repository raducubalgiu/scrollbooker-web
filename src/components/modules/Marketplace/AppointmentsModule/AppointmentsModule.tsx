"use client";

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import AppointmentCard from "./AppointmentCard/AppointmentCard";
import { useInfiniteAppointments } from "@/hooks/infiniteQuery/useInfiniteAppointments";
import { isEmpty } from "lodash";
import AppointmentCardSkeleton from "./AppointmentCardSkeleton";

type AppointmentsModuleProps = {
  scrollRootRef?: React.RefObject<HTMLDivElement | null>;
  onNavigateToAppointment: (appointmentId: number) => void;
};

const AppointmentsModule = ({
  scrollRootRef,
  onNavigateToAppointment,
}: AppointmentsModuleProps) => {
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
  const localListScrollRef = React.useRef<HTMLDivElement | null>(null);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteAppointments();

  const appointments = React.useMemo(
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

    return () => observer.disconnect();
  }, [
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    activeScrollContainerRef,
  ]);

  const renderHeader = () => {
    return (
      <Box
        sx={{
          position: isInsideOverlay ? "sticky" : "initial",
          top: isInsideOverlay ? 0 : "initial",
          zIndex: isInsideOverlay ? 10 : "initial",
          flexShrink: isInsideOverlay ? "initial" : 0,
          borderBottom: 1,
          borderColor: "divider",
          p: { xs: 1, lg: 2.5 },
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          fontWeight={700}
          fontSize={{ xs: 17, lg: 25 }}
          sx={{
            textAlign: isInsideOverlay
              ? { xs: "center", sm: "left" }
              : "center",
          }}
        >
          Rezervări și abonamente
        </Typography>
      </Box>
    );
  };

  const renderListContent = () => (
    <>
      <Stack flexDirection="row" alignItems="center" gap={1} m={1.5}>
        <Button variant="contained" color="primary" disableElevation>
          Rezervări
        </Button>
        <Button variant="outlined" color="secondary" disableElevation>
          Abonamente
        </Button>
      </Stack>

      {isLoading && <AppointmentCardSkeleton />}

      {!isLoading &&
        appointments.map((appointment, index) => (
          <Box key={`${appointment.id}-${index}`}>
            <AppointmentCard
              appointment={appointment}
              navigateToAppointmentDetails={onNavigateToAppointment}
            />
            {index < appointments.length - 1 && <Divider sx={{ my: 1.5 }} />}
          </Box>
        ))}

      {hasNextPage && (
        <Box
          ref={sentinelRef}
          sx={{
            my: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 60,
          }}
        >
          {isFetchingNextPage && (
            <CircularProgress
              sx={{
                width: { xs: 22.5, lg: 25 },
                height: { xs: 22.5, lg: 25 },
              }}
            />
          )}
        </Box>
      )}

      {!isLoading && !hasNextPage && !isEmpty(appointments) && (
        <Typography
          sx={{
            textAlign: "center",
            py: 5,
            color: "text.disabled",
            fontSize: 14,
          }}
        >
          Ai ajuns la sfârșitul listei
        </Typography>
      )}

      {!isLoading && isEmpty(appointments) && (
        <Typography sx={{ textAlign: "center", py: 3 }} color="text.secondary">
          Nu au fost găsite rezervări
        </Typography>
      )}
    </>
  );

  if (isInsideOverlay) {
    return (
      <>
        {renderHeader()}
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
      {renderHeader()}
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

export default AppointmentsModule;
