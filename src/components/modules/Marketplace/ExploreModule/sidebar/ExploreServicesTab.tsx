"use client";

import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import ProductCardSkeleton from "@/components/cutomized/ProductCard/ProductCardSkeleton";
import { useCustomQuery } from "@/hooks/useHttp";
import { Product } from "@/ts/models/booking/product/Product";
import { Box, Divider, Button, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import React, { memo, useCallback, useMemo, useState } from "react";
import ProductDetailModal from "@/components/cutomized/ProductCard/ProductDetailModal";

type ExploreServicesTabProps = {
  postId: number | undefined;
  isLoadingPosts: boolean;
};

type SelectedProduct = {
  product: Product | null;
  open: boolean;
};

const ExploreServicesTab = ({
  postId,
  isLoadingPosts,
}: ExploreServicesTabProps) => {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct>({
    product: null,
    open: false,
  });

  const { data: products, isLoading } = useCustomQuery<Product[]>({
    key: ["post-linked-products", postId],
    url: `/api/posts/${postId}/linked-products`,
    options: {
      enabled: !!postId,
    },
  });

  const skeletons = useMemo(
    () =>
      Array.from({ length: 3 }).map((_, index) => {
        return (
          <Box key={index}>
            <ProductCardSkeleton />
            {index < 2 && <Divider sx={{ my: 1.5 }} />}
          </Box>
        );
      }),
    []
  );

  const handleOpen = useCallback(
    (product: Product) => setSelectedProduct({ product, open: true }),
    []
  );

  const handleClose = useCallback(
    () => setSelectedProduct({ product: null, open: false }),
    []
  );

  return (
    <>
      {selectedProduct.open && (
        <ProductDetailModal
          open={selectedProduct.open}
          product={selectedProduct.product}
          onClose={handleClose}
        />
      )}

      <Box sx={styles.listContainer}>
        {(isLoading || isLoadingPosts) && skeletons}

        {!isLoading &&
          products?.map((prod, i) => (
            <Box key={prod.id}>
              <ProductCard
                product={prod}
                isSelected={false}
                showIcon={false}
                onOpenDetail={() => handleOpen(prod)}
              />

              {i < products?.length - 1 && <Divider sx={{ my: 1.5 }} />}
            </Box>
          ))}

        {!isLoading && !isEmpty(products) && (
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ mt: 2.5 }}
          >
            Vezi tot
          </Button>
        )}

        {!isLoading && products?.length === 0 && (
          <Typography color="text.secondary">
            Nu există servicii momentan.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default memo(ExploreServicesTab);

const styles = {
  listContainer: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    px: 3,
    py: 1.5,
    scrollBarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
};
