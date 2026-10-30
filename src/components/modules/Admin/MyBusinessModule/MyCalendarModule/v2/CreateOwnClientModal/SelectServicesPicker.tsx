"use client";

import React, { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useGetProductsByBusinessAndEmployee } from "@/controllers/booking/product.controller";
import {
  Product,
  ProductUtils,
  ProductVariant,
} from "@/ts/models/booking/product/Product";
import { SelectedBookingItem } from "@/components/modules/Marketplace/BookingModule/BookingModule";
import ProductsPicker from "@/components/cutomized/ProductsPicker/ProductsPicker";
import ProductDetailModal from "@/components/cutomized/ProductCard/ProductDetailModal/ProductDetailModal";
import ProductDetailDrawer from "@/components/cutomized/ProductCard/ProductDetailModal/ProductDetailDrawer";
import { SelectedVariant } from "./createOwnClientTypes";

type SelectServicesPickerProps = {
  open: boolean;
  businessId: number;
  employeeId: number | undefined;
  providerUserId: number | null;
  selectedVariants: SelectedVariant[];
  onClose: () => void;
  onConfirm: (variants: SelectedVariant[]) => void;
};

const toSelectedVariant = (
  product: Product,
  variant: ProductVariant,
  providerUserId: number | null
): SelectedVariant => {
  const offering = variant.offerings.find(
    (item) => item.user.id === providerUserId
  );
  const pricing = offering ?? variant.starting_offering;

  return {
    productId: product.id,
    productName: product.name,
    variantId: variant.id,
    variantName: variant.name,
    duration: variant.duration,
    filtersSummary: ProductUtils.getFiltersSummary(product),
    priceWithDiscount: Number(pricing.price_with_discount),
    price: Number(pricing.price),
    discount: Number(pricing.discount),
  };
};

const SelectServicesPicker = ({
  open,
  businessId,
  employeeId,
  providerUserId,
  selectedVariants,
  onClose,
  onConfirm,
}: SelectServicesPickerProps) => {
  const [pendingVariants, setPendingVariants] =
    useState<SelectedVariant[]>(selectedVariants);
  const [variantsProduct, setVariantsProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (open) setPendingVariants(selectedVariants);
  }, [open, selectedVariants]);

  const { data: products, isLoading } = useGetProductsByBusinessAndEmployee({
    businessId,
    employeeId: employeeId ?? null,
    onlyServicesWithProducts: true,
  });

  const isProductSelected = (product: Product) =>
    pendingVariants.some((variant) => variant.productId === product.id);

  const addVariant = (product: Product, variant: ProductVariant) => {
    setPendingVariants((prev) => [
      ...prev.filter((item) => item.productId !== product.id),
      toSelectedVariant(product, variant, providerUserId),
    ]);
  };

  const handleProductClick = (product: Product, isSelected: boolean) => {
    if (isSelected) {
      setPendingVariants((prev) =>
        prev.filter((item) => item.productId !== product.id)
      );
      return;
    }

    const [firstVariant, ...otherVariants] = product.variants;
    if (!firstVariant) return;

    if (otherVariants.length > 0) {
      setVariantsProduct(product);
      return;
    }

    addVariant(product, firstVariant);
  };

  const handleAddFromDetail = (item: SelectedBookingItem) => {
    const variant = variantsProduct?.variants.find(
      (candidate) => candidate.id === item.variantId
    );
    if (variantsProduct && variant) addVariant(variantsProduct, variant);
  };

  const totalDuration = pendingVariants.reduce(
    (sum, variant) => sum + variant.duration,
    0
  );

  const footer = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: "100%" }}
    >
      <Typography variant="caption" color="text.secondary">
        {pendingVariants.length > 0
          ? `${pendingVariants.length} servicii • ${ProductUtils.getDurationText(totalDuration)}`
          : "Niciun serviciu selectat"}
      </Typography>

      <Stack direction="row" gap={1.5}>
        <Button
          variant="outlined"
          color="neutral"
          size="small"
          disabled={pendingVariants.length === 0}
          onClick={() => setPendingVariants([])}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          size="small"
          disableElevation
          disabled={pendingVariants.length === 0}
          onClick={() => onConfirm(pendingVariants)}
        >
          Adaugă
          {pendingVariants.length > 0 ? ` (${pendingVariants.length})` : ""}
        </Button>
      </Stack>
    </Stack>
  );

  return (
    <>
      <ProductsPicker
        open={open}
        title="Selectează serviciile"
        products={products}
        isLoading={isLoading}
        onClose={onClose}
        isProductSelected={isProductSelected}
        onProductClick={handleProductClick}
        footer={footer}
      />

      <ProductDetailModal
        key={`modal-${variantsProduct?.id ?? "none"}`}
        open={!!variantsProduct}
        product={variantsProduct}
        instantBooking
        requiresBookPermission={false}
        onClose={() => setVariantsProduct(null)}
        onAdd={handleAddFromDetail}
      />
      <ProductDetailDrawer
        key={`drawer-${variantsProduct?.id ?? "none"}`}
        open={!!variantsProduct}
        product={variantsProduct}
        instantBooking
        requiresBookPermission={false}
        onClose={() => setVariantsProduct(null)}
        onAdd={handleAddFromDetail}
      />
    </>
  );
};

export default SelectServicesPicker;
