"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useGetProductsByBusinessAndEmployee } from "@/controllers/booking/product.controller";
import { Product } from "@/ts/models/booking/product/Product";
import ProductsPicker from "@/components/cutomized/ProductsPicker/ProductsPicker";
import UploadVideoProductsBottomBar from "./UploadVideoProductsBottomBar";

const MAX_SELECTED_PRODUCTS = 5;

type UploadVideoProductsPickerProps = {
  selectedProducts: Product[];
  onAddProducts: (products: Product[]) => void;
  open: boolean;
  onClose: () => void;
};

const UploadVideoProductsPicker = ({
  selectedProducts,
  onAddProducts,
  open,
  onClose,
}: UploadVideoProductsPickerProps) => {
  const { data: session } = useSession();

  const businessId = session?.business_id;
  const businessOwnerId = session?.business_owner_id;
  const userId = session?.user_id;
  const isEmployee = businessOwnerId !== userId;

  const [localSelectedProducts, setLocalSelectedProducts] =
    useState<Product[]>(selectedProducts);

  useEffect(() => {
    if (open) setLocalSelectedProducts(selectedProducts);
  }, [open, selectedProducts]);

  const { data: products, isLoading } = useGetProductsByBusinessAndEmployee({
    businessId: businessId ?? 0,
    employeeId: isEmployee ? userId ?? null : null,
    onlyServicesWithProducts: true,
  });

  const isProductSelected = (product: Product) =>
    localSelectedProducts.some((p) => p.id === product.id);

  const handleToggleProduct = (product: Product, isSelected: boolean) => {
    if (isSelected) {
      setLocalSelectedProducts((products) =>
        products.filter((p) => p.id !== product.id)
      );
    } else {
      setLocalSelectedProducts((products) => {
        if (products.length >= MAX_SELECTED_PRODUCTS) return products;
        return [...products, product];
      });
    }
  };

  const handleConfirm = () => {
    onAddProducts(localSelectedProducts);
    onClose();
  };

  return (
    <ProductsPicker
      open={open}
      title="Atașează servicii"
      products={products}
      isLoading={isLoading}
      onClose={onClose}
      isProductSelected={isProductSelected}
      isProductDisabled={(product) =>
        !isProductSelected(product) &&
        localSelectedProducts.length >= MAX_SELECTED_PRODUCTS
      }
      onToggleProduct={handleToggleProduct}
      footer={
        <UploadVideoProductsBottomBar
          selectedCount={localSelectedProducts.length}
          onReset={() => setLocalSelectedProducts([])}
          onConfirm={handleConfirm}
        />
      }
    />
  );
};

export default UploadVideoProductsPicker;
