import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

type ProfessionListItemSkeletonsProps = { count?: number };

export default function ProfessionListItemSkeletons({
  count = 5,
}: ProfessionListItemSkeletonsProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i} sx={{ p: 1.5 }}>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Skeleton sx={{ width: 200 }} />
            <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
          </Stack>
        </Box>
      ))}
    </>
  );
}
