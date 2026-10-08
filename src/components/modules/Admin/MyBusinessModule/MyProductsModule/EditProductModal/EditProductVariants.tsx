"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Product } from "@/ts/models/booking/product/Product";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { ProductFormValues } from "../AddProductModal/AddProductModal";
import ProductVariantsHeader from "../AddProductModal/ProductVariantsHeader";
import ProductVariantCard from "../AddProductModal/ProductVariantCard";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";
import { buildEditFormVariants } from "./buildEditFormVariants";
import EditOptionDrawer from "./EditOptionDrawer";
import { useDeleteProductVariant } from "@/controllers/booking/product.controller";

type EditProductVariantsProps = {
  product: Product;
  hasEmployees: boolean;
  employees: BusinessEmployee[];
  ownerUserId: number;
};

const EditProductVariants = ({
  product,
  hasEmployees,
  employees,
  ownerUserId,
}: EditProductVariantsProps) => {
  const methods = useForm<ProductFormValues>({
    defaultValues: {
      serviceDomainId: "",
      serviceId: "",
      name: "",
      description: "",
      filters: [],
      variants: buildEditFormVariants(
        product,
        hasEmployees,
        employees,
        ownerUserId
      ),
    },
  });
  const { control, watch, setValue } = methods;

  const [variantServerIds, setVariantServerIds] = useState<number[]>(
    product.variants.map((v) => v.id)
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    index: number;
    variantId: number;
  } | null>(null);

  const { mutate: deleteVariant, isPending: isDeletingVariant } =
    useDeleteProductVariant();

  const applyFreshProduct = (freshProduct: Product) => {
    setValue(
      "variants",
      buildEditFormVariants(freshProduct, hasEmployees, employees, ownerUserId)
    );
    setVariantServerIds(freshProduct.variants.map((v) => v.id));
  };

  const handleAdd = () => {
    setEditingIndex(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => setIsDrawerOpen(false);

  const handleSaved = (freshProduct: Product) => {
    applyFreshProduct(freshProduct);
    setIsDrawerOpen(false);
  };

  const handleRequestDelete = (index: number) => {
    const variantId = variantServerIds[index];
    if (variantId === undefined) return;

    setDeleteTarget({ index, variantId });
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    deleteVariant(
      { productId: product.id, variantId: deleteTarget.variantId },
      {
        onSuccess: () => {
          const nextVariants = watch("variants").filter(
            (_, i) => i !== deleteTarget.index
          );
          setValue("variants", nextVariants);
          setVariantServerIds((prev) =>
            prev.filter((_, i) => i !== deleteTarget.index)
          );
          setDeleteTarget(null);
          toast.success("Opțiunea a fost ștearsă.");
        },
        onError: () => {
          toast.error("A apărut o eroare la ștergerea opțiunii.");
        },
      }
    );
  };

  const variantFields = watch("variants") ?? [];

  return (
    <Grid size={{ xs: 12, md: 8 }} sx={styles.container}>
      <FormProvider {...methods}>
        <ProductVariantsHeader onAdd={handleAdd} />

        <Stack spacing={1.5}>
          {variantFields.map((_, index) => (
            <ProductVariantCard
              key={variantServerIds[index] ?? index}
              index={index}
              control={control}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleRequestDelete(index)}
            />
          ))}
        </Stack>

        {isDrawerOpen && (
          <EditOptionDrawer
            open
            productId={product.id}
            index={editingIndex}
            existingVariantId={
              editingIndex !== null
                ? variantServerIds[editingIndex] ?? null
                : null
            }
            watch={watch}
            employees={employees}
            hasEmployees={hasEmployees}
            ownerUserId={ownerUserId}
            onClose={handleCloseDrawer}
            onSaved={handleSaved}
          />
        )}
      </FormProvider>

      <ConfirmationModal
        open={!!deleteTarget}
        primaryActionTitle="Șterge"
        title="Confirmare ștergere"
        isLoading={isDeletingVariant}
        message="Ești sigur că vrei să ștergi această opțiune? Această acțiune nu poate fi anulată."
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </Grid>
  );
};

export default EditProductVariants;

const styles = {
  container: {
    height: { xs: "auto", md: "100%" },
    overflowY: { xs: "visible", md: "auto" },
    p: { xs: 2.5, md: 4 },
    pb: { xs: 12, md: 4 },
    bgcolor: "background.default",
  },
};
