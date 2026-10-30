"use client";

import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { SelectedBookingItem } from "@/components/modules/Marketplace/BookingModule/BookingModule";
import { Product } from "@/ts/models/booking/product/Product";
import Protected from "@/components/cutomized/Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import ProductDetailContent from "./ProductDetailContent";
import ProductDetailFooter from "./ProductDetailFooter";
import { useProductDetailState } from "./useProductDetailState";

type ProductDetailDrawerProps = {
  open: boolean;
  product: Product | null;
  instantBooking: boolean;
  onClose: () => void;
  onAdd: (item: SelectedBookingItem) => void;
  requiresBookPermission?: boolean;
};

const ProductDetailDrawer = ({
  product,
  open,
  instantBooking,
  onClose,
  onAdd,
  requiresBookPermission = true,
}: ProductDetailDrawerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { selectedVariant, currentVariant, handleChange, handleAddClick } =
    useProductDetailState(product, onAdd, onClose);

  if (!isMobile) return null;

  const detailFooter = (
    <ProductDetailFooter
      currentVariant={currentVariant}
      onHandleAdd={handleAddClick}
    />
  );
  const footer = requiresBookPermission ? (
    <Protected permission={PermissionEnum.BOOK_BUTTON_VIEW}>
      {detailFooter}
    </Protected>
  ) : (
    detailFooter
  );

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={styles.drawer}
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
          instantBooking={instantBooking}
          onHandleChange={handleChange}
        />
      </Box>

      {instantBooking && footer}
    </Drawer>
  );
};

export default ProductDetailDrawer;

const styles = {
  drawer: {
    zIndex: (theme: Theme) => theme.zIndex.modal + 2,
  },
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
