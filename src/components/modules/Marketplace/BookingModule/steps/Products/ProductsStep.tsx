"use client";

import { Box, Stack, Typography } from "@mui/material";
import React, { memo, useMemo, useEffect } from "react";
import { BookingTabs } from "./BookingTabs";
import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import {
  BusinessProductsResponse,
  Product,
} from "@/ts/models/booking/product/Product";
import { useCustomQuery } from "@/hooks/useHttp";
import { useScrollSync } from "../../useScrollSync";
import ProductsStepSkeleton from "./ProductsStepSkeleton";
import { SelectedBookingItem } from "../../BookingModule";
import { isEmpty } from "lodash";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

type ProductsStepProps = {
  businessId: number;
  employeeId: number | null;
  scrollOffset: number;
  displayTitle?: boolean;
  top?: number;
  selectedItems: SelectedBookingItem[];
  selectedServiceId: number | null;
  onAdd: (item: SelectedBookingItem) => void;
  onOpenDetail: (product: Product) => void;
  onDataLoaded: (products: BusinessProductsResponse[]) => void;
};

const ProductsStep = ({
  businessId,
  employeeId,
  scrollOffset,
  top = 90,
  displayTitle = true,
  selectedItems,
  onAdd,
  onOpenDetail,
  onDataLoaded,
  selectedServiceId,
}: ProductsStepProps) => {
  const { data, isLoading } = useCustomQuery<BusinessProductsResponse[]>({
    key: ["business-products", businessId, employeeId ?? undefined],
    url: `/api/businesses/${businessId}/products${employeeId ? `?employeeId=${employeeId}` : ""}`,
  });

  const businessProducts = useMemo(() => data ?? [], [data]);
  const sync = useScrollSync(businessProducts, scrollOffset);

  useEffect(() => {
    if (!isLoading && businessProducts.length > 0) {
      onDataLoaded(businessProducts);

      if (selectedServiceId) {
        const groupIndex = businessProducts.findIndex((group) =>
          group.products.some((product) => product.id === selectedServiceId)
        );

        if (groupIndex !== -1) {
          setTimeout(() => {
            sync.scrollToSection(groupIndex);
          }, 100);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessProducts, isLoading, selectedServiceId]);

  return (
    <Box sx={{ minWidth: 0 }}>
      {displayTitle && (
        <Typography fontWeight={800} fontSize={47.5} mt={3}>
          Servicii
        </Typography>
      )}

      {isLoading && <ProductsStepSkeleton />}

      {!isLoading && isEmpty(businessProducts) && (
        <NotFound
          icon={<ShoppingBagOutlinedIcon sx={{ fontSize: 50 }} />}
          title="Servicii"
          description="Nu au fost gasite servicii"
        />
      )}

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
      )}
    </Box>
  );
};

export default memo(ProductsStep);
