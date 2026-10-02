import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

const VideoHeaderSkeleton = () => {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Skeleton variant="circular" width={70} height={70} />

      <Box sx={{ flex: 1 }}>
        <Skeleton variant="rounded" width={160} height={18} />
        <Skeleton variant="rounded" width={110} height={14} sx={{ mt: 0.75 }} />
        <Skeleton variant="rounded" width={200} height={13} sx={{ mt: 0.75 }} />
      </Box>
    </Stack>
  );
};

export default VideoHeaderSkeleton;
