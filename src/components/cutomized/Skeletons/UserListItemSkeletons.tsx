import React from "react";
import { Skeleton, Box, Stack } from "@mui/material";

type UserListItemSkeletons = { count?: number };

export default function UserListItemSkeletons({
  count = 5,
}: UserListItemSkeletons) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Stack
          key={i}
          sx={{ p: 2.5 }}
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Skeleton variant="circular" width={50} height={50} />
          <Box sx={{ ml: 1.5 }}>
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
          </Box>
        </Stack>
      ))}
    </>
  );
}
