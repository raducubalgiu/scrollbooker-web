import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import ProductOfferingRow from "./ProductOfferingRow";
import { FieldArrayWithId, UseFormWatch } from "react-hook-form";
import { ProductFormValues } from "./AddProductModal";
import { find } from "lodash";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";

type ProductVariantWithEmployeesProps = {
  employees: BusinessEmployee[];
  index: number;
  watch: UseFormWatch<ProductFormValues>;
  offeringFields: FieldArrayWithId<
    ProductFormValues,
    `variants.${number}.offerings`,
    "id"
  >[];
};

const ProductVariantsWithEmployees = ({
  employees,
  index,
  watch,
  offeringFields,
}: ProductVariantWithEmployeesProps) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography fontWeight="700" mb={2} color="primary">
        Prețuri per angajat
      </Typography>

      <Stack spacing={1.5}>
        {offeringFields.map((field, empIndex) => {
          const employee = find(employees, { id: field.user_id });

          const isOffering = watch(
            `variants.${index}.offerings.${empIndex}.is_offering`
          );

          return (
            <Paper
              variant="outlined"
              key={field.id}
              sx={{
                p: 2,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                gap: 3,
                bgcolor: isOffering ? "background.paper" : "action.hover",
                opacity: isOffering ? 1 : 0.6,
                transition: "all 0.2s",
              }}
            >
              <Avatar
                src={employee?.avatar ?? ""}
                sx={{ width: 40, height: 40 }}
              />
              <Box sx={{ minWidth: 180 }}>
                <Typography variant="subtitle2" fontWeight="700">
                  {employee?.fullname}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {employee?.job}
                </Typography>
              </Box>

              <ProductOfferingRow
                index={index}
                empIndex={empIndex}
                isOffering={isOffering}
              />
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
};

export default ProductVariantsWithEmployees;
