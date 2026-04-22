import React from "react";
import { ListItem } from "@mui/material";
import { Stack, Skeleton } from "@mui/material";

export default function NotificationSkeletons() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <ListItem sx={{ p: 0, mb: 2.5 }} key={i}>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            p={2.5}
            flexGrow={1}
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-start"
              maxWidth={400}
            >
              <Skeleton
                variant="circular"
                sx={{ width: 50, height: 50, mr: 1.5 }}
              />
              <Stack flexWrap="wrap">
                <Skeleton width={200} />
                <Skeleton width={200} />
              </Stack>
            </Stack>
            <Skeleton
              variant="circular"
              sx={{ width: 40, height: 40, mr: 1.5 }}
            />
          </Stack>
        </ListItem>
      ))}
    </>
  );
}
