"use client";

import Modal from "@/components/core/Modal/Modal";
import { SelectedBookingItem } from "@/components/modules/Marketplace/BookingModule/BookingModule";
import { Product } from "@/ts/models/booking/product/Product";
import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Protected from "@/components/cutomized/Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import ProductDetailFooter from "./ProductDetailFooter";
import ProductDetailContent from "./ProductDetailContent";
import { useProductDetailState } from "./useProductDetailState";

type ProductDetailModalProps = {
  open: boolean;
  product: Product | null;
  instantBooking: boolean;
  onClose: () => void;
  onAdd: (item: SelectedBookingItem) => void;
  requiresBookPermission?: boolean;
};

const ProductDetailModal = ({
  product,
  open,
  instantBooking,
  onClose,
  onAdd,
  requiresBookPermission = true,
}: ProductDetailModalProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const { selectedVariant, currentVariant, handleChange, handleAddClick } =
    useProductDetailState(product, onAdd, onClose);

  if (!isDesktop) return null;

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
    <Modal
      open={open}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      dividers={false}
      customFooter={instantBooking && footer}
    >
      <ProductDetailContent
        product={product}
        selectedVariantId={selectedVariant}
        instantBooking={instantBooking}
        onHandleChange={handleChange}
      />
    </Modal>
  );
};

export default ProductDetailModal;
