import React from "react";
import { Box, Skeleton, Stack } from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <Box sx={{ p: 1.5 }}>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Skeleton variant="rounded" width={100} height={20} sx={{ mb: 1 }} />
          <Skeleton variant="rounded" width={250} height={20} />
          <Skeleton
            variant="rounded"
            width={250}
            height={20}
            sx={{ mt: 2.5 }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductCardSkeleton;
