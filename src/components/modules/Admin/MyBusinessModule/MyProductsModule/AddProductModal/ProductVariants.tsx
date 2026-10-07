import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Alert, Stack } from "@mui/material";
import { Control, useFieldArray, UseFormWatch } from "react-hook-form";
import VariantAccordion from "./VariantAccordion";
import { ProductFormValues } from "./AddProductModal";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import ProductVariantsHeader from "./ProductVariantsHeader";

type ProductVariantsProps = {
  hasEmployees: boolean;
  employees: BusinessEmployee[];
  control: Control<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
};

const ProductVariants = ({
  hasEmployees,
  employees,
  control,
  watch,
}: ProductVariantsProps) => {
  const [isInfoVisible, setIsInfoVisible] = useState(true);

  const {
    fields: variantFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const onAddVariant = () => {
    append({
      name: "",
      duration: 0,
      offerings: employees.map((emp) => ({
        user_id: emp.id,
        price: 0,
        price_with_discount: 0,
        discount: 0,
        is_offering: true,
      })),
    });
  };

  return (
    <Grid size={{ xs: 12, md: 8 }} sx={styles.container}>
      <ProductVariantsHeader onAdd={onAddVariant} />

      {isInfoVisible && (
        <Alert
          severity="info"
          onClose={() => setIsInfoVisible(false)}
          sx={{ mb: 2 }}
        >
          O opțiune reprezintă un mod în care poate fi rezervat acest
          serviciu, cu propriul nume, durată și preț. De exemplu, pentru un
          „Masaj Deep Tissue” poți adăuga opțiuni precum „30 minute” și
          „60 minute”, fiecare cu propriul preț.
        </Alert>
      )}

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
    </Grid>
  );
};

export default ProductVariants;

const styles = {
  container: {
    height: "100%",
    overflowY: "auto",
    p: 4,
    bgcolor: "background.default",
  },
};
