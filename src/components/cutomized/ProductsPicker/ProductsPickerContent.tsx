"use client";

import React, { useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Product, UserProducts } from "@/ts/models/booking/product/Product";
import { useScrollSync } from "@/components/modules/Marketplace/BookingModule/useScrollSync";
import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import ProductsPickerTabs from "./ProductsPickerTabs";

export type ProductsPickerContentProps = {
  products: UserProducts;
  isProductSelected: (product: Product) => boolean;
  isProductDisabled?: (product: Product) => boolean;
  onProductClick: (product: Product, isSelected: boolean) => void;
};

const ProductsPickerContent = ({
  products,
  isProductSelected,
  isProductDisabled,
  onProductClick,
}: ProductsPickerContentProps) => {
  const services = products.data;
  const scrollRef = useRef<HTMLDivElement>(null);
  const sync = useScrollSync(products, 0, scrollRef);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.tabs}>
        <ProductsPickerTabs services={services} sync={sync} />
      </Box>

      <Box ref={scrollRef} sx={styles.scrollArea}>
        {services.map((group, index) => (
          <Box
            key={group.service.id}
            data-index={index}
            ref={(el: HTMLDivElement | null) => {
              sync.sectionRefs.current[index] = el;
            }}
            sx={{ mb: 4 }}
          >
            <Typography variant="subtitle1" fontWeight={700} mb={2}>
              {group.service.short_name}
            </Typography>

            <Stack spacing={1.5}>
              {group.products.map((product) => {
                const isSelected = isProductSelected(product);
                const isDisabled = !!isProductDisabled?.(product);

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={isSelected}
                    showIcon={true}
                    instantBooking={false}
                    displayEditableActions={false}
                    onOpenDetail={() => {
                      if (!isDisabled) onProductClick(product, isSelected);
                    }}
                    onAdd={() => {}}
                    onNavigateToBooking={() => {}}
                    sx={[
                      isSelected ? styles.selectedCard : {},
                      isDisabled ? styles.disabledCard : {},
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

export default ProductsPickerContent;

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
    height: "100%",
  },
  tabs: {
    flexShrink: 0,
    px: 2,
    borderBottom: 1,
    borderColor: "divider",
  },
  scrollArea: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    px: 2,
    pt: 2,
  },
  selectedCard: {
    borderColor: "primary.main",
    bgcolor: "action.selected",
  },
  disabledCard: {
    opacity: 0.5,
    cursor: "default",
  },
};
