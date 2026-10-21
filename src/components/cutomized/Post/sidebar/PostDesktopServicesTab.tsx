"use client";

import { Box } from "@mui/material";
import React, { memo } from "react";
import PostLinkedProductsList from "@/components/cutomized/Post/PostLinkedProductsList";
import { LinkedProducts } from "@/ts/models/booking/product/LinkedProducts";

type PostDesktopServicesTabProps = {
  linkedProducts: LinkedProducts | undefined;
  isLoadingLinkedProducts: boolean;
  userId: number | undefined;
  isLoadingPosts: boolean;
  instantBooking: boolean;
  onNavigateToBooking: (selectedProductId: number | null) => void;
};

const PostDesktopServicesTab = ({
  linkedProducts,
  isLoadingLinkedProducts,
  isLoadingPosts,
  instantBooking,
  onNavigateToBooking,
}: PostDesktopServicesTabProps) => {
  return (
    <Box sx={styles.listContainer}>
      <PostLinkedProductsList
        linkedProducts={linkedProducts}
        isLoadingLinkedProducts={isLoadingLinkedProducts}
        isLoadingPosts={isLoadingPosts}
        instantBooking={instantBooking}
        onNavigateToBooking={onNavigateToBooking}
      />
    </Box>
  );
};

export default memo(PostDesktopServicesTab);

const styles = {
  listContainer: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
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
