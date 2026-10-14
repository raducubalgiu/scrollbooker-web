"use client";

import Modal from "@/components/core/Modal/Modal";
import { SelectedBookingItem } from "@/components/modules/Marketplace/BookingModule/BookingModule";
import { Product } from "@/ts/models/booking/product/Product";
import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import ProductDetailFooter from "./ProductDetailFooter";
import ProductDetailContent from "./ProductDetailContent";
import { useProductDetailState } from "./useProductDetailState";

type ProductDetailModalProps = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onAdd: (item: SelectedBookingItem) => void;
};

// Varianta desktop — pe mobil se randează ProductDetailDrawer în locul ei
// (ambele mount-ate ca siblings de către caller, fiecare decide singur
// dacă se afișează; Modal-ul shared nu propagă un sx extern care să
// permită hide-ul prin CSS, de-aici gate-ul prin useMediaQuery).
const ProductDetailModal = ({
  product,
  open,
  onClose,
  onAdd,
}: ProductDetailModalProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const { selectedVariant, currentVariant, handleChange, handleAddClick } =
    useProductDetailState(product, onAdd, onClose);

  if (!isDesktop) return null;

  return (
    <Modal
      open={open}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      dividers={false}
      customFooter={
        <ProductDetailFooter
          currentVariant={currentVariant}
          onHandleAdd={handleAddClick}
        />
      }
    >
      <ProductDetailContent
        product={product}
        selectedVariantId={selectedVariant}
        onHandleChange={handleChange}
      />
    </Modal>
  );
};

export default ProductDetailModal;
