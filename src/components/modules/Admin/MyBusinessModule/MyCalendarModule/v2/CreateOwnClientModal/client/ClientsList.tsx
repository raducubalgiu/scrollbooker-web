"use client";

import React, { useEffect, useRef } from "react";
import { Box, CircularProgress, Skeleton, Stack, Typography } from "@mui/material";
import { useInfiniteBusinessClients } from "@/controllers/booking/businessClient.controller";
import { BusinessClient } from "@/ts/models/booking/businessClient/BusinessClient";
import ClientRow from "./ClientRow";

type ClientsListProps = {
  businessId: number;
  query: string;
  isActive: boolean;
  selectedClientId: number | null;
  onSelectClient: (client: BusinessClient) => void;
};

const SKELETON_COUNT = 6;

const ClientsList = ({
  businessId,
  query,
  isActive,
  selectedClientId,
  onSelectClient,
}: ClientsListProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteBusinessClients({ businessId, query, isEnabled: isActive });

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, data]);

  const clients = data?.pages.flatMap((page) => page.results) ?? [];

  if (isLoading) {
    return (
      <Stack spacing={1}>
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <Stack key={index} direction="row" spacing={1.5} alignItems="center" sx={{ p: 1.5 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ flex: 1 }}>
              <Skeleton width="55%" />
              <Skeleton width="35%" />
            </Box>
          </Stack>
        ))}
      </Stack>
    );
  }

  if (isError) {
    return (
      <Typography sx={styles.message}>
        Clienții nu au putut fi încărcați.
      </Typography>
    );
  }

  if (clients.length === 0) {
    return (
      <Typography sx={styles.message}>
        {query.trim() ? "Nu a fost găsit niciun client." : "Nu ai niciun client încă."}
      </Typography>
    );
  }

  return (
    <Stack>
      {clients.map((client) => (
        <ClientRow
          key={client.id}
          client={client}
          isSelected={client.id === selectedClientId}
          onClick={() => onSelectClient(client)}
        />
      ))}

      <div ref={sentinelRef} aria-hidden style={{ height: 1 }} />

      {isFetchingNextPage && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
    </Stack>
  );
};

export default ClientsList;

const styles = {
  message: {
    textAlign: "center",
    color: "text.secondary",
    p: 2.5,
  },
};
