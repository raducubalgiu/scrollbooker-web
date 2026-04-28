"use client";

import { Box, Stack, Typography } from "@mui/material";
import React, { memo, useMemo } from "react";
import { BookingTabs } from "./BookingTabs";
import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import { BusinessProductsResponse } from "@/ts/models/booking/product/Product";
import { useCustomQuery } from "@/hooks/useHttp";
import { useScrollSync } from "../../useScrollSync";
import ProductsStepSkeleton from "./ProductsStepSkeleton";

type ProductsStepProps = {
  businessId: number;
  scrollOffset: number;
  displayTitle?: boolean;
  top?: number;
};

const ProductsStep = ({
  businessId,
  scrollOffset,
  top = 90,
  displayTitle = true,
}: ProductsStepProps) => {
  const { data, isLoading } = useCustomQuery<BusinessProductsResponse[]>({
    key: ["business-products", businessId],
    url: `/api/businesses/${businessId}/products`,
  });

  const businessProducts = useMemo(() => data ?? [], [data]);
  const sync = useScrollSync(businessProducts, scrollOffset);

  return (
    <Box sx={{ minWidth: 0 }}>
      {displayTitle && (
        <Typography fontWeight={800} fontSize={47.5} mt={3}>
          Servicii
        </Typography>
      )}

      {isLoading && <ProductsStepSkeleton />}

      {!isLoading && (
        <Box>
          <BookingTabs top={top} sync={sync} services={businessProducts} />

          <Box>
            {businessProducts.map((group, index) => (
              <Box
                key={group.service.id}
                data-index={index}
                ref={(el: HTMLDivElement | null) => {
                  if (sync.sectionRefs.current)
                    sync.sectionRefs.current[index] = el;
                }}
                sx={{ mb: 8, scrollMarginTop: scrollOffset }}
              >
                <Typography variant="h5" fontWeight={700} mb={3}>
                  {group.service.short_name}
                </Typography>
                <Stack spacing={2}>
                  {group.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isSelected={false}
                      showIcon={false}
                      onOpenDetail={() => {}}
                      onNavigateToBooking={() => {}}
                    />
                  ))}
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(ProductsStep);
