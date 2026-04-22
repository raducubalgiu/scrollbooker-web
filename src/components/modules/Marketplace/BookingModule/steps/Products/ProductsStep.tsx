"use client";

import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { BookingTabs } from "./BookingTabs";
import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import { ScrollSyncResult } from "../../useScrollSync";
import { BusinessProductsResponse } from "@/ts/models/booking/product/Product";

type ProductsStepProps = {
  sync: ScrollSyncResult;
  businessProducts: BusinessProductsResponse[];
  scrollOffset: number;
  displayTitle?: boolean;
  top?: number;
};

const ProductsStep = ({
  sync,
  businessProducts,
  scrollOffset,
  top = 90,
  displayTitle = true,
}: ProductsStepProps) => {
  return (
    <Box sx={{ minWidth: 0 }}>
      {displayTitle && (
        <Typography fontWeight={800} fontSize={47.5} mt={3}>
          Servicii
        </Typography>
      )}

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
  );
};

export default ProductsStep;
