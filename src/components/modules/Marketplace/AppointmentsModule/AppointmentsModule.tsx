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
import AppointmentCard from "./AppointmentCard";
import { useInfiniteAppointments } from "@/hooks/infiniteQuery/useInfiniteAppointments";
import { isEmpty } from "lodash";
import AppointmentCardSkeleton from "./AppointmentCardSkeleton";

type AppointmentsModuleProps = {
  scrollRootRef: React.RefObject<HTMLDivElement | null>;
};

const AppointmentsModule = ({ scrollRootRef }: AppointmentsModuleProps) => {
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteAppointments();

  const appointments = React.useMemo(
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
          sx={{ mb: 2.5 }}
        >
          Rezervări și abonamente
        </Typography>

        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Button variant="contained" color="primary" disableElevation>
            Rezervări
          </Button>
          <Button variant="outlined" color="secondary" disableElevation>
            Abonamente
          </Button>
        </Stack>

        <Divider sx={{ my: 2.5 }} />
      </Box>

      {isLoading && <AppointmentCardSkeleton />}

      {!isLoading &&
        appointments.map((appointment, index) => (
          <Box key={`${appointment.id}-${index}`}>
            <AppointmentCard
              appointment={appointment}
              navigateToAppointmentDetails={(appt) =>
                console.log("Navigate to:", appt)
              }
            />
            {index < appointments.length - 1 && <Divider sx={{ my: 1.5 }} />}
          </Box>
        ))}

      {hasNextPage && (
        <Box
          ref={sentinelRef}
          sx={{
            py: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 60,
          }}
        >
          {isFetchingNextPage && <CircularProgress size={25} />}
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
};

export default AppointmentsModule;
