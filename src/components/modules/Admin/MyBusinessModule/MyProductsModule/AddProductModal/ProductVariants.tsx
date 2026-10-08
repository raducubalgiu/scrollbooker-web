import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Alert, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Control, useFieldArray, UseFormWatch } from "react-hook-form";
import VariantAccordion from "./VariantAccordion";
import { FormProductVariant, ProductFormValues } from "./AddProductModal";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import ProductVariantsHeader from "./ProductVariantsHeader";
import PlaceholderActionBox from "@/components/core/PlaceholderActionBox/PlaceholderActionBox";
import ProductVariantCard from "./ProductVariantCard";
import OptionDrawer from "./OptionDrawer";
import { buildDefaultOfferings } from "./buildDefaultOfferings";

type ProductVariantsProps = {
  hasEmployees: boolean;
  employees: BusinessEmployee[];
  ownerUserId: number;
  control: Control<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
};

const ProductVariants = ({
  hasEmployees,
  employees,
  ownerUserId,
  control,
  watch,
}: ProductVariantsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isInfoVisible, setIsInfoVisible] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const {
    fields: variantFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const onAddVariant = () => {
    if (isMobile) {
      setEditingIndex(null);
      setIsDrawerOpen(true);
    } else {
      append({
        name: "",
        duration: 0,
        offerings: buildDefaultOfferings(hasEmployees, employees, ownerUserId),
      });
    }
  };

  const handleOpenExistingOption = (index: number) => {
    setEditingIndex(index);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleCreateOption = (variant: FormProductVariant) => {
    append(variant);
    setIsDrawerOpen(false);
  };

  return (
    <Grid size={{ xs: 12, md: 8 }} sx={styles.container}>
      <ProductVariantsHeader onAdd={onAddVariant} />

      {isInfoVisible && !isMobile && (
        <Alert
          severity="info"
          onClose={() => setIsInfoVisible(false)}
          sx={{ mb: 2 }}
        >
          O opțiune reprezintă un mod în care poate fi rezervat acest serviciu,
          cu propriul nume, durată și preț. De exemplu, pentru un „Masaj Deep
          Tissue” poți adăuga opțiuni precum „30 minute” și „60 minute”, fiecare
          cu propriul preț.
        </Alert>
      )}

      {isMobile ? (
        <Stack spacing={1.5}>
          {variantFields.length === 0 ? (
            <PlaceholderActionBox
              description="Adaugă cel puțin o opțiune de preț"
              onClick={onAddVariant}
            />
          ) : (
            variantFields.map((field, index) => (
              <ProductVariantCard
                key={field.id}
                index={index}
                control={control}
                onEdit={() => handleOpenExistingOption(index)}
                onDelete={() => remove(index)}
              />
            ))
          )}
        </Stack>
      ) : (
        <Stack spacing={2}>
          {variantFields.map((field, index) => (
            <VariantAccordion
              key={field.id}
              index={index}
              control={control}
              watch={watch}
              employees={employees}
              hasEmployees={hasEmployees}
              remove={() => remove(index)}
            />
          ))}
        </Stack>
      )}

      {isMobile && isDrawerOpen && (
        <OptionDrawer
          open
          index={editingIndex}
          control={control}
          watch={watch}
          employees={employees}
          hasEmployees={hasEmployees}
          ownerUserId={ownerUserId}
          onClose={handleCloseDrawer}
          onCreate={handleCreateOption}
        />
      )}
    </Grid>
  );
};

export default ProductVariants;

const styles = {
  container: {
    height: { xs: "auto", md: "100%" },
    overflowY: { xs: "visible", md: "auto" },
    p: { xs: 2.5, md: 4 },
    pb: { xs: 12, md: 4 },
    bgcolor: "background.default",
  },
};
