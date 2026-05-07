import React from "react";
import { ListItem } from "@mui/material";
import { Stack, Skeleton } from "@mui/material";

export default function NotificationSkeletons() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <ListItem sx={{ p: 0 }} key={i}>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            p={2.5}
            flexGrow={1}
            gap={2}
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-start"
              maxWidth={400}
              gap={1}
            >
              <Skeleton variant="circular" sx={{ width: 55, height: 55 }} />
              <Stack flexWrap="wrap">
                <Skeleton width={80} />
                <Skeleton width={120} />
              </Stack>
            </Stack>

            <Skeleton
              variant="rounded"
              sx={{ width: 90, height: 40, borderRadius: 50 }}
            />
          </Stack>
        </ListItem>
      ))}
    </>
  );
}
