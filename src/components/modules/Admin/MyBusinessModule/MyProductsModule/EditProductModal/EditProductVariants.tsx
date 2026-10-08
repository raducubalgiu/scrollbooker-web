"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Product, ProductVariantCreate } from "@/ts/models/booking/product/Product";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { FormProductVariant, ProductFormValues } from "../AddProductModal/AddProductModal";
import ProductVariantsHeader from "../AddProductModal/ProductVariantsHeader";
import ProductVariantCard from "../AddProductModal/ProductVariantCard";
import { buildDefaultOfferings } from "../AddProductModal/buildDefaultOfferings";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";
import { buildEditFormVariants } from "./buildEditFormVariants";
import EditOptionDrawer from "./EditOptionDrawer";
import EditVariantAccordion from "./EditVariantAccordion";
import {
  useCreateProductVariant,
  useDeleteProductVariant,
  useUpdateProductVariant,
} from "@/controllers/booking/product.controller";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
  const { control, watch, setValue, getValues, trigger } = methods;

  const [variantServerIds, setVariantServerIds] = useState<(number | null)[]>(
    product.variants.map((v) => v.id)
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [savingIndex, setSavingIndex] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    index: number;
    variantId: number;
  } | null>(null);

  const { mutate: createVariant } = useCreateProductVariant();
  const { mutate: updateVariant } = useUpdateProductVariant();
  const { mutate: deleteVariant, isPending: isDeletingVariant } =
    useDeleteProductVariant();

  const applyFreshProduct = (freshProduct: Product) => {
    setValue(
      "variants",
      buildEditFormVariants(freshProduct, hasEmployees, employees, ownerUserId)
    );
    setVariantServerIds(freshProduct.variants.map((v) => v.id));
  };

  const applyFreshVariantAtIndex = (
    freshProduct: Product,
    index: number,
    serverId: number
  ) => {
    const freshVariant = freshProduct.variants.find((v) => v.id === serverId);
    if (!freshVariant) return;

    const [mapped] = buildEditFormVariants(
      { ...freshProduct, variants: [freshVariant] },
      hasEmployees,
      employees,
      ownerUserId
    );
    if (!mapped) return;

    const nextVariants = [...watch("variants")];
    nextVariants[index] = mapped;
    setValue("variants", nextVariants);

    setVariantServerIds((prev) => {
      const next = [...prev];
      next[index] = serverId;
      return next;
    });
  };

  // Mobile: drawer-based add/edit (PlaceholderActionBox-style flow).
  const handleAddMobile = () => {
    setEditingIndex(null);
    setIsDrawerOpen(true);
  };

  const handleEditMobile = (index: number) => {
    setEditingIndex(index);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => setIsDrawerOpen(false);

  const handleSavedFromDrawer = (freshProduct: Product) => {
    applyFreshProduct(freshProduct);
    setIsDrawerOpen(false);
  };

  // Desktop: inline accordion, same shape as create mode, with its own
  // explicit per-row Save/Delete committing straight to the server.
  const handleAddDesktop = () => {
    const blank: FormProductVariant = {
      name: "",
      duration: 0,
      offerings: buildDefaultOfferings(hasEmployees, employees, ownerUserId),
    };
    setValue("variants", [...watch("variants"), blank]);
    setVariantServerIds((prev) => [...prev, null]);
  };

  const handleSaveDesktop = async (index: number) => {
    const isValid = await trigger([
      `variants.${index}.name`,
      `variants.${index}.duration`,
    ]);
    if (!isValid) {
      toast.error("Completează toate câmpurile obligatorii.");
      return;
    }

    const variant = getValues(`variants.${index}`);
    const activeOfferings = variant.offerings.filter((o) => o.is_offering);

    if (hasEmployees && activeOfferings.length === 0) {
      toast.error("Activează cel puțin un angajat pentru această opțiune.");
      return;
    }

    if (activeOfferings.some((o) => !(Number(o.price) > 0))) {
      toast.error("Completează un preț valid pentru fiecare angajat activ.");
      return;
    }

    const payload: ProductVariantCreate = {
      name: variant.name.trim(),
      duration: Number(variant.duration),
      offerings: activeOfferings.map((o) => ({
        user_id: Number(o.user_id),
        price: Number(o.price),
        discount: Number(o.discount),
        price_with_discount: Number(o.price_with_discount),
      })),
    };

    const existingId = variantServerIds[index] ?? null;
    setSavingIndex(index);

    if (existingId === null) {
      createVariant(
        { productId: product.id, data: payload },
        {
          onSuccess: (freshProduct) => {
            const previousIds = variantServerIds.filter(
              (id): id is number => id !== null
            );
            const newVariant = freshProduct.variants.find(
              (v) => !previousIds.includes(v.id)
            );
            if (newVariant) {
              applyFreshVariantAtIndex(freshProduct, index, newVariant.id);
            }
            toast.success("Opțiunea a fost adăugată.");
            setSavingIndex(null);
          },
          onError: () => {
            toast.error("A apărut o eroare la adăugarea opțiunii.");
            setSavingIndex(null);
          },
        }
      );
      return;
    }

    updateVariant(
      { productId: product.id, variantId: existingId, data: payload },
      {
        onSuccess: (freshProduct) => {
          applyFreshVariantAtIndex(freshProduct, index, existingId);
          toast.success("Opțiunea a fost actualizată.");
          setSavingIndex(null);
        },
        onError: () => {
          toast.error("A apărut o eroare la salvarea opțiunii.");
          setSavingIndex(null);
        },
      }
    );
  };

  const handleRequestDelete = (index: number) => {
    const variantId = variantServerIds[index];

    if (variantId === null || variantId === undefined) {
      const nextVariants = watch("variants").filter((_, i) => i !== index);
      setValue("variants", nextVariants);
      setVariantServerIds((prev) => prev.filter((_, i) => i !== index));
      return;
    }

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
        <ProductVariantsHeader
          onAdd={isMobile ? handleAddMobile : handleAddDesktop}
        />

        {isMobile ? (
          <Stack spacing={1.5}>
            {variantFields.map((_, index) => (
              <ProductVariantCard
                key={variantServerIds[index] ?? index}
                index={index}
                control={control}
                onEdit={() => handleEditMobile(index)}
                onDelete={() => handleRequestDelete(index)}
              />
            ))}
          </Stack>
        ) : (
          <Stack spacing={2}>
            {variantFields.length === 0 && (
              <Typography color="text.secondary">
                Nu există opțiuni adăugate.
              </Typography>
            )}

            {variantFields.map((_, index) => (
              <EditVariantAccordion
                key={variantServerIds[index] ?? index}
                index={index}
                control={control}
                watch={watch}
                employees={employees}
                hasEmployees={hasEmployees}
                isSaving={savingIndex === index}
                onSave={() => handleSaveDesktop(index)}
                onDelete={() => handleRequestDelete(index)}
              />
            ))}
          </Stack>
        )}

        {isMobile && isDrawerOpen && (
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
            onSaved={handleSavedFromDrawer}
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
