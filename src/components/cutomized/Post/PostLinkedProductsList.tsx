"use client";

import { Box, Button, Divider } from "@mui/material";
import React, { useMemo } from "react";
import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import ProductCardSkeleton from "@/components/cutomized/ProductCard/ProductCardSkeleton";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { LinkedProducts } from "@/ts/models/booking/product/LinkedProducts";

type PostLinkedProductsListProps = {
  linkedProducts: LinkedProducts | undefined;
  isLoadingLinkedProducts: boolean;
  isLoadingPosts: boolean;
  onNavigateToBooking: (selectedProductId: number | null) => void;
};

const SKELETON_COUNT = 5;

const PostLinkedProductsList = ({
  linkedProducts,
  isLoadingLinkedProducts,
  isLoadingPosts,
  onNavigateToBooking,
}: PostLinkedProductsListProps) => {
  const skeletons = useMemo(
    () =>
      Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <Box key={index}>
          <ProductCardSkeleton />
          {index < SKELETON_COUNT - 1 && <Divider sx={{ my: 1.5 }} />}
        </Box>
      )),
    []
  );

  const products = linkedProducts?.products;

  return (
    <Box sx={styles.container}>
      {(isLoadingLinkedProducts || isLoadingPosts) && skeletons}

      {!isLoadingLinkedProducts &&
        products?.map((prod, i) => (
          <Box key={prod.id}>
            <ProductCard
              product={prod}
              isSelected={false}
              showIcon={false}
              shouldToggleDescription
              onNavigateToBooking={(prod) => onNavigateToBooking(prod.id)}
              sx={{ borderColor: "transparent", p: 1.5 }}
              onAdd={() => {}}
            />

            {i < products.length - 1 && <Divider sx={{ my: 1.5 }} />}
          </Box>
        ))}

      {!isLoadingLinkedProducts && products && products.length > 0 && (
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          sx={{ mt: 2.5, alignSelf: "flex-start" }}
          onClick={() => onNavigateToBooking(null)}
        >
          Vezi toate serviciile
        </Button>
      )}

      {!isLoadingLinkedProducts && products && products.length === 0 && (
        <Box sx={styles.emptyState}>
          <NotFound
            compact
            sx={{ "& > .MuiStack-root": { mt: 0 } }}
            icon={<ShoppingBagOutlinedIcon />}
            title="Servicii"
            description="Nu au fost găsite servicii"
          />
        </Box>
      )}
    </Box>
  );
};

export default PostLinkedProductsList;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
  },
  emptyState: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
