import React from "react";
import Grid from "@mui/material/Grid2";
import {
  alpha,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Control, useFieldArray, UseFormWatch } from "react-hook-form";
import VariantAccordion from "./VariantAccordion";
import { ProductFormValues } from "./AddProductModal";
import { Add } from "@mui/icons-material";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";

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
      duration: 30,
      has_different_prices: false,
      offerings: employees.map((emp) => ({
        user_id: emp.id,
        fullname: emp.fullname,
        username: emp.username,
        profession: emp.job,
        avatar: emp.avatar,
        price: 0,
        price_with_discount: 0,
        discount: 0,
        is_offering: true,
      })),
    });
  };

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
        <Tooltip title="Adauga o varianta">
          <IconButton
            onClick={onAddVariant}
            size="large"
            sx={{
              bgcolor: "primary.main",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.9),
              },
            }}
          >
            <Add fontSize="medium" sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
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
