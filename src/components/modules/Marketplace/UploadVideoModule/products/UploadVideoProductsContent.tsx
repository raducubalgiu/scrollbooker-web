"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { find } from "lodash";
import { Product, UserProducts } from "@/ts/models/booking/product/Product";
import { useScrollSync } from "@/components/modules/Marketplace/BookingModule/useScrollSync";
import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import UploadVideoProductsTabs, {
  UPLOAD_VIDEO_PRODUCTS_TABS_HEIGHT,
} from "./UploadVideoProductsTabs";

const MAX_SELECTED_PRODUCTS = 5;

type UploadVideoProductsContentProps = {
  products: UserProducts;
  localSelectedProducts: Product[];
  onToggleProduct: (product: Product, isSelected: boolean) => void;
};

const UploadVideoProductsContent = ({
  products,
  localSelectedProducts,
  onToggleProduct,
}: UploadVideoProductsContentProps) => {
  const services = products.data;
  const sync = useScrollSync(products, UPLOAD_VIDEO_PRODUCTS_TABS_HEIGHT);

  return (
    <Box>
      <Box sx={{ px: 2 }}>
        <UploadVideoProductsTabs services={services} sync={sync} />
      </Box>

      <Box sx={{ px: 2 }}>
        {services.map((group, index) => (
          <Box
            key={group.service.id}
            data-index={index}
            ref={(el: HTMLDivElement | null) => {
              sync.sectionRefs.current[index] = el;
            }}
            sx={{ mb: 4, scrollMarginTop: UPLOAD_VIDEO_PRODUCTS_TABS_HEIGHT }}
          >
            <Typography variant="subtitle1" fontWeight={700} mb={2}>
              {group.service.short_name}
            </Typography>

            <Stack spacing={1.5}>
              {group.products.map((product) => {
                const isSelected = !!find(localSelectedProducts, {
                  id: product.id,
                });
                const isAtLimit =
                  !isSelected &&
                  localSelectedProducts.length >= MAX_SELECTED_PRODUCTS;

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={isSelected}
                    showIcon={true}
                    instantBooking={false}
                    displayEditableActions={false}
                    onOpenDetail={() => {
                      if (!isAtLimit) onToggleProduct(product, isSelected);
                    }}
                    onAdd={() => {}}
                    onNavigateToBooking={() => {}}
                    sx={[
                      isSelected ? styles.selectedCard : {},
                      isAtLimit ? styles.disabledCard : {},
                    ]}
                  />
                );
              })}
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UploadVideoProductsContent;

const styles = {
  selectedCard: {
    borderColor: "primary.main",
    bgcolor: "action.selected",
  },
  disabledCard: {
    opacity: 0.5,
    cursor: "default",
  },
};
