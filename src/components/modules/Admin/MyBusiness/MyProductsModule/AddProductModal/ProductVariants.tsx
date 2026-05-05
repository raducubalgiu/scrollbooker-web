import React from "react";
import Grid from "@mui/material/Grid2";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Control, useFieldArray, UseFormWatch } from "react-hook-form";
import VariantAccordion from "./VariantAccordion";
import { ProductFormValues } from "./AddProductModal";

type ProductVariantsProps = {
  hasEmployees: boolean;
  control: Control<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
};

const ProductVariants = ({
  hasEmployees,
  control,
  watch,
}: ProductVariantsProps) => {
  const {
    fields: variantFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <Grid size={{ xs: 12, md: 8 }} sx={styles.container}>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Box>
          <Typography variant="h6" fontWeight="700">
            Variante și Prețuri
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gestionează duratele și prețurile angajaților.
          </Typography>
        </Box>
        <Button variant="contained" disableElevation>
          Adaugă Variantă
        </Button>
      </Stack>

      <Stack spacing={2}>
        {variantFields.map((field, index) => (
          <VariantAccordion
            key={field.id}
            index={index}
            control={control}
            watch={watch}
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
