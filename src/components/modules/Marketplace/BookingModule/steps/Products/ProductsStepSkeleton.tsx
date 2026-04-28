import ProductCardSkeleton from "@/components/cutomized/ProductCard/ProductCardSkeleton";
import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

const ProductsStepSkeleton = () => {
  return (
    <Box>
      <Stack flexDirection="row" alignItems="center" gap={2}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            width={200}
            height={55}
            sx={{ borderRadius: 50, mt: 2.5, mb: 3.5 }}
          />
        ))}
      </Stack>

      <Skeleton variant="rounded" width={120} height={20} sx={{ my: 2.5 }} />

      {Array.from({ length: 5 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            border: 1.5,
            borderColor: "divider",
            borderRadius: 2.5,
            p: 2.5,
            mb: 2.5,
          }}
        >
          <ProductCardSkeleton />
        </Box>
      ))}
    </Box>
  );
};

export default ProductsStepSkeleton;
