"use client";

import {
  Box,
  Drawer,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { SelectedBookingItem } from "@/components/modules/Marketplace/BookingModule/BookingModule";
import { Product } from "@/ts/models/booking/product/Product";
import ProductDetailContent from "./ProductDetailContent";
import ProductDetailFooter from "./ProductDetailFooter";
import { useProductDetailState } from "./useProductDetailState";

type ProductDetailDrawerProps = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onAdd: (item: SelectedBookingItem) => void;
};

// Varianta mobil — pe desktop se randează ProductDetailModal în locul ei.
const ProductDetailDrawer = ({
  product,
  open,
  onClose,
  onAdd,
}: ProductDetailDrawerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { selectedVariant, currentVariant, handleChange, handleAddClick } =
    useProductDetailState(product, onAdd, onClose);

  if (!isMobile) return null;

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <Stack direction="row" justifyContent="flex-end" sx={{ p: 1 }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Box sx={styles.scrollArea}>
        <ProductDetailContent
          product={product}
          selectedVariantId={selectedVariant}
          onHandleChange={handleChange}
        />
      </Box>

      <ProductDetailFooter
        currentVariant={currentVariant}
        onHandleAdd={handleAddClick}
      />
    </Drawer>
  );
};

export default ProductDetailDrawer;

const styles = {
  paper: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  scrollArea: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
  },
};
