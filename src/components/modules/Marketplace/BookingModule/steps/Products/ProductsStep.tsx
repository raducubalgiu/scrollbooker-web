"use client";

import { Box, Stack, Typography } from "@mui/material";
import React, { memo, useEffect } from "react";
import { BookingTabs } from "./BookingTabs";
import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import {
  BusinessServicesWithProducts,
  Product,
  UserProducts,
} from "@/ts/models/booking/product/Product";
import { useScrollSync } from "../../useScrollSync";
import { SelectedBookingItem } from "../../BookingModule";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

type ProductsStepProps = {
  products: UserProducts;
  businessId: number;
  employeeId: number | null;
  scrollOffset: number;
  headerHeight: number;
  displayTitle?: boolean;
  selectedItems: SelectedBookingItem[];
  selectedProductId: number | null;
  onAdd: (item: SelectedBookingItem) => void;
  onOpenDetail: (product: Product) => void;
  onDataLoaded: (products: BusinessServicesWithProducts[]) => void;
};

const ProductsStep = ({
  products,
  scrollOffset,
  headerHeight,
  displayTitle = true,
  selectedItems,
  onAdd,
  onOpenDetail,
  selectedProductId,
  onDataLoaded,
}: ProductsStepProps) => {
  const sync = useScrollSync(products, scrollOffset);

  useEffect(() => {
    if (products.total_count > 0) {
      onDataLoaded(products.data);

      if (selectedProductId) {
        const groupIndex = products.data.findIndex((group) =>
          group.products.some((product) => product.id === selectedProductId)
        );

        if (groupIndex !== -1) {
          setTimeout(() => {
            sync.scrollToSection(groupIndex);
          }, 100);
        }
      }
    }
  }, [selectedProductId]);

  return (
    <Box sx={{ minWidth: 0 }}>
      {displayTitle && (
        <Typography fontWeight={800} variant="h2" mt={3}>
          Servicii
        </Typography>
      )}

      {products.total_count === 0 && (
        <NotFound
          icon={<ShoppingBagOutlinedIcon sx={{ fontSize: 50 }} />}
          title="Servicii"
          description="Nu au fost gasite servicii"
        />
      )}

      <Box>
        <BookingTabs top={headerHeight} sync={sync} products={products} />

        <Box>
          {products.data.map((group, index) => (
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
                {group.products.map((prod) => {
                  const isSelected = selectedItems.some(
                    (item) => item.productId === prod.id
                  );

                  return (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      isSelected={isSelected}
                      showIcon={true}
                      onOpenDetail={() => onOpenDetail(prod)}
                      onAdd={onAdd}
                      onNavigateToBooking={() => {}}
                    />
                  );
                })}
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(ProductsStep);
