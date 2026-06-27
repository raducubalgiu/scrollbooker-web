import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

const VideoHeaderSkeleton = () => {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center" gap={0.5} py={1}>
      <Skeleton variant="circular" width={70} height={70} />

      <Box>
        <Skeleton variant="rounded" width={200} height={17.5} />

        <Skeleton variant="rounded" width={100} height={17.5} sx={{ mt: 1 }} />

        <Skeleton
          variant="rounded"
          width={350}
          height={17.5}
          sx={{ mt: 2.5 }}
        />
      </Box>
    </Stack>
  );
};

export default VideoHeaderSkeleton;
